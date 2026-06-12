/* ==============================================================
   projects.js — interacoes da Vitrine + Parecer do Editor
   Uniao de case-template.js (reveal, i18n, copiar-codigo,
   carrosseis, plate-flip, luneta, candle) + vitrine.js (indice
   lateral/scroll-spy) + parecer-do-editor.js (demos do parecer).
   catalogue.js foi removido: so montava a home React em #root,
   ausente nesta pagina. Cada bloco e uma IIFE independente.
   ============================================================= */

/* ---------- case-template.js ---------- */
// =============================================================
// case-template.js — Interações da página de case (livro antigo + moderno)
//
// Sem dependências externas. Sem build step. JS puro.
//
// Responsabilidades:
//   1. Reveal on scroll       (.reveal -> .reveal.in)
//   2. Marginalia em scroll   (.gloss aparece quando o parágrafo correspondente cruza a viewport)
//   3. Footnotes interativos  (hover/click em .fn destaca o .fn-item correspondente)
//   4. Split-flap Page progress & Page counter (folios)
//   5. i18n PT/EN             (mostra só o idioma ativo, persiste em localStorage)
//   6. Count-up numérico      (.stat-val[data-count])
//   7. Bússola Astrolábio     (gira proporcionalmente ao progresso vertical do scroll)
//   8. Slider Before/After    (arrastar selo de latão para revelar restauração envelhecida vs nítida)
//   9. Plate Card 3D Flip     (giro no eixo Y para revelar wireframe/verso de esboços)
// =============================================================

