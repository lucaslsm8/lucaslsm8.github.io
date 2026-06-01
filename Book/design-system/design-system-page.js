/* ============================================================
   DESIGN SYSTEM — SPECIMEN PAGE  ·  behaviour + token data
   Vanilla JS, no build step. Token data mirrors tokens.css so
   the rendered grids and the Figma export stay in lock-step.
   ============================================================ */
(function () {
  "use strict";

  /* ---------------------------------------------------------
     1. TOKEN DATA  (single in-page mirror of tokens.css)
     --------------------------------------------------------- */
  var COLORS = [
    { tok: "--paper",           hex: "#f1ece0", use: "Primary background — warm cream" },
    { tok: "--paper-shade",     hex: "#e8e1cd", use: "Raised surfaces — cards, colophon" },
    { tok: "--paper-deep",      hex: "#ddd4bd", use: "Deepest paper shadow" },
    { tok: "--paper-card",      hex: "#f7f2e3", use: "Letter / card surface — lighter than paper" },
    { tok: "--ink",             hex: "#1a1612", use: "Primary text, strong rules" },
    { tok: "--ink-soft",        hex: "#4a4136", use: "Secondary text" },
    { tok: "--ink-faint",       hex: "#8b7f6e", use: "Captions, metadata" },
    { tok: "--ink-ghost",       hex: "#c4b8a0", use: "Disabled, dotted leaders" },
    { tok: "--oxblood",         hex: "#7a2620", use: "Accent — drop caps, ornament, hover" },
    { tok: "--oxblood-deep",    hex: "#5a1814", use: "Deep accent — oxblood link hover" },
    { tok: "--cobalt",          hex: "#1d3a78", use: "Secondary accent" },
    { tok: "--highlighter",     hex: "#f5e3a8", use: "Marker, ::selection" },
    { tok: "--hairline",        hex: "rgba(26,22,18,0.14)", use: "Subtle dividers" },
    { tok: "--hairline-strong", hex: "rgba(26,22,18,0.28)", use: "Primary dividers" }
  ];

  var FONTS = [
    { name: "EB Garamond",     tok: "--serif",         css: "var(--serif)",         aa: "Aa", set: "The quick brown fox", glyphs: "abcdefg · 0123456789 · &?!", use: "Body, gloss, captions, paragraphs" },
    { name: "Instrument Serif", tok: "--serif-display", css: "var(--serif-display)", aa: "Aa", set: "Catalogue of Works", glyphs: "I · II · III · IV · V · VI", use: "Display titles, drop caps, roman numerals" },
    { name: "JetBrains Mono",  tok: "--mono",          css: "var(--mono)",          aa: "Aa", set: "PLATE IV · FIG. 1", glyphs: "abc · 012 · ()[]{}/", use: "Metadata, counters, labels, numbers" }
  ];

  var TYPE = [
    { tok: "--fs-caption", px: 10,  use: "Metadata, page counters" },
    { tok: "--fs-small",   px: 11,  use: "Labels, chrome" },
    { tok: "--fs-meta",    px: 13,  use: "Gloss, attribution" },
    { tok: "--fs-body",    px: 19,  use: "Body copy" },
    { tok: "--fs-lead",    px: 22,  use: "Opening paragraphs" },
    { tok: "--fs-h4",      px: 24,  use: "Sub-heads" },
    { tok: "--fs-h3",      px: 36,  use: "Section heads" },
    { tok: "--fs-h2",      px: 56,  use: "Display H2" },
    { tok: "--fs-h1",      px: 120, use: "Frontispiece display" }
  ];

  var SPACING = [
    { tok: "--sp-1", px: 4 },  { tok: "--sp-2", px: 8 },   { tok: "--sp-3", px: 12 },
    { tok: "--sp-4", px: 16 }, { tok: "--sp-5", px: 24 },  { tok: "--sp-6", px: 32 },
    { tok: "--sp-7", px: 48 }, { tok: "--sp-8", px: 64 },  { tok: "--sp-9", px: 80 },
    { tok: "--sp-10", px: 96 },{ tok: "--sp-11", px: 120 },{ tok: "--sp-12", px: 160 }
  ];
  var SP_MAX = 160;

  var WIDTHS = [
    { tok: "--w-prose",  px: 640,  use: "Single text column" },
    { tok: "--w-narrow", px: 880,  use: "Narrow spread" },
    { tok: "--w-page",   px: 1280, use: "Main spread" }
  ];

  var RADII = [
    { tok: "--radius-none", val: "0",     css: "0" },
    { tok: "--radius-sm",   val: "2px",   css: "2px" },
    { tok: "--radius-md",   val: "4px",   css: "4px" },
    { tok: "--radius-pill", val: "999px", css: "999px" }
  ];

  var BORDERS = [
    { tok: "--border-hair",        val: "1px solid hairline",      style: "1px solid var(--hairline)" },
    { tok: "--border-hair-strong", val: "1px solid hairline-strong", style: "1px solid var(--hairline-strong)" },
    { tok: "--border-ink",         val: "1px solid ink",           style: "1px solid var(--ink)" },
    { tok: "--border-dotted",      val: "1px dotted ink-ghost",    style: "1px dotted var(--ink-ghost)" }
  ];

  var SHADOWS = [
    { tok: "--shadow-soft", val: "0 4px 12px / 8%",  style: "0 4px 12px rgba(26,22,18,0.08)" },
    { tok: "--shadow-lens", val: "ring + 0 16px 40px", style: "0 0 0 1px rgba(26,22,18,0.14), 0 16px 40px rgba(26,22,18,0.2)" }
  ];

  var EASINGS = [
    { tok: "--ease-out",    val: "cubic-bezier(0.22, 1, 0.36, 1)", use: "Hovers, micro-interactions" },
    { tok: "--ease-power",  val: "cubic-bezier(0.16, 1, 0.3, 1)",  use: "Reveal, content entrance" },
    { tok: "--ease-in-out", val: "cubic-bezier(0.65, 0, 0.35, 1)", use: "Loops, breathing" }
  ];
  var DURATIONS = [
    { tok: "--dur-fast", val: "200ms", use: "Colour, opacity" },
    { tok: "--dur-base", val: "300ms", use: "Default" },
    { tok: "--dur-slow", val: "600ms", use: "Reveal" },
    { tok: "--dur-page", val: "1000ms", use: "Page animations" }
  ];

  var ZINDEX = [
    { tok: "--z-cursor",  val: 100, use: "Custom cursor glyph (top)" },
    { tok: "--z-lens",    val: 99,  use: "Magnifier lens" },
    { tok: "--z-chrome",  val: 50,  use: "Fixed running head & footer" },
    { tok: "--z-content", val: 2,   use: "Page content" }
  ];

  /* ---------------------------------------------------------
     2. HELPERS
     --------------------------------------------------------- */
  function el(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }
  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function ROMAN(n) {
    var map = [[1000,"M"],[900,"CM"],[500,"D"],[400,"CD"],[100,"C"],[90,"XC"],[50,"L"],[40,"XL"],[10,"X"],[9,"IX"],[5,"V"],[4,"IV"],[1,"I"]];
    var out = ""; for (var i=0;i<map.length;i++){ while(n>=map[i][0]){ out+=map[i][1]; n-=map[i][0]; } } return out;
  }

  /* ---------------------------------------------------------
     3. COPY TO CLIPBOARD  (+ toast)
     --------------------------------------------------------- */
  var toast = el("div", "toast");
  document.addEventListener("DOMContentLoaded", function () { document.body.appendChild(toast); });
  var toastTimer;
  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove("show"); }, 1600);
  }
  function copy(text) {
    var done = function () { showToast("Copied  " + text); };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done, function () { fallback(text); done(); });
    } else { fallback(text); done(); }
  }
  function fallback(text) {
    var ta = el("textarea"); ta.value = text;
    ta.style.position = "fixed"; ta.style.opacity = "0";
    document.body.appendChild(ta); ta.select();
    try { document.execCommand("copy"); } catch (e) {}
    document.body.removeChild(ta);
  }
  // Any element with data-copy copies its value on click
  document.addEventListener("click", function (e) {
    var t = e.target.closest("[data-copy]");
    if (t) { copy(t.getAttribute("data-copy")); }
  });

  /* ---------------------------------------------------------
     4. RENDERERS
     --------------------------------------------------------- */
  function renderColors() {
    var grid = $("#color-grid"); if (!grid) return;
    COLORS.forEach(function (c) {
      var btn = el("button", "swatch");
      btn.setAttribute("data-copy", "var(" + c.tok + ")");
      btn.setAttribute("title", "Click to copy var(" + c.tok + ")");
      var chip = el("div", "chip");
      chip.style.background = "var(" + c.tok + ")";
      btn.appendChild(chip);
      var meta = el("div", "meta");
      meta.appendChild(el("span", "tok", c.tok));
      meta.appendChild(el("span", "val", c.hex));
      meta.appendChild(el("span", "use", c.use));
      btn.appendChild(meta);
      grid.appendChild(btn);
    });
    var cnt = $("#color-count"); if (cnt) cnt.textContent = COLORS.length + " tokens";
  }

  function renderFonts() {
    var wrap = $("#font-families"); if (!wrap) return;
    FONTS.forEach(function (f) {
      var card = el("div", "font-family-card");
      var meta = el("div", "ff-meta");
      meta.appendChild(el("h3", "ff-name serif-display", f.name));
      var tk = el("div", "ff-tok"); tk.textContent = f.tok;
      tk.setAttribute("data-copy", "var(" + f.tok + ")");
      tk.setAttribute("title", "Copy var(" + f.tok + ")");
      meta.appendChild(tk);
      meta.appendChild(el("div", "ff-use", f.use));
      card.appendChild(meta);
      var spec = el("div", "ff-specimen");
      spec.style.fontFamily = f.css;
      spec.appendChild(el("div", "ff-aa", f.aa));
      spec.appendChild(el("div", "ff-set", f.set));
      spec.appendChild(el("div", "ff-glyphs", f.glyphs));
      card.appendChild(spec);
      wrap.appendChild(card);
    });
  }

  function renderTypeScale() {
    var wrap = $("#type-scale"); if (!wrap) return;
    TYPE.forEach(function (t) {
      var row = el("div", "type-row");
      row.setAttribute("data-copy", "var(" + t.tok + ")");
      var info = el("div", "type-info");
      info.appendChild(el("span", "type-tok", t.tok));
      info.appendChild(el("span", "type-px", t.px + "px · " + t.use));
      row.appendChild(info);
      var sample = el("div", "type-sample serif-display", "Catalogue of Works");
      sample.style.fontSize = Math.min(t.px, 72) + "px";
      row.appendChild(sample);
      wrap.appendChild(row);
    });
  }

  function renderSpacing() {
    var wrap = $("#spacing-scale"); if (!wrap) return;
    SPACING.forEach(function (s) {
      var row = el("div", "spacing-row");
      row.setAttribute("data-copy", "var(" + s.tok + ")");
      row.appendChild(el("span", "sp-tok", s.tok));
      row.appendChild(el("span", "sp-px", s.px + "px"));
      var barWrap = el("div");
      var bar = el("div", "sp-bar");
      bar.style.width = (s.px / SP_MAX * 100) + "%";
      barWrap.appendChild(bar);
      row.appendChild(barWrap);
      wrap.appendChild(row);
    });
    var wwrap = $("#width-scale"); if (!wwrap) return;
    WIDTHS.forEach(function (w) {
      var row = el("div", "width-row");
      row.setAttribute("data-copy", "var(" + w.tok + ")");
      var head = el("div", "wr-head");
      head.appendChild(el("span", "wr-tok", w.tok + "  ·  " + w.use));
      head.appendChild(el("span", "wr-val", w.px + "px"));
      row.appendChild(head);
      var bar = el("div", "wr-bar");
      bar.style.width = (w.px / 1280 * 100) + "%";
      row.appendChild(bar);
      wwrap.appendChild(row);
    });
  }

  function renderRadiiBorders() {
    var rwrap = $("#radius-cards");
    if (rwrap) RADII.forEach(function (r) {
      var card = el("div", "spec-card");
      card.setAttribute("data-copy", "var(" + r.tok + ")");
      var demo = el("div", "demo");
      var box = el("div", "demo-box");
      box.style.borderRadius = r.css;
      if (r.tok === "--radius-pill") { box.style.width = "100px"; box.style.height = "40px"; }
      demo.appendChild(box); card.appendChild(demo);
      card.appendChild(el("span", "tok", r.tok));
      card.appendChild(el("span", "val", r.val));
      rwrap.appendChild(card);
    });
    var bwrap = $("#border-cards");
    if (bwrap) BORDERS.forEach(function (b) {
      var card = el("div", "spec-card");
      card.setAttribute("data-copy", "var(" + b.tok + ")");
      var demo = el("div", "demo");
      var box = el("div", "demo-box");
      box.style.border = b.style; box.style.background = "var(--paper)";
      demo.appendChild(box); card.appendChild(demo);
      card.appendChild(el("span", "tok", b.tok));
      card.appendChild(el("span", "val", b.val));
      bwrap.appendChild(card);
    });
    var swrap = $("#shadow-cards");
    if (swrap) SHADOWS.forEach(function (s) {
      var card = el("div", "spec-card");
      card.setAttribute("data-copy", "var(" + s.tok + ")");
      var demo = el("div", "demo");
      var box = el("div", "demo-box");
      box.style.boxShadow = s.style; box.style.background = "var(--paper)"; box.style.border = "0";
      demo.appendChild(box); card.appendChild(demo);
      card.appendChild(el("span", "tok", s.tok));
      card.appendChild(el("span", "val", s.val));
      swrap.appendChild(card);
    });
  }

  function renderMotion() {
    var ewrap = $("#easing-cards");
    if (ewrap) EASINGS.forEach(function (m) {
      var card = el("div", "motion-card");
      card.style.setProperty("--m-ease", m.val);
      card.style.setProperty("--m-dur", "900ms");
      card.appendChild(el("span", "tok", m.tok));
      var track = el("div", "track"); track.appendChild(el("div", "dot")); card.appendChild(track);
      card.appendChild(el("span", "val", m.val));
      card.appendChild(el("span", "hint", "Hover to preview  ·  click to copy"));
      wireMotion(card, "var(" + m.tok + ")");
      ewrap.appendChild(card);
    });
    var dwrap = $("#duration-cards");
    if (dwrap) DURATIONS.forEach(function (m) {
      var card = el("div", "motion-card");
      card.style.setProperty("--m-ease", "var(--ease-out)");
      card.style.setProperty("--m-dur", m.val);
      card.appendChild(el("span", "tok", m.tok));
      var track = el("div", "track"); track.appendChild(el("div", "dot")); card.appendChild(track);
      card.appendChild(el("span", "val", m.val + "  ·  " + m.use));
      card.appendChild(el("span", "hint", "Hover to preview  ·  click to copy"));
      wireMotion(card, "var(" + m.tok + ")");
      dwrap.appendChild(card);
    });
  }
  function wireMotion(card, copyVal) {
    var replay = function () {
      card.classList.remove("run"); void card.offsetWidth; card.classList.add("run");
    };
    card.addEventListener("mouseenter", replay);
    card.addEventListener("click", function () { copy(copyVal); replay(); });
  }

  function renderZ() {
    var wrap = $("#z-stack"); if (!wrap) return;
    ZINDEX.forEach(function (z) {
      var row = el("div", "z-row");
      row.setAttribute("data-copy", "var(" + z.tok + ")");
      var left = el("div");
      left.style.display = "flex"; left.style.alignItems = "baseline";
      left.appendChild(el("span", "z-tok", z.tok));
      left.appendChild(el("span", "z-desc", z.use));
      row.appendChild(left);
      row.appendChild(el("span", "z-val", String(z.val)));
      wrap.appendChild(row);
    });
  }

  /* ---------------------------------------------------------
     5. COUNT-UP (marginalia stats + footnote interplay)
     --------------------------------------------------------- */
  function initCountUp() {
    var els = document.querySelectorAll("[data-count]");
    if (!("IntersectionObserver" in window)) { els.forEach(function(e){ e.textContent = e.getAttribute("data-count"); }); return; }
    var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var node = en.target, target = parseFloat(node.getAttribute("data-count")),
            dec = parseInt(node.getAttribute("data-dec") || "0", 10);
        io.unobserve(node);
        if (reduce) { node.textContent = target.toFixed(dec); return; }
        var start = performance.now(), dur = 1400;
        (function step(now) {
          var p = Math.min((now - start) / dur, 1);
          var eased = 1 - Math.pow(1 - p, 3);
          node.textContent = (target * eased).toFixed(dec);
          if (p < 1) requestAnimationFrame(step);
          else node.textContent = target.toFixed(dec);
        })(performance.now());
      });
    }, { threshold: 0.6 });
    els.forEach(function (e) { io.observe(e); });
  }

  /* ---------------------------------------------------------
     6. FOOTNOTE highlight interplay
     --------------------------------------------------------- */
  function initFootnotes() {
    document.querySelectorAll(".fn[data-fn]").forEach(function (fn) {
      var id = fn.getAttribute("data-fn");
      var item = document.querySelector('.fn-item[data-fn="' + id + '"]');
      if (!item) return;
      var on = function () { item.classList.add("lit"); };
      var off = function () { item.classList.remove("lit"); };
      fn.addEventListener("mouseenter", on); fn.addEventListener("mouseleave", off);
      fn.addEventListener("focus", on); fn.addEventListener("blur", off);
    });
  }

  /* ---------------------------------------------------------
     7. READING MODE  (candle / accent) + persistence
     --------------------------------------------------------- */
  var LS_MODE = "ds-page-mode", LS_ACCENT = "ds-page-accent";
  function initModes() {
    var root = document.documentElement;
    var savedMode = localStorage.getItem(LS_MODE);
    var savedAccent = localStorage.getItem(LS_ACCENT);
    if (savedMode === "vela") root.setAttribute("data-mode", "vela");
    if (savedAccent === "cobalt") root.setAttribute("data-accent", "cobalt");

    var modeBtn = $("#mode-toggle");
    if (modeBtn) {
      var syncMode = function () {
        var vela = root.getAttribute("data-mode") === "vela";
        modeBtn.setAttribute("aria-pressed", vela ? "true" : "false");
        modeBtn.textContent = vela ? "Candle" : "Daylight";
      };
      syncMode();
      modeBtn.addEventListener("click", function () {
        var vela = root.getAttribute("data-mode") === "vela";
        if (vela) { root.removeAttribute("data-mode"); localStorage.setItem(LS_MODE, "day"); }
        else { root.setAttribute("data-mode", "vela"); localStorage.setItem(LS_MODE, "vela"); }
        syncMode();
      });
    }

    document.querySelectorAll(".swatch-btn[data-accent]").forEach(function (btn) {
      var acc = btn.getAttribute("data-accent");
      var sync = function () {
        var cur = root.getAttribute("data-accent") === "cobalt" ? "cobalt" : "oxblood";
        btn.setAttribute("aria-pressed", cur === acc ? "true" : "false");
      };
      sync();
      btn.addEventListener("click", function () {
        if (acc === "cobalt") root.setAttribute("data-accent", "cobalt");
        else root.removeAttribute("data-accent");
        localStorage.setItem(LS_ACCENT, acc);
        document.querySelectorAll(".swatch-btn[data-accent]").forEach(function (b) {
          var a = b.getAttribute("data-accent");
          var cur = root.getAttribute("data-accent") === "cobalt" ? "cobalt" : "oxblood";
          b.setAttribute("aria-pressed", cur === a ? "true" : "false");
        });
      });
    });
  }

  /* ---------------------------------------------------------
     8. SCROLLSPY + progress
     --------------------------------------------------------- */
  function initScrollSpy() {
    var sections = Array.prototype.slice.call(document.querySelectorAll("main .section[id]"));
    var hereLabel = $("#section-here b");
    var fill = $("#progress-fill");
    var ticking = false;
    function update() {
      ticking = false;
      var y = window.scrollY + window.innerHeight * 0.35;
      var current = sections[0];
      for (var i = 0; i < sections.length; i++) {
        if (sections[i].offsetTop <= y) current = sections[i];
      }
      if (current && hereLabel) {
        var name = current.getAttribute("data-label") || current.id;
        if (hereLabel.textContent !== name) hereLabel.textContent = name;
      }
      if (fill) {
        var docH = document.documentElement.scrollHeight - window.innerHeight;
        fill.style.width = Math.max(0, Math.min(1, window.scrollY / docH)) * 100 + "%";
      }
    }
    window.addEventListener("scroll", function () {
      if (!ticking) { requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
    window.addEventListener("resize", update);
    update();
  }

  /* ---------------------------------------------------------
     9. TOKENS STUDIO JSON EXPORT  (Figma plugin format)
     --------------------------------------------------------- */
  function buildTokensStudioJSON() {
    function c(v) { return { value: v, type: "color" }; }
    function fs(v) { return { value: String(v), type: "fontSizes" }; }
    function sp(v) { return { value: String(v), type: "spacing" }; }
    function sz(v) { return { value: String(v), type: "sizing" }; }
    function rad(v) { return { value: String(v), type: "borderRadius" }; }
    function dur(v) { return { value: String(v), type: "other" }; }
    function ff(v) { return { value: v, type: "fontFamilies" }; }
    function other(v) { return { value: v, type: "other" }; }

    var color = {};
    COLORS.forEach(function (k) { color[k.tok.replace(/^--/, "")] = c(k.hex); });

    var fontFamilies = {
      serif: ff("EB Garamond"),
      "serif-display": ff("Instrument Serif"),
      mono: ff("JetBrains Mono")
    };

    var fontSize = {};
    TYPE.forEach(function (t) { fontSize[t.tok.replace(/^--fs-/, "")] = fs(t.px); });

    var spacing = {};
    SPACING.forEach(function (s) { spacing[s.tok.replace(/^--sp-/, "")] = sp(s.px); });

    var sizing = {};
    WIDTHS.forEach(function (w) { sizing[w.tok.replace(/^--w-/, "")] = sz(w.px); });

    var borderRadius = {};
    RADII.forEach(function (r) { borderRadius[r.tok.replace(/^--radius-/, "")] = rad(r.css); });

    var lineHeights = {
      tight: other("1"), snug: other("1.2"), normal: other("1.5"), loose: other("1.6")
    };

    var easing = {};
    EASINGS.forEach(function (e) { easing[e.tok.replace(/^--ease-/, "")] = other(e.val); });
    var duration = {};
    DURATIONS.forEach(function (d) { duration[d.tok.replace(/^--dur-/, "")] = dur(d.val); });

    var zIndex = {};
    ZINDEX.forEach(function (z) { zIndex[z.tok.replace(/^--z-/, "")] = other(String(z.val)); });

    var boxShadow = {
      soft: { value: { x: "0", y: "4", blur: "12", spread: "0", color: "rgba(26,22,18,0.08)", type: "dropShadow" }, type: "boxShadow" }
    };

    var tokens = {
      "Lucas Schoenherr / Catalogue": {
        color: color,
        fontFamilies: fontFamilies,
        fontSize: fontSize,
        lineHeights: lineHeights,
        spacing: spacing,
        sizing: sizing,
        borderRadius: borderRadius,
        boxShadow: boxShadow,
        easing: easing,
        duration: duration,
        zIndex: zIndex
      },
      "$themes": [],
      "$metadata": {
        tokenSetOrder: ["Lucas Schoenherr / Catalogue"]
      }
    };
    return JSON.stringify(tokens, null, 2);
  }

  function initExport() {
    var btn = $("#download-tokens");
    if (btn) btn.addEventListener("click", function () {
      var blob = new Blob([buildTokensStudioJSON()], { type: "application/json" });
      var url = URL.createObjectURL(blob);
      var a = el("a"); a.href = url; a.download = "tokens.studio.json";
      document.body.appendChild(a); a.click(); document.body.removeChild(a);
      setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
      showToast("Downloaded  tokens.studio.json");
    });
    var copyBtn = $("#copy-tokens");
    if (copyBtn) copyBtn.addEventListener("click", function () {
      copy(buildTokensStudioJSON());
      showToast("Copied  Tokens Studio JSON");
    });
  }

  /* ---------------------------------------------------------
     10. BOOT
     --------------------------------------------------------- */
  function boot() {
    renderColors();
    renderFonts();
    renderTypeScale();
    renderSpacing();
    renderRadiiBorders();
    renderMotion();
    renderZ();
    initCountUp();
    initFootnotes();
    initModes();
    initScrollSpy();
    initExport();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
