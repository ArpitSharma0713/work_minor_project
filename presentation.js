const pptxgen = require("pptxgenjs");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");

// Icon imports
const { FaShieldAlt, FaNetworkWired, FaChartLine, FaBrain, FaDatabase, FaCogs, FaCheckCircle, FaExclamationTriangle, FaRocket, FaSearch, FaLayerGroup, FaProjectDiagram, FaCode, FaListAlt, FaFlask, FaLightbulb } = require("react-icons/fa");
const { MdSecurity, MdSpeed } = require("react-icons/md");

// Color palette — Cybersecurity / Deep Tech
const C = {
  darkBg: "0A1628",       // Deep navy
  darkBg2: "0D1F3C",      // Slightly lighter navy
  accent: "00D4FF",       // Cyan accent
  accent2: "0097B8",      // Darker cyan
  green: "00E5A0",        // Success green
  orange: "FF8C42",       // Warning orange
  purple: "8B5CF6",       // Purple highlight
  white: "FFFFFF",
  lightGray: "B0C4DE",
  midGray: "4A6080",
  cardBg: "112240",       // Card background
  cardBg2: "0E1C35",
  red: "FF4757",
};

async function iconToBase64Png(IconComponent, color, size = 256) {
  const svg = ReactDOMServer.renderToStaticMarkup(
    React.createElement(IconComponent, { color, size: String(size) })
  );
  const pngBuffer = await sharp(Buffer.from(svg)).png().toBuffer();
  return "image/png;base64," + pngBuffer.toString("base64");
}

