/* ============================================================================
   MAIN CONTROLLER — Manikanta Palla Glassy Data Portfolio Engine
   Ambient Network Constellation · Telemetry Engine · Glass Interface Controls
   ============================================================================ */
(function () {
  "use strict";

  const D = window.PORTFOLIO;
  const $ = (sel, ctx) => (ctx || document).querySelector(sel);
  const $$ = (sel, ctx) => Array.from((ctx || document).querySelectorAll(sel));
  const REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const TOUCH = window.matchMedia("(hover: none)").matches;

  const esc = (s) =>
    String(s || "").replace(/[&<>"']/g, (c) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    }[c]));

  const ICON_GH = `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.9 10.9c.6.1.8-.2.8-.5v-2c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.4-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 0 1 5.8 0C17 5.6 18 5.9 18 5.9c.6 1.6.2 2.8.1 3.1.7.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.2c0 .3.2.6.8.5A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5Z"/></svg>`;

  /* ======================================================
     1. HERO TELEMETRY & COPY
  ====================================================== */
  function renderHero() {
    if ($("#heroHeadline")) $("#heroHeadline").textContent = D.heroHeadline;
    if ($("#heroDesc")) $("#heroDesc").textContent = D.heroDescription;

    const stats = [
      { value: "630", suffix: "+", label: "LeetCode solved" },
      { value: "530", suffix: "+", label: "CodeChef rating 1339" },
      { value: "5", suffix: "★", label: "HackerRank Java 5-Star" },
      { value: String(D.projects.length), suffix: "", label: "Production case studies" },
    ];

    const statsContainer = $("#heroStats");
    if (statsContainer) {
      statsContainer.innerHTML = stats
        .map(
          (s) => `<div class="hero-stat">
          <div class="hero-stat-value"><span class="count" data-target="${s.value}">0</span><span class="plus">${s.suffix}</span></div>
          <div class="hero-stat-label">${esc(s.label)}</div>
        </div>`
        )
        .join("");
    }

    // Role Rotator Animation
    const rot = $("#roleRotator");
    let ri = 0;
    if (!REDUCED && rot) {
      setInterval(() => {
        rot.classList.add("swap");
        setTimeout(() => {
          ri = (ri + 1) % D.roles.length;
          rot.textContent = D.roles[ri];
          rot.classList.remove("swap");
        }, 250);
      }, 2600);
    }
  }

  function countUp() {
    $$(".count").forEach((el) => {
      const target = parseInt(el.dataset.target, 10) || 0;
      if (REDUCED) {
        el.textContent = target;
        return;
      }
      const t0 = performance.now();
      const dur = 1000;
      (function tick(t) {
        const p = Math.min(1, (t - t0) / dur);
        el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(tick);
      })(t0);
    });
  }

  /* ======================================================
     2. ABOUT SPEC SHEET
  ====================================================== */
  function renderAbout() {
    if ($("#aboutLead")) $("#aboutLead").textContent = D.about.lead;
    if ($("#aboutSub")) $("#aboutSub").textContent = D.about.sub;
    
    if ($("#aboutCards")) {
      $("#aboutCards").innerHTML = D.about.facts
        .map(
          (f) => `<div class="fact-card reveal">
          <div class="fact-label">${esc(f.label)}</div>
          <div class="fact-value">${esc(f.value)}</div>
        </div>`
        )
        .join("");
    }

    if ($("#aboutMeta")) {
      $("#aboutMeta").innerHTML = [
        `<span class="chip">📍 ${esc(D.location)}</span>`,
        `<span class="chip">🕒 ${esc(D.timezone)}</span>`,
        `<span class="chip">🎓 ${esc(D.about.facts[0].value)}</span>`,
      ].join("");
    }
  }

  /* ======================================================
     3. SKILLS STACK MATRIX
  ====================================================== */
  function renderSkills() {
    const grid = $("#skillsGrid");
    if (!grid) return;
    grid.innerHTML = D.skills
      .map(
        (c) => `<div class="skill-card reveal">
        <div class="skill-head">
          <span class="skill-cat">${esc(c.category)}</span>
          <span class="skill-blurb">${esc(c.blurb)}</span>
        </div>
        <div class="skill-tags">${c.items.map((t) => `<span class="tag">${esc(t)}</span>`).join("")}</div>
      </div>`
      )
      .join("");
  }

  /* ======================================================
     4. PROJECTS LIST & CASE STUDIES
  ====================================================== */
  function projectCard(p, i) {
    const gh = p.github
      ? `<a class="project-link" href="${esc(p.github)}" target="_blank" rel="noopener">${ICON_GH} Repository</a>`
      : "";
    const gh2 = p.githubAlt
      ? `<a class="project-link" href="${esc(p.githubAlt)}" target="_blank" rel="noopener">${ICON_GH} Related Repo</a>`
      : "";

    return `<article class="project reveal ${i % 2 ? "flip" : ""}" data-no="${p.no}" data-category="${esc(p.category.join(" "))}">
      <div class="project-no-badge">PRJ_${p.no}</div>
      <div class="project-media">
        <p class="project-media-title">${esc(p.visual.title || "MODEL PERFORMANCE METRICS")}</p>
        ${window.Visuals.build(p.visual)}
      </div>
      <div class="project-body">
        <p class="project-tag">${esc(p.tag)} · ${esc(p.year)}</p>
        <h3 class="project-title">${esc(p.title)}</h3>
        <p class="project-one">${esc(p.oneLiner)}</p>
        <p class="project-section-label">Pipeline & Approach</p>
        <p class="project-problem">${esc(p.approach)}</p>
        <div class="project-metrics">
          ${p.signals.map((m) => `<div class="metric"><div class="metric-value">${esc(m.value)}</div><div class="metric-label">${esc(m.label)}</div></div>`).join("")}
        </div>
        <div class="project-tech">${p.tech.map((t) => `<span class="tag">${esc(t)}</span>`).join("")}</div>
        <div class="project-foot">
          <button class="project-link primary" type="button" data-open="${p.id}">View Model Card</button>
          ${gh}${gh2}
        </div>
      </div>
    </article>`;
  }

  function renderProjects() {
    if ($("#projectsList")) $("#projectsList").innerHTML = D.projects.map(projectCard).join("");
    if ($("#moreProjects")) {
      $("#moreProjects").textContent = D.moreProjectsLabel;
      $("#moreProjects").href = D.moreProjectsUrl;
    }
  }

  function initFilters() {
    const row = $("#filterRow");
    if (!row) return;
    row.addEventListener("click", (e) => {
      const btn = e.target.closest(".filter");
      if (!btn) return;
      $$(".filter", row).forEach((b) => {
        b.classList.toggle("is-on", b === btn);
        b.setAttribute("aria-selected", String(b === btn));
      });
      const f = btn.dataset.filter;
      $$(".project").forEach((card) => {
        const cats = card.dataset.category.split(" ");
        card.hidden = !(f === "all" || cats.includes(f));
      });
    });
  }

  /* ======================================================
     5. EXPERIENCE & CERTIFICATIONS
  ====================================================== */
  function renderExperience() {
    if ($("#timeline")) {
      $("#timeline").innerHTML = D.experience
        .map(
          (e) => `<div class="timeline-item reveal">
          <div class="timeline-period">${esc(e.period)}</div>
          <div class="timeline-kind">${esc(e.kind)}</div>
          <div class="timeline-title">${esc(e.title)}</div>
          <div class="timeline-org">${esc(e.org)}</div>
          <ul class="timeline-points">${e.points.map((p) => `<li>${esc(p)}</li>`).join("")}</ul>
        </div>`
        )
        .join("");
    }

    if ($("#certs")) {
      $("#certs").innerHTML = D.certifications
        .map(
          (c) => `<div class="cert reveal">
          <div class="cert-badge" aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="9" r="5.2" stroke="currentColor" stroke-width="1.7"/><path d="m8.8 13.5-1.6 6 4.8-2.6 4.8 2.6-1.6-6" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>
          </div>
          <div>
            <div class="cert-name">${esc(c.name)}</div>
            <div class="cert-issuer">${esc(c.issuer)}</div>
          </div>
          ${c.year ? `<span class="cert-year">${esc(c.year)}</span>` : ""}
        </div>`
        )
        .join("");
    }
  }

  /* ======================================================
     6. CODING BENCHMARKS (LeetCode 630+, CodeChef 530+)
  ====================================================== */
  function renderCoding() {
    if ($("#codingHeadline")) $("#codingHeadline").textContent = D.coding.headline;
    if ($("#codingCaption")) $("#codingCaption").textContent = D.coding.caption;

    const platforms = [
      { name: "LeetCode", stat: "630+", label: "problems · contest rating 1407", url: "https://leetcode.com/u/pallamanikanta/" },
      { name: "CodeChef", stat: "530+", label: "problems · rating 1339", url: "https://www.codechef.com/users/route_king_16" },
      { name: "HackerRank", stat: "5★", label: "Java", url: "https://www.hackerrank.com/pallamanikanta21" },
      { name: "Credentials", stat: "60+", label: "certifications & badges", url: "" },
    ];

    if ($("#codingGrid")) {
      $("#codingGrid").innerHTML = platforms
        .map((p) => {
          const inner = `<div class="code-platform">${esc(p.name)}</div>
            <div class="code-stat">${esc(p.stat)}</div>
            <div class="code-label">${esc(p.label)}</div>`;
          return p.url
            ? `<a class="code-card reveal" href="${esc(p.url)}" target="_blank" rel="noopener">${inner}</a>`
            : `<div class="code-card reveal">${inner}</div>`;
        })
        .join("");
    }

    if ($("#achGrid")) {
      $("#achGrid").innerHTML = D.achievements
        .map(
          (a, i) => `<div class="ach-card reveal">
          <div class="ach-index">0${i + 1}</div>
          <div class="ach-title">${esc(a.title)}</div>
          <div class="ach-detail">${esc(a.detail)}</div>
        </div>`
        )
        .join("");
    }
  }

  /* ======================================================
     7. JOURNEY VECTOR
  ====================================================== */
  function renderJourney() {
    if ($("#journeyTrack")) {
      $("#journeyTrack").innerHTML = D.journey
        .map(
          (j, i) => `<div class="journey-node reveal">
          <div class="journey-dot">0${i + 1}</div>
          <div class="journey-stage">${esc(j.stage)} · ${esc(j.state)}</div>
          <div class="journey-title">${esc(j.title)}</div>
          <p class="journey-desc">${esc(j.desc)}</p>
          <div class="journey-skills">${j.skills.map((s) => `<span class="tag">${esc(s)}</span>`).join("")}</div>
        </div>`
        )
        .join("");
    }

    if ($("#pathRow")) {
      $("#pathRow").innerHTML = D.path
        .map(
          (p) => `<div class="path-chip reveal">
          <span>${esc(p.year)}</span>
          <strong>${esc(p.title)}</strong>
          <em>${esc(p.detail)}</em>
        </div>`
        )
        .join("");
    }
  }

  /* ======================================================
     8. CTA & FOOTER
  ====================================================== */
  function renderCta() {
    if ($("#ctaTitle")) $("#ctaTitle").textContent = D.cta.title;
    if ($("#ctaLine")) $("#ctaLine").textContent = D.cta.line;
    if ($("#year")) $("#year").textContent = new Date().getFullYear();
  }

  /* ======================================================
     9. MODEL CARD MODAL SYSTEM
  ====================================================== */
  const modal = $("#projectModal"), modalBody = $("#modalBody");
  let lastFocus = null;

  function block(label, text, cls) {
    return `<div class="modal-block ${cls || ""}">
      <div class="modal-block-label">${esc(label)}</div><p>${esc(text)}</p></div>`;
  }

  function openModal(id) {
    const p = D.projects.find((x) => x.id === id);
    if (!p) return;
    lastFocus = document.activeElement;
    const links = [];
    if (p.github)
      links.push(`<a class="btn btn-primary" href="${esc(p.github)}" target="_blank" rel="noopener">${ICON_GH} Open Repository</a>`);
    if (p.githubAlt)
      links.push(`<a class="btn btn-ghost" href="${esc(p.githubAlt)}" target="_blank" rel="noopener">${ICON_GH} Related Repository</a>`);

    modalBody.innerHTML = `
      <p class="modal-eyebrow">MODEL SPECIFICATION CARD // PRJ_${p.no}</p>
      <h3 class="modal-title" id="modalTitle">${esc(p.title)}</h3>
      <div class="modal-tags">${p.tech.map((t) => `<span class="tag">${esc(t)}</span>`).join("")}</div>
      <div class="modal-visual">
        <p class="project-media-title">${esc(p.visual.title || "SYSTEM VISUALIZATION")}</p>
        ${window.Visuals.build(p.visual)}
      </div>
      <div class="modal-grid">
        ${block("Executive Summary", p.oneLiner, "full")}
        ${block("Problem Statement", p.problem, "full")}
        ${block("Dataset Specification", p.dataset)}
        ${block("Candidate Role", p.role)}
        ${block("Preprocessing & Feature Engineering", p.preprocessing)}
        ${block("Technical Approach", p.approach)}
        ${block("Model / Architecture Choice", p.model)}
        ${block("Evaluation & Validation", p.evaluation)}
        <div class="modal-block full">
          <div class="modal-block-label">Key Results & Output Deliverables</div>
          <ul class="modal-results">${p.results.map((r) => `<li>${esc(r)}</li>`).join("")}</ul>
        </div>
        <div class="modal-block full">
          <div class="modal-block-label">Tooling & Engineering Stack</div>
          <p>${p.tech.map(esc).join(" · ")}</p>
        </div>
      </div>
      <div class="modal-foot">${links.join("") || "<p class='muted-note'>Private repository / student hackathon submission.</p>"}</div>`;

    modal.hidden = false;
    document.body.classList.add("modal-open");
    $(".modal-panel").scrollTop = 0;
    if ($("#modalClose")) $("#modalClose").focus();
  }

  function closeModal() {
    modal.hidden = true;
    document.body.classList.remove("modal-open");
    if (lastFocus) lastFocus.focus();
  }

  /* ======================================================
     10. NAVIGATION & SCROLL REVEALS
  ====================================================== */
  function initNav() {
    const nav = $("#nav"), toggle = $("#navToggle"), links = $("#navLinks");
    if (!nav) return;

    const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    if (toggle && links) {
      toggle.addEventListener("click", () => {
        const open = links.classList.toggle("open");
        toggle.setAttribute("aria-expanded", String(open));
        toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      });
      links.addEventListener("click", (e) => {
        if (e.target.closest(".nav-link")) {
          links.classList.remove("open");
          toggle.setAttribute("aria-expanded", "false");
        }
      });
    }

    const map = new Map($$("#navLinks .nav-link").map((l) => [l.getAttribute("href").slice(1), l]));
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            $$(".nav-link").forEach((l) => l.classList.remove("is-active"));
            const link = map.get(en.target.id);
            if (link) link.classList.add("is-active");
          }
        });
      },
      { rootMargin: "-42% 0px -52% 0px" }
    );
    ["home", "about", "skills", "projects", "experience", "achievements", "contact"].forEach((id) => {
      const s = document.getElementById(id);
      if (s) spy.observe(s);
    });
  }

  function initReveals() {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("in");
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.08 }
    );
    $$(".reveal").forEach((el) => io.observe(el));

    const statsIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            countUp();
            statsIO.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );
    const hs = $("#heroStats");
    if (hs) statsIO.observe(hs);
  }

  /* ======================================================
     11. COMPLETE 3D PORTFOLIO EXPERIENCE
         THREE.JS 3D WEBGL ENGINE + CANVAS 2D ULTRA-FALLBACK
  ====================================================== */
  function initAmbientCanvas() {
    const cv = $("#ambientCanvas");
    if (!cv || REDUCED) return;

    if (typeof THREE !== "undefined") {
      initThreeJsEngine(cv);
    } else {
      initCanvas2dFallback(cv);
    }
  }

  function initThreeJsEngine(cv) {
    let W = window.innerWidth;
    let H = window.innerHeight;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas: cv,
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
      renderer.setSize(W, H, false);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    } catch (e) {
      initCanvas2dFallback(cv);
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(46, W / H, 1, 3500);
    const getBaseCamZ = () => (W < 640 ? 460 : 385);
    const baseCamY = 14;
    let baseCamZ = getBaseCamZ();
    camera.position.set(0, baseCamY, baseCamZ);

    /* -------------------------------------------------------------
       1. Custom High-Luminance Procedural Textures
       ------------------------------------------------------------- */
    // A. Star Flare: Brilliant white core + cyan halo + 4-point diffraction spike starburst + 45-deg micro-glints
    function createStarFlareTexture() {
      const c = document.createElement("canvas");
      c.width = 128;
      c.height = 128;
      const ctx = c.getContext("2d");

      // Soft radial bloom halo
      const rad = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
      rad.addColorStop(0.00, "rgba(255, 255, 255, 1.0)");
      rad.addColorStop(0.10, "rgba(240, 249, 255, 0.96)");
      rad.addColorStop(0.24, "rgba(56, 189, 248, 0.72)");
      rad.addColorStop(0.48, "rgba(2, 132, 199, 0.28)");
      rad.addColorStop(0.75, "rgba(14, 165, 233, 0.08)");
      rad.addColorStop(1.00, "rgba(3, 7, 18, 0)");
      ctx.fillStyle = rad;
      ctx.beginPath();
      ctx.arc(64, 64, 64, 0, Math.PI * 2);
      ctx.fill();

      // Horizontal diffraction spike
      const gh = ctx.createLinearGradient(4, 64, 124, 64);
      gh.addColorStop(0.00, "rgba(56, 189, 248, 0)");
      gh.addColorStop(0.32, "rgba(186, 230, 253, 0.60)");
      gh.addColorStop(0.50, "rgba(255, 255, 255, 1.0)");
      gh.addColorStop(0.68, "rgba(186, 230, 253, 0.60)");
      gh.addColorStop(1.00, "rgba(56, 189, 248, 0)");
      ctx.fillStyle = gh;
      ctx.beginPath();
      ctx.moveTo(4, 64);
      ctx.lineTo(64, 61.5);
      ctx.lineTo(124, 64);
      ctx.lineTo(64, 66.5);
      ctx.closePath();
      ctx.fill();

      // Vertical diffraction spike
      const gv = ctx.createLinearGradient(64, 4, 64, 124);
      gv.addColorStop(0.00, "rgba(56, 189, 248, 0)");
      gv.addColorStop(0.32, "rgba(186, 230, 253, 0.60)");
      gv.addColorStop(0.50, "rgba(255, 255, 255, 1.0)");
      gv.addColorStop(0.68, "rgba(186, 230, 253, 0.60)");
      gv.addColorStop(1.00, "rgba(56, 189, 248, 0)");
      ctx.fillStyle = gv;
      ctx.beginPath();
      ctx.moveTo(64, 4);
      ctx.lineTo(61.5, 64);
      ctx.lineTo(64, 124);
      ctx.lineTo(66.5, 64);
      ctx.closePath();
      ctx.fill();

      // Diagonal micro-spikes (45 degrees) for diamond sparkle
      ctx.save();
      ctx.translate(64, 64);
      ctx.rotate(Math.PI / 4);
      const gd = ctx.createLinearGradient(-38, 0, 38, 0);
      gd.addColorStop(0.0, "rgba(56, 189, 248, 0)");
      gd.addColorStop(0.5, "rgba(255, 255, 255, 0.85)");
      gd.addColorStop(1.0, "rgba(56, 189, 248, 0)");
      ctx.fillStyle = gd;
      ctx.fillRect(-38, -1, 76, 2);
      ctx.fillRect(-1, -38, 2, 76);
      ctx.restore();

      return new THREE.CanvasTexture(c);
    }

    // B. Warm Golden/Amber Flare Sprite: Matches the warm glint in the reference image
    function createAmberFlareTexture() {
      const c = document.createElement("canvas");
      c.width = 128;
      c.height = 128;
      const ctx = c.getContext("2d");

      const rad = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
      rad.addColorStop(0.00, "rgba(255, 255, 255, 1.0)");
      rad.addColorStop(0.12, "rgba(254, 243, 199, 0.95)");
      rad.addColorStop(0.28, "rgba(245, 158, 11, 0.72)");
      rad.addColorStop(0.52, "rgba(217, 119, 6, 0.28)");
      rad.addColorStop(1.00, "rgba(3, 7, 18, 0)");
      ctx.fillStyle = rad;
      ctx.beginPath();
      ctx.arc(64, 64, 64, 0, Math.PI * 2);
      ctx.fill();

      const gh = ctx.createLinearGradient(8, 64, 120, 64);
      gh.addColorStop(0.0, "rgba(245, 158, 11, 0)");
      gh.addColorStop(0.5, "rgba(255, 255, 255, 0.98)");
      gh.addColorStop(1.0, "rgba(245, 158, 11, 0)");
      ctx.fillStyle = gh;
      ctx.beginPath();
      ctx.moveTo(8, 64); ctx.lineTo(64, 62); ctx.lineTo(120, 64); ctx.lineTo(64, 66);
      ctx.closePath(); ctx.fill();

      const gv = ctx.createLinearGradient(64, 8, 64, 120);
      gv.addColorStop(0.0, "rgba(245, 158, 11, 0)");
      gv.addColorStop(0.5, "rgba(255, 255, 255, 0.98)");
      gv.addColorStop(1.0, "rgba(245, 158, 11, 0)");
      ctx.fillStyle = gv;
      ctx.beginPath();
      ctx.moveTo(64, 8); ctx.lineTo(62, 64); ctx.lineTo(64, 120); ctx.lineTo(66, 64);
      ctx.closePath(); ctx.fill();

      return new THREE.CanvasTexture(c);
    }

    // C. Soft Dot Sprite: Crisp circular node dot with soft antialiased halo
    function createSoftDotTexture() {
      const c = document.createElement("canvas");
      c.width = 32;
      c.height = 32;
      const ctx = c.getContext("2d");
      const rad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      rad.addColorStop(0.00, "rgba(255, 255, 255, 1.0)");
      rad.addColorStop(0.30, "rgba(186, 230, 253, 0.92)");
      rad.addColorStop(0.65, "rgba(56, 189, 248, 0.38)");
      rad.addColorStop(1.00, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = rad;
      ctx.beginPath();
      ctx.arc(16, 16, 16, 0, Math.PI * 2);
      ctx.fill();
      return new THREE.CanvasTexture(c);
    }

    // D. Atmospheric Bokeh Disk: True optical circle of confusion with soft Gaussian roll-off
    function createBokehTexture() {
      const c = document.createElement("canvas");
      c.width = 128;
      c.height = 128;
      const ctx = c.getContext("2d");
      const rad = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
      rad.addColorStop(0.00, "rgba(255, 255, 255, 0.90)");
      rad.addColorStop(0.50, "rgba(255, 255, 255, 0.78)");
      rad.addColorStop(0.72, "rgba(255, 255, 255, 0.45)");
      rad.addColorStop(0.88, "rgba(255, 255, 255, 0.16)");
      rad.addColorStop(1.00, "rgba(255, 255, 255, 0.0)");
      ctx.fillStyle = rad;
      ctx.beginPath();
      ctx.arc(64, 64, 64, 0, Math.PI * 2);
      ctx.fill();
      return new THREE.CanvasTexture(c);
    }

    const starFlareTexture = createStarFlareTexture();
    const amberFlareTexture = createAmberFlareTexture();
    const softDotTexture = createSoftDotTexture();
    const bokehTexture = createBokehTexture();

    /* -------------------------------------------------------------
       2. Organic Topological Wave Ribbon & Plexus Network
       Structured crystalline mesh with radiating starburst hubs
       ------------------------------------------------------------- */
    const cols = 64; // Segments along X
    const rows = 14; // Segments along Z
    const numVerts = (cols + 1) * (rows + 1);

    const calcWaveWidth = () => Math.max(760, Math.min(1380, 520 * (W / H) + 240));
    let waveWidth = calcWaveWidth();
    const waveDepth = 320;

    const baseX = new Float32Array(numVerts);
    const baseZ = new Float32Array(numVerts);
    const normX = new Float32Array(numVerts);
    const normZ = new Float32Array(numVerts);
    const envelope = new Float32Array(numVerts);

    function computeBaseGrid() {
      for (let r = 0; r <= rows; r++) {
        for (let c = 0; c <= cols; c++) {
          const idx = r * (cols + 1) + c;
          const u = c / cols;
          const v = r / rows;

          const nx = (u - 0.5) * 2; // -1 to +1
          const nz = (v - 0.5) * 2; // -1 to +1

          // Deterministic organic jitter creating crystalline Delaunay-like facets
          const jitterX = Math.sin(c * 29.3 + r * 43.1) * 11.5;
          const jitterZ = Math.cos(c * 31.7 + r * 19.3) * 9.5;

          baseX[idx] = nx * (waveWidth * 0.5) + jitterX;
          baseZ[idx] = nz * (waveDepth * 0.5) + jitterZ;
          normX[idx] = nx;
          normZ[idx] = nz;

          // Smooth cosine ribbon envelope: wave dissolves organically at borders
          const envX = Math.max(0, Math.cos(nx * Math.PI * 0.5));
          const envZ = Math.max(0, Math.cos(nz * Math.PI * 0.5));
          envelope[idx] = Math.pow(envX, 1.6) * Math.pow(envZ, 1.1);
        }
      }
    }
    computeBaseGrid();

    // Build Interconnected Plexus Webbing with Radiating Starburst Hubs
    const edgeSet = new Set();
    function addEdge(i, j) {
      if (i === j) return;
      const a = Math.min(i, j);
      const b = Math.max(i, j);
      edgeSet.add(`${a}_${b}`);
    }

    // A. Triangulate all quad cells with alternating diagonals
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const v00 = r * (cols + 1) + c;
        const v10 = r * (cols + 1) + (c + 1);
        const v01 = (r + 1) * (cols + 1) + c;
        const v11 = (r + 1) * (cols + 1) + (c + 1);

        addEdge(v00, v10); // Horizontal strut
        addEdge(v00, v01); // Vertical strut

        // Alternating diagonal for faceted crystalline tessellation
        if ((c + r) % 2 === 0) {
          addEdge(v00, v11);
        } else {
          addEdge(v10, v01);
        }

        if (c === cols - 1) addEdge(v10, v11);
        if (r === rows - 1) addEdge(v01, v11);
      }
    }

    // B. Strategic Constellation Hubs with Radiating Filaments (Spokes)
    const cyanHubIndices = [];
    const amberHubIndices = [];

    for (let r = 2; r <= rows - 2; r += 2) {
      for (let c = 4; c <= cols - 4; c += 6) {
        const col = (r % 4 === 0) ? c : c + 2;
        if (col <= cols - 3) {
          const hubIdx = r * (cols + 1) + col;

          // 2 special hubs receive warm golden amber starburst (matching reference image glints)
          if ((r === 4 && col === 18) || (r === 8 && col === 42)) {
            amberHubIndices.push(hubIdx);
          } else {
            cyanHubIndices.push(hubIdx);
          }

          // Radiating spoke connections from each star hub to surrounding vertices
          for (let dr = -2; dr <= 2; dr++) {
            for (let dc = -3; dc <= 3; dc++) {
              const nr = r + dr;
              const nc = col + dc;
              if (nr >= 0 && nr <= rows && nc >= 0 && nc <= cols) {
                const nIdx = nr * (cols + 1) + nc;
                const d = Math.hypot(dr, dc);
                if (d > 1.2 && d <= 2.9) {
                  addEdge(hubIdx, nIdx);
                }
              }
            }
          }
        }
      }
    }

    const lineIndices = [];
    for (const key of edgeSet) {
      const [a, b] = key.split("_").map(Number);
      lineIndices.push(a, b);
    }

    const waveGeom = new THREE.BufferGeometry();
    const wavePositions = new Float32Array(numVerts * 3);
    const waveColors = new Float32Array(numVerts * 3);

    waveGeom.setAttribute("position", new THREE.BufferAttribute(wavePositions, 3));
    waveGeom.setAttribute("color", new THREE.BufferAttribute(waveColors, 3));
    waveGeom.setIndex(new THREE.BufferAttribute(new Uint16Array(lineIndices), 1));

    const waveLineMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      blending: THREE.AdditiveBlending,
      opacity: 0.85,
      depthWrite: false,
    });
    const waveMesh = new THREE.LineSegments(waveGeom, waveLineMat);
    scene.add(waveMesh);

    /* -------------------------------------------------------------
       3. Luminous Sparkling Hub Nodes (Star Constellations)
       ------------------------------------------------------------- */
    // Cyan Star Hubs
    const numCyanHubs = cyanHubIndices.length;
    const cyanHubPositions = new Float32Array(numCyanHubs * 3);
    const cyanHubColors = new Float32Array(numCyanHubs * 3);
    const cyanHubGeom = new THREE.BufferGeometry();
    cyanHubGeom.setAttribute("position", new THREE.BufferAttribute(cyanHubPositions, 3));
    cyanHubGeom.setAttribute("color", new THREE.BufferAttribute(cyanHubColors, 3));

    const cyanHubMat = new THREE.PointsMaterial({
      size: 30,
      map: starFlareTexture,
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const cyanHubPoints = new THREE.Points(cyanHubGeom, cyanHubMat);
    scene.add(cyanHubPoints);

    // Warm Golden Amber Star Hubs
    const numAmberHubs = amberHubIndices.length;
    const amberHubPositions = new Float32Array(numAmberHubs * 3);
    const amberHubColors = new Float32Array(numAmberHubs * 3);
    const amberHubGeom = new THREE.BufferGeometry();
    amberHubGeom.setAttribute("position", new THREE.BufferAttribute(amberHubPositions, 3));
    amberHubGeom.setAttribute("color", new THREE.BufferAttribute(amberHubColors, 3));

    const amberHubMat = new THREE.PointsMaterial({
      size: 32,
      map: amberFlareTexture,
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const amberHubPoints = new THREE.Points(amberHubGeom, amberHubMat);
    scene.add(amberHubPoints);

    /* -------------------------------------------------------------
       4. Secondary Junction Node Dots (Crisp Webbing Points)
       ------------------------------------------------------------- */
    const dotIndices = [];
    for (let i = 0; i < numVerts; i += 2) {
      dotIndices.push(i);
    }
    const numDots = dotIndices.length;
    const dotPositions = new Float32Array(numDots * 3);
    const dotColors = new Float32Array(numDots * 3);
    const dotGeom = new THREE.BufferGeometry();
    dotGeom.setAttribute("position", new THREE.BufferAttribute(dotPositions, 3));
    dotGeom.setAttribute("color", new THREE.BufferAttribute(dotColors, 3));

    const dotMat = new THREE.PointsMaterial({
      size: 4.6,
      map: softDotTexture,
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0.90,
    });
    const dotPoints = new THREE.Points(dotGeom, dotMat);
    scene.add(dotPoints);

    /* -------------------------------------------------------------
       5. Multi-Depth Atmospheric Bokeh Orbs System (3 Layers)
       Foreground (large soft blur), Midground, Background
       ------------------------------------------------------------- */
    function buildBokehLayer(count, size, zMin, zMax, opacity, palette) {
      const geom = new THREE.BufferGeometry();
      const pos = new Float32Array(count * 3);
      const col = new Float32Array(count * 3);
      const sim = [];

      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        pos[i3]     = (Math.random() - 0.5) * 1500;
        pos[i3 + 1] = (Math.random() - 0.5) * 850;
        pos[i3 + 2] = zMin + Math.random() * (zMax - zMin);

        const c = palette[i % palette.length];
        const bright = 0.40 + Math.random() * 0.60;
        col[i3]     = c.r * bright;
        col[i3 + 1] = c.g * bright;
        col[i3 + 2] = c.b * bright;

        sim.push({
          vx: (Math.random() - 0.5) * (size > 60 ? 0.22 : size > 40 ? 0.16 : 0.10),
          vy: (Math.random() - 0.5) * (size > 60 ? 0.16 : size > 40 ? 0.12 : 0.08),
          pulseOffset: Math.random() * Math.PI * 2,
          pulseSpeed: 0.6 + Math.random() * 1.2,
        });
      }

      geom.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      geom.setAttribute("color", new THREE.BufferAttribute(col, 3));

      const mat = new THREE.PointsMaterial({
        size: size,
        map: bokehTexture,
        transparent: true,
        vertexColors: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        opacity: opacity,
      });

      const points = new THREE.Points(geom, mat);
      scene.add(points);
      return { geom, pos, col, sim, count };
    }

    const paletteFg = [new THREE.Color(0x38bdf8), new THREE.Color(0x0284c7), new THREE.Color(0x10b981)];
    const paletteMg = [new THREE.Color(0x38bdf8), new THREE.Color(0x0ea5e9), new THREE.Color(0x2563eb), new THREE.Color(0x06b6d4)];
    const paletteBg = [new THREE.Color(0x0369a1), new THREE.Color(0x1d4ed8), new THREE.Color(0x4f46e5)];

    const fgBokeh = buildBokehLayer(16, 84, 90, 220, 0.22, paletteFg);  // Close blurred orbs
    const mgBokeh = buildBokehLayer(36, 48, -70, 90, 0.46, paletteMg);  // Wave-plane orbs
    const bgBokeh = buildBokehLayer(44, 26, -320, -70, 0.35, paletteBg); // Deep space orbs

    /* -------------------------------------------------------------
       6. Twinkling Cosmic Dust (Micro-Stars in Deep Navy Space)
       ------------------------------------------------------------- */
    const numStars = 650;
    const starGeom = new THREE.BufferGeometry();
    const starPos = new Float32Array(numStars * 3);
    const starColors = new Float32Array(numStars * 3);
    const starBaseBright = new Float32Array(numStars);
    const starTwinkleSpd = new Float32Array(numStars);
    const starTwinkleOff = new Float32Array(numStars);

    for (let i = 0; i < numStars; i++) {
      const i3 = i * 3;
      starPos[i3]     = (Math.random() - 0.5) * 2600;
      starPos[i3 + 1] = (Math.random() - 0.5) * 1900;
      starPos[i3 + 2] = -380 - Math.random() * 850;

      const pick = Math.random();
      const col = pick > 0.65 ? 0x38bdf8 : pick > 0.35 ? 0xbae6fd : 0xffffff;
      const cObj = new THREE.Color(col);
      const b = 0.22 + Math.random() * 0.68;
      starBaseBright[i] = b;
      starTwinkleSpd[i] = 0.9 + Math.random() * 2.2;
      starTwinkleOff[i] = Math.random() * Math.PI * 2;

      starColors[i3]     = cObj.r * b;
      starColors[i3 + 1] = cObj.g * b;
      starColors[i3 + 2] = cObj.b * b;
    }

    starGeom.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
    starGeom.setAttribute("color", new THREE.BufferAttribute(starColors, 3));

    const starMat = new THREE.PointsMaterial({
      size: 2.2,
      map: softDotTexture,
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0.85,
    });
    const starPoints = new THREE.Points(starGeom, starMat);
    scene.add(starPoints);

    /* -------------------------------------------------------------
       7. Interactive Parallax & Dynamic Simulation Loop
       ------------------------------------------------------------- */
    let mouseX = 0, mouseY = 0;
    let smoothMouseX = 0, smoothMouseY = 0;
    let scrollFraction = 0;

    window.addEventListener("mousemove", (e) => {
      mouseX = (e.clientX / W - 0.5) * 2;
      mouseY = -(e.clientY / H - 0.5) * 2;
    }, { passive: true });

    window.addEventListener("scroll", () => {
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      scrollFraction = window.scrollY / maxScroll;
    }, { passive: true });

    window.addEventListener("resize", () => {
      W = window.innerWidth;
      H = window.innerHeight;
      baseCamZ = getBaseCamZ();
      camera.aspect = W / H;
      camera.updateProjectionMatrix();
      renderer.setSize(W, H, false);

      waveWidth = calcWaveWidth();
      computeBaseGrid();
    });

    let raf = 0;
    function animate(timestamp) {
      if (document.hidden) {
        raf = requestAnimationFrame(animate);
        return;
      }

      const t = (timestamp || performance.now()) * 0.001;

      // Smooth mouse tracking for magnetic cursor wave lift
      smoothMouseX += (mouseX - smoothMouseX) * 0.05;
      smoothMouseY += (mouseY - smoothMouseY) * 0.05;
      const rippleCenterX = smoothMouseX * 420;
      const rippleCenterZ = -smoothMouseY * 140;

      // A. Compute Fluid Undulating Wave Elevations & Elevation Gradient Coloring
      for (let i = 0; i < numVerts; i++) {
        const x = baseX[i];
        const z = baseZ[i];
        const nx = normX[i];
        const nz = normZ[i];
        const env = envelope[i];

        // Fluid multi-harmonic wave: majestic horizontal sweep with organic peaks & valleys
        const w1 = Math.sin(nx * 2.2 + t * 0.38) * 44;
        const w2 = Math.cos(nx * 3.4 - t * 0.30 + nz * 1.9) * 28;
        const w3 = Math.sin(nz * 2.3 + t * 0.24 + nx * 1.3) * 20;
        const w4 = Math.cos(nx * 5.6 + nz * 3.2 - t * 0.44) * 11;
        const w5 = Math.sin(nx * 1.2 - t * 0.18) * 16;

        // Gentle ribbon arch & longitudinal twist across camera perspective
        const arch = Math.sin(nx * 1.6 + 0.25) * 22 - nz * 15;

        // Interactive Cursor Magnetic Lift & Ripple Perturbation
        const dx = x - rippleCenterX;
        const dz = z - rippleCenterZ;
        const distSq = dx * dx + dz * dz;
        const mouseLift = Math.exp(-distSq / 42000) * 34 * Math.cos(Math.sqrt(distSq) * 0.038 - t * 2.8);

        // Final Y elevation
        const y = (w1 + w2 + w3 + w4 + w5 + arch + mouseLift) * env - 14;

        const i3 = i * 3;
        wavePositions[i3]     = x;
        wavePositions[i3 + 1] = y;
        wavePositions[i3 + 2] = z;

        // Vertex Coloring by Elevation: peaks glow cyan/white, valleys sink into deep ocean navy
        const normElev = Math.max(0, Math.min(1, (y + 55) / 115));
        let cr, cg, cb;
        if (normElev > 0.65) {
          const k = (normElev - 0.65) / 0.35;
          cr = 0.45 + 0.55 * k;
          cg = 0.82 + 0.18 * k;
          cb = 1.00;
        } else if (normElev > 0.30) {
          const k = (normElev - 0.30) / 0.35;
          cr = 0.08 + 0.37 * k;
          cg = 0.48 + 0.34 * k;
          cb = 0.92 + 0.08 * k;
        } else {
          const k = normElev / 0.30;
          cr = 0.02 + 0.06 * k;
          cg = 0.16 + 0.32 * k;
          cb = 0.50 + 0.42 * k;
        }

        // Multiplied by envelope for clean additive border dissolution
        const alpha = env * 0.86;
        waveColors[i3]     = cr * alpha;
        waveColors[i3 + 1] = cg * alpha;
        waveColors[i3 + 2] = cb * alpha;
      }

      waveGeom.attributes.position.needsUpdate = true;
      waveGeom.attributes.color.needsUpdate = true;

      // B. Update Cyan Star Constellation Hubs (Synchronized with Wave Crests)
      for (let h = 0; h < numCyanHubs; h++) {
        const vIdx = cyanHubIndices[h];
        const h3 = h * 3;
        const v3 = vIdx * 3;

        cyanHubPositions[h3]     = wavePositions[v3];
        cyanHubPositions[h3 + 1] = wavePositions[v3 + 1];
        cyanHubPositions[h3 + 2] = wavePositions[v3 + 2] + 0.5;

        const pulse = 0.78 + 0.32 * Math.sin(t * 2.2 + h * 1.3);
        const env = envelope[vIdx];
        cyanHubColors[h3]     = 0.90 * pulse * env;
        cyanHubColors[h3 + 1] = 0.96 * pulse * env;
        cyanHubColors[h3 + 2] = 1.00 * pulse * env;
      }
      cyanHubGeom.attributes.position.needsUpdate = true;
      cyanHubGeom.attributes.color.needsUpdate = true;

      // C. Update Warm Golden Amber Star Hubs
      for (let a = 0; a < numAmberHubs; a++) {
        const vIdx = amberHubIndices[a];
        const a3 = a * 3;
        const v3 = vIdx * 3;

        amberHubPositions[a3]     = wavePositions[v3];
        amberHubPositions[a3 + 1] = wavePositions[v3 + 1];
        amberHubPositions[a3 + 2] = wavePositions[v3 + 2] + 0.5;

        const pulse = 0.82 + 0.28 * Math.sin(t * 1.9 + a * 1.5);
        const env = envelope[vIdx];
        amberHubColors[a3]     = 1.00 * pulse * env;
        amberHubColors[a3 + 1] = 0.85 * pulse * env;
        amberHubColors[a3 + 2] = 0.50 * pulse * env;
      }
      amberHubGeom.attributes.position.needsUpdate = true;
      amberHubGeom.attributes.color.needsUpdate = true;

      // D. Update Secondary Junction Dots
      for (let d = 0; d < numDots; d++) {
        const vIdx = dotIndices[d];
        const d3 = d * 3;
        const v3 = vIdx * 3;

        dotPositions[d3]     = wavePositions[v3];
        dotPositions[d3 + 1] = wavePositions[v3 + 1];
        dotPositions[d3 + 2] = wavePositions[v3 + 2];

        dotColors[d3]     = waveColors[v3] * 1.2;
        dotColors[d3 + 1] = waveColors[v3 + 1] * 1.2;
        dotColors[d3 + 2] = waveColors[v3 + 2] * 1.2;
      }
      dotGeom.attributes.position.needsUpdate = true;
      dotGeom.attributes.color.needsUpdate = true;

      // E. Update Bokeh Layers (Foreground, Midground, Deep space)
      function updateBokeh(layer) {
        for (let b = 0; b < layer.count; b++) {
          const b3 = b * 3;
          const bk = layer.sim[b];

          layer.pos[b3]     += bk.vx;
          layer.pos[b3 + 1] += bk.vy;

          if (layer.pos[b3] < -850) layer.pos[b3] = 850;
          if (layer.pos[b3] > 850) layer.pos[b3] = -850;
          if (layer.pos[b3 + 1] < -480) layer.pos[b3 + 1] = 480;
          if (layer.pos[b3 + 1] > 480) layer.pos[b3 + 1] = -480;
        }
        layer.geom.attributes.position.needsUpdate = true;
      }
      updateBokeh(fgBokeh);
      updateBokeh(mgBokeh);
      updateBokeh(bgBokeh);

      // F. Twinkle Cosmic Dust Micro-Stars
      for (let s = 0; s < numStars; s++) {
        const s3 = s * 3;
        const tw = Math.sin(t * starTwinkleSpd[s] + starTwinkleOff[s]) * 0.28;
        const b = Math.max(0.12, starBaseBright[s] + tw);
        starColors[s3 + 0] = b * 0.82;
        starColors[s3 + 1] = b * 0.95;
        starColors[s3 + 2] = b * 1.00;
      }
      starGeom.attributes.color.needsUpdate = true;

      // G. Smooth Camera Parallax & Intimate Scroll Navigation
      const targetCamX = mouseX * 36;
      const targetCamY = baseCamY + mouseY * 22 - scrollFraction * 80;
      const targetCamZ = baseCamZ - scrollFraction * 35;

      camera.position.x += (targetCamX - camera.position.x) * 0.045;
      camera.position.y += (targetCamY - camera.position.y) * 0.045;
      camera.position.z += (targetCamZ - camera.position.z) * 0.045;

      camera.lookAt(0, -scrollFraction * 40, 0);

      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    }

    raf = requestAnimationFrame(animate);
  }

  /* ======================================================
     CANVAS 2D FALLBACK (High-Performance Zero-Allocation Loop)
     ====================================================== */
  function initCanvas2dFallback(cv) {
    const ctx = cv.getContext("2d");
    let W = (cv.width = window.innerWidth);
    let H = (cv.height = window.innerHeight);

    window.addEventListener("resize", () => {
      W = cv.width = window.innerWidth;
      H = cv.height = window.innerHeight;
    });

    let targetMouseX = W / 2, targetMouseY = H / 2;
    let camX = W / 2, camY = H / 2;
    let scrollY = 0;

    window.addEventListener("mousemove", (e) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    }, { passive: true });

    window.addEventListener("scroll", () => {
      scrollY = window.scrollY;
    }, { passive: true });

    // 1. Pre-allocated Twinkling Micro-Stars
    const nStars = Math.min(130, Math.floor(W / 11));
    const stars = [];
    for (let i = 0; i < nStars; i++) {
      stars.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: 0.8 + Math.random() * 1.3,
        baseAlpha: 0.25 + Math.random() * 0.65,
        twinkleSpeed: 0.8 + Math.random() * 2.0,
        twinkleOffset: Math.random() * Math.PI * 2,
        color: Math.random() > 0.5 ? "#38BDF8" : "#F8FAFC",
      });
    }

    // 2. Pre-allocated Multi-Depth Bokeh Discs
    const nBokeh = 28;
    const bokehOrbs = [];
    const bokehColors = [
      { r: 56, g: 189, b: 248 }, // Cyan
      { r: 2, g: 132, b: 199 },  // Ocean Azure
      { r: 29, g: 78, b: 216 },  // Royal Blue
      { r: 6, g: 182, b: 212 },  // Turquoise
      { r: 16, g: 185, b: 129 }, // Emerald Teal
    ];
    for (let i = 0; i < nBokeh; i++) {
      const col = bokehColors[i % bokehColors.length];
      bokehOrbs.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: 18 + Math.random() * 45,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.16,
        color: `rgb(${col.r}, ${col.g}, ${col.b})`,
        colorFade: `rgba(${col.r}, ${col.g}, ${col.b}, 0)`,
        alpha: 0.14 + Math.random() * 0.26,
        parallax: 0.02 + Math.random() * 0.04,
      });
    }

    // 3. Pre-allocated Undulating Wave Grid Structure
    const nStrands = 5;
    const nPoints = 36;
    const grid = [];
    for (let s = 0; s < nStrands; s++) {
      const row = [];
      for (let p = 0; p < nPoints; p++) {
        row.push({
          x: 0,
          y: 0,
          env: 0,
          isPeak: (p + s * 3) % 7 === 0,
          isAmber: (s === 2 && p === 14) || (s === 3 && p === 28),
        });
      }
      grid.push(row);
    }

    function loop(now) {
      const t = now * 0.001;

      camX += (targetMouseX - camX) * 0.04;
      camY += (targetMouseY - camY) * 0.04;
      const offsetX = (camX - W / 2) * 0.03;
      const offsetY = (camY - H / 2) * 0.03 - scrollY * 0.06;

      ctx.clearRect(0, 0, W, H);

      // A. Distant Twinkling Stars
      for (let i = 0; i < nStars; i++) {
        const s = stars[i];
        const tw = Math.sin(t * s.twinkleSpeed + s.twinkleOffset) * 0.26;
        ctx.globalAlpha = Math.max(0.08, Math.min(1, s.baseAlpha + tw));
        ctx.fillStyle = s.color;
        ctx.beginPath();
        ctx.arc(s.x + offsetX * 0.2, s.y + offsetY * 0.2, s.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // B. Multi-Depth Bokeh Discs (with clean alpha falloff)
      for (let i = 0; i < nBokeh; i++) {
        const b = bokehOrbs[i];
        b.x += b.vx;
        b.y += b.vy;
        if (b.x < -60) b.x = W + 60;
        if (b.x > W + 60) b.x = -60;
        if (b.y < -60) b.y = H + 60;
        if (b.y > H + 60) b.y = -60;

        const bx = b.x + offsetX * b.parallax * 30;
        const by = b.y + offsetY * b.parallax * 30;

        const grad = ctx.createRadialGradient(bx, by, 0, bx, by, b.r);
        grad.addColorStop(0, b.color);
        grad.addColorStop(0.55, b.color);
        grad.addColorStop(1, b.colorFade);

        ctx.globalAlpha = b.alpha;
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(bx, by, b.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // C. Update Pre-allocated Grid Coordinates
      const baseY = H * 0.50 + offsetY;
      const stepX = (W + 140) / (nPoints - 1);

      for (let s = 0; s < nStrands; s++) {
        const strandY = baseY + (s - (nStrands - 1) / 2) * 36;
        for (let p = 0; p < nPoints; p++) {
          const pt = grid[s][p];
          pt.x = -70 + p * stepX + offsetX * 15;
          const nx = (p / (nPoints - 1) - 0.5) * 2;
          const w1 = Math.sin(nx * 2.4 + t * 0.42 + s * 0.6) * 38;
          const w2 = Math.cos(nx * 3.8 - t * 0.35 + s * 1.0) * 22;
          const w3 = Math.sin(nx * 1.3 - t * 0.20) * 14;
          pt.env = Math.max(0, 1 - Math.pow(Math.abs(nx), 2.2));
          pt.y = strandY + (w1 + w2 + w3) * pt.env;
        }
      }

      // Draw Wave Strands Webbing Lines
      ctx.lineWidth = 0.85;
      for (let s = 0; s < nStrands; s++) {
        for (let p = 0; p < nPoints; p++) {
          const pt = grid[s][p];

          // Horizontal edge
          if (p < nPoints - 1) {
            const next = grid[s][p + 1];
            ctx.globalAlpha = pt.env * 0.42;
            ctx.strokeStyle = "#38BDF8";
            ctx.beginPath();
            ctx.moveTo(pt.x, pt.y);
            ctx.lineTo(next.x, next.y);
            ctx.stroke();
          }

          // Vertical & diagonal cross-edges
          if (s < nStrands - 1) {
            const below = grid[s + 1][p];
            ctx.globalAlpha = pt.env * 0.25;
            ctx.strokeStyle = "#0284C7";
            ctx.beginPath();
            ctx.moveTo(pt.x, pt.y);
            ctx.lineTo(below.x, below.y);
            ctx.stroke();

            if (p < nPoints - 1) {
              const diag = (s + p) % 2 === 0 ? grid[s + 1][p + 1] : grid[s + 1][p];
              if (diag && diag !== below) {
                ctx.globalAlpha = pt.env * 0.20;
                ctx.strokeStyle = "#0EA5E9";
                ctx.beginPath();
                ctx.moveTo(pt.x, pt.y);
                ctx.lineTo(diag.x, diag.y);
                ctx.stroke();
              }
            }
          }
        }
      }

      // Draw Glowing Star Hub Nodes & Sparkling Crosshairs
      for (let s = 0; s < nStrands; s++) {
        for (let p = 0; p < nPoints; p++) {
          const pt = grid[s][p];
          if (pt.env < 0.1) continue;

          if (pt.isPeak) {
            const isAmber = pt.isAmber;
            const coreColor = isAmber ? "rgba(254, 243, 199, 0.95)" : "rgba(224, 242, 254, 0.95)";
            const haloColor = isAmber ? "rgba(245, 158, 11, 0.6)" : "rgba(56, 189, 248, 0.6)";

            // Bright sparkling hub node with radial glow
            const rad = ctx.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, 16);
            rad.addColorStop(0, "rgba(255, 255, 255, 1)");
            rad.addColorStop(0.25, coreColor);
            rad.addColorStop(0.55, haloColor);
            rad.addColorStop(1, "rgba(56, 189, 248, 0)");

            ctx.globalAlpha = pt.env * 0.95;
            ctx.fillStyle = rad;
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, 16, 0, Math.PI * 2);
            ctx.fill();

            // 4-point sparkle crosshair
            ctx.strokeStyle = "rgba(255, 255, 255, 0.9)";
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.moveTo(pt.x - 8, pt.y);
            ctx.lineTo(pt.x + 8, pt.y);
            ctx.moveTo(pt.x, pt.y - 8);
            ctx.lineTo(pt.x, pt.y + 8);
            ctx.stroke();
          } else if ((p + s) % 2 === 0) {
            // Secondary node dot
            ctx.globalAlpha = pt.env * 0.78;
            ctx.fillStyle = "#38BDF8";
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, 1.8, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      ctx.globalAlpha = 1;
      requestAnimationFrame(loop);
    }

    requestAnimationFrame(loop);
  }

  /* ======================================================
     12. HERO TWO-PHOTO 3D FLIP SHOWCASE CONTROLLER
  ====================================================== */
  function initHeroFlip() {
    const flipCard = $("#showcaseFlipCard");
    const flipBtn = $("#flipPhotoBtn");
    const panel = $(".hero-showcase-panel");

    if (!flipCard) return;

    let isFlipped = false;
    let timer = null;
    let isHovered = false;

    function toggleFlip() {
      isFlipped = !isFlipped;
      flipCard.classList.toggle("is-flipped", isFlipped);
      flipCard.setAttribute("aria-expanded", String(isFlipped));
      if (flipBtn) {
        const textSpan = flipBtn.querySelector(".flip-btn-text");
        if (textSpan) {
          textSpan.textContent = isFlipped ? "View Neural" : "View Data Ops";
        }
      }
    }

    flipCard.addEventListener("click", () => {
      toggleFlip();
    });

    flipCard.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleFlip();
      }
    });

    if (flipBtn) {
      flipBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        toggleFlip();
      });
    }

    // Auto-advance flip timer every 6.0 seconds when not hovered
    function startTimer() {
      if (REDUCED || timer || isHovered) return;
      timer = setInterval(() => {
        if (document.hidden || isHovered) return;
        toggleFlip();
      }, 6000);
    }

    function stopTimer() {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    }

    if (panel) {
      panel.addEventListener("mouseenter", () => {
        isHovered = true;
        stopTimer();
      });
      panel.addEventListener("mouseleave", () => {
        isHovered = false;
        startTimer();
      });
    }

    startTimer();
  }

  /* ======================================================
     13. 3D CARD TILT & HOLOGRAPHIC GLARE ENGINE
  ====================================================== */
  function init3DTilt() {
    if (REDUCED || TOUCH) return;

    const cards = $$(
      "[data-tilt], .skill-card, .fact-card, .project, .timeline-item, .cert, .code-card, .ach-card, .journey-node, .contact-card, .showcase-frame"
    );

    cards.forEach((card) => {
      let raf = 0;
      let targetRotX = 0, targetRotY = 0;
      let currRotX = 0, currRotY = 0;
      let isHovered = false;

      // Add dynamic specular glare overlay
      let glare = card.querySelector(".tilt-glare");
      if (!glare) {
        glare = document.createElement("div");
        glare.className = "tilt-glare";
        card.appendChild(glare);
      }

      function update() {
        currRotX += (targetRotX - currRotX) * 0.14;
        currRotY += (targetRotY - currRotY) * 0.14;

        card.style.transform = `perspective(1000px) rotateX(${currRotX.toFixed(2)}deg) rotateY(${currRotY.toFixed(2)}deg) translateZ(6px)`;

        if (isHovered) {
          raf = requestAnimationFrame(update);
        } else {
          targetRotX = 0;
          targetRotY = 0;
          if (Math.abs(currRotX) > 0.05 || Math.abs(currRotY) > 0.05) {
            raf = requestAnimationFrame(update);
          } else {
            card.style.transform = "";
            if (glare) glare.style.opacity = "0";
          }
        }
      }

      card.addEventListener("pointerenter", () => {
        isHovered = true;
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(update);
        if (glare) glare.style.opacity = "1";
      });

      card.addEventListener("pointermove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const maxTilt = card.classList.contains("showcase-frame") ? 4 : 7; // subtle for showcase frame
        targetRotX = -((y / rect.height) * 2 - 1) * maxTilt;
        targetRotY = ((x / rect.width) * 2 - 1) * maxTilt;

        if (glare) {
          const px = ((x / rect.width) * 100).toFixed(1);
          const py = ((y / rect.height) * 100).toFixed(1);
          glare.style.background = `radial-gradient(circle at ${px}% ${py}%, rgba(56, 189, 248, 0.2) 0%, transparent 60%)`;
        }
      });

      card.addEventListener("pointerleave", () => {
        isHovered = false;
      });
    });
  }

  /* ======================================================
     14. PRECISION DATA HUD CURSOR CONTROLLER
  ====================================================== */
  function initDataCursor() {
    if (TOUCH) return;

    const cursor = $("#dataCursor");
    const hud = $("#cursorHud");

    if (!cursor || !hud) return;

    document.documentElement.classList.add("has-custom-cursor");

    let mouseX = -100, mouseY = -100;
    let hudX = -100, hudY = -100;
    let isVisible = false;

    const interactiveSel = "a, button, [role='button'], [role='tab'], input, select, textarea, .project, .skill-card, .fact-card, .code-card, .cert, .timeline-item, .contact-card, .showcase-flip-card, .showcase-flip-btn, .about-portrait-card, .filter, [data-tilt]";

    window.addEventListener("pointermove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) {
        isVisible = true;
        cursor.classList.add("is-visible");
        hudX = mouseX;
        hudY = mouseY;
      }

      // Target Lock hover behavior on interactive UI controls without child flicker
      const isLocked = Boolean(e.target && e.target.closest && e.target.closest(interactiveSel));
      cursor.classList.toggle("is-locked", isLocked);
    }, { passive: true });

    // Butter-smooth lerp loop for HUD reticle (perfectly centered on pointer)
    function anim() {
      if (isVisible) {
        hudX += (mouseX - hudX) * 0.48;
        hudY += (mouseY - hudY) * 0.48;
        hud.style.transform = `translate3d(${hudX.toFixed(1)}px, ${hudY.toFixed(1)}px, 0) translate(-50%, -50%)`;
      }
      requestAnimationFrame(anim);
    }
    requestAnimationFrame(anim);

    // Precision Click Ripple Pulse
    window.addEventListener("pointerdown", (e) => {
      const ripple = document.createElement("div");
      ripple.className = "cursor-click-ripple";
      ripple.style.left = `${e.clientX}px`;
      ripple.style.top = `${e.clientY}px`;
      document.body.appendChild(ripple);
      setTimeout(() => ripple.remove(), 450);
    });

    window.addEventListener("mouseleave", () => {
      isVisible = false;
      cursor.classList.remove("is-visible", "is-locked");
    });
    window.addEventListener("mouseenter", () => {
      isVisible = true;
      cursor.classList.add("is-visible");
    });
    window.addEventListener("blur", () => {
      isVisible = false;
      cursor.classList.remove("is-visible", "is-locked");
    });
  }

  /* ======================================================
     15. GLOBAL CURSOR-REACTIVE NETWORK (ALL PAGES / SECTIONS)
     Fixed Small Dots, Dynamic Connections Changing with Cursor
  ====================================================== */
  function initGlobalCursorNetwork() {
    const cv = $("#cursorNetworkCanvas");
    if (!cv) return;

    const ctx = cv.getContext("2d");
    if (!ctx) return;

    let W = 0, H = 0, raf = null, isRunning = false;
    let nodes = [];
    let edges = [];

    const mouse = {
      x: -9999,
      y: -9999,
      targetX: -9999,
      targetY: -9999,
      active: false,
    };

    const COLOR_CYAN = "rgba(56, 189, 248, ";
    const COLOR_AMBER = "rgba(245, 158, 11, ";
    const COLOR_VIOLET = "rgba(129, 140, 248, ";

    function buildFixedNodes() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth;
      H = window.innerHeight;
      if (W === 0 || H === 0) return;

      cv.width = W * dpr;
      cv.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      let seed = 1337;
      function prng() {
        seed = (seed * 9301 + 49297) % 233280;
        return seed / 233280;
      }

      // Spacing creates a sparse, clean constellation with plenty of breathing room
      const spacing = Math.max(135, Math.min(175, Math.sqrt((W * H) / 42)));
      const cols = Math.floor(W / spacing);
      const rows = Math.floor(H / spacing);
      const cellW = W / cols;
      const cellH = H / rows;

      nodes = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const jx = (prng() - 0.5) * cellW * 0.55;
          const jy = (prng() - 0.5) * cellH * 0.55;
          const x = (c + 0.5) * cellW + jx;
          const y = (r + 0.5) * cellH + jy;

          const isAmber = prng() > 0.88;
          const isViolet = !isAmber && prng() > 0.80;

          nodes.push({
            x: Math.round(x * 10) / 10,
            y: Math.round(y * 10) / 10,
            baseRadius: 0.6 + prng() * 0.25, // Ultra-fine micro-dots (~0.6px to 0.85px)
            isAmber,
            isViolet,
            colorBase: isAmber ? COLOR_AMBER : isViolet ? COLOR_VIOLET : COLOR_CYAN,
            glowIntensity: 0,
            pulseOffset: prng() * Math.PI * 2,
          });
        }
      }

      edges = [];
      const MAX_LINK_DIST = spacing * 1.35;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d = Math.hypot(dx, dy);
          if (d < MAX_LINK_DIST) {
            edges.push({
              a: i,
              b: j,
              dist: d,
              maxDist: MAX_LINK_DIST,
            });
          }
        }
      }
    }

    const CURSOR_LINK_RADIUS = 210;
    const CURSOR_INFLUENCE_RADIUS = 260;

    function draw(timestamp) {
      if (!isRunning) return;
      ctx.clearRect(0, 0, W, H);

      const t = (timestamp || performance.now()) * 0.001;

      if (mouse.active) {
        mouse.x += (mouse.targetX - mouse.x) * 0.35;
        mouse.y += (mouse.targetY - mouse.y) * 0.35;
      } else {
        mouse.x = -9999;
        mouse.y = -9999;
      }

      // Update node glow based on cursor proximity
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        if (mouse.active) {
          const dm = Math.hypot(n.x - mouse.x, n.y - mouse.y);
          const targetGlow = dm < CURSOR_INFLUENCE_RADIUS ? Math.max(0, 1 - dm / CURSOR_INFLUENCE_RADIUS) : 0;
          n.glowIntensity += (targetGlow - n.glowIntensity) * 0.18;
        } else {
          n.glowIntensity *= 0.9;
        }
      }

      // Connections between fixed dots: dynamically illuminate & change around cursor
      for (let e = 0; e < edges.length; e++) {
        const edge = edges[e];
        const nA = nodes[edge.a];
        const nB = nodes[edge.b];

        const linkActivation = (nA.glowIntensity + nB.glowIntensity) * 0.5;
        const baseAlpha = 0.035 * (1 - edge.dist / edge.maxDist);
        const activeAlpha = linkActivation * 0.38 * (1 - edge.dist / edge.maxDist);
        const totalAlpha = Math.min(0.65, baseAlpha + activeAlpha);

        if (totalAlpha > 0.02) {
          const isSpecial = nA.isAmber || nB.isAmber;
          ctx.strokeStyle = isSpecial ? `${COLOR_AMBER}${totalAlpha})` : `${COLOR_CYAN}${totalAlpha})`;
          ctx.lineWidth = linkActivation > 0.15 ? 1.2 : 0.8;
          ctx.beginPath();
          ctx.moveTo(nA.x, nA.y);
          ctx.lineTo(nB.x, nB.y);
          ctx.stroke();
        }
      }

      // Dynamic connections from cursor to nearby fixed dots
      if (mouse.active) {
        for (let i = 0; i < nodes.length; i++) {
          const n = nodes[i];
          const md = Math.hypot(n.x - mouse.x, n.y - mouse.y);
          if (md < CURSOR_LINK_RADIUS) {
            const cursorAlpha = (1 - md / CURSOR_LINK_RADIUS) * 0.42;
            ctx.strokeStyle = n.isAmber
              ? `${COLOR_AMBER}${cursorAlpha})`
              : `${COLOR_CYAN}${cursorAlpha})`;
            ctx.lineWidth = 1.0;
            ctx.beginPath();
            ctx.moveTo(mouse.x, mouse.y);
            ctx.lineTo(n.x, n.y);
            ctx.stroke();
          }
        }
      }

      // Ultra-fine pinpoint micro-dots
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const pulse = 0.92 + 0.08 * Math.sin(t * 1.8 + n.pulseOffset);
        const r = n.baseRadius * (1 + n.glowIntensity * 0.25) * pulse;

        if (n.glowIntensity > 0.15) {
          ctx.fillStyle = `${n.colorBase}${n.glowIntensity * 0.22})`;
          ctx.beginPath();
          ctx.arc(n.x, n.y, r * 1.8, 0, Math.PI * 2);
          ctx.fill();
        }

        const dotAlpha = Math.min(0.95, 0.40 + n.glowIntensity * 0.55);
        ctx.fillStyle = `${n.colorBase}${dotAlpha})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    }

    function start() {
      if (!isRunning) {
        isRunning = true;
        raf = requestAnimationFrame(draw);
      }
    }

    function stop() {
      isRunning = false;
      if (raf) cancelAnimationFrame(raf);
    }

    buildFixedNodes();

    let resizeTimer = null;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        buildFixedNodes();
      }, 150);
    }, { passive: true });

    // Track mouse events globally across all pages and sections
    window.addEventListener("mousemove", (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.active = true;
      if (!isRunning) start();
    }, { passive: true });

    window.addEventListener("mouseleave", () => {
      mouse.active = false;
      mouse.targetX = -9999;
      mouse.targetY = -9999;
    });

    window.addEventListener("touchmove", (e) => {
      if (e.touches && e.touches[0]) {
        mouse.targetX = e.touches[0].clientX;
        mouse.targetY = e.touches[0].clientY;
        mouse.active = true;
        if (!isRunning) start();
      }
    }, { passive: true });

    window.addEventListener("touchend", () => {
      mouse.active = false;
      mouse.targetX = -9999;
      mouse.targetY = -9999;
    });

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) stop();
      else start();
    });

    start();
  }

  /* ======================================================
     16. INITIALIZATION
  ====================================================== */
  function init() {
    renderHero();
    renderAbout();
    renderSkills();
    renderProjects();
    renderExperience();
    renderCoding();
    renderJourney();
    renderCta();

    initFilters();
    initNav();
    initReveals();
    initAmbientCanvas();
    initHeroFlip();
    init3DTilt();
    initDataCursor();
    initGlobalCursorNetwork();

    document.addEventListener("click", (e) => {
      const opener = e.target.closest("[data-open]");
      if (opener) openModal(opener.dataset.open);
    });

    if ($("#modalClose")) $("#modalClose").addEventListener("click", closeModal);
    if (modal) {
      modal.addEventListener("click", (e) => {
        if (e.target.hasAttribute("data-close")) closeModal();
      });
    }
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal && !modal.hidden) closeModal();
    });
  }

  document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", init) : init();
})();
