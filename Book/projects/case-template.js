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
//   6. Page counter           (folio atual / total, ligado ao scroll)
//   7. i18n PT/EN             (toggle real; mostra só o idioma ativo
//                              via body[data-lang]; persiste a escolha)
// =============================================================

(function () {
  "use strict";

  // -----------------------------------------------------------
  // Helpers
  // -----------------------------------------------------------
  const $  = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const supportsHover = window.matchMedia("(hover: hover)").matches;
  const prefersReduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const currentLang = () =>
    document.body.getAttribute("data-lang") === "en" ? "en" : "pt";

  // -----------------------------------------------------------
  // 1. Reveal on scroll
  // -----------------------------------------------------------
  function initReveal() {
    // Inclui [data-stagger]: ao revelar, escalona os filhos com delay incremental.
    const els = $$(".reveal, [data-stagger]");
    const reveal = (el) => {
      if (el.hasAttribute("data-stagger")) {
        Array.prototype.slice.call(el.children).forEach((kid, i) => {
          kid.style.transitionDelay = (prefersReduce ? 0 : i * 0.08) + "s";
        });
      }
      el.classList.add("in");
    };
    if (!("IntersectionObserver" in window) || !els.length) {
      els.forEach(reveal);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            reveal(entry.target);
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
  // 4. Galeria — clicar numa prancha abre um modal com TODAS as
  //    imagens das pranchas (tema livro). Sem lupa; convive com o
  //    tilt 3D. Teclado: ←/→ navega, Esc fecha.
  // -----------------------------------------------------------
  function initGallery() {
    const plates = $$(".case-plate");
    const items = [];
    plates.forEach((p) => {
      const img = p.querySelector("img");
      if (!img) return;                       // ignora placeholders sem imagem
      p.dataset.galleryIndex = String(items.length);
      items.push({ src: img.getAttribute("src"), cap: img.getAttribute("alt") || "" });
    });
    if (!items.length) return;

    const modal = document.createElement("div");
    modal.className = "case-gallery";
    modal.setAttribute("aria-hidden", "true");
    modal.innerHTML =
      '<div class="case-gallery__scrim" data-close></div>' +
      '<div class="case-gallery__dialog" role="dialog" aria-modal="true" aria-label="Galeria de pranchas">' +
        '<button class="case-gallery__close" type="button" data-close aria-label="Fechar / Close">×</button>' +
        '<button class="case-gallery__nav case-gallery__nav--prev" type="button" data-prev aria-label="Anterior / Previous">←</button>' +
        '<figure class="case-gallery__frame">' +
          '<img class="case-gallery__img" alt="" />' +
          '<figcaption class="case-gallery__cap"></figcaption>' +
        '</figure>' +
        '<button class="case-gallery__nav case-gallery__nav--next" type="button" data-next aria-label="Próxima / Next">→</button>' +
        '<div class="case-gallery__counter"></div>' +
      '</div>';
    document.body.appendChild(modal);

    const imgEl = $(".case-gallery__img", modal);
    const capEl = $(".case-gallery__cap", modal);
    const countEl = $(".case-gallery__counter", modal);
    const closeBtn = $(".case-gallery__close", modal);
    let idx = 0;

    function render() {
      const it = items[idx];
      imgEl.src = it.src;
      imgEl.alt = it.cap;
      capEl.textContent = it.cap;
      countEl.textContent = (idx + 1) + " / " + items.length;
    }
    function open(i) {
      idx = i; render();
      modal.classList.add("open");
      modal.setAttribute("aria-hidden", "false");
      document.body.classList.add("gallery-open");
      closeBtn.focus();
    }
    function close() {
      modal.classList.remove("open");
      modal.setAttribute("aria-hidden", "true");
      document.body.classList.remove("gallery-open");
    }
    function go(d) { idx = (idx + d + items.length) % items.length; render(); }

    modal.addEventListener("click", (e) => {
      if (e.target.hasAttribute("data-close")) close();
      else if (e.target.hasAttribute("data-prev")) go(-1);
      else if (e.target.hasAttribute("data-next")) go(1);
    });
    document.addEventListener("keydown", (e) => {
      if (!modal.classList.contains("open")) return;
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "ArrowRight") go(1);
    });

    plates.forEach((p) => {
      if (p.dataset.galleryIndex === undefined) return;
      const i = parseInt(p.dataset.galleryIndex, 10);
      p.classList.add("is-clickable");
      p.setAttribute("role", "button");
      p.setAttribute("tabindex", "0");
      p.setAttribute("aria-label", "Abrir galeria / Open gallery");
      p.addEventListener("click", () => open(i));
      p.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(i); }
      });
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
  // 6. Page counter — folio atual / total
  //    Conta os marcos [data-folio] e mostra o índice da seção
  //    visível mais central no contador esquerdo do chrome-bot,
  //    reaproveitando a animação split-flap (.flip-out/.flip-in).
  // -----------------------------------------------------------
  function initPageCounter() {
    const cur = $("[data-counter-current]");
    const tot = $("[data-counter-total]");
    const folios = $$("[data-folio]");
    if (!cur || !tot || !folios.length) return;

    tot.textContent = String(folios.length);

    const setNum = (n) => {
      const s = String(n);
      if (cur.textContent === s) return;
      cur.classList.remove("flip-in");
      cur.classList.add("flip-out");
      window.setTimeout(() => {
        cur.textContent = s;
        cur.classList.remove("flip-out");
        cur.classList.add("flip-in");
      }, 150);
    };

    if (!("IntersectionObserver" in window)) {
      cur.textContent = "1";
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = folios.indexOf(entry.target);
            if (idx > -1) setNum(idx + 1);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    folios.forEach((f) => io.observe(f));
  }

  // -----------------------------------------------------------
  // 7. i18n PT/EN — toggle real
  //    body[data-lang] controla qual idioma aparece (CSS esconde o
  //    inativo). Sincroniza <html lang> (a11y), atualiza o estado
  //    dos botões, persiste a escolha e atualiza a lupa.
  // -----------------------------------------------------------
  function initI18n() {
    const buttons = $$(".lang-toggle button[data-lang]");
    if (!buttons.length) return;

    const KEY = "ls-portfolio-lang";
    let lang = currentLang();
    try {
      const saved = localStorage.getItem(KEY);
      if (saved === "pt" || saved === "en") lang = saved;
    } catch (_) {}

    const apply = (l) => {
      lang = l === "en" ? "en" : "pt";
      document.body.setAttribute("data-lang", lang);
      document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
      buttons.forEach((b) => {
        const on = b.getAttribute("data-lang") === lang;
        b.classList.toggle("active", on);
        b.setAttribute("aria-pressed", on ? "true" : "false");
      });
      try { localStorage.setItem(KEY, lang); } catch (_) {}
    };

    buttons.forEach((b) =>
      b.addEventListener("click", () => apply(b.getAttribute("data-lang")))
    );

    apply(lang);
  }

  // -----------------------------------------------------------
  // 8. Efeito ii — Tilt 3D nas pranchas (pointer parallax)
  //    Só em ponteiro fino (hover real) e sem reduced-motion.
  //    Convive com a lupa: o tilt é sutil (≤9°), como examinar
  //    uma gravura sob a lente.
  // -----------------------------------------------------------
  function initPlateTilt() {
    if (!supportsHover || prefersReduce) return;
    const plates = $$(".case-plate");
    if (!plates.length) return;
    const MAX = 9; // graus máximos de inclinação
    plates.forEach((plate) => {
      plate.addEventListener("mousemove", (e) => {
        const r = plate.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        plate.style.setProperty("--ty", (px * MAX) + "deg");
        plate.style.setProperty("--tx", (-py * MAX) + "deg");
        plate.style.setProperty("--glare", "1");
        plate.classList.add("is-tilting");
      });
      plate.addEventListener("mouseleave", () => {
        plate.style.setProperty("--ty", "0deg");
        plate.style.setProperty("--tx", "0deg");
        plate.style.setProperty("--glare", "0");
        plate.classList.remove("is-tilting");
      });
    });
  }

  // -----------------------------------------------------------
  // 9. Efeito iv-a — Parallax de scroll
  //    Move elementos [data-speed] conforme sua posição relativa
  //    ao centro da viewport. Desligado em reduced-motion.
  // -----------------------------------------------------------
  function initParallax() {
    if (prefersReduce) return;
    const layers = $$("[data-speed]");
    if (!layers.length) return;
    let ticking = false;
    const update = () => {
      ticking = false;
      const vh = window.innerHeight;
      layers.forEach((l) => {
        const r = l.getBoundingClientRect();
        const center = r.top + r.height / 2 - vh / 2;
        const sp = parseFloat(l.getAttribute("data-speed")) || 0;
        l.style.transform = "translateY(" + (center * sp) + "px)";
      });
    };
    window.addEventListener("scroll", () => {
      if (!ticking) { window.requestAnimationFrame(update); ticking = true; }
    });
    update();
  }

  // -----------------------------------------------------------
  // 10. Efeito iv-c — Count-up das métricas (.stat-val[data-count])
  //     Conta de 0 ao alvo (easeOutCubic) ao entrar na tela.
  //     Em reduced-motion, mostra o valor final direto.
  // -----------------------------------------------------------
  function initCountUp() {
    const stats = $$(".stat-val[data-count]");
    if (!stats.length) return;
    const run = (el) => {
      const target = parseFloat(el.getAttribute("data-count")) || 0;
      const dec = parseInt(el.getAttribute("data-dec") || "0", 10);
      if (prefersReduce) { el.textContent = target.toFixed(dec); return; }
      const dur = 1100;
      let t0 = null;
      const step = (ts) => {
        if (!t0) t0 = ts;
        const p = Math.min(1, (ts - t0) / dur);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = (target * eased).toFixed(dec);
        if (p < 1) requestAnimationFrame(step);
        else el.textContent = target.toFixed(dec);
      };
      el.textContent = (0).toFixed(dec);
      requestAnimationFrame(step);
    };
    if (!("IntersectionObserver" in window)) {
      stats.forEach(run);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) { run(entry.target); io.unobserve(entry.target); }
        });
      },
      { threshold: 0.5 }
    );
    stats.forEach((el) => io.observe(el));
  }

  // -----------------------------------------------------------
  // Bootstrap
  // -----------------------------------------------------------
  function init() {
    initReveal();
    initMarginalia();
    initFootnotes();
    initGallery();
    initProgress();
    initPageCounter();
    initCountUp();
    initParallax();
    initPlateTilt();
    initI18n();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
