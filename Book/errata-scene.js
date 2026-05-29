/* ============================================================
   ERRATA · CDIV — Construção e interação das cenas de livros 3D
   JS vanilla. Constrói o DOM dos livros, aplica jitter orgânico,
   e dispara a queda/leque no hover (ou toque).
   ============================================================ */
(function () {
  "use strict";

  var root = document.documentElement;
  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var isTouch = window.matchMedia("(hover: none)").matches;
  var rnd = function (a, b) { return a + Math.random() * (b - a); };

  /* ---- Títulos-fantasma no tom do catálogo ---- */
  var GHOST = [
    "Marginália", "Fólio Perdido", "Errata", "Hors-texte", "Glosa",
    "Colofão", "Apêndice", "Lacuna", "Index", "Vol. Incerto", "Frontispício"
  ];
  var ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI"];

  /* ---- Texto da lombada conforme o modo (numerals | titles | blank) ---- */
  function spineLabel(meta) {
    var mode = root.getAttribute("data-spines") || "numerals";
    if (mode === "blank") return "";
    if (meta.glyph) return '<span class="spine-label">' + meta.glyph + "</span>";
    if (mode === "numerals") {
      if (meta.accent) {
        return '<span class="spine-label">Errata <span class="num">CDIV</span></span>';
      }
      return '<span class="spine-label"><span class="num">VOL.</span> ' + (meta.roman || "—") + "</span>";
    }
    // titles
    var t = meta.title || "—";
    return '<span class="spine-label">' + t + ' <span class="num">' + (meta.roman || "") + "</span></span>";
  }

  /* ---- Cria um livro (cuboide) ---- */
  function makeBook(opts) {
    var b = document.createElement("div");
    b.className = "book " + (opts.tone || "t1") + (opts.cls ? " " + opts.cls : "");
    b.style.setProperty("--w", opts.w + "px");
    b.style.setProperty("--d", opts.d + "px");
    b.style.setProperty("--t", opts.t + "px");
    b.style.setProperty("--i", opts.i || 0);
    if (opts.jx != null) b.style.setProperty("--jx", opts.jx + "px");
    if (opts.jrz != null) b.style.setProperty("--jrz", opts.jrz + "deg");
    if (opts.jyaw != null) b.style.setProperty("--jyaw", opts.jyaw + "deg");
    if (opts.sx != null) b.style.setProperty("--sx", opts.sx + "px");
    if (opts.lean != null) b.style.setProperty("--lean", opts.lean + "deg");
    b._meta = opts.meta || {};

    var spine =
      '<div class="face face--cover"></div>' +
      '<div class="face face--base"></div>' +
      '<div class="face face--spine"><span class="rule t"></span>' +
        spineLabel(b._meta) +
        '<span class="rule b"></span></div>' +
      '<div class="face face--back"></div>' +
      '<div class="face face--fore"></div>' +
      '<div class="face face--head"></div>';
    b.innerHTML = spine;
    return b;
  }

  /* relabela só a lombada (ao trocar o modo de lombada) */
  function relabel(book) {
    var spineFace = book.querySelector(".face--spine");
    if (!spineFace) return;
    spineFace.innerHTML =
      '<span class="rule t"></span>' + spineLabel(book._meta) + '<span class="rule b"></span>';
  }

  /* ============================================================
     CENA A — COLAPSO: 3 pilhas que tombam
     ============================================================ */
  function buildCollapse(scene) {
    scene.innerHTML = "";
    var W = 162, D = 208, T = 24;
    var stacks = [
      { x: -188, z: 36, n: 5, accentAt: 2 },
      { x: 6, z: -34, n: 4, accentAt: -1 },
      { x: 196, z: 58, n: 6, accentAt: 4 }
    ];
    var gi = 0;
    stacks.forEach(function (s) {
      var stack = document.createElement("div");
      stack.className = "stack";
      stack.style.setProperty("--stack-x", s.x + "px");
      stack.style.setProperty("--stack-z", s.z + "px");
      for (var i = 0; i < s.n; i++) {
        var accent = i === s.accentAt;
        var meta = accent
          ? { accent: true }
          : { roman: ROMAN[gi % ROMAN.length], title: GHOST[gi % GHOST.length] };
        gi++;
        var bk = makeBook({
          w: W + rnd(-8, 8), d: D + rnd(-6, 6), t: T + rnd(-2, 3), i: i,
          tone: accent ? "accent" : "t" + (1 + (i % 4)),
          cls: accent ? "accent" : "",
          jx: rnd(-7, 7), jrz: rnd(-2.2, 2.2), jyaw: rnd(-3, 3),
          meta: meta
        });
        stack.appendChild(bk);
      }
      wireTopple(stack, "collapse");
      scene.appendChild(stack);
    });
  }

  /* ============================================================
     CENA B — O VOLUME AUSENTE: 1 pilha alta, 1 volume salta
     ============================================================ */
  function buildEject(scene) {
    scene.innerHTML = "";
    var W = 176, D = 224, T = 28, N = 7, ejectAt = 3;
    var stack = document.createElement("div");
    stack.className = "stack";
    stack.style.setProperty("--stack-x", "0px");
    stack.style.setProperty("--stack-z", "0px");
    for (var i = 0; i < N; i++) {
      var isEject = i === ejectAt;
      var cls = isEject ? "ejecting accent" : (i > ejectAt ? "above" : "");
      var tone = isEject ? "accent" : "t" + (1 + (i % 4));
      var meta = isEject
        ? { accent: true, glyph: '<span class="spine-label" style="font-size:17px">Hors <em style="font-style:italic">catalogue</em></span>' }
        : { roman: ROMAN[i % ROMAN.length], title: GHOST[i % GHOST.length] };
      // O volume ejetado usa rótulo próprio — passo glyph já formatado
      var bk = makeBook({
        w: W + rnd(-6, 6), d: D + rnd(-5, 5), t: T + (isEject ? 4 : rnd(-2, 2)), i: i,
        tone: tone, cls: cls,
        jx: rnd(-5, 5), jrz: rnd(-1.4, 1.4), jyaw: rnd(-2, 2),
        meta: meta
      });
      stack.appendChild(bk);
    }
    wireTopple(stack, "eject");
    scene.appendChild(stack);
  }

  /* ============================================================
     CENA C — ESTANTE 404: livros em pé, leque revela 4 · 0 · 4
     ============================================================ */
  function buildShelf(scene) {
    scene.innerHTML = "";
    var shelf = document.createElement("div");
    shelf.className = "shelf";

    var plank = document.createElement("div");
    plank.className = "shelf-plank";
    shelf.appendChild(plank);

    // sequência: alguns finos, depois 4 0 4 em destaque, depois finos
    var seq = [
      { w: 32, glyph: null }, { w: 40, glyph: null }, { w: 28, glyph: null },
      { w: 56, glyph: "4" }, { w: 60, glyph: "0" }, { w: 56, glyph: "4" },
      { w: 30, glyph: null }, { w: 44, glyph: null }, { w: 34, glyph: null }
    ];
    var D = 150, H = 210;
    var total = seq.reduce(function (a, s) { return a + s.w + 6; }, 0);
    var x = -total / 2;
    var center = (seq.length - 1) / 2;
    seq.forEach(function (s, idx) {
      var h = s.glyph ? H : H + rnd(-34, 8);
      var sx = x + s.w / 2;
      x += s.w + 6;
      var meta = s.glyph
        ? { glyph: s.glyph }
        : { roman: ROMAN[idx % ROMAN.length], title: GHOST[idx % GHOST.length] };
      var bk = makeBook({
        w: s.w, d: D + rnd(-10, 10), t: h,
        tone: s.glyph ? "accent" : "t" + (1 + (idx % 4)),
        cls: s.glyph ? "glyph" : "",
        sx: sx, lean: s.glyph ? 0 : rnd(-2.5, 2.5),
        meta: meta
      });
      // direção do leque: relativa ao centro
      var dir = idx - center;
      bk.style.setProperty("--spread", (dir * rnd(18, 30)) + "px");
      bk.style.setProperty("--fan", (dir * rnd(5, 9)) + "deg");
      bk.style.setProperty("--rise", (-Math.abs(dir) * rnd(2, 6)) + "px");
      bk.style.setProperty("--fwd", (rnd(10, 60)) + "px");
      bk.style.setProperty("--fdelay", (Math.abs(dir) * 0.05) + "s");
      shelf.appendChild(bk);
    });
    wireTopple(shelf, "shelf");
    scene.appendChild(shelf);
  }

  /* ============================================================
     INTERAÇÃO — queda/leque com randomização escalonada
     ============================================================ */
  function scatter(group, kind) {
    var books = group.querySelectorAll(".book");
    var n = books.length;
    books.forEach(function (bk, i) {
      if (kind === "eject" || kind === "shelf") return; // poses fixas (CSS)
      // colapso: livros de cima caem mais longe e mais cedo
      var topness = (i + 1) / n;           // 0..1 (1 = topo)
      var sign = Math.random() < 0.5 ? -1 : 1;
      var dist = rnd(40, 150) * (0.4 + topness);
      bk.style.setProperty("--fx", (sign * dist + rnd(-30, 30)) + "px");
      bk.style.setProperty("--fz", (rnd(-60, 120) * topness) + "px");
      bk.style.setProperty("--fy", (rnd(8, 40) * topness) + "px");
      bk.style.setProperty("--frz", (sign * rnd(12, 46) * (0.5 + topness)) + "deg");
      bk.style.setProperty("--fpitch", (rnd(-10, 18)) + "deg");
      bk.style.setProperty("--fyaw", (rnd(-18, 18)) + "deg");
      bk.style.setProperty("--fdelay", ((1 - topness) * 0.16) + "s");
    });
  }

  function wireTopple(group, kind) {
    var on = function () {
      scatter(group, kind);
      group.classList.add("is-toppled");
    };
    var off = function () { group.classList.remove("is-toppled"); };

    if (isTouch) {
      group.addEventListener("click", function (e) {
        e.stopPropagation();
        var stage = group.closest(".stage");
        if (stage) stage.classList.add("touched");
        if (group.classList.contains("is-toppled")) off();
        else on();
      });
    } else {
      group.addEventListener("pointerenter", on);
      group.addEventListener("pointerleave", off);
    }
  }

  /* ============================================================
     BUILD + REBUILD
     ============================================================ */
  function buildAll() {
    var c = document.querySelector('.scene[data-for="collapse"]');
    var e = document.querySelector('.scene[data-for="eject"]');
    var s = document.querySelector('.scene[data-for="shelf"]');
    if (c) buildCollapse(c);
    if (e) buildEject(e);
    if (s) buildShelf(s);
  }

  function relabelAll() {
    document.querySelectorAll(".book").forEach(relabel);
  }

  /* ---- Ação de clique no palco (hover devices) ---- */
  function wireStageClick() {
    var stage = document.querySelector(".stage");
    if (!stage || isTouch) return;
    stage.addEventListener("click", function () {
      var action = root.getAttribute("data-click") || "home";
      if (action === "home") {
        window.location.href = "index.html";
      } else if (action === "restack") {
        // re-derruba e reassenta (gesto lúdico)
        document.querySelectorAll(".is-toppled").forEach(function (g) {
          g.classList.remove("is-toppled");
        });
      }
    });
  }

  /* ---- Reage a mudanças dos Tweaks (data-spines exige relabel) ---- */
  function observeTweaks() {
    var last = root.getAttribute("data-spines");
    var mo = new MutationObserver(function () {
      var now = root.getAttribute("data-spines");
      if (now !== last) { last = now; relabelAll(); }
    });
    mo.observe(root, { attributes: true, attributeFilter: ["data-spines"] });
    // também via evento same-window do painel
    window.addEventListener("tweakchange", function (ev) {
      if (ev.detail && "spines" in ev.detail) relabelAll();
    });
  }

  function init() {
    buildAll();
    wireStageClick();
    observeTweaks();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
