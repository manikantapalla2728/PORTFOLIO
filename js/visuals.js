/* ============================================================================
   VISUALS — Realistic Professional Data Visualizations & Analytics Graphics
   Color Palette: Steel Blue (#38BDF8), Muted Teal (#10B981), Warm Amber (#F59E0B), Slate (#475569)
   No Sci-Fi / Cyberpunk neon. Looks like Tableau, Power BI, Datadog & Hex.tech.
   ============================================================================ */
(function () {
  "use strict";

  const C = {
    blue:       "#38BDF8",
    blueDim:    "rgba(56, 189, 248, 0.15)",
    blueStrong: "#0284C7",
    teal:       "#10B981",
    tealDim:    "rgba(16, 185, 129, 0.15)",
    amber:      "#F59E0B",
    amberDim:   "rgba(245, 158, 11, 0.15)",
    slate:      "#475569",
    slateLight: "#94A3B8",
    grid:       "rgba(148, 163, 184, 0.08)",
    bgPanel:    "#09121B",
    border:     "rgba(148, 163, 184, 0.14)",
  };

  function rng(seed) {
    let a = seed >>> 0;
    return function () {
      a |= 0;
      a = (a + 0x6d2b79f5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  const NS = 'xmlns="http://www.w3.org/2000/svg"';
  function wrap(w, h, defs, inner) {
    return `<svg ${NS} viewBox="0 0 ${w} ${h}" role="img" aria-hidden="true" style="width:100%;height:auto;display:block;"><defs>${defs}</defs>${inner}</svg>`;
  }

  function drawGrid(w, h, pad, stepX, stepY) {
    const sx = stepX || 40, sy = stepY || 40;
    let s = "";
    for (let x = pad.l; x <= w - pad.r; x += sx)
      s += `<line x1="${x}" y1="${pad.t}" x2="${x}" y2="${h - pad.b}" stroke="${C.grid}" stroke-width="1"/>`;
    for (let y = pad.t; y <= h - pad.b; y += sy)
      s += `<line x1="${pad.l}" y1="${y}" x2="${w - pad.r}" y2="${y}" stroke="${C.grid}" stroke-width="1"/>`;
    return s;
  }

  function smoothPath(pts) {
    if (pts.length < 2) return "";
    let d = `M ${pts[0][0]} ${pts[0][1]}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[Math.max(0, i - 1)],
            p1 = pts[i],
            p2 = pts[i + 1],
            p3 = pts[Math.min(pts.length - 1, i + 2)];
      const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
      const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
      d += ` C ${c1[0].toFixed(1)} ${c1[1].toFixed(1)}, ${c2[0].toFixed(1)} ${c2[1].toFixed(1)}, ${p2[0]} ${p2[1]}`;
    }
    return d;
  }

  /* --------------------------------------------------------------------------
     1. SCATTER: PCA Risk Clusters & Decision Threshold (Fraud Intelligence)
     -------------------------------------------------------------------------- */
  function scatter(v) {
    const W = 460, H = 210;
    const pad = { l: 36, r: 16, t: 20, b: 28 };
    const rand = rng(999);
    let s = drawGrid(W, H, pad, 44, 36);

    // Axes & Labels
    s += `<line x1="${pad.l}" y1="${H - pad.b}" x2="${W - pad.r}" y2="${H - pad.b}" stroke="${C.slate}" stroke-width="1.2"/>`;
    s += `<line x1="${pad.l}" y1="${pad.t}" x2="${pad.l}" y2="${H - pad.b}" stroke="${C.slate}" stroke-width="1.2"/>`;
    s += `<text x="${W - pad.r}" y="${H - 8}" font-size="8" fill="${C.slateLight}" font-family="IBM Plex Mono, monospace" text-anchor="end">PCA Component 1</text>`;
    s += `<text x="${pad.l - 6}" y="${pad.t + 4}" font-size="8" fill="${C.slateLight}" font-family="IBM Plex Mono, monospace" text-anchor="end">PCA Comp 2</text>`;

    // Decision Boundary Line (Supervised Classifier Cut)
    s += `<line class="chart-fade" x1="${pad.l + 30}" y1="${pad.t + 20}" x2="${W - 80}" y2="${H - pad.b - 10}" stroke="${C.amber}" stroke-width="1.5" stroke-dasharray="4 4" opacity="0.8"/>`;
    s += `<text class="chart-fade" x="${W - 140}" y="${pad.t + 35}" font-size="8" fill="${C.amber}" font-family="IBM Plex Mono, monospace">Decision Boundary (Score > 0.85)</text>`;

    // Typical Transactions Cluster (Blue/Teal)
    const cluster1 = { cx: 140, cy: 125, rx: 70, ry: 40, n: 60 };
    for (let i = 0; i < cluster1.n; i++) {
      const a = rand() * Math.PI * 2;
      const r = Math.sqrt(rand());
      const x = cluster1.cx + Math.cos(a) * cluster1.rx * r;
      const y = cluster1.cy + Math.sin(a) * cluster1.ry * r;
      s += `<circle class="chart-fade" style="transition-delay:${i * 8}ms" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="2.5" fill="${C.blue}" opacity="0.65"/>`;
    }

    // Flagged Anomalies Cluster (Amber)
    const cluster2 = { cx: 320, cy: 65, rx: 35, ry: 25, n: 22 };
    for (let i = 0; i < cluster2.n; i++) {
      const a = rand() * Math.PI * 2;
      const r = Math.sqrt(rand());
      const x = cluster2.cx + Math.cos(a) * cluster2.rx * r;
      const y = cluster2.cy + Math.sin(a) * cluster2.ry * r;
      s += `<circle class="chart-fade" style="transition-delay:${(60 + i) * 8}ms" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="3" fill="${C.amber}" opacity="0.85"/>`;
    }

    // Legend
    s += `<g font-family="IBM Plex Mono, monospace" font-size="9">
      <circle cx="280" cy="14" r="3.5" fill="${C.blue}"/>
      <text x="288" y="17" fill="${C.slateLight}">Normal Trans.</text>
      <circle cx="370" cy="14" r="3.5" fill="${C.amber}"/>
      <text x="378" y="17" fill="${C.slateLight}">Flagged Risk</text>
    </g>`;

    return wrap(W, H, "", s);
  }

  /* --------------------------------------------------------------------------
     2. PIPELINE / ARCHITECTURE: Churn / RAG Modelling Path
     -------------------------------------------------------------------------- */
  function pipeline(v) {
    const stages = v.stages || ["Raw Data", "Prep", "Features", "Model Fit", "Risk View"];
    const W = 460, H = 150, n = stages.length;
    const boxW = Math.min(74, (W - 32) / n - 14);
    const gap = (W - 24 - n * boxW) / Math.max(1, n - 1);
    let s = "";

    stages.forEach((st, i) => {
      const x = 12 + i * (boxW + gap);
      const y = 44;
      const isActive = i === 2 || i === 3;
      const borderCol = isActive ? C.blue : C.border;
      const bgCol = isActive ? C.blueDim : "rgba(148, 163, 184, 0.04)";

      s += `<g class="chart-fade" style="transition-delay:${i * 90}ms">
        <rect x="${x}" y="${y}" width="${boxW}" height="48" rx="6" fill="${bgCol}" stroke="${borderCol}" stroke-width="1.2"/>
        <text x="${x + boxW / 2}" y="${y - 8}" text-anchor="middle" font-size="8" fill="${C.slateLight}" font-family="IBM Plex Mono, monospace">STEP 0${i + 1}</text>
        <text x="${x + boxW / 2}" y="${y + 28}" text-anchor="middle" font-size="9.5" fill="#F1F5F9" font-family="IBM Plex Mono, monospace">${st}</text>
      </g>`;

      if (i < n - 1) {
        const ax = x + boxW + 2;
        const aw = gap - 4;
        s += `<path class="chart-fade" d="M ${ax} 68 L ${ax + aw - 5} 68 M ${ax + aw - 8} 64 L ${ax + aw - 5} 68 L ${ax + aw - 8} 72" fill="none" stroke="${C.blue}" stroke-width="1.2" stroke-linecap="round"/>`;
      }
    });

    // Subtitle annotation
    s += `<text x="12" y="${H - 12}" font-size="8.5" fill="${C.slateLight}" font-family="IBM Plex Mono, monospace">PIPELINE ARCHITECTURE // END-TO-END VERIFIED STACK</text>`;

    return wrap(W, H, "", s);
  }

  /* --------------------------------------------------------------------------
     3. COMPUTER VISION BBOX: Smart Attendance Face Recognition Frame
     -------------------------------------------------------------------------- */
  function network(v) {
    const W = 460, H = 210;
    let s = "";

    // Camera Frame Grid & Viewport
    s += `<rect x="10" y="10" width="${W - 20}" height="${H - 20}" rx="6" fill="#04090E" stroke="${C.border}" stroke-width="1"/>`;
    
    // Viewport Corner Markers (Target Reticle)
    const corners = [
      "M 20 30 L 20 20 L 30 20",
      `M ${W - 30} 20 L ${W - 20} 20 L ${W - 20} 30`,
      `M 20 ${H - 30} L 20 ${H - 20} L 30 ${H - 20}`,
      `M ${W - 30} ${H - 20} L ${W - 20} ${H - 20} L ${W - 20} ${H - 30}`
    ];
    corners.forEach(c => {
      s += `<path d="${c}" fill="none" stroke="${C.slate}" stroke-width="1.5"/>`;
    });

    // Detected Bounding Box
    const bbox = { x: 160, y: 35, w: 140, h: 130 };
    s += `<rect class="chart-fade" x="${bbox.x}" y="${bbox.y}" width="${bbox.w}" height="${bbox.h}" rx="4" fill="none" stroke="${C.teal}" stroke-width="1.8" stroke-dasharray="6 3"/>`;

    // Facial Landmark Dots
    const landmarks = [
      { x: 200, y: 75 }, { x: 260, y: 75 }, // Eyes
      { x: 230, y: 100 },                    // Nose
      { x: 215, y: 125 }, { x: 245, y: 125 }  // Mouth
    ];
    landmarks.forEach(p => {
      s += `<circle class="chart-fade" cx="${p.x}" cy="${p.y}" r="2" fill="${C.teal}"/>`;
    });

    // Detection Tag overlay
    s += `<g class="chart-fade" font-family="IBM Plex Mono, monospace">
      <rect x="${bbox.x}" y="${bbox.y - 18}" width="130" height="18" fill="${C.teal}" rx="2"/>
      <text x="${bbox.x + 6}" y="${bbox.y - 5}" font-size="9.5" fill="#020617" font-weight="700">IDENTITY_MATCH: 98.4%</text>
    </g>`;

    // Live Telemetry Log Overlay (Bottom Left)
    s += `<g font-family="IBM Plex Mono, monospace" font-size="8.5" fill="${C.slateLight}">
      <text x="22" y="${H - 35}">FRAME_RATE: 30 FPS</text>
      <text x="22" y="${H - 22}">DB_LOG: RECORDED [SQLITE_BACKEND]</text>
      <text x="${W - 140}" y="${H - 22}" text-anchor="start" fill="${C.teal}">STATUS: ATTENDANCE_VERIFIED</text>
    </g>`;

    return wrap(W, H, "", s);
  }

  /* --------------------------------------------------------------------------
     4. COMBO: EDA Content Analytics & Mix Distribution (Netflix Analysis)
     -------------------------------------------------------------------------- */
  function combo(v) {
    const W = 460, H = 210, pad = { l: 32, r: 16, t: 20, b: 30 };
    const bars = v.bars || [32, 45, 38, 55, 62, 58, 70, 65, 80, 75, 88, 92];
    const line = v.line || [12, 16, 14, 20, 24, 22, 28, 26, 32, 30, 36, 40];
    const labels = v.labels || ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];

    const iw = W - pad.l - pad.r, ih = H - pad.t - pad.b;
    const maxB = Math.max(...bars) * 1.15;
    const maxL = Math.max(...line) * 1.25;
    const bw = iw / bars.length;

    let s = drawGrid(W, H, pad, 38, 34);

    // Bars
    bars.forEach((b, i) => {
      const h = (b / maxB) * ih;
      const x = pad.l + i * bw + bw * 0.2;
      const y = pad.t + ih - h;
      s += `<rect class="chart-bar" style="transition-delay:${i * 35}ms" x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${(bw * 0.6).toFixed(1)}" height="${h.toFixed(1)}" rx="2" fill="${C.blue}" opacity="0.45"/>`;
    });

    // Line Path
    const pts = line.map((val, i) => [pad.l + i * bw + bw / 2, pad.t + ih - (val / maxL) * ih]);
    const d = smoothPath(pts);
    s += `<path class="chart-line" d="${d}" fill="none" stroke="${C.teal}" stroke-width="2" stroke-linecap="round"/>`;

    // Dots & Labels
    pts.forEach((p, i) => {
      s += `<circle class="chart-fade" style="transition-delay:${200 + i * 30}ms" cx="${p[0]}" cy="${p[1]}" r="2.5" fill="#060C12" stroke="${C.teal}" stroke-width="1.5"/>`;
      if (labels[i])
        s += `<text x="${p[0]}" y="${H - 10}" font-size="8" fill="${C.slateLight}" font-family="IBM Plex Mono, monospace" text-anchor="middle">${labels[i]}</text>`;
    });

    // Metric Badge Top Right
    s += `<g class="chart-fade" font-family="IBM Plex Mono, monospace" font-size="8.5">
      <rect x="${W - 150}" y="10" width="135" height="18" fill="rgba(56, 189, 248, 0.1)" stroke="${C.border}" rx="3"/>
      <text x="${W - 82}" y="22" fill="${C.blue}" text-anchor="middle">EDA: CATALOG DISTRIBUTION</text>
    </g>`;

    return wrap(W, H, "", s);
  }

  /* --------------------------------------------------------------------------
     5. EMOTION: Multi-Class Facial Expression Confidence & CNN Training Curve
     -------------------------------------------------------------------------- */
  function emotion(v) {
    const W = 460, H = 210;
    const pad = { l: 20, r: 20, t: 24, b: 24 };
    let s = drawGrid(W, H, pad, 44, 34);

    // Left Half: Emotion Class Probabilities (Horizontal Bar Chart)
    const emotions = [
      { label: "Happy",     prob: 94.2, color: C.teal,  active: true },
      { label: "Neutral",   prob: 3.8,  color: C.blue,  active: false },
      { label: "Surprise",  prob: 1.2,  color: C.amber, active: false },
      { label: "Sad",       prob: 0.5,  color: C.slate, active: false },
      { label: "Angry",     prob: 0.3,  color: C.slate, active: false },
    ];

    s += `<text x="24" y="20" font-size="8.5" fill="${C.slateLight}" font-family="IBM Plex Mono, monospace" font-weight="600">CONFIDENCE DISTRIBUTION // SOFTMAX</text>`;

    emotions.forEach((em, i) => {
      const y = 38 + i * 28;
      const barMaxW = 120;
      const barW = (em.prob / 100) * barMaxW;

      // Label
      s += `<text x="24" y="${y + 11}" font-size="9" fill="${em.active ? '#F1F5F9' : C.slateLight}" font-family="IBM Plex Mono, monospace">${em.label}</text>`;

      // Background bar track
      s += `<rect x="85" y="${y}" width="${barMaxW}" height="14" rx="3" fill="rgba(148, 163, 184, 0.06)"/>`;

      // Active probability bar
      s += `<rect class="chart-bar" style="transition-delay:${i * 50}ms" x="85" y="${y}" width="${Math.max(4, barW).toFixed(1)}" height="14" rx="3" fill="${em.color}" opacity="${em.active ? 0.9 : 0.4}"/>`;

      // Percentage label
      s += `<text x="${85 + barMaxW + 8}" y="${y + 11}" font-size="8.5" fill="${em.active ? em.color : C.slateLight}" font-family="IBM Plex Mono, monospace" font-weight="${em.active ? '700' : '400'}">${em.prob}%</text>`;
    });

    // Divider
    s += `<line x1="242" y1="20" x2="242" y2="${H - 24}" stroke="${C.border}" stroke-width="1" stroke-dasharray="3 3"/>`;

    // Right Half: CNN Epoch Training vs Validation Accuracy Curve
    s += `<text x="256" y="20" font-size="8.5" fill="${C.slateLight}" font-family="IBM Plex Mono, monospace" font-weight="600">CNN VALIDATION ACCURACY // EPOCHS</text>`;

    const curvePad = { l: 256, r: 16, t: 40, b: 38 };
    const curveW = W - curvePad.r - curvePad.l;
    const curveH = H - curvePad.t - curvePad.b;

    // Train and Val accuracy points over 8 epochs
    const trainAcc = [52, 64, 73, 79, 83, 86, 88, 91];
    const valAcc   = [50, 61, 70, 75, 79, 81, 84, 85];

    const ptsTrain = trainAcc.map((val, i) => [
      curvePad.l + (i / (trainAcc.length - 1)) * curveW,
      curvePad.t + curveH - ((val - 45) / 50) * curveH
    ]);
    const ptsVal = valAcc.map((val, i) => [
      curvePad.l + (i / (valAcc.length - 1)) * curveW,
      curvePad.t + curveH - ((val - 45) / 50) * curveH
    ]);

    s += `<path class="chart-line" d="${smoothPath(ptsTrain)}" fill="none" stroke="${C.blue}" stroke-width="1.8" stroke-linecap="round"/>`;
    s += `<path class="chart-line" d="${smoothPath(ptsVal)}" fill="none" stroke="${C.teal}" stroke-width="2" stroke-linecap="round"/>`;

    ptsVal.forEach((p, i) => {
      s += `<circle class="chart-fade" style="transition-delay:${200 + i * 40}ms" cx="${p[0]}" cy="${p[1]}" r="2.5" fill="#060C12" stroke="${C.teal}" stroke-width="1.5"/>`;
    });

    // Epoch Axis labels
    [1, 2, 3, 4, 5, 6, 7, 8].forEach((ep, i) => {
      const x = curvePad.l + (i / 7) * curveW;
      s += `<text x="${x}" y="${H - 24}" font-size="7.5" fill="${C.slateLight}" font-family="IBM Plex Mono, monospace" text-anchor="middle">E${ep}</text>`;
    });

    // Live Classification Result Badge
    s += `<g class="chart-fade" font-family="IBM Plex Mono, monospace">
      <rect x="256" y="${H - 18}" width="186" height="15" fill="rgba(16, 185, 129, 0.12)" stroke="${C.teal}" stroke-width="0.8" rx="3"/>
      <text x="349" y="${H - 7}" font-size="8" fill="${C.teal}" font-weight="700" text-anchor="middle">PREDICTION: HAPPY (CONF: 94.2%)</text>
    </g>`;

    // Legend
    s += `<g font-family="IBM Plex Mono, monospace" font-size="7.5" fill="${C.slateLight}">
      <line x1="365" y1="32" x2="380" y2="32" stroke="${C.blue}" stroke-width="1.5"/>
      <text x="385" y="34">Train</text>
      <line x1="415" y1="32" x2="430" y2="32" stroke="${C.teal}" stroke-width="1.5"/>
      <text x="435" y="34">Val</text>
    </g>`;

    return wrap(W, H, "", s);
  }

  const BUILDERS = { combo, scatter, network, pipeline, emotion };

  window.Visuals = {
    build(spec) {
      const fn = BUILDERS[spec && spec.type];
      return fn ? fn(spec) : "";
    },
  };
})();
