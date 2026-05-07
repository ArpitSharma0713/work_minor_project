import streamlit as st
import pandas as pd
import numpy as np
import joblib
import shap
import matplotlib.pyplot as plt

from tensorflow.keras.models import load_model

# =========================================
# PAGE CONFIG
# =========================================

st.set_page_config(
    page_title="Intrusion Detection Dashboard",
    layout="wide"
)

st.title("Intrusion Detection System Dashboard")

# =========================================
# LOAD MODELS
# =========================================

rf = joblib.load("rf_model.pkl")

xgb = joblib.load("xgb_model.pkl")

gru_model = load_model(
    "gru_model.keras",
    compile=False
)

gru_scaler = joblib.load(
    "gru_scaler.pkl"
)

# =========================================
# LOAD LABEL MAPPING
# =========================================

label_map = pd.read_csv(
    "label_mapping.csv"
)

label_map['label'] = (
    label_map['label']
    .astype(int)
)

label_dict = dict(

    zip(

        label_map['label'],

        label_map['attack_name']
    )
)

# =========================================
# SIDEBAR
# =========================================

st.sidebar.header("Controls")

threshold = st.sidebar.slider(

    "RF Confidence Threshold",

    min_value=0.50,
    max_value=0.95,
    value=0.74,
    step=0.01
)

model_choice = st.sidebar.selectbox(

    "Model Selection",

    [
        "Cascade",
        "Random Forest Only",
        "XGBoost Only"
    ]
)

uploaded_file = st.sidebar.file_uploader(

    "Upload CSV File",

    type=["csv"]
)

# =========================================
# MAIN EXECUTION
# =========================================

