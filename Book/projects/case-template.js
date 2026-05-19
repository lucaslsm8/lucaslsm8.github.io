// =============================================================
// case-template.js — Interações da página de case (livro antigo)
//
// Sem dependências externas. Sem build step. JS puro.
//
// Responsabilidades:
//   1. Reveal on scroll       (.reveal -> .reveal.in)
//   2. Marginalia em scroll   (.gloss aparece quando o parágrafo
//                              correspondente cruza a viewport)
//   3. Footnotes interativos  (hover/click em .fn destaca o
//                              .fn-item correspondente em .footnotes)
//   4. Lupa / lens            (.case-plate.lens-on -> .lens segue
//                              o cursor; só desktop com hover real)
//   5. Page progress          (--prog no chrome-bot)
// =============================================================

(function () {
  "use strict";

  // -----------------------------------------------------------
  // Helpers
  // -----------------------------------------------------------
  const $  = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const supportsHover = window.matchMedia("(hover: hover)").matches;

  // -----------------------------------------------------------
  // 1. Reveal on scroll
  // -----------------------------------------------------------
  function initReveal() {
    const els = $$(".reveal");
    if (!("IntersectionObserver" in window) || !els.length) {
      els.forEach((el) => el.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -80px 0px" }
    );
    els.forEach((el) => io.observe(el));
  }

  // -----------------------------------------------------------
  // 2. Marginalia em scroll
  //    Cada .gloss tem data-anchor="<id-do-paragrafo>".
  //    Quando o parágrafo correspondente entra na viewport,
  //    a gloss recebe .show.
  // -----------------------------------------------------------
  function initMarginalia() {
    const glosses = $$(".gloss[data-anchor]");
    if (!glosses.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id;
          const gloss = $(`.gloss[data-anchor="${id}"]`);
          if (!gloss) return;
          if (entry.isIntersecting) gloss.classList.add("show");
          else gloss.classList.remove("show");
        });
      },
      { threshold: 0.35 }
    );

    glosses.forEach((g) => {
      const id = g.getAttribute("data-anchor");
      const anchor = document.getElementById(id);
      if (anchor) io.observe(anchor);
    });
  }

  // -----------------------------------------------------------
  // 3. Footnotes interativos
  //    .fn[data-fn="1"] no corpo highlight + scroll para .fn-item[data-fn="1"]
  // -----------------------------------------------------------
  function initFootnotes() {
    const marks = $$(".fn[data-fn]");
    if (!marks.length) return;

    const activate = (n, on) => {
      const item = $(`.fn-item[data-fn="${n}"]`);
      if (item) item.classList.toggle("active", on);
    };

    marks.forEach((mark) => {
      const n = mark.getAttribute("data-fn");
      mark.setAttribute("role", "button");
      mark.setAttribute("tabindex", "0");
      mark.setAttribute("aria-label", `Nota ${n}`);

      mark.addEventListener("mouseenter", () => activate(n, true));
      mark.addEventListener("mouseleave", () => activate(n, false));
      mark.addEventListener("focus",      () => activate(n, true));
      mark.addEventListener("blur",       () => activate(n, false));
      mark.addEventListener("click", (e) => {
        e.preventDefault();
        const item = $(`.fn-item[data-fn="${n}"]`);
        if (item) {
          item.scrollIntoView({ behavior: "smooth", block: "center" });
          item.classList.add("active");
          setTimeout(() => item.classList.remove("active"), 1600);
        }
      });
    });
  }

  // -----------------------------------------------------------
  // 4. Lupa / lens — só desktop com hover real
  // -----------------------------------------------------------
  function initLens() {
    if (!supportsHover) return;

    const plates = $$(".case-plate:not(.placeholder)");
    if (!plates.length) return;

    const lens = document.createElement("div");
    lens.className = "lens";
    lens.innerHTML = '<div class="inner"></div><div class="lens-tag">Ver a prancha</div>';
    document.body.appendChild(lens);
    const inner = $(".inner", lens);

    let active = null;
    const ZOOM = 2.4; // fator de ampliação

    function onMove(e) {
      if (!active) return;
      const r = active.getBoundingClientRect();
      const bg = active.getAttribute("data-zoom") ||
                 active.querySelector("img")?.src;
      if (!bg) return;

      lens.style.transform =
        `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;

      const lensW = r.width * ZOOM;
      const lensH = r.height * ZOOM;
      const x = ((e.clientX - r.left) / r.width)  * lensW - 90;
      const y = ((e.clientY - r.top)  / r.height) * lensH - 90;
      inner.style.setProperty("--lens-w",  `${lensW}px`);
      inner.style.setProperty("--lens-h",  `${lensH}px`);
      inner.style.setProperty("--lens-bp", `${-x}px ${-y}px`);
      inner.style.setProperty("--lens-bg", `url("${bg}")`);
    }

    plates.forEach((p) => {
      p.addEventListener("mouseenter", () => {
        active = p;
        lens.classList.add("show");
      });
      p.addEventListener("mouseleave", () => {
        active = null;
        lens.classList.remove("show");
      });
      p.addEventListener("mousemove", onMove);
    });
  }

  // -----------------------------------------------------------
  // 5. Page progress (--prog em .ink-progress)
  // -----------------------------------------------------------
  function initProgress() {
    const bar = $(".ink-progress");
    if (!bar) return;
    let ticking = false;
    const update = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const p = h > 0 ? Math.min(100, (window.scrollY / h) * 100) : 0;
      bar.style.setProperty("--prog", p + "%");
      ticking = false;
    };
    window.addEventListener("scroll", () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    });
    update();
  }

  // -----------------------------------------------------------
  // Bootstrap
  // -----------------------------------------------------------
  function init() {
    initReveal();
    initMarginalia();
    initFootnotes();
    initLens();
    initProgress();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
