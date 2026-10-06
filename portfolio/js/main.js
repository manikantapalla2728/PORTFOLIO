/* ============================================================
   MAIN — renders all content from window.PORTFOLIO,
   handles nav, reveals, count-ups, hero particle field,
   magnetic buttons and the project case-study modal.
   ============================================================ */
(function () {
  "use strict";

  const D = window.PORTFOLIO;
  const $  = (sel, ctx) => (ctx || document).querySelector(sel);
  const $$ = (sel, ctx) => Array.from((ctx || document).querySelectorAll(sel));
  const REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const TOUCH = window.matchMedia("(hover: none)").matches;

  const esc = (s) => String(s).replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  /* --------------------------- link bindings --------------------------- */
  function bindLinks() {
    $$("[data-key]").forEach((a) => {
      const key = a.dataset.key;
      if (D[key]) a.href = D[key];
    });
    document.title = `${D.name} — Aspiring ${D.roles[0]} & ${D.roles[1]} · Portfolio`;
  }

  /* ------------------------------- hero -------------------------------- */
  function renderHero() {
    $("#heroName").innerHTML = `${esc(D.firstName)} <span class="grad">${esc(D.lastName)}</span>`;
    $("#heroKicker").textContent = D.heroKicker;
    $("#heroDesc").textContent = D.heroDescription;
    $("#brandMark").textContent = D.initials;
    $("#brandText").innerHTML = `${esc(D.domain.split(".")[0])}<span class="brand-dot">.${esc(D.domain.split(".")[1] || "data")}</span>`;

    // derived stats — computed from the data itself, nothing invented
    const techSet = new Set();
    D.skills.forEach((c) => c.items.forEach((t) => techSet.add(t)));
    const stats = [
      { value: D.projects.length, suffix: "", label: "Projects Built" },
      { value: D.certifications.length, suffix: "", label: "Certifications" },
      { value: techSet.size, suffix: "+", label: "Tools & Tech" },
      { value: D.coding.platforms.length, suffix: "", label: "Coding Platforms" },
    ];
    $("#heroStats").innerHTML = stats.map((s) => `
      <div class="hero-stat">
        <div class="hero-stat-value"><span class="count" data-target="${s.value}">0</span><span class="plus">${s.suffix}</span></div>
        <div class="hero-stat-label">${esc(s.label)}</div>
      </div>`).join("");

    // role rotator
    const rot = $("#roleRotator");
    let ri = 0;
    if (!REDUCED) {
      setInterval(() => {
        rot.classList.add("swap");
        setTimeout(() => {
          ri = (ri + 1) % D.roles.length;
          rot.textContent = D.roles[ri];
          rot.classList.remove("swap");
        }, 300);
      }, 2600);
    }
  }

  function countUp() {
    $$(".count").forEach((el) => {
      const target = parseInt(el.dataset.target, 10) || 0;
      if (REDUCED) { el.textContent = target; return; }
      const t0 = performance.now(), dur = 1300;
      (function tick(t) {
        const p = Math.min(1, (t - t0) / dur);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased);
        if (p < 1) requestAnimationFrame(tick);
      })(t0);
    });
  }

  /* ------------------------------- about ------------------------------- */
  function renderAbout() {
    $("#aboutLead").textContent = D.about.lead;
    $("#aboutSub").textContent = D.about.sub;
    $("#aboutCards").innerHTML = D.about.facts.map((f) => `
      <div class="fact-card reveal">
        <div class="fact-label">${esc(f.label)}</div>
        <div class="fact-value">${esc(f.value)}</div>
      </div>`).join("");
    $("#aboutMeta").innerHTML = [
      `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 21s-7-5.5-7-11a7 7 0 1 1 14 0c0 5.5-7 11-7 11Z" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="10" r="2.6" stroke="currentColor" stroke-width="1.8"/></svg> ${esc(D.location)}`,
      `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.8"/><path d="M12 7v5l3.5 2" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg> ${esc(D.timezone)}`,
    ].map((s) => `<span class="chip">${s}</span>`).join("");
  }

  /* ------------------------------- skills ------------------------------ */
  function renderSkills() {
    $("#skillsGrid").innerHTML = D.skills.map((c) => `
      <div class="skill-card reveal" data-accent="${c.accent}">
        <div class="skill-head">
          <span class="skill-cat">${esc(c.category)}</span>
          <span class="skill-blurb">${esc(c.blurb)}</span>
        </div>
        <div class="skill-tags">${c.items.map((t) => `<span class="tag">${esc(t)}</span>`).join("")}</div>
      </div>`).join("");
  }

  /* ------------------------------ projects ----------------------------- */
  const ICON_GH = `<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.9 10.9c.6.1.8-.2.8-.5v-2c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.4-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 0 1 5.8 0C17 5.6 18 5.9 18 5.9c.6 1.6.2 2.8.1 3.1.7.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.2c0 .3.2.6.8.5A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5Z"/></svg>`;
  const ICON_LIVE = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

  function renderProjects() {
    $("#projectsList").innerHTML = D.projects.map((p, i) => `
      <article class="project reveal ${i % 2 ? "flip" : ""}" data-no="${p.no}">
        <div class="project-media">
          <p class="project-media-title">${esc(p.visual.title)}</p>
          ${window.Visuals.build(p.visual)}
        </div>
        <div class="project-body">
          <p class="project-tag">${esc(p.tag)} · ${esc(p.year)}</p>
          <h3 class="project-title">${esc(p.title)}</h3>
          <p class="project-one">${esc(p.oneLiner)}</p>
          <p class="project-section-label">Approach</p>
          <p class="project-problem">${esc(p.approach)}</p>
          <div class="project-metrics">
            ${p.metrics.map((m) => `<div class="metric"><div class="metric-value">${esc(m.value)}</div><div class="metric-label">${esc(m.label)}</div></div>`).join("")}
          </div>
          <div class="project-tech">${p.tech.map((t) => `<span class="tag">${esc(t)}</span>`).join("")}</div>
          <div class="project-foot">
            <button class="project-link primary" data-open="${p.id}">Full Case Study
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </button>
            <a class="project-link" href="${esc(p.github)}" target="_blank" rel="noopener">${ICON_GH} GitHub</a>
            ${p.live ? `<a class="project-link" href="${esc(p.live)}" target="_blank" rel="noopener">${ICON_LIVE} Live Demo</a>` : ""}
          </div>
        </div>
      </article>`).join("");

    const more = $("#moreProjects");
    more.href = D.moreProjectsUrl;
    more.textContent = D.moreProjectsLabel;
  }

  /* ------------------------- experience & certs ------------------------ */
  function renderExperience() {
    $("#timeline").innerHTML = D.experience.map((e) => `
      <div class="timeline-item reveal">
        <div class="timeline-period">${esc(e.period)}</div>
        <div class="timeline-kind">${esc(e.kind)}</div>
        <div class="timeline-title">${esc(e.title)}</div>
        <div class="timeline-org">${esc(e.org)}</div>
        <ul class="timeline-points">${e.points.map((p) => `<li>${esc(p)}</li>`).join("")}</ul>
      </div>`).join("");

    const CERT_ICON = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="9" r="5.4" stroke="currentColor" stroke-width="1.7"/><path d="m8.8 13.5-1.6 6 4.8-2.6 4.8 2.6-1.6-6" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>`;
    $("#certs").innerHTML = D.certifications.map((c) => `
      <div class="cert reveal">
        <div class="cert-badge">${CERT_ICON}</div>
        <div>
          <div class="cert-name">${esc(c.name)}</div>
          <div class="cert-issuer">${esc(c.issuer)}</div>
        </div>
        <span class="cert-year">${esc(c.year)}</span>
      </div>`).join("");
  }

  /* --------------------- coding, contributions, achv. ------------------- */
  function renderCoding() {
    $("#codingHeadline").textContent = D.coding.headline;
    $("#codingCaption").textContent = D.coding.caption;
    $("#codingGrid").innerHTML = D.coding.platforms.map((p) => `
      <a class="code-card reveal" href="${esc(p.url)}" target="_blank" rel="noopener">
        <div class="code-platform">${esc(p.name)}</div>
        <div class="code-stat">${esc(p.stat)}</div>
        <div class="code-label">${esc(p.label)}</div>
        <div class="code-arrow"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
      </a>`).join("");

    // decorative contribution-style grid (clearly labelled illustrative in data)
    let seed = 987654321;
    const rnd = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };
    let cells = "";
    for (let i = 0; i < 7 * 38; i++) {
      const r = rnd();
      const level = r > 0.92 ? 4 : r > 0.78 ? 3 : r > 0.55 ? 2 : r > 0.38 ? 1 : 0;
      const violet = level === 0 && rnd() > 0.986;
      cells += `<span class="contrib-cell${violet ? " v" + (rnd() > 0.5 ? 1 : 2) : level ? " l" + level : ""}"></span>`;
    }
    $("#contribWrap").innerHTML = cells;

    $("#achGrid").innerHTML = D.achievements.map((a, i) => `
      <div class="ach-card reveal">
        <div class="ach-index">0${i + 1}</div>
        <div class="ach-title">${esc(a.title)}</div>
        <div class="ach-detail">${esc(a.detail)}</div>
      </div>`).join("");
  }

  /* ------------------------------- journey ------------------------------ */
  function renderJourney() {
    $("#journeyTrack").innerHTML = D.journey.map((j, i) => `
      <div class="journey-node reveal">
        <div class="journey-dot">0${i + 1}</div>
        <div class="journey-stage">${esc(j.stage)} · ${esc(j.state)}</div>
        <div class="journey-title">${esc(j.title)}</div>
        <p class="journey-desc">${esc(j.desc)}</p>
        <div class="journey-skills">${j.skills.map((s) => `<span class="tag">${esc(s)}</span>`).join("")}</div>
      </div>`).join("");
  }

  /* ---------------------------- CTA & contact --------------------------- */
  function renderCtaContact() {
    $("#ctaTitle").textContent = D.cta.title;
    $("#ctaLine").textContent = D.cta.line;
    const email = $("#contactEmail");
    email.href = `mailto:${D.email}`;
    $("#emailValue").textContent = D.email;
    $$(".contact-card[data-key] .contact-value").forEach((el) => {
      const key = el.closest(".contact-card").dataset.key;
      el.textContent = key === "linkedin" ? D.linkedin.replace("https://www.linkedin.com/in/", "/in/") : D.github.replace("https://github.com/", "@");
    });
    $("#year").textContent = new Date().getFullYear();
    $("#footerName").textContent = D.name;
  }

  /* -------------------------------- modal ------------------------------- */
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
    modalBody.innerHTML = `
      <p class="modal-eyebrow">${esc(p.tag)} · ${esc(p.year)} · Project ${p.no}</p>
      <h3 class="modal-title" id="modalTitle">${esc(p.title)}</h3>
      <div class="modal-tags">${p.tech.map((t) => `<span class="tag">${esc(t)}</span>`).join("")}</div>
      <div class="modal-visual">
        <p class="project-media-title">${esc(p.visual.title)}</p>
        ${window.Visuals.build(p.visual)}
      </div>
      <div class="modal-grid">
        ${block("Problem", p.problem, "full")}
        ${block("Dataset", p.dataset)}
        ${block("My Role", p.role)}
        ${block("Preprocessing", p.preprocessing)}
        ${block("Approach", p.approach)}
        ${block("Model", p.model)}
        ${block("Evaluation", p.evaluation)}
        <div class="modal-block full">
          <div class="modal-block-label">Results & Outcomes</div>
          <ul class="modal-results">${p.results.map((r) => `<li>${esc(r)}</li>`).join("")}</ul>
        </div>
      </div>
      <div class="project-metrics" style="margin-top:30px">
        ${p.metrics.map((m) => `<div class="metric"><div class="metric-value">${esc(m.value)}</div><div class="metric-label">${esc(m.label)}</div></div>`).join("")}
      </div>
      <div class="modal-foot">
        <a class="btn btn-primary" href="${esc(p.github)}" target="_blank" rel="noopener">${ICON_GH} View on GitHub</a>
        ${p.live ? `<a class="btn btn-ghost" href="${esc(p.live)}" target="_blank" rel="noopener">${ICON_LIVE} Open Live Demo</a>` : ""}
      </div>`;
    modal.hidden = false;
    document.body.classList.add("modal-open");
    $(".modal-panel").scrollTop = 0;
    $("#modalClose").focus();
  }

  function closeModal() {
    modal.hidden = true;
    document.body.classList.remove("modal-open");
    if (lastFocus) lastFocus.focus();
  }

  /* --------------------------- nav & scrolling -------------------------- */
  function initNav() {
    const nav = $("#nav"), toggle = $("#navToggle"), links = $("#navLinks");
    const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

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

    // scroll-spy
    const map = new Map($$(".nav-link").map((l) => [l.getAttribute("href").slice(1), l]));
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          $$(".nav-link").forEach((l) => l.classList.remove("is-active"));
          const link = map.get(en.target.id);
          if (link) link.classList.add("is-active");
        }
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    ["home", "about", "skills", "projects", "experience", "achievements", "contact"]
      .forEach((id) => { const s = document.getElementById(id); if (s) spy.observe(s); });
  }

  /* ------------------------------ reveals ------------------------------- */
  function initReveals() {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    $$(".reveal").forEach((el) => io.observe(el));
    const statsIO = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { countUp(); statsIO.disconnect(); } });
    }, { threshold: 0.4 });
    const hs = $("#heroStats");
    if (hs) statsIO.observe(hs);
  }

  /* -------------------------- magnetic buttons -------------------------- */
  function initMagnetic() {
    if (TOUCH || REDUCED) return;
    $$(".magnetic").forEach((btn) => {
      btn.addEventListener("mousemove", (e) => {
        const r = btn.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width / 2) * 0.18;
        const y = (e.clientY - r.top - r.height / 2) * 0.28;
        btn.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
      });
      btn.addEventListener("mouseleave", () => { btn.style.transform = ""; });
    });
  }

  /* --------------------------- hero particles --------------------------- */
  function initCanvas() {
    const cv = $("#heroCanvas");
    if (!cv) return;
    const ctx = cv.getContext("2d");
    let W, H, nodes = [], raf = null, running = false;
    const mouse = { x: -9999, y: -9999 };

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = cv.clientWidth; H = cv.clientHeight;
      cv.width = W * dpr; cv.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(85, Math.max(30, Math.floor((W * H) / 16000)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35,
        r: 1 + Math.random() * 1.6, violet: Math.random() > 0.82,
      }));
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      const LINK = 130;
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        if (running && !REDUCED) {
          n.x += n.vx; n.y += n.vy;
          if (n.x < -20) n.x = W + 20; if (n.x > W + 20) n.x = -20;
          if (n.y < -20) n.y = H + 20; if (n.y > H + 20) n.y = -20;
        }
        for (let j = i + 1; j < nodes.length; j++) {
          const m = nodes[j], dx = n.x - m.x, dy = n.y - m.y;
          const d = Math.hypot(dx, dy);
          if (d < LINK) {
            const a = (1 - d / LINK) * 0.16;
            ctx.strokeStyle = n.violet || m.violet ? `rgba(139,92,246,${a})` : `rgba(56,189,248,${a})`;
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(n.x, n.y); ctx.lineTo(m.x, m.y); ctx.stroke();
          }
        }
        // faint links to cursor
        const md = Math.hypot(n.x - mouse.x, n.y - mouse.y);
        if (md < 170) {
          ctx.strokeStyle = `rgba(56,189,248,${(1 - md / 170) * 0.22})`;
          ctx.beginPath(); ctx.moveTo(n.x, n.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
        }
        ctx.fillStyle = n.violet ? "rgba(139,92,246,.75)" : "rgba(56,189,248,.7)";
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2); ctx.fill();
      }
      if (running && !REDUCED) raf = requestAnimationFrame(draw);
    }

    function start() { if (!running) { running = true; draw(); } }
    function stop() { running = false; if (raf) cancelAnimationFrame(raf); }

    resize();
    window.addEventListener("resize", () => { resize(); if (!running) draw(); }, { passive: true });
    $(".hero").addEventListener("mousemove", (e) => {
      const r = cv.getBoundingClientRect();
      mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
    });
    $(".hero").addEventListener("mouseleave", () => { mouse.x = -9999; mouse.y = -9999; });

    const vis = new IntersectionObserver((en) => (en[0].isIntersecting ? start() : stop()));
    vis.observe(cv);
    document.addEventListener("visibilitychange", () => (document.hidden ? stop() : start()));
    if (REDUCED) { running = true; draw(); running = false; }
  }

  /* -------------------------------- boot ------------------------------- */
  function init() {
    bindLinks();
    renderHero();
    renderAbout();
    renderSkills();
    renderProjects();
    renderExperience();
    renderCoding();
    renderJourney();
    renderCtaContact();
    initNav();
    initReveals();
    initMagnetic();
    initCanvas();

    document.addEventListener("click", (e) => {
      const opener = e.target.closest("[data-open]");
      if (opener) openModal(opener.dataset.open);
    });
    $("#modalClose").addEventListener("click", closeModal);
    modal.addEventListener("click", (e) => { if (e.target.hasAttribute("data-close")) closeModal(); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !modal.hidden) closeModal(); });
  }

  document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", init) : init();
})();
