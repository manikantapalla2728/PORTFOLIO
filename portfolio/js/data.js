/* ============================================================================
   PORTFOLIO DATA — SINGLE SOURCE OF TRUTH
   ----------------------------------------------------------------------------
   ⚠️  SAMPLE CONTENT WARNING
   The uploaded files contained ONLY reference images (backgrounds). No resume /
   portfolio text was found, so every value below is a clearly-marked SAMPLE
   persona so you can preview the full design immediately.

   TO MAKE THIS REAL (takes 5 minutes):
   1. Replace name / links / email with your own.
   2. Replace each project block with your real projects (keep the same fields).
   3. Replace certifications, coding stats and achievements with your real ones.
   4. Set resumeUrl to your PDF resume.

   The site renders everything below automatically — no HTML edits needed.
   ========================================================================== */

const PORTFOLIO = {

  /* ------------------------------ IDENTITY ------------------------------ */
  name: "Aditya Verma",                       // ⚠️ SAMPLE
  firstName: "Aditya",
  lastName: "Verma",
  initials: "AV",
  domain: "aditya.data",                      // shown in the navbar logo
  roles: ["Data Scientist", "Machine Learning Engineer", "AI Engineer"],
  heroKicker: "DATA · MACHINE LEARNING · AI",
  heroDescription:
    "Aspiring Data Scientist & ML Engineer turning raw, messy datasets into " +
    "reliable models, clear insights and practical products — from SQL and " +
    "EDA to trained, evaluated and deployed machine-learning systems.",
  location: "India",                          // ⚠️ SAMPLE
  timezone: "IST (UTC +5:30)",
  email: "your.email@gmail.com",              // ⚠️ REPLACE
  github: "https://github.com/your-username", // ⚠️ REPLACE
  linkedin: "https://www.linkedin.com/in/your-username", // ⚠️ REPLACE
  resumeUrl: "#",                             // ⚠️ link to your PDF resume

  /* ------------------------------- ABOUT -------------------------------- */
  about: {
    lead:
      "I build end-to-end data systems — extracting and cleaning real datasets, " +
      "training and honestly evaluating ML models, and shipping the result as " +
      "dashboards and apps a non-technical person can actually use.",
    sub:
      "Currently deepening my foundation in statistics, classical machine learning " +
      "and model deployment — moving deliberately from data analysis toward " +
      "production-grade ML engineering.",
    facts: [                               // ⚠️ SAMPLE — replace with your real facts
      { label: "Education",   value: "B.Tech, Computer Science (Data Science) — 2022 → 2026" },
      { label: "Focus",       value: "Machine Learning · Predictive Analytics · Data Products" },
      { label: "Primary Stack", value: "Python · SQL · Scikit-learn · Power BI" },
      { label: "Direction",   value: "Data Analyst → ML Engineer → Data Scientist" },
    ],
  },

  /* ------------------------------- SKILLS ------------------------------- */
  skills: [                                // ⚠️ SAMPLE — keep only what YOU actually know
    { category: "Data & Analytics", accent: "cyan",
      blurb: "From raw tables to decision-ready insight.",
      items: ["Python", "Pandas", "NumPy", "SQL", "Excel", "Power BI", "Plotly", "Matplotlib", "Seaborn"] },
    { category: "Machine Learning", accent: "violet",
      blurb: "Classical ML, done rigorously.",
      items: ["Scikit-learn", "XGBoost", "Regression", "Classification", "Clustering", "PCA", "Ensemble Learning", "Feature Engineering", "Model Evaluation"] },
    { category: "Programming", accent: "cyan",
      blurb: "Core CS fundamentals.",
      items: ["Python", "Java", "C++", "C"] },
    { category: "Databases", accent: "violet",
      blurb: "Structured & document stores.",
      items: ["MySQL", "MongoDB"] },
    { category: "Tools & Engineering", accent: "cyan",
      blurb: "Shipping, not just notebooks.",
      items: ["Git", "GitHub", "VS Code", "Jupyter", "Streamlit", "FastAPI", "Docker"] },
  ],

  /* ------------------------------ PROJECTS ------------------------------ */
  /* Each project renders as a large case-study card + full modal.          */
  projects: [                              // ⚠️ SAMPLE PROJECTS — replace with your real ones

    {
      id: "churnguard",
      no: "01",
      title: "ChurnGuard",
      tag: "Binary Classification · MLOps-lite",
      year: "2025",
      oneLiner:
        "End-to-end customer-churn prediction system with tuned gradient boosting, honest cross-validated evaluation and a deployed Streamlit decision app.",
      problem:
        "Acquiring a new customer costs far more than keeping one. The goal was to predict which telecom customers are about to churn early enough for retention teams to act — and to make the model usable, not just accurate on paper.",
      dataset:
        "IBM Telco Customer Churn — 7,043 customer records, 21 features (demographics, contract type, tenure, charges, services). Public dataset used for a realistic industry-style problem.",   // ⚠️ SAMPLE
      preprocessing:
        "Cleaned missing/invalid totals, encoded 17 categorical features (one-hot + ordinal where ordered), tenure-group feature engineering, stratified train/test split, StandardScaler inside a Pipeline to prevent leakage.",
      approach:
        "Baselined with Logistic Regression, then compared Random Forest vs XGBoost; tuned XGBoost with GridSearchCV over learning rate, depth, subsample and scale_pos_weight to handle the minority class.",
      model:
        "XGBoost classifier (tuned) — chosen over Random Forest for better recall on the minority churn class at comparable precision.",
      evaluation:
        "5-fold stratified cross-validation, ROC-AUC and Precision-Recall curves, confusion matrix, and business-style threshold tuning (precision/recall trade-off for retention campaigns).",
      results: [                           // ⚠️ SAMPLE metrics — replace with your real numbers
        "Best cross-validated ROC-AUC 0.92 with tuned XGBoost.",
        "Recall 0.84 on the churn class — catches most at-risk customers.",
        "Threshold analysis lets retention teams choose a campaign-ready operating point.",
        "Shipped as an interactive Streamlit app: single-customer prediction + batch scoring.",
      ],
      role: "Solo, end-to-end: data prep, modeling, evaluation, app deployment.",
      tech: ["Python", "Pandas", "Scikit-learn", "XGBoost", "imbalanced-learn", "Streamlit", "Plotly"],
      metrics: [                           // ⚠️ SAMPLE — only show metrics you really measured
        { label: "ROC-AUC", value: "0.92" },
        { label: "Recall",  value: "0.84" },
        { label: "F1 Score", value: "0.83" },
        { label: "Accuracy", value: "87.4%" },
      ],
      visual: { type: "matrix", title: "Confusion Matrix — tuned XGBoost",
                labels: ["Retained", "Churned"], matrix: [[844, 46], [24, 137]] },
      github: "https://github.com/your-username/churnguard",
      live: "https://your-app.streamlit.app",
      featured: true,
    },

    {
      id: "retailpulse",
      no: "02",
      title: "RetailPulse",
      tag: "EDA · SQL · BI Dashboard",
      year: "2025",
      oneLiner:
        "Full sales-intelligence pipeline: SQL extraction, Pandas EDA, and an interactive Plotly + Power BI dashboard turning ~10K orders into commercial decisions.",
      problem:
        "Retail managers drown in raw order exports but lack a single view of what is actually driving revenue — which segments, regions and discount policies pay off.",
      dataset:
        "Superstore-style sales dataset — ~10K orders across 4 regions, 3 customer segments, 4 years of order history.",   // ⚠️ SAMPLE
      preprocessing:
        "Normalized the flat export into a star-schema style SQLite store, fixed date types and currency fields, engineered recency/frequency features and a profit-margin column.",
      approach:
        "SQL for extraction and KPI computation, Pandas/NumPy for exploratory analysis and outlier review, then a layered dashboard: KPI row → trend → breakdown → drill-through tables.",
      model:
        "N/A — analytics project. Predictive extension (sales forecasting with Prophet/ARIMA) is on the roadmap.",
      evaluation:
        "Dashboards validated against hand-computed SQL aggregates; every KPI cross-checked for consistency.",
      results: [
        "12 executive KPIs tracked live, from revenue to average discount impact.",
        "Identified loss-making discount bands in one region — a direct cost-saving insight.",
        "Segment × category cross-analysis surfaced the top-3 growth combinations.",
      ],
      role: "Solo: data modeling, SQL, EDA, dashboard design and build.",
      tech: ["SQL", "SQLite", "Python", "Pandas", "Plotly", "Power BI", "Excel"],
      metrics: [
        { label: "Records Analyzed", value: "10K+" },
        { label: "KPIs Tracked", value: "12" },
        { label: "Dashboard Views", value: "15+" },
      ],
      visual: { type: "combo", title: "Revenue & Margin Trend (monthly)",
                bars: [42,48,45,58,63,59,71,68,77,74,86,92],
                line: [18,19,17,21,23,22,25,24,27,26,29,31],
                labels: ["J","F","M","A","M","J","J","A","S","O","N","D"] },
      github: "https://github.com/your-username/retailpulse",
      live: "",
      featured: true,
    },

    {
      id: "creditshield",
      no: "03",
      title: "CreditShield",
      tag: "Imbalanced Learning · Anomaly Detection",
      year: "2025",
      oneLiner:
        "Fraud-detection system for severely imbalanced card transactions — engineered for recall at fixed false-positive cost, not just headline accuracy.",
      problem:
        "Card fraud is rare — 0.17% positive class in the dataset. A naive model predicting 'not fraud' always scores 99.8% accuracy and catches nothing. The real problem is ranking risk under extreme imbalance.",
      dataset:
        "European card-transaction dataset — 284,807 transactions, 28 anonymized PCA features (V1–V28) plus amount and time.",   // ⚠️ SAMPLE
      preprocessing:
        "Time-based feature engineering (hour-of-day), robust scaling of Amount, no SMOTE on test data — only on training folds inside cross-validation to keep evaluation honest.",
      approach:
        "Compared Logistic Regression, Random Forest and XGBoost under class weights, plus Isolation Forest as an unsupervised baseline; optimized for Precision-Recall AUC rather than accuracy.",
      model:
        "XGBoost with scale_pos_weight tuned via cross-validated PR-AUC; operating threshold chosen at a fixed acceptable false-positive rate.",
      evaluation:
        "Stratified 5-fold CV, PR-AUC, recall at fixed FPR, cost-matrix style analysis of the FP/FN trade-off.",
      results: [                           // ⚠️ SAMPLE metrics
        "PR-AUC 0.94 vs 0.05 baseline of random ranking — a massive lift.",
        "Recall 0.91 at the chosen operating threshold.",
        "Isolated the top-20 riskiest engineered features driving the ranking.",
      ],
      role: "Solo: data prep, imbalance strategy, modeling, threshold analysis.",
      tech: ["Python", "Pandas", "Scikit-learn", "XGBoost", "Plotly"],
      metrics: [
        { label: "PR-AUC", value: "0.94" },
        { label: "Recall", value: "0.91" },
        { label: "Transactions", value: "284K" },
      ],
      visual: { type: "scatter", title: "Transaction embedding — fraud vs legit (t-SNE-style, illustrative)",
                clusters: [ {n: 90, cx: 80,  cy: 70,  r: 42, color: "cyan"},
                            {n: 22, cx: 210, cy: 150, r: 26, color: "violet"} ] },
      github: "https://github.com/your-username/creditshield",
      live: "",
      featured: true,
    },

    {
      id: "cinematch",
      no: "04",
      title: "CineMatch",
      tag: "Recommendation Systems · NLP",
      year: "2024",
      oneLiner:
        "Hybrid movie recommendation engine combining content-based filtering with collaborative signals, wrapped in a fast Streamlit discovery app.",
      problem:
        "Generic 'top-rated' lists ignore personal taste. The goal was a recommender that explains itself — telling you *why* a movie is suggested, not just what.",
      dataset:
        "MovieLens-style ratings (100K+ ratings, 1,700+ movies) + TMDB metadata (genres, cast, crew, keywords, overviews).",   // ⚠️ SAMPLE
      preprocessing:
        "Parsed and cleaned metadata JSON fields, built a weighted 'soup' of director, cast, genres and keywords, TF-IDF vectorization of overviews, user-item matrix construction.",
      approach:
        "Content-based core using cosine similarity over TF-IDF metadata vectors; blended with collaborative filtering (user-user similarity) for cold-start mitigation; freshness and popularity re-ranking.",
      model:
        "TF-IDF + cosine similarity content model, blended with user-based KNN collaborative model.",
      evaluation:
        "Rank-based evaluation (precision@k on held-out ratings) plus qualitative review of recommendation explainability.",
      results: [
        "Top-10 recommendations generated in under 200 ms per request.",
        "Cold-start fallback via popularity + content similarity for new users.",
        "'Because you liked…' explanation attached to every recommendation.",
      ],
      role: "Solo: data pipelines, both models, blending logic, app build.",
      tech: ["Python", "Pandas", "Scikit-learn", "NLTK", "Streamlit", "TMDB API"],
      metrics: [
        { label: "Ratings", value: "100K+" },
        { label: "Movies", value: "1.7K+" },
        { label: "Latency", value: "<200ms" },
      ],
      visual: { type: "network", title: "Similarity graph — a movie and its nearest neighbours",
                seed: 7, nodes: 26 },
      github: "https://github.com/your-username/cinematch",
      live: "https://your-app.streamlit.app",
      featured: true,
    },
  ],
  moreProjectsUrl: "https://github.com/your-username?tab=repositories",
  moreProjectsLabel: "Explore the full archive on GitHub →",

  /* --------------------- EXPERIENCE / SIMULATIONS ----------------------- */
  experience: [                            // ⚠️ SAMPLE — replace with your real experience
    { period: "2025", kind: "Virtual Internship · Simulation",
      title: "Data Analytics Virtual Experience",
      org: "Forage (sample program)",
      points: [
        "Cleaned and analyzed a real commercial dataset and produced a stakeholder-ready summary.",
        "Built trend and variance analyses that translated directly into business recommendations.",
      ] },
    { period: "2024", kind: "Project-Based",
      title: "Machine Learning Project Series",
      org: "Self-directed (sample)",
      points: [
        "Shipped 4 end-to-end ML projects covering classification, regression, clustering and recommender systems.",
        "Practiced full workflow: EDA → feature engineering → CV-tuned models → deployment-ready apps.",
      ] },
  ],

  /* ---------------------------- CERTIFICATIONS -------------------------- */
  certifications: [                        // ⚠️ SAMPLE — replace with your real certifications
    { name: "Machine Learning Specialization", issuer: "DeepLearning.AI · Coursera", year: "2025" },
    { name: "Google Data Analytics Professional Certificate", issuer: "Google · Coursera", year: "2025" },
    { name: "Python for Data Science, AI & Development", issuer: "IBM · Coursera", year: "2024" },
    { name: "SQL (Advanced) Certificate", issuer: "HackerRank", year: "2025" },
  ],

  /* ---------------------- CODING & PROBLEM SOLVING ---------------------- */
  coding: {                                // ⚠️ SAMPLE — replace with your real handles/stats
    headline: "Consistent, deliberate practice across competitive and interview platforms.",
    platforms: [
      { name: "LeetCode",       stat: "350+",  label: "problems solved", url: "https://leetcode.com/your-username" },
      { name: "CodeChef",       stat: "2★",    label: "contest rating",  url: "https://www.codechef.com/users/your-username" },
      { name: "GeeksforGeeks",  stat: "300+",  label: "practice problems", url: "https://www.geeksforgeeks.org/user/your-username" },
      { name: "HackerRank",     stat: "5★ SQL", label: "verified skill", url: "https://www.hackerrank.com/your-username" },
    ],
    caption: "Illustrative activity pattern — live statistics are on the profiles linked above.",
  },

  /* ----------------------------- ACHIEVEMENTS --------------------------- */
  achievements: [                          // ⚠️ SAMPLE — replace with your real achievements
    { title: "National Hackathon — Finalist", detail: "Built a data-driven solution under a 36-hour deadline with a team of 4; selected among the top teams nationally." },
    { title: "Kaggle — Notebook Contributor", detail: "Published exploratory and modeling notebooks; earned community recognition (sample)." },
    { title: "Consistent Academic Performance", detail: "Maintained strong CGPA alongside project portfolio (sample)." },
  ],

  /* --------------------- CAREER DIRECTION / JOURNEY --------------------- */
  journey: [
    { stage: "Stage 01", title: "Data Analyst", state: "Strong Foundation",
      desc: "SQL, Excel, Power BI and rigorous EDA — turning raw tables into answers people trust.",
      skills: ["SQL", "Power BI", "EDA", "Statistics"] },
    { stage: "Stage 02", title: "Machine Learning", state: "Current Focus",
      desc: "Classical ML with honest evaluation, feature engineering and first deployments via Streamlit & FastAPI.",
      skills: ["Scikit-learn", "XGBoost", "Feature Engineering", "Deployment"] },
    { stage: "Stage 03", title: "Data Scientist / ML Engineer", state: "Target",
      desc: "Deep learning, experiment tracking and production ML systems — models that survive the real world.",
      skills: ["Deep Learning", "MLOps", "Production Systems"] },
  ],

  /* ------------------------------ CTA / CONTACT ------------------------- */
  cta: {
    title: "Let's build with data.",
    line: "Open to Data Analyst, ML and AI internships and entry-level roles — anywhere in the world, remote or on-site.",
  },
};

window.PORTFOLIO = PORTFOLIO;
