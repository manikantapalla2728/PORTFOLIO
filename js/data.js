/* ============================================================================
   PORTFOLIO DATA — Manikanta Palla
   Source of truth: existing portfolio files + public GitHub profile.
   No invented jobs, metrics, datasets, or certifications.
   ========================================================================== */

const PORTFOLIO = {
  name: "Manikanta Palla",
  firstName: "Manikanta",
  lastName: "Palla",
  initials: "MP",
  domain: "manikanta.data",
  roles: ["Data Analyst", "Machine Learning Engineer"],
  heroKicker: "DATA ANALYTICS · MACHINE LEARNING",
  heroHeadline: "I build the path from raw data to working systems.",
  heroDescription:
    "B.Tech CSE (AI & ML) student. I work across analytics, classical machine learning, computer vision and lightweight deployment — keeping the route from dataset to decision visible and testable.",
  location: "Amalapuram, Andhra Pradesh, India",
  timezone: "IST (UTC +5:30)",
  email: "pallamanikanta2728@gmail.com",
  github: "https://github.com/manikantapalla2728",
  linkedin: "https://in.linkedin.com/in/manikanta-palla",
  resumeUrl: "https://drive.google.com/file/d/1QtJe7N7etur243JpUCBySAsnYvSKcUpa/view?usp=sharing",

  heroPortraits: [
    {
      id: "neural",
      title: "NEURAL RESEARCH",
      sub: "Computer Vision · CNNs · Deep Learning",
      src: "assets/manikanta-neural.jpg",
      alt: "Manikanta Palla — Neural Research & Computer Vision"
    },
    {
      id: "analytics",
      title: "DATA OPERATIONS & BI",
      sub: "SQL Pipelines · Feature Engineering · Analytics",
      src: "assets/manikanta-analytics.jpg",
      alt: "Manikanta Palla — Data Operations & BI"
    }
  ],
  aboutPortrait: {
    src: "assets/manikanta-studio.jpg",
    alt: "Manikanta Palla — Executive Portrait",
    caption: "Manikanta Palla",
    role: "B.Tech CSE (AI & ML) · Data & ML Systems"
  },

  about: {
    lead:
      "I am Manikanta Palla, a B.Tech Computer Science student specializing in Artificial Intelligence and Machine Learning. I care about building practical systems, not just notebooks.",
    sub:
      "My work spans classical ML, computer vision, exploratory analysis and application layers (Streamlit, FastAPI). I am training toward roles in data analytics, machine learning and ML engineering.",
    facts: [
      { label: "Education", value: "B.Tech CSE (AI & ML)" },
      { label: "Location", value: "Amalapuram, Andhra Pradesh, India" },
      { label: "Focus", value: "Data, ML, computer vision, problem solving" },
      { label: "Direction", value: "Data Analytics → Machine Learning → Data Science / ML Engineering" },
    ],
  },

  skills: [
    {
      category: "Programming",
      accent: "cyan",
      blurb: "Languages I ship with.",
      items: ["Python", "Java", "C", "SQL"],
    },
    {
      category: "Data & Analytics",
      accent: "teal",
      blurb: "From tables to insight.",
      items: ["Pandas", "NumPy", "Excel", "Power BI", "Matplotlib", "Seaborn"],
    },
    {
      category: "Machine Learning",
      accent: "cyan",
      blurb: "Models I actually train.",
      items: ["Scikit-learn", "XGBoost", "TensorFlow", "Keras", "OpenCV", "Feature Engineering"],
    },
    {
      category: "Databases",
      accent: "teal",
      blurb: "Structured and document stores.",
      items: ["MySQL", "MongoDB", "PostgreSQL"],
    },
    {
      category: "Engineering & Tools",
      accent: "cyan",
      blurb: "Getting work out of the notebook.",
      items: ["Git", "GitHub", "VS Code", "Streamlit", "FastAPI", "Docker", "HTML/CSS"],
    },
  ],

  projects: [
    {
      id: "fraud",
      no: "01",
      title: "Fraud Intelligence System",
      tag: "Supervised ML · Risk Scoring",
      year: "2023+",
      category: ["ml", "data"],
      oneLiner:
        "Fraud-detection pipeline using XGBoost and data engineering, with a Streamlit interface for reviewing flagged patterns.",
      problem:
        "Fraud signals sit inside noisy transactional behaviour. The goal was a practical scoring system that surfaces anomalous patterns for a reviewer, rather than a black-box accuracy score.",
      dataset:
        "Transactional / behavioural features prepared for supervised classification. A specific public dataset name was not recorded in the original portfolio files.",
      preprocessing:
        "Cleaning, feature construction and model-ready tables so the classifier sees structured risk signals instead of raw dumps.",
      approach:
        "Gradient-boosted trees (XGBoost) on engineered features, with an interactive Streamlit layer so security or ops users can inspect flagged cases.",
      model: "XGBoost classifier, selected as the primary model for tabular fraud scoring.",
      evaluation:
        "Standard classification evaluation against a held-out split. Numeric ROC/PR figures were not published in the source portfolio, so they are not shown here.",
      results: [
        "End-to-end flow: data prep → XGBoost scoring → Streamlit review UI.",
        "Designed to highlight anomalous patterns for human follow-up.",
        "Stack chosen for tabular performance and a lightweight deployment path.",
      ],
      role: "Built the modeling and dashboard path end-to-end as a student project.",
      tech: ["Python", "XGBoost", "Pandas", "Scikit-learn", "Streamlit"],
      signals: [
        { label: "Family", value: "Classification" },
        { label: "Model", value: "XGBoost" },
        { label: "Interface", value: "Streamlit" },
      ],
      visual: {
        type: "scatter",
        title: "Abstract risk clusters — decorative illustration, not a trained embedding",
        clusters: [
          { n: 88, cx: 86, cy: 78, r: 44, color: "cyan" },
          { n: 20, cx: 220, cy: 148, r: 24, color: "amber" },
        ],
        legend: [
          { color: "cyan", label: "typical" },
          { color: "amber", label: "flagged" },
        ],
      },
      github: "https://github.com/manikantapalla2728/Fraud-Detection-System",
      live: "",
      featured: true,
    },
    {
      id: "churn",
      no: "02",
      title: "Customer Churn Prediction",
      tag: "Classification · Analytics",
      year: "2023+",
      category: ["ml", "data"],
      oneLiner:
        "Predictive pipeline to identify customers at higher risk of leaving, using cleaning, feature engineering and multiple classifiers.",
      problem:
        "Retention teams need an early read on who is likely to leave. The project frames churn as a classification problem with an analytics layer on top of the model.",
      dataset:
        "Customer behaviour and account-style features for classification. A named public dataset was not listed in the source files.",
      preprocessing:
        "Data cleaning and feature engineering before training, so model input reflects behaviour rather than raw exports.",
      approach:
        "Compared classification algorithms after a shared prep pipeline, then packaged the result as an analysis-ready churn view.",
      model: "Supervised classifiers (classical ML), with comparison across algorithms rather than a single untested model.",
      evaluation:
        "Standard classification metrics on a validation split. Published numeric scores were not included in the original portfolio.",
      results: [
        "Full path from messy customer tables to a churn-risk model.",
        "Emphasis on cleaning and feature work before fitting.",
        "Intended as input to retention thinking, not as a production SLA.",
      ],
      role: "Designed the prep, modeling and comparison workflow.",
      tech: ["Python", "Pandas", "Scikit-learn", "Classification"],
      signals: [
        { label: "Family", value: "Classification" },
        { label: "Work", value: "Feature eng." },
        { label: "Use", value: "Retention" },
      ],
      visual: {
        type: "pipeline",
        title: "Modeling path used in this project",
        stages: ["Raw data", "Clean", "Features", "Classifiers", "Risk view"],
      },
      github: "https://github.com/manikantapalla2728/CustomerChurnPrediction",
      live: "",
      featured: true,
    },
    {
      id: "attendance",
      no: "03",
      title: "Smart Attendance System",
      tag: "Computer Vision · Recognition",
      year: "2024",
      category: ["cv"],
      oneLiner:
        "Attendance tracking with OpenCV and face recognition, writing detections into a backend database for reporting.",
      problem:
        "Manual attendance is slow and easy to spoof. The goal was a camera-side system that detects known faces and logs presence automatically.",
      dataset:
        "Enrolled face images for the people being recognised, captured and stored locally for the system.",
      preprocessing:
        "Face detection, alignment and embedding/recognition prep with OpenCV before matching against enrolled identities.",
      approach:
        "Computer-vision pipeline: detect faces in frame, recognise against the enrolled set, persist attendance records to a database.",
      model: "Deep-learning face recognition stack with OpenCV as the vision layer.",
      evaluation:
        "Validated in live camera use for detection and registration. Formal published accuracy tables were not included in the source files.",
      results: [
        "Real-time detection and registration of enrolled individuals.",
        "Database-backed log for reporting, not only an on-screen overlay.",
        "Public code: faceattend and Smart-class-attandance on GitHub.",
      ],
      role: "Built the vision pipeline and attendance logging path.",
      tech: ["Python", "OpenCV", "Computer Vision", "Face Recognition"],
      signals: [
        { label: "Domain", value: "Vision" },
        { label: "Core", value: "OpenCV" },
        { label: "Output", value: "DB log" },
      ],
      visual: {
        type: "network",
        title: "Abstract identity graph — decorative, not a trained network",
        seed: 11,
        nodes: 22,
      },
      github: "https://github.com/manikantapalla2728/faceattend",
      githubAlt: "https://github.com/manikantapalla2728/Smart-class-attandance",
      live: "",
      featured: true,
    },
    {
      id: "facial-expression",
      no: "04",
      title: "Facial Expression Prediction",
      tag: "Computer Vision · CNN · Deep Learning",
      year: "2024+",
      category: ["cv", "ml"],
      oneLiner:
        "Deep learning computer vision pipeline using CNNs and OpenCV to detect faces and classify facial emotion expressions in real time.",
      problem:
        "Human emotion recognition from unconstrained facial expressions suffers from lighting variations, head pose, and subtle micro-expressions. The objective was a robust deep-learning classifier that detects faces and accurately predicts emotion categories in real time.",
      dataset:
        "Facial expression image dataset (grayscale face crops categorized across primary human emotion states: Happy, Sad, Angry, Surprised, Neutral, Fear).",
      preprocessing:
        "Face localization with OpenCV Haar/DNN cascaded detection, grayscale normalization, 48x48 tensor resizing, pixel intensity scaling (0-1), and data augmentation (rotations, horizontal flips).",
      approach:
        "Trained a multi-layer Convolutional Neural Network (CNN) with Conv2D, Batch Normalization, MaxPooling, Dropout for regularization, and Softmax output layer for multi-class emotion probability scoring.",
      model: "Custom Deep Convolutional Neural Network (CNN) built in TensorFlow / Keras with OpenCV integration for camera-stream inference.",
      evaluation:
        "Evaluated with categorical cross-entropy loss, multiclass confusion matrix, accuracy across emotion splits, and real-time frame inference benchmarking.",
      results: [
        "End-to-end vision pipeline: camera stream → face detection → CNN inference → real-time emotion overlay.",
        "Softmax probability output providing confidence scores across all target emotion categories.",
        "Public repository: Facial-Recognition-Prediction on GitHub.",
      ],
      role: "Solo project: dataset preparation, CNN model design, hyperparameter training, and OpenCV real-time inference loop.",
      tech: ["Python", "TensorFlow", "Keras", "OpenCV", "CNN", "Computer Vision"],
      signals: [
        { label: "Domain", value: "Vision / DL" },
        { label: "Model", value: "CNN" },
        { label: "Inference", value: "Real-Time" },
      ],
      visual: {
        type: "emotion",
        title: "Facial Expression Softmax Confidence & CNN Training Accuracy Curve",
      },
      github: "https://github.com/manikantapalla2728/Facial-Recognition-Prediction",
      live: "",
      featured: true,
    },
    {
      id: "netflix",
      no: "05",
      title: "Netflix Data Analysis",
      tag: "EDA · Analytics",
      year: "2024+",
      category: ["data"],
      oneLiner:
        "Exploratory analysis of Netflix’s catalog to surface genre, strategy and distribution patterns, with Python visualisations.",
      problem:
        "A raw catalog dump does not explain content strategy. The work was to turn titles into readable trends: genres, mix and geographic spread.",
      dataset:
        "Netflix catalog-style data used for EDA (titles, genres, distribution fields). Row counts were not published in the source portfolio.",
      preprocessing:
        "Cleaning and shaping catalog fields in Pandas so plots and tables answer concrete questions about mix and release patterns.",
      approach:
        "Classic EDA: questions → tables → charts, focused on content strategy, popular genres and global distribution.",
      model: "Not a predictive model — analytics and visualisation.",
      evaluation:
        "Findings checked against the cleaned tables. No invented KPI targets.",
      results: [
        "Catalog EDA covering strategy, genres and distribution.",
        "Visual summaries intended for content-mix discussion.",
        "Public repository: Netflix-Data-Analysis on GitHub.",
      ],
      role: "Solo EDA: wrangling, analysis and visualisation.",
      tech: ["Python", "Pandas", "EDA", "Matplotlib", "Seaborn"],
      signals: [
        { label: "Type", value: "EDA" },
        { label: "Tooling", value: "Pandas" },
        { label: "Repo", value: "Public" },
      ],
      visual: {
        type: "combo",
        title: "Abstract catalog motion — decorative, not a live Netflix KPI",
        bars: [32, 38, 36, 44, 48, 41, 55, 52, 61, 58, 66, 70],
        line: [12, 14, 13, 16, 18, 17, 20, 19, 22, 21, 24, 26],
        labels: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
      },
      github: "https://github.com/manikantapalla2728/Netflix-Data-Analysis",
      live: "",
      featured: true,
    },
  ],
  moreProjectsUrl: "https://github.com/manikantapalla2728?tab=repositories",
  moreProjectsLabel: "More public repositories on GitHub →",

  experience: [
    {
      period: "2 months",
      kind: "Internship",
      title: "Machine Learning Intern",
      org: "Future Intern",
      points: [
        "Applied ML algorithms and frameworks to build predictive models and analyse datasets.",
        "Worked on improving model quality as part of the internship brief.",
      ],
    },
    {
      period: "Virtual",
      kind: "Virtual internship · Forage",
      title: "Data Analytics Virtual Internship",
      org: "Deloitte (Forage)",
      points: [
        "Data analysis and visualisation for business-style decision questions.",
        "Practice translating tables into recommendations — a simulation, not full-time employment.",
      ],
    },
    {
      period: "Virtual",
      kind: "Virtual internship",
      title: "Gen AI Powered Data Analytics Virtual Internship",
      org: "Tata",
      points: [
        "Used generative-AI techniques inside analytics workflows.",
        "Focus on insight generation and data storytelling with AI assistance.",
      ],
    },
    {
      period: "Virtual",
      kind: "Virtual internship · Forage",
      title: "Data Science Virtual Internship",
      org: "British Airways (Forage)",
      points: [
        "Exploratory analysis and predictive modeling on customer booking-style data.",
        "Simulation focused on customer-satisfaction style questions.",
      ],
    },
  ],

  certifications: [
    { name: "Oracle Java Certified", issuer: "Oracle", year: "" },
    { name: "Cisco CCNA Certified", issuer: "Cisco", year: "" },
    { name: "HTML/CSS", issuer: "Certiport", year: "" },
    { name: "Oracle AI Vector Search", issuer: "Oracle", year: "" },
    { name: "OCI Foundations", issuer: "Oracle Cloud", year: "2024" },
  ],

  coding: {
    headline: "I practise technical problem solving consistently — not as a side hobby, as part of how I train.",
    platforms: [
      { name: "LeetCode",    stat: "630+",  label: "problems · contest rating 1407", url: "https://leetcode.com/u/pallamanikanta/" },
      { name: "CodeChef",    stat: "530+",  label: "problems · rating 1339",          url: "https://www.codechef.com/users/route_king_16" },
      { name: "HackerRank",  stat: "5★",    label: "Java",                            url: "https://www.hackerrank.com/pallamanikanta21" },
      { name: "Credentials", stat: "60+",   label: "certifications & badges",          url: "" },
    ],
    caption: "Counts reflect current activity on each platform. LeetCode and CodeChef cards are linked directly to my profiles.",
  },

  achievements: [
    { title: "Convolve 4.0", detail: "Pan-IIT AI/ML competition — participation listed in the original portfolio." },
    { title: "Hack2Hire", detail: "AI-powered interview challenge." },
    { title: "Synapse", detail: "The NeuroTech Challenge." },
  ],

  journey: [
    {
      stage: "Stage 01",
      title: "Data Analytics",
      state: "Foundation",
      desc: "SQL, Excel, Power BI and EDA — turning catalogs and tables into answers someone can trust.",
      skills: ["SQL", "Power BI", "EDA", "Excel"],
    },
    {
      stage: "Stage 02",
      title: "Machine Learning",
      state: "Current focus",
      desc: "Classical ML, feature work, computer vision and first deployments with Streamlit and FastAPI. This is where the featured projects sit.",
      skills: ["Scikit-learn", "XGBoost", "OpenCV", "Streamlit"],
    },
    {
      stage: "Stage 03",
      title: "Data Science / ML Engineering",
      state: "Direction",
      desc: "Deeper modeling, more rigorous evaluation and systems that survive outside a notebook. This is the target — not a job title I already hold.",
      skills: ["TensorFlow", "FastAPI", "Docker", "Evaluation"],
    },
  ],

  path: [
    { year: "Sep – Dec 2025", title: "DSA & Problem Solving", detail: "Started programming journey focusing purely on DSA through end of 2025 — building foundation for 630+ LeetCode, 530+ CodeChef, and 5★ HackerRank Java." },
    { year: "Jan 2026", title: "Data Analytics & SQL", detail: "Started data track: SQL, relational schemas (MySQL, PostgreSQL), Pandas, NumPy, and exploratory data analysis." },
    { year: "2026", title: "Machine Learning", detail: "Scikit-learn, XGBoost, feature engineering, and classification pipelines (Fraud intelligence & customer churn)." },
    { year: "2026", title: "Deep Learning & CV", detail: "TensorFlow, OpenCV, computer vision, and deep learning architectures (Smart Attendance & Facial Expression Prediction)." },
    { year: "2026", title: "Deployment & Production", detail: "Streamlit, FastAPI, Docker — turning models into accessible data tools and deployed web APIs." },
    { year: "Now", title: "Building toward Data & ML Roles", detail: "Student candidate actively preparing for global entry-level & internship roles." },
  ],

  cta: {
    title: "Open to Data Analytics & ML roles.",
    line: "Looking for internships and entry-level roles in data analytics, machine learning and related engineering — in India or internationally, on-site or remote.",
  },
};

window.PORTFOLIO = PORTFOLIO;