if uploaded_file is not None:

    df = pd.read_csv(uploaded_file)

    st.subheader("Uploaded Dataset")

    st.dataframe(df.head())

    st.write("Dataset Shape:", df.shape)

    # =========================================
    # FEATURE ENGINEERING
    # =========================================

    df['packet_rate'] = (

        df['Tot_sum']

        / (df['Duration'] + 1)
    )

    df['byte_rate'] = (

        df['Tot_size']

        / (df['Duration'] + 1)
    )

    df['packet_diff'] = (

        df['Max']

        - df['Min']
    )

    df['packet_ratio'] = (

        df['syn_count']

        / (df['ack_count'] + 1)
    )

    df['bytes_per_packet'] = (

        df['Tot_size']

        / (df['Tot_sum'] + 1)
    )

    df['flow_intensity'] = (

        df['Tot_size']

        / (df['Duration'] + 1)
    )

    df['stability'] = (

        df['Std']

        / (df['AVG'] + 1)
    )

    df['pkt_irregularity'] = (

        df['packet_diff']

        / (df['packet_rate'] + 1)
    )

    # =========================================
    # FEATURE LIST
    # =========================================

    features = [

        'flow_duration',
        'Header_Length',
        'Protocol_Type',
        'Duration',

        'HTTP',
        'HTTPS',
        'DNS',
        'TCP',
        'UDP',
        'ICMP',

        'syn_flag_number',
        'ack_flag_number',
        'rst_flag_number',

        'ack_count',
        'syn_count',
        'rst_count',

        'Tot_sum',
        'Min',
        'Max',
        'AVG',
        'Std',
        'Tot_size',

        'Radius',
        'Covariance',
        'Variance',
        'Magnitude',
        'Weight',

        'packet_rate',
        'byte_rate',
        'packet_diff',
        'packet_ratio',
        'bytes_per_packet',
        'flow_intensity',
        'stability',
        'pkt_irregularity'
    ]

    X = df[features]

    # =========================================
    # RANDOM FOREST
    # =========================================

    rf_pred = rf.predict(X)

    rf_probs = rf.predict_proba(X)

    rf_conf = rf_probs.max(axis=1)

    # =========================================
    # XGBOOST
    # =========================================

    xgb_pred = xgb.predict(X)

    # =========================================
    # CASCADE LOGIC
    # =========================================

    final_pred = []

    model_used = []

    for i in range(len(X)):

        if model_choice == "Random Forest Only":

            final_pred.append(
                rf_pred[i]
            )

            model_used.append("RF")

        elif model_choice == "XGBoost Only":

            final_pred.append(
                xgb_pred[i]
            )

            model_used.append("XGB")

        else:

            if rf_conf[i] >= threshold:

                final_pred.append(
                    rf_pred[i]
                )

                model_used.append("RF")

            else:

                final_pred.append(
                    xgb_pred[i]
                )

                model_used.append("XGB")

    # =========================================
    # FIXED LABEL MAPPING
    # =========================================

    df['Prediction'] = (

        np.array(final_pred)

        .astype(int)
    )

    df['Prediction_Label'] = (

        df['Prediction']

        .map(label_dict)

        .fillna("Unknown")
    )

    df['Confidence'] = rf_conf

    df['Model_Used'] = model_used

    # =========================================
    # GRU FEATURE ENGINEERING
    # =========================================

    df['rate_change'] = (

        df['Rate']

        .diff()

        .fillna(0)
    )

    df['iat_change'] = (

        df['IAT']

        .diff()

        .fillna(0)
    )

    df['size_change'] = (

        df['Tot_size']

        .diff()

        .fillna(0)
    )

    df['rolling_rate'] = (

        df['Rate']

        .rolling(5)

        .mean()

        .fillna(0)
    )

    # =========================================
    # GRU FEATURES
    # =========================================

    gru_features = [

        'IAT',
        'Rate',
        'Srate',
        'Drate',

        'flow_duration',
        'Tot_size',
        'AVG',
        'Std',
        'Header_Length',

        'rate_change',
        'iat_change',
        'size_change',
        'rolling_rate'
    ]

    # =========================================
    # GRU SCALING
    # =========================================

    X_gru = gru_scaler.transform(

        df[gru_features]
    )

    # =========================================
    # CREATE SEQUENCES
    # =========================================

    def create_sequences(
        data,
        seq_len=10
    ):

        sequences = []

        for i in range(len(data)):

            start = max(
                0,
                i - seq_len + 1
            )

            seq = data[start:i+1]

            if len(seq) < seq_len:

                pad = np.zeros(

                    (
                        seq_len - len(seq),
                        data.shape[1]
                    )
                )

                seq = np.vstack(
                    (pad, seq)
                )

            else:

                seq = seq[-seq_len:]

            sequences.append(seq)

        return np.array(
            sequences,
            dtype=np.float32
        )

    X_gru_seq = create_sequences(
        X_gru
    )

    # =========================================
    # GRU PREDICTION
    # =========================================

    gru_probs = gru_model.predict(
        X_gru_seq
    )

    gru_pred = np.argmax(
        gru_probs,
        axis=1
    )

    gru_conf = np.max(
        gru_probs,
        axis=1
    )

    # =========================================
    # FIXED GRU LABEL MAPPING
    # =========================================

    gru_pred = (

        np.array(gru_pred)

        .astype(int)
    )

    df['GRU_Label'] = (

        pd.Series(gru_pred)

        .map(label_dict)

        .fillna("Unknown")
    )

    df['GRU_Confidence'] = gru_conf

    # =========================================
    # TABS
    # =========================================

    tab1, tab2, tab3, tab4, tab5 = st.tabs([

        "Overview",

        "Predictions",

        "Analytics",

        "Behavior (GRU)",

        "Explainability"
    ])

    # =========================================
    # OVERVIEW TAB
    # =========================================

    with tab1:

        st.subheader("Prediction Distribution")

        st.bar_chart(

            df['Prediction_Label']

            .value_counts()
        )

        st.subheader("Model Usage")

        st.bar_chart(

            df['Model_Used']

            .value_counts()
        )

    # =========================================
    # PREDICTIONS TAB
    # =========================================

    with tab2:

        st.subheader("Prediction Results")

        st.dataframe(

            df[
                [
                    'Prediction_Label',
                    'Confidence',
                    'Model_Used'
                ]
            ]
        )

    # =========================================
    # ANALYTICS TAB
    # =========================================

    with tab3:

        st.subheader("Confidence Distribution")

        st.bar_chart(

            df['Confidence']

            .value_counts(bins=30)
        )

    # =========================================
    # GRU TAB
    # =========================================

    with tab4:

        st.subheader("Behavioral Analysis")

        st.dataframe(

            df[
                [
                    'GRU_Label',
                    'GRU_Confidence'
                ]
            ]
        )

        st.bar_chart(

            df['GRU_Label']

            .value_counts()
        )

    # =========================================
    # SHAP TAB
    # =========================================

    with tab5:

        explainer = shap.TreeExplainer(rf)

        index = st.number_input(

            "Select Row",

            0,

            len(df)-1,

            0
        )

        sample = X.iloc[
            index:index+1
        ]

        shap_values = explainer.shap_values(
            sample
        )

        pred_class = int(
            df.iloc[index]['Prediction']
        )

        if isinstance(
            shap_values,
            list
        ):

            shap_val = shap_values[
                pred_class
            ]

        else:

            shap_val = shap_values

        shap_val = np.array(
            shap_val
        )

        if shap_val.ndim == 2:
            shap_val = shap_val[0]

        shap_val = shap_val.flatten()

        min_len = min(
            len(features),
            len(shap_val)
        )

        features_trim = features[:min_len]

        shap_trim = shap_val[:min_len]

        shap_df = pd.DataFrame({

            "Feature": features_trim,

            "Impact": shap_trim

        }).sort_values(

            by="Impact",

            key=np.abs,

            ascending=False
        )

        st.subheader("Top Feature Contributions")

        st.dataframe(
            shap_df.head(10)
        )

        fig, ax = plt.subplots()

        base_val = explainer.expected_value

        if isinstance(
            base_val,
            (list, np.ndarray)
        ):

            base_val = base_val[pred_class]

        shap.plots._waterfall.waterfall_legacy(

            float(base_val),

            shap_trim,

            feature_names=features_trim,

            max_display=10,

            show=False
        )

        st.pyplot(fig)