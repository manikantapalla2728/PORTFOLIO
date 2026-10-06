/* ============================================================
   VISUALS — lightweight, dependency-free SVG chart generators.
   Each builder returns an SVG string used inside project cards
   and the case-study modal. Animation hooks: .chart-line,
   .chart-bar, .chart-fade (animated when the card scrolls in).
   ============================================================ */
(function () {
  "use strict";

  const C = {
    accent: "#38BDF8", accent2: "#8B5CF6",
    grid: "rgba(148,163,184,.09)", gridSoft: "rgba(148,163,184,.05)",
    text: "#5B6779", text2: "#8B98A9", dot: "#10151F",
  };

  /* deterministic PRNG so layouts are stable between renders */
  function rng(seed) {
    let a = seed >>> 0;
    return function () {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  const NS = 'xmlns="http://www.w3.org/2000/svg"';

  function wrap(w, h, defs, inner) {
    return `<svg ${NS} viewBox="0 0 ${w} ${h}" role="img" aria-hidden="true">` +
           `<defs>${defs}</defs>${inner}</svg>`;
  }

  function gridLines(w, h, pad, step) {
    let s = "";
    for (let x = pad.l; x <= w - pad.r; x += step) s += `<line x1="${x}" y1="${pad.t}" x2="${x}" y2="${h - pad.b}" stroke="${C.gridSoft}"/>`;
    for (let y = pad.t; y <= h - pad.b; y += step) s += `<line x1="${pad.l}" y1="${y}" x2="${w - pad.r}" y2="${y}" stroke="${C.gridSoft}"/>`;
    return s;
  }

  function smoothPath(pts) {
    if (pts.length < 2) return "";
    let d = `M ${pts[0][0]} ${pts[0][1]}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[Math.max(0, i - 1)], p1 = pts[i], p2 = pts[i + 1], p3 = pts[Math.min(pts.length - 1, i + 2)];
      const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
      const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
      d += ` C ${c1[0].toFixed(1)} ${c1[1].toFixed(1)}, ${c2[0].toFixed(1)} ${c2[1].toFixed(1)}, ${p2[0]} ${p2[1]}`;
    }
    return d;
  }

  /* ------------------------------ builders ------------------------------ */

  function combo(v) {
    const W = 460, H = 260, pad = { l: 40, r: 16, t: 18, b: 30 };
    const bars = v.bars, line = v.line, labels = v.labels || [];
    const iw = W - pad.l - pad.r, ih = H - pad.t - pad.b;
    const maxB = Math.max(...bars) * 1.15, maxL = Math.max(...line) * 1.3;
    const bw = iw / bars.length;
    let s = gridLines(W, H, pad, 44);
    // bars
    bars.forEach((b, i) => {
      const h = (b / maxB) * ih, x = pad.l + i * bw + bw * 0.22, y = pad.t + ih - h;
      const violet = i % 4 === 3;
      s += `<rect class="chart-bar" style="transition-delay:${i * 55}ms" x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${(bw * 0.56).toFixed(1)}" height="${h.toFixed(1)}" rx="3" fill="${violet ? "rgba(139,92,246,.55)" : "rgba(56,189,248,.5)"}"/>`;
    });
    // line
    const pts = line.map((val, i) => [pad.l + i * bw + bw / 2, pad.t + ih - (val / maxL) * ih]);
    const d = smoothPath(pts);
    const area = `${d} L ${pts[pts.length - 1][0]} ${pad.t + ih} L ${pts[0][0]} ${pad.t + ih} Z`;
    s += `<path class="chart-fade" d="${area}" fill="url(#gArea)"/>`;
    s += `<path class="chart-line" d="${d}" fill="none" stroke="${C.accent2}" stroke-width="2.4" stroke-linecap="round"/>`;
    pts.forEach((p, i) => {
      s += `<circle class="chart-fade" style="transition-delay:${300 + i * 60}ms" cx="${p[0]}" cy="${p[1]}" r="3" fill="#0B0F16" stroke="${C.accent2}" stroke-width="1.6"/>`;
      if (labels[i]) s += `<text x="${p[0]}" y="${H - 10}" font-size="9" fill="${C.text}" text-anchor="middle" font-family="JetBrains Mono, monospace">${labels[i]}</text>`;
    });
    const defs = `<linearGradient id="gArea" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="${C.accent2}" stop-opacity=".28"/><stop offset="1" stop-color="${C.accent2}" stop-opacity="0"/></linearGradient>`;
    return wrap(W, H, defs, s);
  }

  function matrix(v) {
    const W = 460, H = 250;
    const labels = v.labels, m = v.matrix;
    const max = Math.max(...m.flat());
    const cell = 74, gap = 6, x0 = 150, y0 = 44;
    let s = "";
    const defs = [];
    m.forEach((row, r) => row.forEach((val, c) => {
      const t = val / max;
      const fill = r === c ? `rgba(56,189,248,${0.22 + t * 0.7})` : `rgba(139,92,246,${0.14 + t * 0.6})`;
      const x = x0 + c * (cell + gap), y = y0 + r * (cell + gap);
      s += `<g class="chart-fade" style="transition-delay:${(r * 2 + c) * 120}ms">
        <rect x="${x}" y="${y}" width="${cell}" height="${cell}" rx="9" fill="${fill}" stroke="rgba(148,163,184,.14)"/>
        <text x="${x + cell / 2}" y="${y + cell / 2 - 3}" text-anchor="middle" font-size="17" font-weight="700" fill="#E6EDF3" font-family="JetBrains Mono, monospace">${val}</text>
        <text x="${x + cell / 2}" y="${y + cell / 2 + 16}" text-anchor="middle" font-size="8" fill="rgba(230,237,243,.55)" font-family="JetBrains Mono, monospace">${r === c ? (r === 0 ? "correct" : "hits") : r === 0 ? "missed" : "false alarm"}</text>
      </g>`;
    }));
    labels.forEach((lb, i) => {
      s += `<text class="chart-fade" x="${x0 + i * (cell + gap) + cell / 2}" y="${y0 - 14}" text-anchor="middle" font-size="10" fill="${C.text2}" font-family="JetBrains Mono, monospace">actual ${lb.toLowerCase()}</text>`;
      s += `<text class="chart-fade" x="${x0 - 12}" y="${y0 + i * (cell + gap) + cell / 2 + 4}" text-anchor="end" font-size="10" fill="${C.text2}" font-family="JetBrains Mono, monospace">pred ${lb.toLowerCase()}</text>`;
    });
    return wrap(W, H, defs.join(""), s);
  }

  function scatter(v) {
    const W = 460, H = 250;
    const rand = rng(1234);
    let s = gridLines(W, H, { l: 20, r: 20, t: 20, b: 20 }, 42);
    const colorOf = (c) => c === "violet" ? C.accent2 : C.accent;
    v.clusters.forEach((cl, ci) => {
      const crand = rng(ci * 97 + 13);
      for (let i = 0; i < cl.n; i++) {
        const ang = crand() * Math.PI * 2, rad = Math.sqrt(crand()) * cl.r;
        const x = cl.cx + Math.cos(ang) * rad * 1.5 + (rand() - 0.5) * 8;
        const y = cl.cy + Math.sin(ang) * rad + (rand() - 0.5) * 8;
        const big = crand() > 0.86;
        s += `<circle class="chart-fade" style="transition-delay:${(ci * cl.n + i) * 12}ms" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${big ? 4.4 : 2.6}" fill="${colorOf(cl.color)}" opacity="${big ? 0.95 : 0.55}"/>`;
      }
    });
    // legend
    s += `<g class="chart-fade" font-family="JetBrains Mono, monospace" font-size="9.5">
      <circle cx="316" cy="18" r="4" fill="${C.accent}"/><text x="326" y="21" fill="${C.text2}">legitimate</text>
      <circle cx="396" cy="18" r="4" fill="${C.accent2}"/><text x="406" y="21" fill="${C.text2}">fraud</text>
    </g>`;
    return wrap(W, H, "", s);
  }

  function network(v) {
    const W = 460, H = 250, rand = rng(v.seed || 42);
    const n = v.nodes || 24;
    // ring + hub layout
    const cx = 205, cy = 125, R = 88;
    const nodes = [];
    for (let i = 0; i < n; i++) {
      if (i === 0) nodes.push({ x: cx, y: cy, hub: true });
      else {
        const a = ((i - 1) / (n - 1)) * Math.PI * 2;
        const rr = R * (0.75 + rand() * 0.35);
        nodes.push({ x: cx + Math.cos(a) * rr, y: cy + Math.sin(a) * rr * 0.82, hub: false });
      }
    }
    let s = gridLines(W, H, { l: 16, r: 16, t: 16, b: 16 }, 46);
    const edges = [];
    for (let i = 1; i < n; i++) edges.push([0, i]);
    for (let i = 1; i < n; i++) if (rand() > 0.55) edges.push([i, 1 + ((i + 2) % (n - 1))]);
    edges.forEach(([a, b], i) => {
      s += `<line class="chart-fade" style="transition-delay:${i * 30}ms" x1="${nodes[a].x.toFixed(1)}" y1="${nodes[a].y.toFixed(1)}" x2="${nodes[b].x.toFixed(1)}" y2="${nodes[b].y.toFixed(1)}" stroke="${C.accent}" stroke-opacity="${a === 0 ? 0.28 : 0.12}" stroke-width="1"/>`;
    });
    nodes.forEach((p, i) => {
      if (p.hub) {
        s += `<circle class="chart-fade" cx="${p.x}" cy="${p.y}" r="13" fill="none" stroke="${C.accent2}" stroke-opacity=".5"/>
              <circle class="chart-fade" cx="${p.x}" cy="${p.y}" r="7" fill="${C.accent2}"/>
              <circle class="chart-fade" cx="${p.x}" cy="${p.y}" r="16" fill="none" stroke="${C.accent2}" stroke-opacity=".2"/>`;
      } else {
        s += `<circle class="chart-fade" style="transition-delay:${200 + i * 25}ms" cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="${3 + rand() * 2.4}" fill="${rand() > 0.8 ? C.accent2 : C.accent}" opacity="${0.5 + rand() * 0.4}"/>`;
      }
    });
    return wrap(W, H, "", s);
  }

  /* fallback: feature-importance style horizontal bars */
  function bars(v) {
    const W = 460, H = 250, padL = 150;
    const items = v.items || [];
    const max = Math.max(...items.map((i) => i.value));
    const bh = Math.min(30, (H - 40) / items.length - 8);
    let s = "";
    items.forEach((it, i) => {
      const y = 26 + i * (bh + 10);
      const w = ((it.value / max) * (W - padL - 40));
      s += `<text x="${padL - 12}" y="${y + bh / 2 + 3.5}" text-anchor="end" font-size="10" fill="${C.text2}" font-family="JetBrains Mono, monospace">${it.label}</text>`;
      s += `<rect class="chart-bar" style="transition-delay:${i * 80}ms" x="${padL}" y="${y}" width="${w.toFixed(1)}" height="${bh}" rx="5" fill="url(#gBar)" opacity="${1 - i * 0.09}"/>`;
      s += `<text class="chart-fade" x="${padL + w + 8}" y="${y + bh / 2 + 3.5}" font-size="10" fill="${C.accent}" font-family="JetBrains Mono, monospace">${it.value}</text>`;
    });
    return wrap(W, H, `<linearGradient id="gBar" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="${C.accent2}"/><stop offset="1" stop-color="${C.accent}"/></linearGradient>`, s);
  }

  const BUILDERS = { combo, matrix, scatter, network, bars };

  window.Visuals = {
    build(spec) {
      const fn = BUILDERS[spec && spec.type];
      return fn ? fn(spec) : "";
    },
  };
})();
