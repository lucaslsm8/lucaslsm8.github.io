/* ============================================================
   SPECIMEN — Vitrina Arcana · interactions
   Plain JS, no build step. Matches the repo's style.
   ============================================================ */
(function () {
  'use strict';

  const $  = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* --------------------------------------------------------
     i18n — body[data-lang] toggle (matches case-template pattern)
     -------------------------------------------------------- */
  function initI18n() {
    const KEY = 'ls-portfolio-lang';
    const saved = localStorage.getItem(KEY) || 'pt';
    setLang(saved);

    $$('[data-lang-btn]').forEach((btn) => {
      btn.addEventListener('click', () => setLang(btn.dataset.langBtn));
    });

    function setLang(lang) {
      const l = (lang === 'en') ? 'en' : 'pt';
      document.body.dataset.lang = l;
      document.documentElement.lang = (l === 'en') ? 'en' : 'pt-BR';
      $$('[data-lang-btn]').forEach((b) => {
        b.setAttribute('aria-pressed', String(b.dataset.langBtn === l));
      });
      localStorage.setItem(KEY, l);
    }
  }

  /* --------------------------------------------------------
     DUST — generate motes for overture
     -------------------------------------------------------- */
  function initDust() {
    if (reduced) return;
    const host = $('.overture .dust');
    if (!host) return;
    const N = 38;
    for (let i = 0; i < N; i++) {
      const m = document.createElement('span');
      m.className = 'mote';
      const x = Math.random() * 100;
      const y = 60 + Math.random() * 80;
      const dur = 14 + Math.random() * 14;
      const delay = -Math.random() * dur;
      const size = 1 + Math.random() * 2.4;
      m.style.left = x + '%';
      m.style.top = y + '%';
      m.style.width = size + 'px';
      m.style.height = size + 'px';
      m.style.animationDuration = dur + 's';
      m.style.animationDelay = delay + 's';
      m.style.opacity = (0.3 + Math.random() * 0.5).toFixed(2);
      host.appendChild(m);
    }
  }

  /* --------------------------------------------------------
     REVEAL — IntersectionObserver
     -------------------------------------------------------- */
  function initReveal() {
    const els = $$('.reveal, [data-stagger]');
    if (!('IntersectionObserver' in window) || reduced) {
      els.forEach((el) => el.classList.add('is-in'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target;
        if (el.matches('[data-stagger]')) {
          Array.from(el.children).forEach((c, i) => {
            c.style.transitionDelay = (i * 60) + 'ms';
          });
        }
        el.classList.add('is-in');
        io.unobserve(el);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    els.forEach((el) => io.observe(el));
  }

  /* --------------------------------------------------------
     SPOTLIGHT — vitrine specimen cases
     -------------------------------------------------------- */
  function initSpotlight() {
    if (reduced) return;
    $$('[data-spot]').forEach((el) => {
      el.addEventListener('mousemove', (ev) => {
        const r = el.getBoundingClientRect();
        const x = ((ev.clientX - r.left) / r.width) * 100;
        const y = ((ev.clientY - r.top) / r.height) * 100;
        el.style.setProperty('--spot-x', x + '%');
        el.style.setProperty('--spot-y', y + '%');
      });
    });
  }

  /* --------------------------------------------------------
     TABULA PREVIEW — parchment hover
     -------------------------------------------------------- */
  function initTabulaPreview() {
    if (reduced) return;
    const preview = $('#tabula-preview');
    if (!preview) return;
    const cap = preview.querySelector('.cap');
    const entries = $$('.tabula-entry');
    let raf = null;

    entries.forEach((e) => {
      e.addEventListener('mouseenter', () => {
        cap.textContent = '— ' + (e.dataset.preview || 'Specimen') + ' —';
        preview.classList.add('is-on');
      });
      e.addEventListener('mouseleave', () => {
        preview.classList.remove('is-on');
      });
      e.addEventListener('mousemove', (ev) => {
        if (raf) cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          const x = ev.clientX;
          const y = ev.clientY;
          // place to the right normally, flip if near right edge
          const placeRight = (x + 280) < window.innerWidth - 16;
          const left = placeRight ? (x + 24) : (x - 24 - 260);
          const top  = Math.min(window.innerHeight - 220, Math.max(80, y - 80));
          preview.style.left = left + 'px';
          preview.style.top  = top  + 'px';
        });
      });
    });
  }

  /* --------------------------------------------------------
     GALLERY MODAL — open from plates
     -------------------------------------------------------- */
  function initGallery() {
    const overlay = $('#gallery');
    const close   = $('#gallery-close');
    const prev    = $('#gallery-prev');
    const next    = $('#gallery-next');
    const artText = $('#gallery-art-text');
    const title   = $('#gallery-title');
    const counter = $('#gallery-counter');
    const spec    = $('#gallery-spec');
    if (!overlay) return;

    const plates = $$('.plate');
    let idx = 0;

    function show(i) {
      if (!plates.length) return;
      idx = (i + plates.length) % plates.length;
      const p = plates[idx];
      title.textContent = p.dataset.title || '—';
      spec.textContent  = p.dataset.meta  || '—';
      artText.textContent = '[ ' + (p.dataset.title || 'Plate') + ' ]';
      counter.textContent = ROMAN(idx + 1) + ' / ' + ROMAN(plates.length);
    }

    function open(i) {
      show(i);
      overlay.classList.add('is-on');
      overlay.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
    function dismiss() {
      overlay.classList.remove('is-on');
      overlay.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    plates.forEach((p, i) => {
      p.addEventListener('click', () => open(i));
      p.setAttribute('tabindex', '0');
      p.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          open(i);
        }
      });
    });
    close.addEventListener('click', dismiss);
    prev .addEventListener('click', () => show(idx - 1));
    next .addEventListener('click', () => show(idx + 1));
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) dismiss();
    });
    document.addEventListener('keydown', (e) => {
      if (!overlay.classList.contains('is-on')) return;
      if (e.key === 'Escape') dismiss();
      if (e.key === 'ArrowLeft')  show(idx - 1);
      if (e.key === 'ArrowRight') show(idx + 1);
    });
  }

  /* --------------------------------------------------------
     PROGRESS — bottom rail
     -------------------------------------------------------- */
  function initProgress() {
    const fill = $('#progress-fill');
    if (!fill) return;
    const tick = () => {
      const h = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const p = Math.min(1, Math.max(0, window.scrollY / h));
      fill.style.width = (p * 100).toFixed(2) + '%';
    };
    window.addEventListener('scroll', tick, { passive: true });
    window.addEventListener('resize', tick);
    tick();
  }

  /* --------------------------------------------------------
     FOLIO COUNTER — track current section
     -------------------------------------------------------- */
  function initFolio() {
    const out = $('#folio-current');
    const tot = $('#folio-total');
    if (!out) return;
    const sections = $$('[data-folio]');
    if (tot) tot.textContent = ROMAN(sections.length);

    const io = new IntersectionObserver((entries) => {
      // pick the most-visible one
      let best = null;
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        if (!best || e.intersectionRatio > best.intersectionRatio) best = e;
      });
      if (best) {
        out.textContent = best.target.dataset.folio || '—';
      }
    }, { threshold: [0.25, 0.5, 0.75] });
    sections.forEach((s) => io.observe(s));
  }

  /* --------------------------------------------------------
     FOOTNOTES — flash linked item
     -------------------------------------------------------- */
  function initFootnotes() {
    $$('.manuscript .fn').forEach((fn) => {
      const id = fn.dataset.fn;
      const target = $('.manuscript .footnotes [data-fn-target="' + id + '"]');
      if (!target) return;
      const on  = () => target.classList.add('is-flash');
      const off = () => target.classList.remove('is-flash');
      fn.addEventListener('mouseenter', on);
      fn.addEventListener('mouseleave', off);
      fn.addEventListener('focus', on);
      fn.addEventListener('blur', off);
      fn.addEventListener('click', (e) => {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        target.classList.add('is-flash');
        setTimeout(off, 1800);
      });
    });
  }

  /* --------------------------------------------------------
     ROMAN numerals
     -------------------------------------------------------- */
  function ROMAN(n) {
    const v = [
      [1000,'M'],[900,'CM'],[500,'D'],[400,'CD'],[100,'C'],[90,'XC'],
      [50,'L'],[40,'XL'],[10,'X'],[9,'IX'],[5,'V'],[4,'IV'],[1,'I']
    ];
    let s = ''; let x = n;
    for (const [val, sym] of v) { while (x >= val) { s += sym; x -= val; } }
    return s;
  }

  /* --------------------------------------------------------
     TWEAKS PANEL — vanilla JS implementation
     -------------------------------------------------------- */
  const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
    "candle": false,
    "density": "comfortable",
    "accent": "oxblood",
    "showDust": true,
    "showSpotlight": true,
    "fontDisplay": "instrument"
  }/*EDITMODE-END*/;

  let tweaks = Object.assign({}, TWEAK_DEFAULTS);
  let panelOn = false;

  function applyTweaks() {
    document.body.classList.toggle('candle', !!tweaks.candle);

    // Density
    document.body.style.setProperty('--density-mult',
      tweaks.density === 'tight' ? '0.75' :
      tweaks.density === 'loose' ? '1.25' : '1');

    // Accent swap
    const accents = {
      oxblood:  '#7a2620',
      cobalt:   '#1d3a78',
      cinnabar: '#c44a2d',
      gilt:     '#c98f2b'
    };
    if (accents[tweaks.accent]) {
      document.documentElement.style.setProperty('--oxblood', accents[tweaks.accent]);
    }

    // Dust
    const dust = $('.overture .dust');
    if (dust) dust.style.display = tweaks.showDust ? '' : 'none';

    // Spotlight
    $$('.specimen-case').forEach((el) => {
      el.style.setProperty('--spot-disabled', tweaks.showSpotlight ? '0' : '1');
    });
    document.body.classList.toggle('no-spot', !tweaks.showSpotlight);

    // Display font
    const fonts = {
      instrument: '"Instrument Serif", "EB Garamond", serif',
      ebgaramond: '"EB Garamond", "Instrument Serif", serif'
    };
    if (fonts[tweaks.fontDisplay]) {
      document.documentElement.style.setProperty('--serif-display', fonts[tweaks.fontDisplay]);
    }
  }

  function persistTweak(patch) {
    try {
      window.parent.postMessage({ type: '__edit_mode_set_keys', edits: patch }, '*');
    } catch (_) {}
  }

  function buildPanel() {
    const root = $('#tweaks-root');
    if (!root) return;
    root.innerHTML = ''
      + '<div class="tweaks-panel" id="tweaks-panel" role="dialog" aria-label="Tweaks">'
      + '  <div class="tweaks-head">'
      + '    <div class="tweaks-title">Tweaks</div>'
      + '    <button type="button" class="tweaks-close" id="tweaks-close" aria-label="Close">✕</button>'
      + '  </div>'

      + '  <div class="tweaks-section">'
      + '    <div class="tweaks-label">Ambient</div>'
      + '    <label class="tweaks-row tw-toggle">'
      + '      <span>Candle mode</span>'
      + '      <input type="checkbox" data-tw="candle">'
      + '      <span class="dot"></span>'
      + '    </label>'
      + '    <label class="tweaks-row tw-toggle">'
      + '      <span>Dust particles</span>'
      + '      <input type="checkbox" data-tw="showDust">'
      + '      <span class="dot"></span>'
      + '    </label>'
      + '    <label class="tweaks-row tw-toggle">'
      + '      <span>Vitrine spotlight</span>'
      + '      <input type="checkbox" data-tw="showSpotlight">'
      + '      <span class="dot"></span>'
      + '    </label>'
      + '  </div>'

      + '  <div class="tweaks-section">'
      + '    <div class="tweaks-label">Accent · pigmento raro</div>'
      + '    <div class="tw-radio" data-tw-radio="accent">'
      +        ['oxblood','cobalt','cinnabar','gilt'].map(function(v){
                 const c = {oxblood:'#7a2620',cobalt:'#1d3a78',cinnabar:'#c44a2d',gilt:'#c98f2b'}[v];
                 return '<button type="button" data-val="'+v+'" title="'+v+'"><span class="sw" style="background:'+c+'"></span>'+v+'</button>';
               }).join('')
      + '    </div>'
      + '  </div>'

      + '  <div class="tweaks-section">'
      + '    <div class="tweaks-label">Density</div>'
      + '    <div class="tw-seg" data-tw-radio="density">'
      + '      <button type="button" data-val="tight">tight</button>'
      + '      <button type="button" data-val="comfortable">comfort.</button>'
      + '      <button type="button" data-val="loose">loose</button>'
      + '    </div>'
      + '  </div>'

      + '  <div class="tweaks-section">'
      + '    <div class="tweaks-label">Display face</div>'
      + '    <div class="tw-seg" data-tw-radio="fontDisplay">'
      + '      <button type="button" data-val="instrument">Instrument</button>'
      + '      <button type="button" data-val="ebgaramond">Garamond</button>'
      + '    </div>'
      + '  </div>'

      + '  <div class="tweaks-foot">'
      + '    <span>vitrina arcana · folio I</span>'
      + '    <span>L.S.</span>'
      + '  </div>'
      + '</div>';

    // Wire inputs
    $$('input[data-tw]').forEach((inp) => {
      inp.checked = !!tweaks[inp.dataset.tw];
      inp.addEventListener('change', () => {
        const key = inp.dataset.tw;
        tweaks[key] = inp.checked;
        applyTweaks();
        persistTweak({ [key]: inp.checked });
      });
    });

    // Radios (accent / density / font)
    $$('[data-tw-radio]').forEach((grp) => {
      const key = grp.dataset.twRadio;
      function syncBtns() {
        $$('button', grp).forEach((b) => {
          b.classList.toggle('is-on', b.dataset.val === tweaks[key]);
        });
      }
      $$('button', grp).forEach((b) => {
        b.addEventListener('click', () => {
          tweaks[key] = b.dataset.val;
          applyTweaks();
          syncBtns();
          persistTweak({ [key]: b.dataset.val });
        });
      });
      syncBtns();
    });

    $('#tweaks-close').addEventListener('click', () => {
      hidePanel(true);
    });
  }

  function showPanel() {
    panelOn = true;
    if (!$('#tweaks-panel')) buildPanel();
    const p = $('#tweaks-panel');
    if (p) p.classList.add('is-on');
  }
  function hidePanel(notifyParent) {
    panelOn = false;
    const p = $('#tweaks-panel');
    if (p) p.classList.remove('is-on');
    if (notifyParent) {
      try { window.parent.postMessage({ type: '__edit_mode_dismissed' }, '*'); } catch (_) {}
    }
  }

  function initTweaks() {
    // 1) listener BEFORE announcing availability
    window.addEventListener('message', (ev) => {
      const d = ev && ev.data;
      if (!d || typeof d !== 'object') return;
      if (d.type === '__activate_edit_mode')   { showPanel(); }
      if (d.type === '__deactivate_edit_mode') { hidePanel(false); }
    });
    // 2) tell host the toggle is available
    try { window.parent.postMessage({ type: '__edit_mode_available' }, '*'); } catch (_) {}

    // Inject panel styles
    const css = document.createElement('style');
    css.textContent = `
      .tweaks-panel {
        position: fixed; right: 24px; bottom: 60px;
        width: 280px;
        background: var(--paper-card);
        border: 1px solid var(--ink);
        box-shadow: 0 24px 60px rgba(0,0,0,0.3);
        z-index: 300;
        font-family: var(--mono);
        font-size: var(--fs-caption);
        color: var(--ink);
        opacity: 0; pointer-events: none;
        transform: translateY(8px);
        transition: opacity .25s ease, transform .25s ease;
      }
      .tweaks-panel.is-on { opacity: 1; pointer-events: auto; transform: none; }
      .tweaks-head {
        display: flex; justify-content: space-between; align-items: center;
        padding: 12px 16px; border-bottom: 1px solid var(--hairline-strong);
        background: var(--paper-shade);
      }
      .tweaks-title {
        font-family: var(--serif-display); font-style: italic; font-size: 18px;
        letter-spacing: 0;
      }
      .tweaks-close {
        background: transparent; border: 0; cursor: pointer;
        font-size: 16px; line-height: 1; color: var(--ink-soft);
      }
      .tweaks-section { padding: 12px 16px 14px; border-bottom: 1px solid var(--hairline); }
      .tweaks-section:last-of-type { border-bottom: 0; }
      .tweaks-label {
        font-size: 10px; letter-spacing: 0.22em; text-transform: uppercase;
        color: var(--ink-faint); margin-bottom: 10px;
      }
      .tweaks-row.tw-toggle {
        display: flex; align-items: center; justify-content: space-between;
        padding: 6px 0; font-family: var(--serif); font-style: italic;
        font-size: var(--fs-meta); cursor: pointer;
      }
      .tweaks-row.tw-toggle input { display: none; }
      .tweaks-row.tw-toggle .dot {
        width: 30px; height: 16px; border-radius: 999px;
        background: var(--paper-deep); position: relative;
        transition: background .2s;
      }
      .tweaks-row.tw-toggle .dot::after {
        content: ""; position: absolute; top: 2px; left: 2px;
        width: 12px; height: 12px; border-radius: 50%;
        background: var(--paper); border: 1px solid var(--ink);
        transition: transform .2s;
      }
      .tweaks-row.tw-toggle input:checked ~ .dot { background: var(--oxblood); }
      .tweaks-row.tw-toggle input:checked ~ .dot::after { transform: translateX(14px); }

      .tw-radio { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; }
      .tw-radio button {
        background: var(--paper); border: 1px solid var(--hairline-strong);
        padding: 6px 8px; cursor: pointer; font: inherit;
        display: flex; align-items: center; gap: 8px;
        color: var(--ink-soft);
        text-transform: uppercase; letter-spacing: 0.1em;
      }
      .tw-radio .sw { width: 14px; height: 14px; border: 1px solid var(--ink); display: inline-block; }
      .tw-radio button.is-on { background: var(--ink); color: var(--paper); border-color: var(--ink); }

      .tw-seg { display: flex; border: 1px solid var(--hairline-strong); }
      .tw-seg button {
        flex: 1; background: var(--paper); border: 0; cursor: pointer;
        padding: 8px; font: inherit; color: var(--ink-soft);
        letter-spacing: 0.12em; text-transform: uppercase;
        border-right: 1px solid var(--hairline);
      }
      .tw-seg button:last-child { border-right: 0; }
      .tw-seg button.is-on { background: var(--ink); color: var(--paper); }

      .tweaks-foot {
        display: flex; justify-content: space-between;
        padding: 8px 16px; background: var(--paper-shade);
        font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase;
        color: var(--ink-faint);
      }
    `;
    document.head.appendChild(css);

    applyTweaks();
  }

  /* --------------------------------------------------------
     BOOT
     -------------------------------------------------------- */
  document.addEventListener('DOMContentLoaded', () => {
    initI18n();
    initDust();
    initReveal();
    initSpotlight();
    initTabulaPreview();
    initGallery();
    initFootnotes();
    initProgress();
    initFolio();
    initTweaks();
  });
})();