(function () {
  "use strict";

  // -----------------------------------------------------------
  // Helpers
  // -----------------------------------------------------------
  const $  = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const ROMAN = (n) => {
    const MAP = [[10,"X"],[9,"IX"],[5,"V"],[4,"IV"],[1,"I"]];
    let s = "";
    for (const [v, r] of MAP) { while (n >= v) { s += r; n -= v; } }
    return s || "—";
  };
  const supportsHover = window.matchMedia("(hover: hover)").matches;
  const prefersReduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const currentLang = () =>
    document.body.getAttribute("data-lang") === "en" ? "en" : "pt";

  // -----------------------------------------------------------
  // 1. Reveal on scroll (Com suporte a Stagger)
  // -----------------------------------------------------------
  function initReveal() {
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
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }
    );
    els.forEach((el) => io.observe(el));
  }

  // -----------------------------------------------------------
  // 2. Marginalia em scroll
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
      { threshold: 0.25 }
    );

    glosses.forEach((g) => {
      const id = g.getAttribute("data-anchor");
      const anchor = document.getElementById(id);
      if (anchor) io.observe(anchor);
    });
  }

  // -----------------------------------------------------------
  // 3. Footnotes interativos
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
  // 4. Split-flap Page progress & Page counter (folios)
  // -----------------------------------------------------------
  function initProgressAndCounter() {
    const bar = $(".ink-progress");
    const cur = $("[data-counter-current]");
    const tot = $("[data-counter-total]");
    const folios = $$("[data-folio]");

    if (tot && folios.length) {
      tot.textContent = String(folios.length);
    }

    const setNum = (n) => {
      if (!cur) return;
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

    let ticking = false;
    const update = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const p = h > 0 ? Math.min(100, (window.scrollY / h) * 100) : 0;
      if (bar) bar.style.setProperty("--prog", p + "%");
      ticking = false;
    };

    window.addEventListener("scroll", () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    });

    if ("IntersectionObserver" in window && folios.length) {
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
    } else if (cur) {
      cur.textContent = "1";
    }

    update();
  }

  // -----------------------------------------------------------
  // 5. i18n PT/EN — toggle real
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
  // 6. Count-up numérico (.stat-val[data-count])
  // -----------------------------------------------------------
  function initCountUp() {
    const stats = $$(".stat-val[data-count]");
    if (!stats.length) return;
    const run = (el) => {
      const target = parseFloat(el.getAttribute("data-count")) || 0;
      const dec = parseInt(el.getAttribute("data-dec") || "0", 10);
      if (prefersReduce) { el.textContent = target.toFixed(dec); return; }
      const dur = 1200;
      let t0 = null;
      const step = (ts) => {
        if (!t0) t0 = ts;
        const p = Math.min(1, (ts - t0) / dur);
        const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
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
  // 7. Bússola Astrolábio (gira sutilmente conforme o scroll)
  // -----------------------------------------------------------
  function initScrollCompass() {
    const compass = $(".scroll-compass");
    if (!compass) return;
    let ticking = false;
    const updateRotation = () => {
      const scrollH = document.documentElement.scrollHeight - window.innerHeight;
      const scrollRatio = scrollH > 0 ? window.scrollY / scrollH : 0;
      const deg = scrollRatio * 360 * 1.5; // rotação completa extra de 1.5 voltas
      compass.style.transform = `rotate(${deg}deg)`;
      ticking = false;
    };
    window.addEventListener("scroll", () => {
      if (!ticking && !prefersReduce) {
        window.requestAnimationFrame(updateRotation);
        ticking = true;
      }
    });
    updateRotation();
  }

  // -----------------------------------------------------------
  // 8. Slider Before/After (Arrastar o selo de latão)
  // -----------------------------------------------------------
  function initComparisonSlider() {
    const sliders = $$(".before-after-slider");
    sliders.forEach((slider) => {
      const handle = $(".slider-handle", slider);
      const beforeSide = $(".slider-before", slider);
      if (!handle || !beforeSide) return;

      let isDragging = false;

      // Mantém o conteúdo do lado "before" com a largura TOTAL do slider.
      // O .slider-before é clipado (overflow:hidden) e muda de largura ao
      // arrastar; sem isto, o texto interno reflui/realinha à esquerda. Como
      // estamos comparando, a tipografia deve ficar ESTÁTICA — fixamos a
      // largura do conteúdo na largura do slider e apenas revelamos por clip.
      const sizeContent = () => {
        const w = slider.getBoundingClientRect().width;
        $$(".slider-before .slider-content", slider).forEach((c) => {
          c.style.width = w + "px";
        });
      };
      sizeContent();
      window.addEventListener("resize", sizeContent);

      const setPos = (clientX) => {
        const rect = slider.getBoundingClientRect();
        const offsetX = clientX - rect.left;
        let pct = (offsetX / rect.width) * 100;
        if (pct < 0) pct = 0;
        if (pct > 100) pct = 100;
        
        handle.style.left = `${pct}%`;
        beforeSide.style.width = `${pct}%`;
      };

      const startDragging = () => {
        isDragging = true;
        slider.classList.add("slider-dragging");
      };
      
      const stopDragging = () => {
        isDragging = false;
        slider.classList.remove("slider-dragging");
      };

      // Eventos de Mouse
      handle.addEventListener("mousedown", (e) => {
        e.preventDefault();
        startDragging();
      });
      window.addEventListener("mousemove", (e) => {
        if (!isDragging) return;
        setPos(e.clientX);
      });
      window.addEventListener("mouseup", stopDragging);

      // Eventos de Touch (Mobile)
      handle.addEventListener("touchstart", () => {
        startDragging();
      });
      window.addEventListener("touchmove", (e) => {
        if (!isDragging) return;
        if (e.touches && e.touches[0]) {
          setPos(e.touches[0].clientX);
        }
      });
      window.addEventListener("touchend", stopDragging);
      window.addEventListener("touchcancel", stopDragging);
    });
  }

  // -----------------------------------------------------------
  // 9. Plate Card 3D Flip (Giro anverso/verso de sketches)
  // -----------------------------------------------------------
  function initPlateFlip() {
    const cards = $$(".plate-3d-card");
    const triggers = $$(".plate-3d-wrapper .btn-flip-trigger");

    cards.forEach((card) => {
      const toggle = () => {
        card.classList.toggle("flipped");
      };
      card.addEventListener("click", toggle);
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggle();
        }
      });
    });

    triggers.forEach((btn) => {
      const wrapper = btn.closest(".plate-3d-wrapper");
      if (!wrapper) return;
      const card = $(".plate-3d-card", wrapper);
      if (!card) return;

      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        card.classList.toggle("flipped");
      });
    });
  }

  // -----------------------------------------------------------
  // 10. Efeito de Perspectiva sutil nas molduras (Tilt sutil)
  // -----------------------------------------------------------
  function initMockupTilt() {
    if (!supportsHover || prefersReduce) return;
    const mockups = $$(".mockup-desktop, .mockup-mobile, .mockup-tablet");
    const MAX = 4; // inclinação de perspectiva muito sutil
    
    mockups.forEach((mock) => {
      mock.addEventListener("mousemove", (e) => {
        const r = mock.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        mock.style.transform = `perspective(1000px) rotateX(${-py * MAX}deg) rotateY(${px * MAX}deg) scale(1.01)`;
        const glare = $(".mockup-screen-glare", mock);
        if (glare) {
          glare.style.opacity = "0.7";
          glare.style.transform = `translate(${px * 60}px, ${py * 60}px)`;
        }
      });
      
      mock.addEventListener("mouseleave", () => {
        mock.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
        const glare = $(".mockup-screen-glare", mock);
        if (glare) {
          glare.style.opacity = "0";
          glare.style.transform = `none`;
        }
      });
    });
  }

  // -----------------------------------------------------------
  // 11. Vitrine — Copiar código dos specimens
  // -----------------------------------------------------------
  function initCodeSpecimens() {
    const blocks = $$(".specimen-code");
    if (!blocks.length) return;

    blocks.forEach((block) => {
      const btn  = $(".specimen-copy", block);
      const code = $("code", block);
      if (!btn || !code) return;

      btn.addEventListener("click", () => {
        const text = code.textContent;
        const flash = () => {
          btn.classList.add("copied");
          window.setTimeout(() => btn.classList.remove("copied"), 1800);
        };
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(flash, () => fallbackCopy(text, flash));
        } else {
          fallbackCopy(text, flash);
        }
      });
    });

    function fallbackCopy(text, done) {
      try {
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.setAttribute("readonly", "");
        ta.style.position = "absolute";
        ta.style.left = "-9999px";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
        done();
      } catch (_) {}
    }
  }

  // -----------------------------------------------------------
  // 12. Vitrine — Carrossel de pranchas (pasta de colecionador)
  // -----------------------------------------------------------
  function initCarousel() {
    const carousels = $$(".vitrine-carousel");
    if (!carousels.length) return;

    carousels.forEach((root) => {
      const track  = $(".carousel-track", root);
      const slides = $$(".carousel-slide", track || root);
      const prev   = $(".carousel-prev", root);
      const next   = $(".carousel-next", root);
      const cur    = $("[data-carousel-current]", root);
      const tot    = $("[data-carousel-total]", root);
      const dotsWrap = $(".carousel-dots", root);
      if (!track || slides.length < 2) return;

      let index = 0;
      const total = slides.length;
      if (tot) tot.textContent = ROMAN(total);

      // Constrói os marcadores (folhas) dinamicamente
      let dots = [];
      if (dotsWrap) {
        dotsWrap.innerHTML = "";
        slides.forEach((_, i) => {
          const d = document.createElement("button");
          d.type = "button";
          d.className = "carousel-dot";
          d.setAttribute("aria-label", "Prancha " + ROMAN(i + 1));
          d.addEventListener("click", () => go(i));
          dotsWrap.appendChild(d);
          dots.push(d);
        });
      }

      const render = () => {
        track.style.transform = `translateX(${-index * 100}%)`;
        if (cur) cur.textContent = ROMAN(index + 1);
        slides.forEach((s, i) => {
          s.classList.toggle("is-active", i === index);
          s.setAttribute("aria-hidden", i === index ? "false" : "true");
        });
        dots.forEach((d, i) => d.classList.toggle("is-active", i === index));
      };

      const go = (i) => { index = (i + total) % total; render(); };

      if (prev) prev.addEventListener("click", () => go(index - 1));
      if (next) next.addEventListener("click", () => go(index + 1));

      root.setAttribute("tabindex", "0");
      root.addEventListener("keydown", (e) => {
        if (e.key === "ArrowLeft")  { e.preventDefault(); go(index - 1); }
        if (e.key === "ArrowRight") { e.preventDefault(); go(index + 1); }
      });

      render();
    });
  }

  // -----------------------------------------------------------
  // 13. Vitrine — Luneta (loupe) contida sobre uma prancha-demo
  //     Porta o comportamento da home (Lupa2.png + clone ampliado),
  //     mas escopado ao próprio quadro, sem seguir o cursor pela tela.
  // -----------------------------------------------------------
  function initVitrineLoupe() {
    if (!supportsHover || prefersReduce) return;
    const plates = $$(".loupe-demo-plate");
    if (!plates.length) return;

    plates.forEach((plate) => {
      const lens  = $(".loupe-demo-lens", plate);
      const glass = $(".loupe-demo-glass", plate);
      const art   = $(".loupe-demo-art", plate);
      if (!lens || !glass || !art) return;

      const SCALE = 2.6;
      let clone = null;

      const onEnter = () => {
        plate.classList.add("loupe-active");
        if (clone) { clone.remove(); clone = null; }
        clone = art.cloneNode(true);
        const r = art.getBoundingClientRect();
        Object.assign(clone.style, {
          position: "absolute",
          width: r.width + "px",
          height: r.height + "px",
          transform: `scale(${SCALE})`,
          transformOrigin: "0 0",
          pointerEvents: "none",
          margin: "0"
        });
        glass.appendChild(clone);
      };

      const onMove = (e) => {
        const rect = plate.getBoundingClientRect();
        const R = lens.offsetWidth / 2;
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;
        x = Math.max(R, Math.min(rect.width  - R, x));
        y = Math.max(R, Math.min(rect.height - R, y));
        lens.style.left = x + "px";
        lens.style.top  = y + "px";
        if (!clone) return;
        const ar = art.getBoundingClientRect();
        clone.style.left = (R - (e.clientX - ar.left) * SCALE) + "px";
        clone.style.top  = (R - (e.clientY - ar.top)  * SCALE) + "px";
      };

      const onLeave = () => {
        plate.classList.remove("loupe-active");
        if (clone) { clone.remove(); clone = null; }
      };

      plate.addEventListener("mouseenter", onEnter);
      plate.addEventListener("mousemove", onMove);
      plate.addEventListener("mouseleave", onLeave);
    });
  }

  // -----------------------------------------------------------
  // 11. Cinema Play — plateia "senta" ao clicar em play
  // -----------------------------------------------------------
  function initCinemaPlay() {
    $$('.cinema-play-btn').forEach(function(btn) {
      var cinema = btn.closest('.mockup-cinema');
      if (!cinema) return;
      btn.addEventListener('click', function() {
        var isPlaying = cinema.classList.toggle('cinema-playing');
        btn.setAttribute('aria-label', isPlaying ? 'Pause' : 'Play');
      });
    });
  }

  // -----------------------------------------------------------
  // 12. Mobile Strip Carousel — telas horizontais em pé
  // -----------------------------------------------------------
  function initMobileStrip() {
    $$('.strip-wrap[data-strip]').forEach(function(wrap) {
      var items    = Array.from(wrap.querySelectorAll('.strip-item'));
      var capNum   = wrap.querySelector('.strip-cap-num');
      var capLabel = wrap.querySelector('.strip-cap-label');
      var dots     = Array.from(wrap.querySelectorAll('.strip-dot'));
      var prevBtn  = wrap.querySelector('.strip-prev');
      var nextBtn  = wrap.querySelector('.strip-next');
      var TOTAL    = items.length;
      var current  = 0;

      function posFor(idx) {
        var d = idx - current;
        while (d < -Math.floor(TOTAL / 2)) d += TOTAL;
        while (d >  Math.floor(TOTAL / 2)) d -= TOTAL;
        if (d < -2) d = -2;
        if (d >  2) d =  2;
        return d;
      }

      function update() {
        items.forEach(function(item) {
          var idx = parseInt(item.dataset.index, 10);
          item.dataset.pos = posFor(idx);
          item.classList.toggle('is-center', posFor(idx) === 0);
        });
        var active = items[current];
        if (capNum   && active) capNum.textContent   = active.dataset.plateNum   || '';
        if (capLabel && active) capLabel.textContent = active.dataset.plateLabel || '';
        dots.forEach(function(d, i) {
          d.classList.toggle('is-active', i === current);
          d.setAttribute('aria-selected', i === current ? 'true' : 'false');
        });
      }

      function goTo(idx) {
        current = ((idx % TOTAL) + TOTAL) % TOTAL;
        update();
      }

      if (prevBtn) prevBtn.addEventListener('click', function() { goTo(current - 1); });
      if (nextBtn) nextBtn.addEventListener('click', function() { goTo(current + 1); });
      dots.forEach(function(d, i) { d.addEventListener('click', function() { goTo(i); }); });
      items.forEach(function(item) {
        item.addEventListener('click', function() {
          var idx = parseInt(item.dataset.index, 10);
          if (idx !== current) goTo(idx);
        });
      });

      wrap.setAttribute('tabindex', '0');
      wrap.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft')  { e.preventDefault(); goTo(current - 1); }
        if (e.key === 'ArrowRight') { e.preventDefault(); goTo(current + 1); }
      });

      var tx = 0;
      wrap.addEventListener('touchstart', function(e) { tx = e.touches[0].clientX; }, { passive: true });
      wrap.addEventListener('touchend',   function(e) {
        var dx = e.changedTouches[0].clientX - tx;
        if (Math.abs(dx) > 44) { dx > 0 ? goTo(current - 1) : goTo(current + 1); }
      }, { passive: true });

      update();
    });
  }

  // -----------------------------------------------------------
  // Fileira de telas (XVI) — scroll suave com setas laterais
  // -----------------------------------------------------------
  function initScreensRow() {
    $$('.screens-row-wrap').forEach(function(wrap) {
      var row  = wrap.querySelector('.screens-row');
      var prev = wrap.querySelector('.screens-prev');
      var next = wrap.querySelector('.screens-next');
      if (!row) return;

      // Largura de scroll por clique = largura de um item + gap
      var STEP = 205; // 180px item + 24px gap (sp-5)

      function scrollTo(dir) {
        row.scrollBy({ left: dir * STEP, behavior: prefersReduce ? 'auto' : 'smooth' });
      }

      if (prev) prev.addEventListener('click', function() { scrollTo(-1); });
      if (next) next.addEventListener('click', function() { scrollTo( 1); });

      // Teclado quando o wrapper está focado
      wrap.setAttribute('tabindex', '0');
      wrap.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft')  { e.preventDefault(); scrollTo(-1); }
        if (e.key === 'ArrowRight') { e.preventDefault(); scrollTo( 1); }
      });

      // Atualizar visibilidade das setas conforme posição do scroll
      function updateArrows() {
        if (prev) prev.style.opacity = row.scrollLeft <= 4 ? '0.35' : '1';
        if (next) next.style.opacity = row.scrollLeft + row.clientWidth >= row.scrollWidth - 4 ? '0.35' : '1';
      }
      row.addEventListener('scroll', updateArrows, { passive: true });
      updateArrows();
    });
  }

  // ── Book Swiper (XIV, XV, XVI) ─────────────────────────────
  // XIV/XV: cinco slots (2)(1)(2), loop infinito bilateral.
  // XVI: fileira clara (Swiper manual ou coverflow leve).
  var FIVE_SLOT_POS = [-2, -1, 0, 1, 2];

  function initFiveSlotCinemaCarousel(rootEl) {
    if (rootEl.dataset.fiveSlotReady === 'true') return;

    var wrapper = rootEl.querySelector('.swiper-wrapper');
    if (!wrapper) return;

    var originals = Array.from(wrapper.querySelectorAll('.swiper-slide'));
    var TOTAL = originals.length;
    if (TOTAL < 2) return;

    var slides = originals.map(function (slide) { return slide.innerHTML; });
    var prevBtn = rootEl.querySelector('.swiper-button-prev');
    var nextBtn = rootEl.querySelector('.swiper-button-next');
    var paginationEl = rootEl.querySelector('.swiper-pagination');
    var SHIFT_MS = prefersReduce ? 0 : 520;

    rootEl.classList.add('book-swiper--five-slot');
    wrapper.className = 'book-slot-stage';
    wrapper.innerHTML = '';

    var slots = FIVE_SLOT_POS.map(function (pos) {
      var slot = document.createElement('div');
      slot.className = 'book-slot';
      slot.dataset.pos = String(pos);
      wrapper.appendChild(slot);
      return slot;
    });

    if (paginationEl) {
      paginationEl.innerHTML = '';
      for (var bi = 0; bi < TOTAL; bi++) {
        var bullet = document.createElement('span');
        bullet.className = 'swiper-pagination-bullet';
        bullet.setAttribute('role', 'button');
        bullet.setAttribute('tabindex', '0');
        bullet.setAttribute('aria-label', 'Prancha ' + (bi + 1));
        paginationEl.appendChild(bullet);
      }
    }
    var bullets = paginationEl ? Array.from(paginationEl.querySelectorAll('.swiper-pagination-bullet')) : [];

    var current = 0;
    var busy = false;

    function mod(n) { return ((n % TOTAL) + TOTAL) % TOTAL; }
    function slideIndexForPos(pos) { return mod(current + pos); }

    function fillSlot(slot, slideIdx) {
      slot.innerHTML = slides[slideIdx];
      slot.dataset.slideIndex = String(slideIdx);
    }

    function syncPagination() {
      bullets.forEach(function (b, i) {
        b.classList.toggle('swiper-pagination-bullet-active', i === current);
        b.setAttribute('aria-current', i === current ? 'true' : 'false');
      });
    }

    function applySlotStates() {
      slots.forEach(function (slot) {
        var pos = parseInt(slot.dataset.pos, 10);
        slot.classList.toggle('is-center', pos === 0);
        slot.setAttribute('aria-hidden', pos === 0 ? 'false' : 'true');
      });
      syncPagination();
    }

    function layoutAllSlots() {
      slots.forEach(function (slot) {
        fillSlot(slot, slideIndexForPos(parseInt(slot.dataset.pos, 10)));
      });
      applySlotStates();
    }

    function slotAtPos(pos) {
      return slots.find(function (slot) { return parseInt(slot.dataset.pos, 10) === pos; });
    }

    function withoutTransition(slot, fn) {
      slot.style.transition = 'none';
      fn();
      slot.offsetHeight;
      requestAnimationFrame(function () { slot.style.transition = ''; });
    }

    function recycleEdge(fromPos, toPos, slideIdx) {
      var slot = slotAtPos(fromPos);
      if (!slot) return;
      withoutTransition(slot, function () {
        slot.dataset.pos = String(toPos);
        fillSlot(slot, slideIdx);
      });
    }

    function step(dir) {
      if (busy) return;
      busy = true;
      current = mod(current + dir);
      slots.forEach(function (slot) {
        slot.dataset.pos = String(parseInt(slot.dataset.pos, 10) - dir);
      });
      if (dir === 1) {
        recycleEdge(-3, 2, slideIndexForPos(2));
      } else {
        recycleEdge(3, -2, slideIndexForPos(-2));
      }
      applySlotStates();
      window.setTimeout(function () { busy = false; }, SHIFT_MS);
    }

    function goTo(idx, instant) {
      var target = mod(idx);
      if (target === current) return;
      if (instant) {
        current = target;
        slots.forEach(function (slot, i) {
          slot.dataset.pos = String(FIVE_SLOT_POS[i]);
        });
        slots.forEach(function (slot) { slot.style.transition = 'none'; });
        layoutAllSlots();
        requestAnimationFrame(function () {
          slots.forEach(function (slot) { slot.style.transition = ''; });
        });
        return;
      }
      var guard = TOTAL + 1;
      while (current !== target && guard-- > 0) {
        var rightDist = mod(target - current);
        var leftDist = mod(current - target);
        step(rightDist <= leftDist ? 1 : -1);
      }
    }

    if (prevBtn) prevBtn.addEventListener('click', function () { step(-1); });
    if (nextBtn) nextBtn.addEventListener('click', function () { step(1); });
    bullets.forEach(function (b, i) {
      b.addEventListener('click', function () { goTo(i, true); });
    });

    wrapper.addEventListener('click', function (e) {
      var slot = e.target.closest('.book-slot');
      if (!slot) return;
      var pos = parseInt(slot.dataset.pos, 10);
      if (pos === 0) return;
      step(pos < 0 ? -1 : 1);
    });

    rootEl.setAttribute('tabindex', '0');
    rootEl.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft')  { e.preventDefault(); step(-1); }
      if (e.key === 'ArrowRight') { e.preventDefault(); step(1); }
    });

    var touchX = 0;
    rootEl.addEventListener('touchstart', function (e) { touchX = e.touches[0].clientX; }, { passive: true });
    rootEl.addEventListener('touchend', function (e) {
      var dx = e.changedTouches[0].clientX - touchX;
      if (Math.abs(dx) > 44) { step(dx > 0 ? -1 : 1); }
    }, { passive: true });

    layoutAllSlots();
    rootEl.dataset.fiveSlotReady = 'true';
  }

  // ── Fan carousel (XVII) — leque 3D, variante separada ───────
  var FAN_SLOT_POS = [-2, -1, 0, 1, 2];
  var FAN_SHIFT_MS = 550;

  function initFanCarouselRoot(carousel) {
    if (carousel.dataset.fanReady === 'true') return;

    var stage    = $('.fan-stage', carousel);
    var capNum   = $('.cap-num', carousel);
    var capLabel = $('.cap-label', carousel);
    var dots     = $$('.fan-dot', carousel);
    var prevBtn  = $('[data-fan-prev]', carousel);
    var nextBtn  = $('[data-fan-next]', carousel);
    if (!stage) return;

    var originals = $$('.fan-item', stage);
    var TOTAL = originals.length;
    if (TOTAL < 2) return;

    var slides = originals.map(function (el, i) {
      return {
        html: el.innerHTML,
        label: el.dataset.label || '',
        num: el.dataset.num || ('Plate ' + ROMAN(i + 1))
      };
    });

    stage.innerHTML = '';
    var slots = FAN_SLOT_POS.map(function (pos) {
      var slot = document.createElement('div');
      slot.className = 'fan-item';
      slot.dataset.pos = String(pos);
      stage.appendChild(slot);
      return slot;
    });

    var current = 0;
    var busy = false;

    function mod(n) { return ((n % TOTAL) + TOTAL) % TOTAL; }
    function slideIndexForPos(pos) { return mod(current + pos); }

    function fillSlot(slot, slideIdx) {
      slot.innerHTML = slides[slideIdx].html;
      slot.dataset.slideIndex = String(slideIdx);
    }

    function syncCaption() {
      if (capNum)   capNum.textContent   = slides[current].num;
      if (capLabel) capLabel.textContent = slides[current].label;
      dots.forEach(function (d, i) {
        d.classList.toggle('is-active', i === current);
        d.setAttribute('aria-selected', i === current ? 'true' : 'false');
      });
    }

    function applySlotStates() {
      slots.forEach(function (slot) {
        var pos = parseInt(slot.dataset.pos, 10);
        slot.classList.toggle('is-center', pos === 0);
        slot.setAttribute('aria-hidden', pos === 0 ? 'false' : 'true');
      });
      syncCaption();
    }

    function layoutAllSlots() {
      slots.forEach(function (slot) {
        fillSlot(slot, slideIndexForPos(parseInt(slot.dataset.pos, 10)));
      });
      applySlotStates();
    }

    function slotAtPos(pos) {
      return slots.find(function (slot) { return parseInt(slot.dataset.pos, 10) === pos; });
    }

    function withoutTransition(slot, fn) {
      slot.style.transition = 'none';
      fn();
      slot.offsetHeight;
      requestAnimationFrame(function () { slot.style.transition = ''; });
    }

    function recycleEdge(fromPos, toPos, slideIdx) {
      var slot = slotAtPos(fromPos);
      if (!slot) return;
      withoutTransition(slot, function () {
        slot.dataset.pos = String(toPos);
        fillSlot(slot, slideIdx);
      });
    }

    function step(dir) {
      if (busy) return;
      busy = true;
      current = mod(current + dir);
      slots.forEach(function (slot) {
        slot.dataset.pos = String(parseInt(slot.dataset.pos, 10) - dir);
      });
      if (dir === 1) {
        recycleEdge(-3, 2, slideIndexForPos(2));
      } else {
        recycleEdge(3, -2, slideIndexForPos(-2));
      }
      applySlotStates();
      window.setTimeout(function () { busy = false; }, prefersReduce ? 0 : FAN_SHIFT_MS);
    }

    function goTo(idx, instant) {
      var target = mod(idx);
      if (target === current) return;
      if (instant) {
        current = target;
        slots.forEach(function (slot, i) {
          slot.dataset.pos = String(FAN_SLOT_POS[i]);
        });
        slots.forEach(function (slot) { slot.style.transition = 'none'; });
        layoutAllSlots();
        requestAnimationFrame(function () {
          slots.forEach(function (slot) { slot.style.transition = ''; });
        });
        return;
      }
      step(target > current ? 1 : -1);
    }

    if (prevBtn) prevBtn.addEventListener('click', function () { step(-1); });
    if (nextBtn) nextBtn.addEventListener('click', function () { step(1); });
    dots.forEach(function (d, i) {
      d.addEventListener('click', function () { goTo(i, true); });
    });

    stage.addEventListener('click', function (e) {
      var slot = e.target.closest('.fan-item');
      if (!slot) return;
      var pos = parseInt(slot.dataset.pos, 10);
      if (pos === 0) return;
      step(pos < 0 ? -1 : 1);
    });

    carousel.setAttribute('tabindex', '0');
    carousel.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft')  { e.preventDefault(); step(-1); }
      if (e.key === 'ArrowRight') { e.preventDefault(); step(1); }
    });

    var touchX = 0;
    carousel.addEventListener('touchstart', function (e) { touchX = e.touches[0].clientX; }, { passive: true });
    carousel.addEventListener('touchend', function (e) {
      var dx = e.changedTouches[0].clientX - touchX;
      if (Math.abs(dx) > 44) { step(dx > 0 ? -1 : 1); }
    }, { passive: true });

    layoutAllSlots();
    carousel.dataset.fanReady = 'true';
  }

  function initFanCarousels() {
    $$('.fan-carousel').forEach(initFanCarouselRoot);
  }

  function initBookSwipers() {
    document.querySelectorAll('.book-swiper-wrap--cinema .book-swiper').forEach(initFiveSlotCinemaCarousel);
    if (typeof Swiper === 'undefined') return;

    function initFullRowCarousel(el) {
      if (el.dataset.fullRowReady === 'true') return;
      var wrapper = el.querySelector('.swiper-wrapper');
      if (!wrapper) return;

      var originals = Array.from(wrapper.children);
      var originalCount = originals.length;
      if (!originalCount) return;

      for (var pass = 0; pass < 6; pass++) {
        originals.forEach(function(slide) {
          wrapper.appendChild(slide.cloneNode(true));
        });
      }

      var slides = Array.from(wrapper.children);
      var detailRelativeIndex = originals.findIndex(function(slide) {
        var text = slide.textContent || '';
        return text.indexOf('Detalhe') !== -1 || text.indexOf('Detail') !== -1;
      });
      if (detailRelativeIndex < 0) detailRelativeIndex = Math.floor(originalCount / 2);

      var offset = 0;
      var slideStep = 0;
      var cycleWidth = 0;
      var dragging = false;
      var startX = 0;
      var startOffset = 0;

      function measure() {
        var first = slides[0].getBoundingClientRect();
        var second = slides[1] ? slides[1].getBoundingClientRect() : null;
        var desiredGap = 28;
        slideStep = first.width + desiredGap;
        if (second) {
          var currentStep = second.left - first.left;
          if (currentStep > first.width) {
            slideStep = Math.max(currentStep, slideStep);
          }
        }
        cycleWidth = slideStep * originalCount;
      }

      function normalizeOffset() {
        if (!cycleWidth) return 0;
        var before = offset;
        var viewportCenter = window.innerWidth / 2;
        var slideWidth = slides[0].getBoundingClientRect().width;
        var centerIndex = (viewportCenter - offset - (slideWidth / 2)) / slideStep;
        if (centerIndex < originalCount * 2) {
          offset -= cycleWidth * 2;
        } else if (centerIndex > originalCount * 5) {
          offset += cycleWidth * 2;
        }
        return offset - before;
      }

      function updateFocus() {
        var viewportCenter = window.innerWidth / 2;
        var closest = null;
        var closestDistance = Infinity;
        slides.forEach(function(slide) {
          var rect = slide.getBoundingClientRect();
          var distance = Math.abs((rect.left + rect.width / 2) - viewportCenter);
          if (distance < closestDistance) {
            closestDistance = distance;
            closest = slide;
          }
        });
        slides.forEach(function(slide) {
          slide.classList.toggle('swiper-slide-active', slide === closest);
        });
      }

      function applyOffset() {
        wrapper.style.transform = 'translate3d(' + offset + 'px, 0, 0)';
        updateFocus();
      }

      function snapToFocusedSlide() {
        var active = wrapper.querySelector('.swiper-slide-active');
        if (!active) return;
        var rect = active.getBoundingClientRect();
        offset += (window.innerWidth / 2) - (rect.left + rect.width / 2);
        normalizeOffset();
        wrapper.style.transition = 'transform 240ms cubic-bezier(0.22, 1, 0.36, 1)';
        applyOffset();
        window.setTimeout(function() {
          wrapper.style.transition = 'none';
        }, 260);
      }

      function centerInitialSlide() {
        measure();
        var initialIndex = (originalCount * 3) + detailRelativeIndex;
        var slideWidth = slides[0].getBoundingClientRect().width;
        offset = (window.innerWidth / 2) - ((initialIndex * slideStep) + (slideWidth / 2));
        normalizeOffset();
        applyOffset();
      }

      el.classList.add('book-swiper--manual-row');
      wrapper.style.transition = 'none';
      centerInitialSlide();

      el.addEventListener('pointerdown', function(event) {
        dragging = true;
        startX = event.clientX;
        startOffset = offset;
        el.classList.add('is-dragging');
        el.setPointerCapture(event.pointerId);
      });

      el.addEventListener('pointermove', function(event) {
        if (!dragging) return;
        event.preventDefault();
        offset = startOffset + (event.clientX - startX);
        startOffset += normalizeOffset();
        applyOffset();
      });

      function endDrag(event) {
        if (!dragging) return;
        dragging = false;
        el.classList.remove('is-dragging');
        if (event && el.hasPointerCapture(event.pointerId)) {
          el.releasePointerCapture(event.pointerId);
        }
        normalizeOffset();
        applyOffset();
        snapToFocusedSlide();
      }

      el.addEventListener('pointerup', endDrag);
      el.addEventListener('pointercancel', endDrag);
      window.addEventListener('resize', centerInitialSlide);

      el.dataset.fullRowReady = 'true';
    }

    // XVI — variante clara
    document.querySelectorAll('.book-swiper--light').forEach(function(el) {
      var isFullRow = el.classList.contains('book-swiper--full-row');
      if (isFullRow) {
        initFullRowCarousel(el);
        return;
      }
      new Swiper(el, {
        effect: isFullRow ? 'slide' : 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        initialSlide: isFullRow ? Number(el.dataset.rowInitialSlide || 2) : 2,
        coverflowEffect: {
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: false
        },
        keyboard: { enabled: true },
        spaceBetween: isFullRow ? 18 : 32,
        loop: !isFullRow,
        loopAdditionalSlides: isFullRow ? 16 : 4,
        pagination: isFullRow ? false : {
          el: el.querySelector('.swiper-pagination'),
          clickable: true
        },
        navigation: isFullRow ? false : {
          nextEl: el.querySelector('.swiper-button-next'),
          prevEl: el.querySelector('.swiper-button-prev')
        },
        a11y: {
          prevSlideMessage: 'Tela anterior',
          nextSlideMessage: 'Próxima tela'
        },
        on: isFullRow ? {
          slideChangeTransitionEnd: function(swiper) {
            var originalCount = Number(el.dataset.rowOriginalCount || 0);
            if (!originalCount) return;
            var activeIndex = swiper.activeIndex;
            var lowerBound = originalCount;
            var upperBound = swiper.slides.length - originalCount - 1;
            if (activeIndex >= lowerBound && activeIndex <= upperBound) return;
            var normalizedIndex = ((activeIndex % originalCount) + originalCount) % originalCount;
            swiper.slideTo((originalCount * 2) + normalizedIndex, 0, false);
          }
        } : {
        }
      });
    });
  }

  // Bootstrap
  // -----------------------------------------------------------
  function initCandle() {
    const btn = $(".candle-toggle");
    if (!btn) return;
    const KEY = "lucas:candle";
    const refreshLabel = (on) => {
      const lang = currentLang();
      const label = on
        ? (lang === "en" ? "Day mode"   : "Modo dia")
        : (lang === "en" ? "Candle mode" : "Modo vela");
      btn.title = label;
      btn.setAttribute("aria-label", label);
    };
    const apply = (on) => {
      document.body.classList.toggle("candle", on);
      document.documentElement.style.background = on ? "#1c1418" : "";
      btn.classList.toggle("active", on);
      btn.setAttribute("aria-pressed", on ? "true" : "false");
      refreshLabel(on);
    };
    let on = false;
    try { on = localStorage.getItem(KEY) === "1"; } catch (e) {}
    apply(on);
    btn.addEventListener("click", () => {
      on = !on;
      try { localStorage.setItem(KEY, on ? "1" : "0"); } catch (e) {}
      apply(on);
    });
    // Mantém o rótulo do tooltip em sincronia ao trocar de idioma
    $$(".lang-toggle button").forEach((b) =>
      b.addEventListener("click", () => refreshLabel(on))
    );
  }

  function init() {
    initReveal();
    initMarginalia();
    initFootnotes();
    initProgressAndCounter();
    initCountUp();
    initScrollCompass();
    initComparisonSlider();
    initPlateFlip();
    initMockupTilt();
    initCodeSpecimens();
    initCarousel();
    initVitrineLoupe();
    initCinemaPlay();
    initMobileStrip();
    initScreensRow();
    initBookSwipers();
    initFanCarousels();
    initCandle();
    initI18n();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

/* ---------- vitrine.js (indice lateral) ---------- */
/* =============================================================
   VITRINE — índice lateral fixo (scroll-spy) + footnotes
   Complementa catalogue.js + case-template.js (reveal, i18n,
   copiar-código, carrosséis já vêm de lá).
   ============================================================= */
(function () {
  'use strict';

  function slug(s, i) {
    return (s || ('sec-' + i))
      .toLowerCase()
      .normalize('NFD').replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || ('sec-' + i);
  }

  function buildIndex() {
    var headers = Array.prototype.slice.call(
      document.querySelectorAll(
        '.case-section .section-head, .carousel-block .section-label'
      )
    );
    if (!headers.length) return;

    var rail = document.createElement('nav');
    rail.className = 'index-rail';
    rail.setAttribute('aria-label', 'Índice da vitrine');
    rail.innerHTML =
      '<div class="index-rail__head">' +
      '<span>Index</span><em>Vitrine</em>' +
      '</div><ul class="index-rail__list"></ul>';
    var list = rail.querySelector('.index-rail__list');

    var entries = [];

    headers.forEach(function (head, i) {
      var container = head.closest('section') || head.closest('.carousel-block');
      if (!container) return;

      var nameEl = head.querySelector('.name') || head.querySelector('h2');
      var romanEl = head.querySelector('.roman');
      var nameText = nameEl ? nameEl.textContent.trim() : ('Seção ' + (i + 1));
      var nameHTML = nameEl ? nameEl.innerHTML : nameText;
      var romanHTML = romanEl ? romanEl.innerHTML : (i + 1) + '.';

      if (!container.id) container.id = slug(nameText, i);

      var li = document.createElement('li');
      var a = document.createElement('a');
      a.className = 'index-link';
      a.href = '#' + container.id;
      a.innerHTML =
        '<span class="ix-roman">' + romanHTML + '</span>' +
        '<span class="ix-name">' + nameHTML + '</span>';

      a.addEventListener('click', function (e) {
        e.preventDefault();
        container.scrollIntoView({ behavior: 'smooth', block: 'start' });
        history.replaceState(null, '', '#' + container.id);
        document.body.classList.remove('rail-open');
      });

      li.appendChild(a);
      list.appendChild(li);
      entries.push({ container: container, link: a });
    });

    document.body.appendChild(rail);
    document.body.classList.add('has-rail');

    // Toggle + backdrop (mobile/tablet)
    var toggle = document.createElement('button');
    toggle.className = 'index-toggle';
    toggle.type = 'button';
    toggle.setAttribute('aria-label', 'Abrir índice');
    toggle.innerHTML = '☰';
    var backdrop = document.createElement('div');
    backdrop.className = 'index-backdrop';
    document.body.appendChild(toggle);
    document.body.appendChild(backdrop);
    toggle.addEventListener('click', function () {
      document.body.classList.toggle('rail-open');
    });
    backdrop.addEventListener('click', function () {
      document.body.classList.remove('rail-open');
    });

    // Scroll-spy
    var byContainer = new Map();
    entries.forEach(function (en) { byContainer.set(en.container, en.link); });

    var current = null;
    function setActive(link) {
      if (link === current) return;
      if (current) current.classList.remove('is-active');
      current = link;
      if (current) {
        current.classList.add('is-active');
        // keep active item visible in the rail
        var top = current.offsetTop - list.clientHeight / 2;
        list.scrollTo({ top: top, behavior: 'smooth' });
      }
    }

    if ('IntersectionObserver' in window) {
      var visible = new Map();
      var io = new IntersectionObserver(function (recs) {
        recs.forEach(function (r) {
          if (r.isIntersecting) visible.set(r.target, r.intersectionRatio);
          else visible.delete(r.target);
        });
        var best = null, bestRatio = -1;
        visible.forEach(function (ratio, el) {
          if (ratio > bestRatio) { bestRatio = ratio; best = el; }
        });
        if (best && byContainer.has(best)) setActive(byContainer.get(best));
      }, { rootMargin: '-30% 0px -55% 0px', threshold: [0.01, 0.25, 0.5] });
      entries.forEach(function (en) { io.observe(en.container); });
    }
  }

  // Footnote flash (Marginalia)
  function initFootnotes() {
    document.querySelectorAll('.manuscript .fn').forEach(function (fn) {
      fn.addEventListener('click', function () {
        var id = fn.getAttribute('data-fn');
        var target = document.querySelector(
          '.manuscript .footnotes li[data-fn-target="' + id + '"]'
        );
        document.querySelectorAll('.manuscript .fn.is-active')
          .forEach(function (x) { x.classList.remove('is-active'); });
        fn.classList.add('is-active');
        if (target) {
          target.classList.add('is-flash');
          target.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          setTimeout(function () { target.classList.remove('is-flash'); }, 1400);
        }
      });
    });
  }

  function init() { buildIndex(); initFootnotes(); }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

/* ---------- parecer-do-editor.js (demos) ---------- */
/* ════════════════════════════════════════════════════════════
   PARECER DO EDITOR — interações dos esboços (demos)
   JS puro, sem dependências. Esboços de intenção, não produção.
   ════════════════════════════════════════════════════════════ */
(function () {
  "use strict";

  /* ── Addendum I — dedicatória ex dono ───────────────────── */
  var dedicInput = document.getElementById("dedic-input");
  var dedicName = document.getElementById("dedic-name");
  if (dedicInput && dedicName) {
    dedicInput.addEventListener("input", function () {
      var v = dedicInput.value.trim();
      dedicName.textContent = v || "a leitora";
    });
  }

  /* ── Addendum V — index rerum (busca no volume) ─────────── */
  var ENTRIES = [
    { term: "Catálogo de obras",   loc: "Cap. II · p. viii" },
    { term: "Currículo (Ex Libris)", loc: "Cap. III · p. xiv" },
    { term: "Design system",       loc: "Cap. III · p. xii" },
    { term: "Dashboards PMO",      loc: "Prancha II" },
    { term: "GenAI · POCs",        loc: "Prancha I" },
    { term: "Lighthouse · Vale",   loc: "Prancha III" },
    { term: "Modo vela",           loc: "chrome · alto da página" },
    { term: "Prefácio do autor",   loc: "Cap. I · p. iv" },
    { term: "Contato & correspondência", loc: "Cap. IV · p. xvi" }
  ];

  var ixInput = document.getElementById("index-input");
  var ixList = document.getElementById("index-list");

  function normalize(s) {
    return s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  }

  function renderIndex(query) {
    if (!ixList) return;
    var q = normalize(query || "");
    var hits = ENTRIES.filter(function (e) {
      return !q || normalize(e.term).indexOf(q) !== -1;
    });
    ixList.innerHTML = "";
    if (!hits.length) {
      var li = document.createElement("li");
      li.className = "ix-empty";
      li.textContent = "— verbete não consta deste volume —";
      ixList.appendChild(li);
      return;
    }
    hits.slice(0, 6).forEach(function (e) {
      var li = document.createElement("li");
      var term = document.createElement("span");
      term.className = "ix-term";
      term.textContent = e.term;
      var leader = document.createElement("span");
      leader.className = "ix-leader";
      var loc = document.createElement("span");
      loc.className = "ix-loc";
      loc.textContent = e.loc;
      li.appendChild(term);
      li.appendChild(leader);
      li.appendChild(loc);
      ixList.appendChild(li);
    });
  }

  if (ixInput && ixList) {
    renderIndex("");
    ixInput.addEventListener("input", function () {
      renderIndex(ixInput.value);
    });
  }
})();