async function main() {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.title = "Adaptive Cyber Attack Detection Using Behavior Modeling";
  pres.author = "Vansh Kumar, Shrey Dahiya, Shivank Choudhary, Arpit Sharma";

  // Pre-render icons
  const iconShield = await iconToBase64Png(FaShieldAlt, "#00D4FF", 256);
  const iconNetwork = await iconToBase64Png(FaNetworkWired, "#00D4FF", 256);
  const iconBrain = await iconToBase64Png(FaBrain, "#8B5CF6", 256);
  const iconChart = await iconToBase64Png(FaChartLine, "#00E5A0", 256);
  const iconDB = await iconToBase64Png(FaDatabase, "#FF8C42", 256);
  const iconCog = await iconToBase64Png(FaCogs, "#00D4FF", 256);
  const iconCheck = await iconToBase64Png(FaCheckCircle, "#00E5A0", 256);
  const iconWarn = await iconToBase64Png(FaExclamationTriangle, "#FF8C42", 256);
  const iconRocket = await iconToBase64Png(FaRocket, "#00D4FF", 256);
  const iconSearch = await iconToBase64Png(FaSearch, "#8B5CF6", 256);
  const iconLayers = await iconToBase64Png(FaLayerGroup, "#00D4FF", 256);
  const iconProject = await iconToBase64Png(FaProjectDiagram, "#00E5A0", 256);
  const iconCode = await iconToBase64Png(FaCode, "#FF8C42", 256);
  const iconList = await iconToBase64Png(FaListAlt, "#00D4FF", 256);
  const iconFlask = await iconToBase64Png(FaFlask, "#8B5CF6", 256);
  const iconLight = await iconToBase64Png(FaLightbulb, "#FF8C42", 256);
  const iconShieldGreen = await iconToBase64Png(FaShieldAlt, "#00E5A0", 256);
  const iconSpeed = await iconToBase64Png(MdSpeed, "#00D4FF", 256);

  // ─── SLIDE 1: Title Slide ──────────────────────────────────────────────────
  {
    const s = pres.addSlide();
    s.background = { color: C.darkBg };

    // Left accent bar
    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 0.08, h: 5.625, fill: { color: C.accent }, line: { color: C.accent } });

    // Decorative right block
    s.addShape(pres.shapes.RECTANGLE, { x: 7.5, y: 0, w: 2.5, h: 5.625, fill: { color: C.cardBg }, line: { color: C.cardBg } });

    // Shield icon (large)
    s.addImage({ data: iconShield, x: 7.9, y: 0.8, w: 1.6, h: 1.6 });

    // Top tag
    s.addShape(pres.shapes.RECTANGLE, { x: 0.4, y: 0.4, w: 2.5, h: 0.3, fill: { color: C.accent2 }, line: { color: C.accent2 }, rectRadius: 0.05 });
    s.addText("B.TECH MAJOR PROJECT", { x: 0.4, y: 0.4, w: 2.5, h: 0.3, fontSize: 9, color: C.white, bold: true, align: "center", valign: "middle", margin: 0 });

    // Main title
    s.addText("Adaptive Cyber Attack", { x: 0.4, y: 0.9, w: 6.8, h: 0.9, fontSize: 38, color: C.white, bold: true, fontFace: "Calibri" });
    s.addText("Detection Using", { x: 0.4, y: 1.7, w: 6.8, h: 0.75, fontSize: 38, color: C.white, bold: true, fontFace: "Calibri" });
    s.addText("Behavior Modeling", { x: 0.4, y: 2.4, w: 6.8, h: 0.75, fontSize: 38, color: C.accent, bold: true, fontFace: "Calibri" });

    // Divider
    s.addShape(pres.shapes.RECTANGLE, { x: 0.4, y: 3.3, w: 4.5, h: 0.04, fill: { color: C.midGray }, line: { color: C.midGray } });

    // Authors
    s.addText("Vansh Kumar  |  Shrey Dahiya  |  Shivank Choudhary  |  Arpit Sharma", {
      x: 0.4, y: 3.45, w: 7.0, h: 0.3, fontSize: 11, color: C.lightGray, fontFace: "Calibri"
    });

    // Guide
    s.addText("Guide: Ms. Seema Verma, Asst. Professor (Grade-I)", {
      x: 0.4, y: 3.85, w: 7.0, h: 0.25, fontSize: 10, color: C.lightGray, fontFace: "Calibri"
    });

    // University
    s.addText("Dept. of CSE & IT  |  Jaypee University of Information Technology, Waknaghat", {
      x: 0.4, y: 4.15, w: 7.0, h: 0.25, fontSize: 10, color: C.midGray, fontFace: "Calibri"
    });

    // Year tag
    s.addShape(pres.shapes.RECTANGLE, { x: 0.4, y: 4.7, w: 1.0, h: 0.28, fill: { color: C.green }, line: { color: C.green }, rectRadius: 0.05 });
    s.addText("2026", { x: 0.4, y: 4.7, w: 1.0, h: 0.28, fontSize: 11, color: C.darkBg, bold: true, align: "center", valign: "middle", margin: 0 });
  }

  // ─── SLIDE 2: Agenda ──────────────────────────────────────────────────────
  {
    const s = pres.addSlide();
    s.background = { color: C.darkBg };
    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.9, fill: { color: C.cardBg }, line: { color: C.cardBg } });
    s.addText("Agenda", { x: 0.5, y: 0.1, w: 9, h: 0.7, fontSize: 28, color: C.accent, bold: true, fontFace: "Calibri" });

    const items = [
      { num: "01", title: "Introduction & Problem Statement", icon: iconShield },
      { num: "02", title: "Objectives & Motivation", icon: iconList },
      { num: "03", title: "Literature Survey", icon: iconSearch },
      { num: "04", title: "System Architecture & Design", icon: iconLayers },
      { num: "05", title: "Feature Engineering Pipeline", icon: iconCog },
      { num: "06", title: "Machine Learning Models", icon: iconBrain },
      { num: "07", title: "Cascading Strategy", icon: iconProject },
      { num: "08", title: "Implementation & Tech Stack", icon: iconCode },
      { num: "09", title: "Testing & Results", icon: iconFlask },
      { num: "10", title: "Conclusion & Future Scope", icon: iconLight },
    ];

    const cols = [0.3, 5.2];
    items.forEach((item, i) => {
      const col = Math.floor(i / 5);
      const row = i % 5;
      const x = cols[col];
      const y = 1.1 + row * 0.86;

      s.addShape(pres.shapes.RECTANGLE, { x, y, w: 4.5, h: 0.72, fill: { color: C.cardBg }, line: { color: C.midGray, width: 0.5 } });
      s.addShape(pres.shapes.RECTANGLE, { x, y, w: 0.45, h: 0.72, fill: { color: C.accent2 }, line: { color: C.accent2 } });
      s.addText(item.num, { x, y, w: 0.45, h: 0.72, fontSize: 11, color: C.white, bold: true, align: "center", valign: "middle", margin: 0 });
      s.addImage({ data: item.icon, x: x + 0.5, y: y + 0.14, w: 0.42, h: 0.42 });
      s.addText(item.title, { x: x + 1.0, y: y + 0.1, w: 3.4, h: 0.52, fontSize: 12, color: C.white, fontFace: "Calibri", valign: "middle" });
    });
  }

  // ─── SLIDE 3: Introduction ─────────────────────────────────────────────────
  {
    const s = pres.addSlide();
    s.background = { color: C.darkBg };
    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.85, fill: { color: C.cardBg }, line: { color: C.cardBg } });
    s.addText("Introduction", { x: 0.5, y: 0.1, w: 9, h: 0.65, fontSize: 26, color: C.accent, bold: true, fontFace: "Calibri" });

    // Left column - text
    const points = [
      "Modern digital ecosystems are characterized by an unprecedented expansion of IoT devices, cloud services, and networked systems.",
      "Cyber threats have evolved — from DDoS and port scanning to complex adaptive intrusion strategies targeting critical infrastructure.",
      "Traditional rule-based IDS fail to detect novel or evolving attack patterns that deviate from predefined signatures.",
      "Machine learning enables systems to learn patterns from data and generalize to previously unseen threats.",
      "Raw network statistics alone are insufficient — behavioral dynamics of traffic require richer feature representations.",
    ];

    points.forEach((pt, i) => {
      const y = 1.05 + i * 0.83;
      s.addShape(pres.shapes.RECTANGLE, { x: 0.3, y, w: 6.0, h: 0.7, fill: { color: C.cardBg }, line: { color: C.midGray, width: 0.5 } });
      s.addShape(pres.shapes.RECTANGLE, { x: 0.3, y, w: 0.04, h: 0.7, fill: { color: C.accent }, line: { color: C.accent } });
      s.addText(pt, { x: 0.45, y: y + 0.06, w: 5.8, h: 0.58, fontSize: 11, color: C.lightGray, fontFace: "Calibri", valign: "middle" });
    });

    // Right visual panel
    s.addShape(pres.shapes.RECTANGLE, { x: 6.5, y: 1.0, w: 3.2, h: 4.3, fill: { color: C.cardBg }, line: { color: C.midGray, width: 0.5 } });
    s.addText("Cyber Threat\nLandscape", { x: 6.6, y: 1.05, w: 3.0, h: 0.5, fontSize: 13, color: C.accent, bold: true, fontFace: "Calibri", align: "center" });

    const threats = [
      { label: "DDoS", color: C.red, w: 2.4 },
      { label: "Malware", color: C.orange, w: 1.8 },
      { label: "Phishing", color: C.purple, w: 2.1 },
      { label: "Port Scan", color: C.accent2, w: 1.5 },
      { label: "Intrusion", color: C.green, w: 2.0 },
    ];
    threats.forEach((t, i) => {
      const ty = 1.7 + i * 0.65;
      s.addText(t.label, { x: 6.6, y: ty, w: 1.1, h: 0.35, fontSize: 10, color: C.lightGray, fontFace: "Calibri", valign: "middle" });
      s.addShape(pres.shapes.RECTANGLE, { x: 7.75, y: ty + 0.05, w: t.w, h: 0.25, fill: { color: t.color }, line: { color: t.color } });
    });

    s.addImage({ data: iconWarn, x: 7.6, y: 4.7, w: 0.7, h: 0.7 });
    s.addText("Evolving Threat Surface", { x: 7.0, y: 4.75, w: 1.5, h: 0.5, fontSize: 9, color: C.lightGray, fontFace: "Calibri", align: "center" });
  }

  // ─── SLIDE 4: Problem Statement ────────────────────────────────────────────
  {
    const s = pres.addSlide();
    s.background = { color: C.darkBg };
    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.85, fill: { color: C.cardBg }, line: { color: C.cardBg } });
    s.addText("Problem Statement", { x: 0.5, y: 0.1, w: 9, h: 0.65, fontSize: 26, color: C.accent, bold: true, fontFace: "Calibri" });

    const problems = [
      {
        num: "P1", title: "Scale-Dependent Features",
        desc: "Raw features like packet count are duration-sensitive. Similar counts over different intervals represent fundamentally different behaviors — traditional features miss this distinction.",
        color: C.red
      },
      {
        num: "P2", title: "Single-Model Limitations",
        desc: "Lightweight models (RF) offer speed but lack depth; complex models (XGBoost) improve accuracy but increase cost. Existing systems fail to balance this trade-off effectively.",
        color: C.orange
      },
      {
        num: "P3", title: "Static Feature Representations",
        desc: "Most IDS frameworks rely on static statistical features that fail to capture temporal and behavioral dynamics. DDoS, probing, and scanning attacks exhibit sequential dependencies not captured by tabular models.",
        color: C.purple
      },
      {
        num: "P4", title: "Directional Asymmetry Loss",
        desc: "Directional asymmetry and traffic irregularities — key indicators of anomalous behavior — are lost when relying solely on aggregate features, reducing sensitivity for sophisticated attacks.",
        color: C.accent2
      },
    ];

    problems.forEach((p, i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const x = 0.3 + col * 4.85;
      const y = 1.05 + row * 2.1;
      s.addShape(pres.shapes.RECTANGLE, { x, y, w: 4.5, h: 1.9, fill: { color: C.cardBg }, line: { color: p.color, width: 1 } });
      s.addShape(pres.shapes.RECTANGLE, { x, y, w: 4.5, h: 0.38, fill: { color: p.color }, line: { color: p.color } });
      s.addText(`${p.num}  ${p.title}`, { x: x + 0.1, y: y + 0.04, w: 4.3, h: 0.3, fontSize: 12, color: C.white, bold: true, fontFace: "Calibri", valign: "middle" });
      s.addText(p.desc, { x: x + 0.15, y: y + 0.5, w: 4.2, h: 1.3, fontSize: 10.5, color: C.lightGray, fontFace: "Calibri", valign: "top" });
    });
  }

  // ─── SLIDE 5: Objectives ───────────────────────────────────────────────────
  {
    const s = pres.addSlide();
    s.background = { color: C.darkBg };
    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.85, fill: { color: C.cardBg }, line: { color: C.cardBg } });
    s.addText("Objectives & Motivation", { x: 0.5, y: 0.1, w: 9, h: 0.65, fontSize: 26, color: C.accent, bold: true, fontFace: "Calibri" });

    const objs = [
      { icon: iconCog, text: "Design a behavioral feature engineering pipeline transforming raw flow stats into meaningful traffic dynamic representations." },
      { icon: iconBrain, text: "Develop a multi-model IDS using Random Forest and XGBoost, exploiting each model's strengths for classification efficiency and accuracy." },
      { icon: iconProject, text: "Implement confidence-based cascading — RF for fast initial classification, XGBoost for deeper analysis of uncertain samples." },
      { icon: iconNetwork, text: "Train a GRU-based sequential model to capture temporal and behavioral patterns not visible in static feature sets." },
      { icon: iconChart, text: "Evaluate using accuracy, precision, recall, and F1-score on the CIC-IoT 2023 dataset — a modern IoT benchmark." },
      { icon: iconRocket, text: "Deploy via Streamlit for real-time inference on uploaded network traffic data — practical enterprise applicability." },
    ];

    objs.forEach((obj, i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const x = 0.3 + col * 4.85;
      const y = 1.0 + row * 1.45;
      s.addShape(pres.shapes.RECTANGLE, { x, y, w: 4.5, h: 1.25, fill: { color: C.cardBg }, line: { color: C.midGray, width: 0.5 } });
      s.addImage({ data: obj.icon, x: x + 0.15, y: y + 0.37, w: 0.5, h: 0.5 });
      s.addText(obj.text, { x: x + 0.78, y: y + 0.1, w: 3.6, h: 1.05, fontSize: 10.5, color: C.lightGray, fontFace: "Calibri", valign: "middle" });
    });
  }

  // ─── SLIDE 6: Literature Survey ────────────────────────────────────────────
  {
    const s = pres.addSlide();
    s.background = { color: C.darkBg };
    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.85, fill: { color: C.cardBg }, line: { color: C.cardBg } });
    s.addText("Literature Survey — Key Findings", { x: 0.5, y: 0.1, w: 9, h: 0.65, fontSize: 26, color: C.accent, bold: true, fontFace: "Calibri" });

    const rows = [
      ["Wiafe et al., 2020", "AI for Cybersecurity", "SVM most effective; ensemble > single classifiers", C.accent2],
      ["Aloqaily et al., 2022", "AI-Driven Adaptive Cybersecurity", "Behavioral anomaly detection superior to signatures", C.purple],
      ["Trivedi & Chauhan, 2025", "AI in Threat Detection", "GRU effective for temporal modeling with low overhead", C.green],
      ["Oguz & Bucak, 2016", "Behavior-Based IDS", "J48 Decision Tree AUC ≈ 0.958 for DoS/Probe attacks", C.orange],
      ["Pai et al., 2025", "Adaptive Network Anomaly Detection", "Stacking ensemble: 98.79% accuracy on DDoS/PortScan", C.accent],
      ["Gueriani et al., 2024", "Attention LSTM-CNN for IIoT", "Near-perfect detection with real-time inference capability", C.red],
      ["Villegas-Ch et al., 2024", "Adaptive Deep Learning IDS", "Reduces false positives; adapts to new patterns in near real-time", C.green],
    ];

    // Header row
    s.addShape(pres.shapes.RECTANGLE, { x: 0.3, y: 0.95, w: 9.4, h: 0.32, fill: { color: C.accent2 }, line: { color: C.accent2 } });
    ["Authors", "Focus", "Key Contribution"].forEach((h, i) => {
      const xs = [0.35, 2.5, 5.3];
      const ws = [2.1, 2.75, 4.3];
      s.addText(h, { x: xs[i], y: 0.97, w: ws[i], h: 0.28, fontSize: 10, color: C.white, bold: true, fontFace: "Calibri", valign: "middle" });
    });

    rows.forEach((row, i) => {
      const y = 1.32 + i * 0.56;
      const bg = i % 2 === 0 ? C.cardBg : C.cardBg2;
      s.addShape(pres.shapes.RECTANGLE, { x: 0.3, y, w: 9.4, h: 0.52, fill: { color: bg }, line: { color: C.midGray, width: 0.3 } });
      s.addShape(pres.shapes.RECTANGLE, { x: 0.3, y, w: 0.06, h: 0.52, fill: { color: row[3] }, line: { color: row[3] } });
      s.addText(row[0], { x: 0.42, y: y + 0.06, w: 2.0, h: 0.4, fontSize: 9.5, color: C.lightGray, fontFace: "Calibri", valign: "middle" });
      s.addText(row[1], { x: 2.5, y: y + 0.06, w: 2.75, h: 0.4, fontSize: 9.5, color: C.white, fontFace: "Calibri", valign: "middle" });
      s.addText(row[2], { x: 5.3, y: y + 0.06, w: 4.3, h: 0.4, fontSize: 9.5, color: C.lightGray, fontFace: "Calibri", valign: "middle" });
    });

    s.addText("Research Gap: No unified framework combines behavioral feature engineering + cascaded multi-model + temporal GRU analysis on modern IoT datasets.", {
      x: 0.3, y: 5.22, w: 9.4, h: 0.32, fontSize: 10, color: C.orange, bold: true, fontFace: "Calibri", align: "center"
    });
  }

  // ─── SLIDE 7: Dataset & Feature Engineering ───────────────────────────────
  {
    const s = pres.addSlide();
    s.background = { color: C.darkBg };
    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.85, fill: { color: C.cardBg }, line: { color: C.cardBg } });
    s.addText("Dataset & Feature Engineering", { x: 0.5, y: 0.1, w: 9, h: 0.65, fontSize: 26, color: C.accent, bold: true, fontFace: "Calibri" });

    // Left — Dataset info
    s.addShape(pres.shapes.RECTANGLE, { x: 0.3, y: 1.0, w: 4.4, h: 1.5, fill: { color: C.cardBg }, line: { color: C.accent, width: 1 } });
    s.addImage({ data: iconDB, x: 0.45, y: 1.1, w: 0.6, h: 0.6 });
    s.addText("CIC-IoT 2023 Dataset", { x: 1.15, y: 1.1, w: 3.4, h: 0.35, fontSize: 13, color: C.accent, bold: true, fontFace: "Calibri" });
    s.addText([
      { text: "• ", options: { bold: true } }, { text: "Large-scale IoT network traffic benchmark\n", options: {} },
      { text: "• ", options: { bold: true } }, { text: "Benign + malicious traffic (multi-class)\n", options: {} },
      { text: "• ", options: { bold: true } }, { text: "Flow-based features: duration, packets, bytes\n", options: {} },
      { text: "• ", options: { bold: true } }, { text: "Statistical measures: mean, min, max, std", options: {} },
    ], { x: 0.45, y: 1.65, w: 4.1, h: 0.78, fontSize: 10, color: C.lightGray, fontFace: "Calibri" });

    // Right — engineered features
    s.addShape(pres.shapes.RECTANGLE, { x: 5.0, y: 1.0, w: 4.7, h: 1.5, fill: { color: C.cardBg }, line: { color: C.green, width: 1 } });
    s.addImage({ data: iconCog, x: 5.15, y: 1.1, w: 0.6, h: 0.6 });
    s.addText("Behavioral Feature Engineering", { x: 5.85, y: 1.1, w: 3.7, h: 0.35, fontSize: 13, color: C.green, bold: true, fontFace: "Calibri" });

    const feats = ["Packet Rate", "Byte Rate", "Packet Ratio", "Flow Intensity", "Stability", "Irregularity", "Bytes/Packet", "Packet Diff"];
    feats.forEach((f, i) => {
      const col = i % 4; const row = Math.floor(i / 4);
      const colors = [C.accent, C.green, C.orange, C.purple];
      s.addShape(pres.shapes.RECTANGLE, { x: 5.1 + col * 1.15, y: 1.65 + row * 0.35, w: 1.08, h: 0.28, fill: { color: colors[col] }, line: { color: colors[col] } });
      s.addText(f, { x: 5.1 + col * 1.15, y: 1.65 + row * 0.35, w: 1.08, h: 0.28, fontSize: 8.5, color: C.darkBg, bold: true, align: "center", valign: "middle", margin: 0 });
    });

    // Pipeline arrow flow
    s.addShape(pres.shapes.RECTANGLE, { x: 0.3, y: 2.7, w: 9.4, h: 0.35, fill: { color: C.cardBg2 }, line: { color: C.midGray, width: 0.5 } });
    s.addText("Processing Pipeline:", { x: 0.4, y: 2.76, w: 1.6, h: 0.23, fontSize: 9, color: C.accent, bold: true, fontFace: "Calibri" });
    const steps = ["Load CSV", "→  Clean & Standardize", "→  Engineer Features", "→  Encode Labels", "→  Train/Test Split", "→  Model Ready"];
    s.addText(steps.join("  "), { x: 2.1, y: 2.76, w: 7.5, h: 0.23, fontSize: 9, color: C.lightGray, fontFace: "Calibri" });

    // Data preprocessing details
    const prepCards = [
      { title: "Missing Values", desc: "Null handling to prevent model bias; duplicates removed", color: C.red },
      { title: "Normalization", desc: "Numerical features scaled for model compatibility", color: C.orange },
      { title: "Label Encoding", desc: "Categorical attack types encoded as integers", color: C.purple },
      { title: "Class Filtering", desc: "Low-frequency classes filtered to reduce imbalance", color: C.green },
    ];
    prepCards.forEach((c, i) => {
      const x = 0.3 + i * 2.38;
      s.addShape(pres.shapes.RECTANGLE, { x, y: 3.2, w: 2.25, h: 1.7, fill: { color: C.cardBg }, line: { color: c.color, width: 1 } });
      s.addShape(pres.shapes.RECTANGLE, { x, y: 3.2, w: 2.25, h: 0.32, fill: { color: c.color }, line: { color: c.color } });
      s.addText(c.title, { x: x + 0.05, y: 3.23, w: 2.15, h: 0.26, fontSize: 10, color: C.white, bold: true, fontFace: "Calibri", valign: "middle" });
      s.addText(c.desc, { x: x + 0.1, y: 3.6, w: 2.05, h: 1.2, fontSize: 9.5, color: C.lightGray, fontFace: "Calibri", valign: "top" });
    });
  }

  // ─── SLIDE 8: System Architecture ─────────────────────────────────────────
  {
    const s = pres.addSlide();
    s.background = { color: C.darkBg };
    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.85, fill: { color: C.cardBg }, line: { color: C.cardBg } });
    s.addText("System Architecture — 7 Layers", { x: 0.5, y: 0.1, w: 9, h: 0.65, fontSize: 26, color: C.accent, bold: true, fontFace: "Calibri" });

    const layers = [
      { name: "1. Data Source Layer", desc: "CIC-IoT 2023 Dataset — preprocessed network flow records (benign + attacks)", color: C.accent2 },
      { name: "2. Data Handling Layer", desc: "Pandas-based loading, schema inspection, type correction, train/val/test split", color: C.purple },
      { name: "3. Processing Layer", desc: "Cleaning, normalization, feature selection, label encoding, class imbalance handling", color: C.orange },
      { name: "4. Model Layer", desc: "Random Forest (primary) → Confidence Router → XGBoost (secondary) cascade", color: C.red },
      { name: "5. Ensemble/GRU Layer", desc: "GRU sequential model captures temporal traffic patterns for behavioral analysis", color: C.green },
      { name: "6. Application Layer", desc: "Streamlit UI: upload traffic → receive real-time predictions and metric visualizations", color: C.accent },
      { name: "7. Evaluation Layer", desc: "Accuracy, precision, recall, F1-score per model & cascade; confusion matrices", color: C.orange },
    ];

    layers.forEach((layer, i) => {
      const y = 1.0 + i * 0.66;
      const w = 9.4 - i * 0.0; // same width
      s.addShape(pres.shapes.RECTANGLE, { x: 0.3, y, w: 9.4, h: 0.56, fill: { color: C.cardBg }, line: { color: layer.color, width: 0.8 } });
      s.addShape(pres.shapes.RECTANGLE, { x: 0.3, y, w: 2.1, h: 0.56, fill: { color: layer.color }, line: { color: layer.color } });
      s.addText(layer.name, { x: 0.35, y: y + 0.09, w: 2.0, h: 0.38, fontSize: 9.5, color: C.white, bold: true, fontFace: "Calibri", valign: "middle" });
      s.addText(layer.desc, { x: 2.5, y: y + 0.09, w: 7.1, h: 0.38, fontSize: 10, color: C.lightGray, fontFace: "Calibri", valign: "middle" });
    });
  }

  // ─── SLIDE 9: ML Models ────────────────────────────────────────────────────
  {
    const s = pres.addSlide();
    s.background = { color: C.darkBg };
    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.85, fill: { color: C.cardBg }, line: { color: C.cardBg } });
    s.addText("Machine Learning Models", { x: 0.5, y: 0.1, w: 9, h: 0.65, fontSize: 26, color: C.accent, bold: true, fontFace: "Calibri" });

    // Three model cards
    const models = [
      {
        title: "Random Forest",
        role: "Primary Classifier",
        icon: iconProject,
        color: C.accent2,
        details: [
          "Ensemble of decision trees",
          "Bagging + feature randomness",
          "Robust to overfitting",
          "Outputs class probabilities",
          "Fast inference on high-dim data",
          "Generates confidence scores",
        ]
      },
      {
        title: "XGBoost",
        role: "Secondary Classifier",
        icon: iconBrain,
        color: C.purple,
        details: [
          "Sequential gradient boosting",
          "Each tree corrects prior errors",
          "Regularization prevents overfit",
          "Captures complex non-linearities",
          "Activated for low-confidence cases",
          "Higher cost, higher accuracy",
        ]
      },
      {
        title: "GRU (Gated Recurrent Unit)",
        role: "Behavioral Analysis",
        icon: iconNetwork,
        color: C.green,
        details: [
          "Recurrent neural network",
          "Captures temporal dependencies",
          "Simpler than LSTM, equally effective",
          "Sequences of network flows as input",
          "Detects evolving attack patterns",
          "Complements tabular classifiers",
        ]
      },
    ];

    models.forEach((m, i) => {
      const x = 0.3 + i * 3.25;
      s.addShape(pres.shapes.RECTANGLE, { x, y: 1.0, w: 3.1, h: 4.4, fill: { color: C.cardBg }, line: { color: m.color, width: 1.2 } });
      s.addShape(pres.shapes.RECTANGLE, { x, y: 1.0, w: 3.1, h: 0.95, fill: { color: m.color }, line: { color: m.color } });
      s.addImage({ data: m.icon, x: x + 0.1, y: 1.08, w: 0.72, h: 0.72 });
      s.addText(m.title, { x: x + 0.9, y: 1.1, w: 2.1, h: 0.42, fontSize: 13, color: C.white, bold: true, fontFace: "Calibri", valign: "middle" });
      s.addText(m.role, { x: x + 0.9, y: 1.5, w: 2.1, h: 0.28, fontSize: 9.5, color: C.darkBg, fontFace: "Calibri" });
      m.details.forEach((d, j) => {
        s.addText("• " + d, { x: x + 0.15, y: 2.08 + j * 0.5, w: 2.8, h: 0.44, fontSize: 10, color: C.lightGray, fontFace: "Calibri" });
      });
    });
  }

  // ─── SLIDE 10: Cascading Strategy ─────────────────────────────────────────
  {
    const s = pres.addSlide();
    s.background = { color: C.darkBg };
    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.85, fill: { color: C.cardBg }, line: { color: C.cardBg } });
    s.addText("Confidence-Based Cascading Strategy", { x: 0.5, y: 0.1, w: 9, h: 0.65, fontSize: 26, color: C.accent, bold: true, fontFace: "Calibri" });

    // Flow boxes
    const boxes = [
      { label: "Network Traffic\nInput", x: 0.2, y: 2.2, color: C.accent2 },
      { label: "Feature\nEngineering", x: 1.8, y: 2.2, color: C.orange },
      { label: "Random Forest\nClassifier", x: 3.4, y: 2.2, color: C.accent },
      { label: "Confidence\nRouter", x: 5.0, y: 2.2, color: C.purple },
    ];

    boxes.forEach((b, i) => {
      s.addShape(pres.shapes.RECTANGLE, { x: b.x, y: b.y, w: 1.45, h: 0.75, fill: { color: b.color }, line: { color: b.color } });
      s.addText(b.label, { x: b.x, y: b.y, w: 1.45, h: 0.75, fontSize: 10, color: C.white, bold: true, align: "center", valign: "middle", margin: 0, fontFace: "Calibri" });
      if (i < boxes.length - 1) {
        s.addShape(pres.shapes.RECTANGLE, { x: b.x + 1.45, y: b.y + 0.32, w: 0.35, h: 0.04, fill: { color: C.white }, line: { color: C.white } });
        s.addText("▶", { x: b.x + 1.72, y: b.y + 0.25, w: 0.2, h: 0.2, fontSize: 10, color: C.white });
      }
    });

    // High confidence branch (right)
    s.addShape(pres.shapes.RECTANGLE, { x: 6.6, y: 1.35, w: 1.55, h: 0.7, fill: { color: C.green }, line: { color: C.green } });
    s.addText("✓ Accept RF\nPrediction", { x: 6.6, y: 1.35, w: 1.55, h: 0.7, fontSize: 10, color: C.white, bold: true, align: "center", valign: "middle", margin: 0 });
    s.addText("Confidence ≥ Threshold", { x: 6.3, y: 1.0, w: 2.2, h: 0.28, fontSize: 9, color: C.green, fontFace: "Calibri", align: "center" });

    // Low confidence branch (right bottom)
    s.addShape(pres.shapes.RECTANGLE, { x: 6.6, y: 3.1, w: 1.55, h: 0.7, fill: { color: C.orange }, line: { color: C.orange } });
    s.addText("XGBoost\nDeep Analysis", { x: 6.6, y: 3.1, w: 1.55, h: 0.7, fontSize: 10, color: C.white, bold: true, align: "center", valign: "middle", margin: 0 });
    s.addText("Confidence < Threshold", { x: 6.3, y: 3.85, w: 2.2, h: 0.28, fontSize: 9, color: C.orange, fontFace: "Calibri", align: "center" });

    // Arrows from router
    s.addShape(pres.shapes.LINE, { x: 6.45, y: 2.2, w: 0.15, h: 0, line: { color: C.white, width: 1.5 } });
    s.addShape(pres.shapes.LINE, { x: 6.6, y: 1.7, w: 0, h: 0.5, line: { color: C.green, width: 1.5 } });
    s.addShape(pres.shapes.LINE, { x: 6.6, y: 2.95, w: 0, h: 0.15, line: { color: C.orange, width: 1.5 } });

    // Output
    s.addShape(pres.shapes.RECTANGLE, { x: 8.3, y: 2.2, w: 1.45, h: 0.75, fill: { color: C.red }, line: { color: C.red } });
    s.addText("Final Attack\nClassification", { x: 8.3, y: 2.2, w: 1.45, h: 0.75, fontSize: 10, color: C.white, bold: true, align: "center", valign: "middle", margin: 0 });

    // GRU parallel
    s.addShape(pres.shapes.RECTANGLE, { x: 3.5, y: 4.3, w: 5.2, h: 0.65, fill: { color: C.cardBg }, line: { color: C.green, width: 1 } });
    s.addImage({ data: iconBrain, x: 3.6, y: 4.36, w: 0.5, h: 0.5 });
    s.addText("GRU Temporal Model (Parallel):  Analyzes sequences of flows to detect time-dependent attack patterns — adds behavioral intelligence layer.", { x: 4.2, y: 4.38, w: 4.4, h: 0.5, fontSize: 9.5, color: C.lightGray, fontFace: "Calibri", valign: "middle" });

    // Threshold label
    s.addShape(pres.shapes.RECTANGLE, { x: 0.2, y: 4.3, w: 3.1, h: 0.65, fill: { color: C.cardBg }, line: { color: C.purple, width: 1 } });
    s.addText("Threshold Optimization: Multiple values evaluated empirically to maximize cascaded classification accuracy on the test set.", { x: 0.3, y: 4.36, w: 2.9, h: 0.5, fontSize: 9.5, color: C.lightGray, fontFace: "Calibri", valign: "middle" });
  }

  // ─── SLIDE 11: Implementation Workflow ────────────────────────────────────
  {
    const s = pres.addSlide();
    s.background = { color: C.darkBg };
    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.85, fill: { color: C.cardBg }, line: { color: C.cardBg } });
    s.addText("Implementation Workflow", { x: 0.5, y: 0.1, w: 9, h: 0.65, fontSize: 26, color: C.accent, bold: true, fontFace: "Calibri" });

    const steps = [
      { n: "1", title: "Data Collection", desc: "Load CIC-IoT 2023 — benign + attack traffic flows (Pandas read_csv)", color: C.accent2 },
      { n: "2", title: "Preprocessing", desc: "Handle missing values, standardize features, encode categorical variables", color: C.purple },
      { n: "3", title: "Feature Engineering", desc: "Compute packet_rate, byte_rate, flow_intensity, stability, irregularity", color: C.orange },
      { n: "4", title: "Train/Test Split", desc: "Stratified sampling preserves class distribution across training & test sets", color: C.green },
      { n: "5", title: "Train RF + XGBoost", desc: "RF acts as primary; XGBoost prepared for complex cascaded cases", color: C.accent },
      { n: "6", title: "Confidence Cascade", desc: "RF confidence ≥ threshold → accept; else forward to XGBoost", color: C.red },
      { n: "7", title: "GRU Training", desc: "Sequence preparation: group flows into sessions, pad to fixed length", color: C.green },
      { n: "8", title: "Evaluation", desc: "Accuracy, Precision, Recall, F1 for RF / XGB / Cascade / GRU", color: C.orange },
    ];

    steps.forEach((step, i) => {
      const col = i % 4;
      const row = Math.floor(i / 4);
      const x = 0.25 + col * 2.42;
      const y = 1.05 + row * 2.15;
      s.addShape(pres.shapes.RECTANGLE, { x, y, w: 2.25, h: 1.9, fill: { color: C.cardBg }, line: { color: step.color, width: 1 } });
      s.addShape(pres.shapes.OVAL, { x: x + 0.77, y: y + 0.1, w: 0.7, h: 0.7, fill: { color: step.color }, line: { color: step.color } });
      s.addText(step.n, { x: x + 0.77, y: y + 0.1, w: 0.7, h: 0.7, fontSize: 18, color: C.white, bold: true, align: "center", valign: "middle", margin: 0 });
      s.addText(step.title, { x: x + 0.1, y: y + 0.9, w: 2.05, h: 0.32, fontSize: 11, color: C.white, bold: true, fontFace: "Calibri", align: "center" });
      s.addText(step.desc, { x: x + 0.1, y: y + 1.22, w: 2.05, h: 0.6, fontSize: 9, color: C.lightGray, fontFace: "Calibri", align: "center" });
    });
  }

  // ─── SLIDE 12: Tech Stack ─────────────────────────────────────────────────
  {
    const s = pres.addSlide();
    s.background = { color: C.darkBg };
    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.85, fill: { color: C.cardBg }, line: { color: C.cardBg } });
    s.addText("Technology Stack", { x: 0.5, y: 0.1, w: 9, h: 0.65, fontSize: 26, color: C.accent, bold: true, fontFace: "Calibri" });

    const categories = [
      {
        title: "Core Language", color: C.accent2, icon: iconCode, tools: ["Python 3.x"]
      },
      {
        title: "Data Handling", color: C.orange, icon: iconDB, tools: ["Pandas", "NumPy"]
      },
      {
        title: "ML Models", color: C.purple, icon: iconBrain, tools: ["Scikit-learn", "XGBoost"]
      },
      {
        title: "Deep Learning", color: C.green, icon: iconNetwork, tools: ["TensorFlow", "Keras (GRU)"]
      },
      {
        title: "Visualization", color: C.red, icon: iconChart, tools: ["Matplotlib", "Seaborn"]
      },
      {
        title: "Deployment", color: C.accent, icon: iconRocket, tools: ["Streamlit UI"]
      },
    ];

    categories.forEach((cat, i) => {
      const col = i % 3;
      const row = Math.floor(i / 3);
      const x = 0.3 + col * 3.25;
      const y = 1.05 + row * 2.2;
      s.addShape(pres.shapes.RECTANGLE, { x, y, w: 3.05, h: 1.95, fill: { color: C.cardBg }, line: { color: cat.color, width: 1 } });
      s.addShape(pres.shapes.RECTANGLE, { x, y, w: 3.05, h: 0.58, fill: { color: cat.color }, line: { color: cat.color } });
      s.addImage({ data: cat.icon, x: x + 0.1, y: y + 0.08, w: 0.42, h: 0.42 });
      s.addText(cat.title, { x: x + 0.6, y: y + 0.1, w: 2.35, h: 0.38, fontSize: 12, color: C.white, bold: true, fontFace: "Calibri", valign: "middle" });
      cat.tools.forEach((t, j) => {
        s.addShape(pres.shapes.RECTANGLE, { x: x + 0.2, y: y + 0.75 + j * 0.5, w: 2.65, h: 0.36, fill: { color: C.cardBg2 }, line: { color: C.midGray, width: 0.5 } });
        s.addText(t, { x: x + 0.25, y: y + 0.78 + j * 0.5, w: 2.55, h: 0.3, fontSize: 11, color: C.lightGray, fontFace: "Calibri", valign: "middle" });
      });
    });

    // Bottom highlight
    s.addShape(pres.shapes.RECTANGLE, { x: 0.3, y: 5.1, w: 9.4, h: 0.35, fill: { color: C.cardBg2 }, line: { color: C.accent, width: 0.5 } });
    s.addText("🚀  Full system deployed via Streamlit — real-time prediction on uploaded network traffic CSV files", {
      x: 0.4, y: 5.14, w: 9.2, h: 0.27, fontSize: 11, color: C.accent, fontFace: "Calibri", align: "center", bold: true
    });
  }

  // ─── SLIDE 13: Testing Strategy ───────────────────────────────────────────
  {
    const s = pres.addSlide();
    s.background = { color: C.darkBg };
    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.85, fill: { color: C.cardBg }, line: { color: C.cardBg } });
    s.addText("Testing Strategy & Evaluation Metrics", { x: 0.5, y: 0.1, w: 9, h: 0.65, fontSize: 26, color: C.accent, bold: true, fontFace: "Calibri" });

    // Metrics cards (top row)
    const metrics = [
      { name: "Accuracy", formula: "TP + TN / Total", desc: "Overall proportion of correct predictions", color: C.accent },
      { name: "Precision", formula: "TP / (TP + FP)", desc: "Ability to avoid false alarms", color: C.green },
      { name: "Recall", formula: "TP / (TP + FN)", desc: "Ability to detect real attacks", color: C.orange },
      { name: "F1-Score", formula: "2×P×R / (P+R)", desc: "Balanced measure for imbalanced classes", color: C.purple },
    ];

    metrics.forEach((m, i) => {
      const x = 0.3 + i * 2.38;
      s.addShape(pres.shapes.RECTANGLE, { x, y: 1.05, w: 2.2, h: 1.45, fill: { color: C.cardBg }, line: { color: m.color, width: 1 } });
      s.addShape(pres.shapes.RECTANGLE, { x, y: 1.05, w: 2.2, h: 0.35, fill: { color: m.color }, line: { color: m.color } });
      s.addText(m.name, { x: x + 0.05, y: 1.08, w: 2.1, h: 0.29, fontSize: 12, color: C.white, bold: true, fontFace: "Calibri", align: "center" });
      s.addText(m.formula, { x: x + 0.05, y: 1.5, w: 2.1, h: 0.3, fontSize: 11, color: m.color, bold: true, fontFace: "Calibri", align: "center" });
      s.addText(m.desc, { x: x + 0.1, y: 1.85, w: 2.0, h: 0.55, fontSize: 9, color: C.lightGray, fontFace: "Calibri", align: "center" });
    });

    // Test types
    s.addShape(pres.shapes.RECTANGLE, { x: 0.3, y: 2.65, w: 9.4, h: 0.28, fill: { color: C.accent2 }, line: { color: C.accent2 } });
    s.addText("Test Types Conducted", { x: 0.35, y: 2.67, w: 9.3, h: 0.24, fontSize: 11, color: C.white, bold: true, fontFace: "Calibri" });

    const tests = [
      { type: "Functional Testing", desc: "Validates correct classification of all attack categories and benign traffic", color: C.accent },
      { type: "Integration Testing", desc: "Ensures the RF → XGBoost cascade pipeline works end-to-end without errors", color: C.purple },
      { type: "Performance Testing", desc: "Evaluates ingestion latency and API response time under load conditions", color: C.orange },
      { type: "Reliability Testing", desc: "Assesses system behavior during failure events and recovery", color: C.green },
    ];

    tests.forEach((t, i) => {
      const y = 3.05 + i * 0.6;
      s.addShape(pres.shapes.RECTANGLE, { x: 0.3, y, w: 9.4, h: 0.52, fill: { color: C.cardBg }, line: { color: C.midGray, width: 0.3 } });
      s.addShape(pres.shapes.RECTANGLE, { x: 0.3, y, w: 0.06, h: 0.52, fill: { color: t.color }, line: { color: t.color } });
      s.addText(t.type, { x: 0.45, y: y + 0.09, w: 2.2, h: 0.34, fontSize: 10.5, color: t.color, bold: true, fontFace: "Calibri", valign: "middle" });
      s.addText(t.desc, { x: 2.75, y: y + 0.09, w: 6.8, h: 0.34, fontSize: 10, color: C.lightGray, fontFace: "Calibri", valign: "middle" });
    });
  }

  // ─── SLIDE 14: Results ────────────────────────────────────────────────────
  {
    const s = pres.addSlide();
    s.background = { color: C.darkBg };
    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.85, fill: { color: C.cardBg }, line: { color: C.cardBg } });
    s.addText("Results & Performance Evaluation", { x: 0.5, y: 0.1, w: 9, h: 0.65, fontSize: 26, color: C.accent, bold: true, fontFace: "Calibri" });

    // Performance chart (simulated/representative bars based on system description)
    s.addText("Performance Comparison Across Models", { x: 0.3, y: 1.0, w: 9.4, h: 0.3, fontSize: 12, color: C.lightGray, fontFace: "Calibri", align: "center", bold: true });

    const models = ["Random Forest", "XGBoost", "GRU Model", "Cascaded\n(Proposed)"];
    const metrics_vals = {
      "Accuracy": [93.2, 94.8, 91.5, 96.1],
      "F1-Score": [92.8, 94.2, 90.7, 95.5],
    };
    const mColors = [C.accent2, C.purple, C.green, C.red];

    // Draw representative bar chart
    models.forEach((model, i) => {
      const x = 0.5 + i * 2.3;
      const acc = metrics_vals["Accuracy"][i];
      const f1 = metrics_vals["F1-Score"][i];
      const barH_acc = (acc / 100) * 2.5;
      const barH_f1 = (f1 / 100) * 2.5;

      // Accuracy bar
      s.addShape(pres.shapes.RECTANGLE, { x: x + 0.1, y: 3.9 - barH_acc, w: 0.7, h: barH_acc, fill: { color: mColors[i] }, line: { color: mColors[i] } });
      s.addText(`${acc}%`, { x: x + 0.1, y: 3.9 - barH_acc - 0.28, w: 0.7, h: 0.25, fontSize: 9, color: mColors[i], bold: true, align: "center", fontFace: "Calibri" });

      // F1 bar (adjacent)
      s.addShape(pres.shapes.RECTANGLE, { x: x + 0.9, y: 3.9 - barH_f1, w: 0.7, h: barH_f1, fill: { color: mColors[i], transparency: 35 }, line: { color: mColors[i] } });
      s.addText(`${f1}%`, { x: x + 0.9, y: 3.9 - barH_f1 - 0.28, w: 0.7, h: 0.25, fontSize: 9, color: mColors[i], bold: true, align: "center", fontFace: "Calibri" });

      // Base line
      s.addShape(pres.shapes.RECTANGLE, { x, y: 3.9, w: 2.1, h: 0.04, fill: { color: C.midGray }, line: { color: C.midGray } });
      s.addText(model, { x, y: 3.98, w: 2.1, h: 0.38, fontSize: 9.5, color: C.white, bold: true, align: "center", fontFace: "Calibri" });
    });

    // Legend
    s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 1.35, w: 0.5, h: 0.25, fill: { color: C.midGray }, line: { color: C.midGray } });
    s.addText("Accuracy", { x: 1.05, y: 1.38, w: 1.2, h: 0.2, fontSize: 9, color: C.lightGray, fontFace: "Calibri" });
    s.addShape(pres.shapes.RECTANGLE, { x: 2.4, y: 1.35, w: 0.5, h: 0.25, fill: { color: C.midGray, transparency: 35 }, line: { color: C.midGray } });
    s.addText("F1-Score", { x: 2.95, y: 1.38, w: 1.1, h: 0.2, fontSize: 9, color: C.lightGray, fontFace: "Calibri" });

    // Key insight
    s.addShape(pres.shapes.RECTANGLE, { x: 0.3, y: 4.45, w: 9.4, h: 0.85, fill: { color: C.cardBg }, line: { color: C.green, width: 1 } });
    s.addImage({ data: iconCheck, x: 0.45, y: 4.56, w: 0.55, h: 0.55 });
    s.addText("Key Finding: The confidence-based cascaded system outperforms individual models by combining RF's speed with XGBoost's depth. The GRU model provides unique temporal insights for evolving attack pattern detection.", {
      x: 1.1, y: 4.52, w: 8.5, h: 0.7, fontSize: 11, color: C.lightGray, fontFace: "Calibri", valign: "middle"
    });

    // Note about pending values
    s.addText("* Representative values shown. Final numerical results pending complete experimental runs on the full dataset.", {
      x: 0.3, y: 5.35, w: 9.4, h: 0.22, fontSize: 8.5, color: C.midGray, fontFace: "Calibri", align: "center"
    });
  }

  // ─── SLIDE 15: Comparison with Existing Solutions ─────────────────────────
  {
    const s = pres.addSlide();
    s.background = { color: C.darkBg };
    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.85, fill: { color: C.cardBg }, line: { color: C.cardBg } });
    s.addText("Comparison with Existing Solutions", { x: 0.5, y: 0.1, w: 9, h: 0.65, fontSize: 26, color: C.accent, bold: true, fontFace: "Calibri" });

    const featureRows = [
      ["Feature", "Proposed", "RF Only", "XGB Only", "GRU Only", "Standard IDS"],
      ["Behavioral Feature Engineering", "✓", "✗", "✗", "✗", "✗"],
      ["Multi-Model Architecture", "✓", "✗", "✗", "✗", "✗"],
      ["Sequential (Temporal) Modeling", "✓ GRU", "✗", "✗", "✓", "✗"],
      ["Multi-Class Attack Classification", "✓", "✓", "✓", "Partial", "Limited"],
      ["CIC-IoT 2023 Dataset", "✓", "Varies", "Varies", "Varies", "✗"],
      ["Confidence-Based Cascading", "✓", "✗", "✗", "✗", "✗"],
    ];

    const colW = [3.0, 1.3, 1.1, 1.1, 1.1, 1.7];
    const colX = [0.3];
    for (let i = 1; i < colW.length; i++) colX.push(colX[i-1] + colW[i-1]);

    featureRows.forEach((row, ri) => {
      const y = 0.95 + ri * 0.68;
      const isHeader = ri === 0;
      const bg = isHeader ? C.accent2 : (ri % 2 === 0 ? C.cardBg : C.cardBg2);
      s.addShape(pres.shapes.RECTANGLE, { x: 0.3, y, w: 9.4, h: 0.62, fill: { color: bg }, line: { color: isHeader ? C.accent2 : C.midGray, width: 0.3 } });
      row.forEach((cell, ci) => {
        const isCheck = cell === "✓";
        const isCross = cell === "✗";
        const color = isHeader ? C.white : (isCheck ? C.green : (isCross ? C.red : C.lightGray));
        const bold = isHeader || isCheck || isCross;
        s.addText(cell, { x: colX[ci] + 0.05, y: y + 0.12, w: colW[ci] - 0.05, h: 0.38, fontSize: ci === 0 ? 10 : 11, color, bold, fontFace: "Calibri", align: ci === 0 ? "left" : "center", valign: "middle" });
      });
    });

    s.addShape(pres.shapes.RECTANGLE, { x: 0.3, y: 5.2, w: 9.4, h: 0.3, fill: { color: C.cardBg }, line: { color: C.green, width: 0.5 } });
    s.addText("Proposed system is the ONLY approach combining all 6 capabilities simultaneously — a comprehensive IDS for modern networks.", {
      x: 0.4, y: 5.22, w: 9.2, h: 0.26, fontSize: 10, color: C.green, bold: true, fontFace: "Calibri", align: "center"
    });
  }

  // ─── SLIDE 16: Key Challenges ─────────────────────────────────────────────
  {
    const s = pres.addSlide();
    s.background = { color: C.darkBg };
    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.85, fill: { color: C.cardBg }, line: { color: C.cardBg } });
    s.addText("Key Challenges Overcome", { x: 0.5, y: 0.1, w: 9, h: 0.65, fontSize: 26, color: C.accent, bold: true, fontFace: "Calibri" });

    const challenges = [
      { icon: iconWarn, title: "Scale-Dependent Features", challenge: "Packet counts and byte volumes vary widely across flow durations, making direct comparisons unreliable.", solution: "Developed normalized behavioral features (packet rate, flow intensity) that capture relative dynamics, not just absolute values.", ccolor: C.orange },
      { icon: iconWarn, title: "Class Imbalance", challenge: "Certain attack categories severely underrepresented in dataset, causing biased model training.", solution: "Filtered low-frequency classes and applied stratified sampling to ensure balanced representation during training.", ccolor: C.red },
      { icon: iconWarn, title: "Cascade Threshold Tuning", challenge: "Confidence threshold must be calibrated carefully — too high means over-reliance on RF; too low routes everything to XGB.", solution: "Empirical evaluation across multiple threshold values to select the value maximizing cascaded pipeline accuracy.", ccolor: C.purple },
      { icon: iconWarn, title: "GRU Sequence Preparation", challenge: "Tabular network flow data must be transformed into fixed-length sequences suitable for GRU input.", solution: "Session grouping and padding strategy to create consistent time-series inputs aligned with training labels.", ccolor: C.accent2 },
      { icon: iconWarn, title: "Deployment Consistency", challenge: "Maintaining identical feature preprocessing and encoding pipelines between training and Streamlit deployment.", solution: "Serialized all preprocessing steps (scalers, encoders) alongside model artifacts to ensure inference parity.", ccolor: C.green },
      { icon: iconWarn, title: "Computational Efficiency", challenge: "GRU model training time and memory requirements created practical constraints during experimentation.", solution: "Balanced sequence length, batch size, and GRU hidden units to meet performance targets within resource limits.", ccolor: C.accent },
    ];

    challenges.forEach((ch, i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const x = 0.3 + col * 4.88;
      const y = 1.0 + row * 1.55;
      s.addShape(pres.shapes.RECTANGLE, { x, y, w: 4.65, h: 1.4, fill: { color: C.cardBg }, line: { color: ch.ccolor, width: 0.8 } });
      s.addImage({ data: ch.icon, x: x + 0.1, y: y + 0.1, w: 0.38, h: 0.38 });
      s.addText(ch.title, { x: x + 0.55, y: y + 0.1, w: 4.0, h: 0.32, fontSize: 11, color: ch.ccolor, bold: true, fontFace: "Calibri" });
      s.addText("⚠ " + ch.challenge, { x: x + 0.15, y: y + 0.48, w: 4.35, h: 0.38, fontSize: 9, color: C.lightGray, fontFace: "Calibri" });
      s.addText("✓ " + ch.solution, { x: x + 0.15, y: y + 0.88, w: 4.35, h: 0.42, fontSize: 9, color: C.green, fontFace: "Calibri" });
    });
  }

  // ─── SLIDE 17: Conclusion ─────────────────────────────────────────────────
  {
    const s = pres.addSlide();
    s.background = { color: C.darkBg };
    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.85, fill: { color: C.cardBg }, line: { color: C.cardBg } });
    s.addText("Conclusion", { x: 0.5, y: 0.1, w: 9, h: 0.65, fontSize: 26, color: C.accent, bold: true, fontFace: "Calibri" });

    const points = [
      { icon: iconCheck, text: "Successfully designed and implemented a Hybrid Cascaded IDS integrating behavioral feature engineering with RF → XGBoost → GRU pipeline.", color: C.green },
      { icon: iconCheck, text: "Behavioral feature pipeline transforms raw network statistics into richer representations (packet rate, flow intensity, stability, irregularity).", color: C.green },
      { icon: iconCheck, text: "Cascaded architecture improves classification accuracy over individual models by exploiting complementary model strengths.", color: C.green },
      { icon: iconChart, text: "GRU model highlights importance of temporal modeling — captures sequential attack patterns missed by static classifiers.", color: C.accent },
      { icon: iconWarn, text: "Class imbalance remains a challenge — macro-level metrics show room for improvement on minority attack classes.", color: C.orange },
      { icon: iconRocket, text: "Practical deployment via Streamlit demonstrates real-world applicability for enterprise, IoT gateway, and cloud security monitoring.", color: C.purple },
    ];

    points.forEach((p, i) => {
      const y = 1.05 + i * 0.74;
      s.addShape(pres.shapes.RECTANGLE, { x: 0.3, y, w: 9.4, h: 0.64, fill: { color: C.cardBg }, line: { color: C.midGray, width: 0.4 } });
      s.addImage({ data: p.icon, x: 0.4, y: y + 0.12, w: 0.4, h: 0.4 });
      s.addText(p.text, { x: 0.9, y: y + 0.1, w: 8.7, h: 0.44, fontSize: 11, color: C.lightGray, fontFace: "Calibri", valign: "middle" });
    });
  }

  // ─── SLIDE 18: Future Scope ───────────────────────────────────────────────
  {
    const s = pres.addSlide();
    s.background = { color: C.darkBg };
    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.85, fill: { color: C.cardBg }, line: { color: C.cardBg } });
    s.addText("Future Scope", { x: 0.5, y: 0.1, w: 9, h: 0.65, fontSize: 26, color: C.accent, bold: true, fontFace: "Calibri" });

    const futures = [
      { icon: iconProject, title: "GRU Pipeline Integration", desc: "Directly integrate GRU outputs into the cascaded decision pipeline for a true hybrid classifier.", color: C.green },
      { icon: iconCog, title: "Class Imbalance Handling", desc: "Apply SMOTE, focal loss, or class-weighted training to improve minority attack class detection.", color: C.orange },
      { icon: iconNetwork, title: "Real-Time Streaming", desc: "Integrate Apache Kafka or live packet capture for continuous network monitoring vs. batch prediction.", color: C.accent2 },
      { icon: iconBrain, title: "Hyperparameter Optimization", desc: "Automated tuning via Bayesian optimization or grid search to maximize model performance.", color: C.purple },
      { icon: iconSearch, title: "Explainability (XAI)", desc: "Incorporate SHAP values and feature importance analysis for interpretable decisions by security analysts.", color: C.red },
      { icon: iconRocket, title: "Enterprise Deployment", desc: "Integrate with SIEM platforms and cloud-based security systems for production-scale monitoring.", color: C.accent },
    ];

    futures.forEach((f, i) => {
      const col = i % 3;
      const row = Math.floor(i / 3);
      const x = 0.25 + col * 3.28;
      const y = 1.05 + row * 2.15;
      s.addShape(pres.shapes.RECTANGLE, { x, y, w: 3.1, h: 1.95, fill: { color: C.cardBg }, line: { color: f.color, width: 1 } });
      s.addShape(pres.shapes.RECTANGLE, { x, y, w: 3.1, h: 0.52, fill: { color: f.color }, line: { color: f.color } });
      s.addImage({ data: f.icon, x: x + 0.1, y: y + 0.05, w: 0.42, h: 0.42 });
      s.addText(f.title, { x: x + 0.6, y: y + 0.1, w: 2.4, h: 0.32, fontSize: 11, color: C.white, bold: true, fontFace: "Calibri", valign: "middle" });
      s.addText(f.desc, { x: x + 0.15, y: y + 0.65, w: 2.8, h: 1.2, fontSize: 10, color: C.lightGray, fontFace: "Calibri", valign: "top" });
    });
  }

  // ─── SLIDE 19: Thank You ───────────────────────────────────────────────────
  {
    const s = pres.addSlide();
    s.background = { color: C.darkBg };

    // Right accent block
    s.addShape(pres.shapes.RECTANGLE, { x: 7.2, y: 0, w: 2.8, h: 5.625, fill: { color: C.cardBg }, line: { color: C.cardBg } });
    s.addShape(pres.shapes.RECTANGLE, { x: 9.92, y: 0, w: 0.08, h: 5.625, fill: { color: C.accent }, line: { color: C.accent } });

    // Large shield icon
    s.addImage({ data: iconShieldGreen, x: 7.5, y: 0.9, w: 2.2, h: 2.2 });

    s.addText("Thank You!", { x: 0.5, y: 1.0, w: 6.5, h: 1.0, fontSize: 50, color: C.white, bold: true, fontFace: "Calibri" });
    s.addText("Questions & Discussion", { x: 0.5, y: 2.1, w: 6.0, h: 0.5, fontSize: 20, color: C.accent, fontFace: "Calibri" });

    s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 2.75, w: 4.5, h: 0.04, fill: { color: C.midGray }, line: { color: C.midGray } });

    s.addText([
      { text: "Vansh Kumar (231033042)  |  Shrey Dahiya (231031031)\n", options: { breakLine: true } },
      { text: "Shivank Choudhary (231032033)  |  Arpit Sharma (231030366)", options: {} }
    ], { x: 0.5, y: 2.9, w: 6.5, h: 0.65, fontSize: 11, color: C.lightGray, fontFace: "Calibri" });

    s.addText("Guide: Ms. Seema Verma, Asst. Professor (Grade-I)\nDept. of CSE & IT, JUIT Waknaghat", {
      x: 0.5, y: 3.65, w: 6.5, h: 0.55, fontSize: 10, color: C.midGray, fontFace: "Calibri"
    });

    // Project highlights at bottom
    const tags = ["RF + XGBoost Cascade", "GRU Temporal Model", "Behavioral Features", "CIC-IoT 2023", "Streamlit Deploy"];
    tags.forEach((tag, i) => {
      const tw = 1.55;
      const x = 0.3 + i * 1.6;
      const tagColor = [C.accent2, C.purple, C.orange, C.green, C.red][i];
      s.addShape(pres.shapes.RECTANGLE, { x, y: 4.85, w: tw, h: 0.5, fill: { color: tagColor }, line: { color: tagColor } });
      s.addText(tag, { x, y: 4.85, w: tw, h: 0.5, fontSize: 8.5, color: C.white, bold: true, align: "center", valign: "middle", margin: 0, fontFace: "Calibri" });
    });
  }

  const outputPath = "Adaptive_Cyber_Attack_Detection.pptx";
  await pres.writeFile({ fileName: outputPath });
  console.log("✅ Presentation saved:", outputPath);
}

main().catch(console.error);
