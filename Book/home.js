/* ════════════════════════════════════════════════════════════
   HOME — camada de melhorias sobre a home (index.html)
   ────────────────────────────────────────────────────────────
   i.   Three.js sob demanda (IntersectionObserver perto de #works)
   ii.  Dedicatória ex dono  (?to=Nome no frontispício)
   iii. Edição de bolso (o volume em uma lauda) — ícone de livro de
        bolso à DIREITA da vela, no chrome
   iv.  Index Rerum (⌘K / Ctrl K) — ícone de luneta à ESQUERDA da
        vela, no chrome

   JS puro, sem build. Os overlays vivem fora da árvore do React
   (#root); os ícones do chrome são re-injetados de forma idempotente
   via MutationObserver — o toggle PT/EN re-renderiza o root inteiro.
   ════════════════════════════════════════════════════════════ */
(function () {
  "use strict";

  /* ─── utilidades ──────────────────────────────────────────── */

  var REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function currentLang() {
    return (document.documentElement.lang || "pt").indexOf("pt") === 0 ? "pt" : "en";
  }

  function el(tag, className, text) {
    var n = document.createElement(tag);
    if (className) n.className = className;
    if (text != null) n.textContent = text;
    return n;
  }

  function normalize(s) {
    return s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  }

  /* Re-injeção idempotente: o React re-renderiza #root ao trocar de
     idioma; registramos funções que conferem/recriam o que for preciso. */
  var reinjectors = [];
  function onRootChange(fn) {
    reinjectors.push(fn);
    fn();
  }
  var rootObserved = false;
  function observeRoot() {
    if (rootObserved) return;
    var root = document.getElementById("root");
    if (!root) return;
    rootObserved = true;
    var scheduled = false;
    new MutationObserver(function () {
      if (scheduled) return;
      scheduled = true;
      requestAnimationFrame(function () {
        scheduled = false;
        reinjectors.forEach(function (fn) { fn(); });
      });
    }).observe(root, { childList: true, subtree: true });
  }

  /* Espera um seletor existir dentro do root (React renderiza async). */
  function whenReady(selector, cb) {
    var found = document.querySelector(selector);
    if (found) { cb(found); return; }
    var mo = new MutationObserver(function () {
      var n = document.querySelector(selector);
      if (n) { mo.disconnect(); cb(n); }
    });
    mo.observe(document.body, { childList: true, subtree: true });
  }

  /* ══════════════════════════════════════════════════════════
     i. THREE.JS SOB DEMANDA
     O catalogue.js monta os quadros quando ouvir 'three-ready'.
     Carregamos o script quando o leitor chega a ~1200px de #works.
     ══════════════════════════════════════════════════════════ */
  function initLazyThree() {
    if (window.THREE) {
      window.dispatchEvent(new Event("three-ready"));
      return;
    }
    var loading = false;
    function load() {
      if (loading || window.THREE) return;
      loading = true;
      var s = document.createElement("script");
      s.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
      s.onload = function () { window.dispatchEvent(new Event("three-ready")); };
      /* onerror: segue no fallback <img> — mesma degradação de sempre */
      document.head.appendChild(s);
    }
    whenReady("#works", function (works) {
      if (!("IntersectionObserver" in window)) { load(); return; }
      var io = new IntersectionObserver(function (entries) {
        if (entries.some(function (e) { return e.isIntersecting; })) {
          io.disconnect();
          load();
        }
      }, { rootMargin: "1200px 0px" });
      io.observe(works);
    });
  }

  /* ══════════════════════════════════════════════════════════
     ii. DEDICATÓRIA EX DONO — ?to=Nome
     Imprime uma dedicatória caligráfica no frontispício, como os
     exemplares dedicados dos livros antigos. textContent = seguro.
     ══════════════════════════════════════════════════════════ */
  function initDedication() {
    var name = "";
    try {
      name = (new URLSearchParams(location.search).get("to") || "").trim().slice(0, 32);
    } catch (err) { /* URLSearchParams indisponível */ }
    if (!name) return;

    onRootChange(function () {
      var front = document.querySelector(".frontispiece");
      if (!front) return;
      var lang = currentLang();
      var existing = front.querySelector(".ed-dedication");
      if (existing && existing.getAttribute("data-lang") === lang) return;
      if (existing) existing.remove();

      var d = el("p", "ed-dedication");
      d.setAttribute("data-lang", lang);
      d.appendChild(el("span", "ed-dedication-pre",
        lang === "pt" ? "Para " : "For "));
      d.appendChild(el("span", "ed-dedication-name", name));
      d.appendChild(el("span", "ed-dedication-pos",
        lang === "pt" ? ", com estima — " : ", with regard — "));
      d.appendChild(el("span", "ed-dedication-sig", "L. S."));

      /* entra no bloco central do frontispício, logo após o "Composto
         em MMXXVI" — não disputa espaço com o convite "Vire a página" */
      var meta = front.querySelector(".title-meta");
      if (meta) meta.insertAdjacentElement("afterend", d);
      else front.appendChild(d);
    });
  }

  /* ══════════════════════════════════════════════════════════
     CONTEÚDO BILÍNGUE da edição de bolso e do Index Rerum.
     Fatos espelham o CONTENT da home — não inventar nada (regra 6).
     ══════════════════════════════════════════════════════════ */
  var POCKET = {
    pt: {
      label: "Edição de bolso",
      gloss: "o volume em uma lauda",
      name: "Lucas Schoenherr",
      line: "Senior Product Designer · GenAI & Design Systems · Rio de Janeiro · treze anos de prática",
      worksLabel: "Obras",
      works: [
        { r: "I",   t: "Gen.AI — Accenture, 2023–24",
          d: "9 POCs de IA generativa unificadas por um design system dedicado.",
          k: "5 avançaram para dev" },
        { r: "II",  t: "Dashboards PMO — Samarco, 2025",
          d: "Cabine de comando executiva com a Mandala Estratégica no centro.",
          k: "20+ planilhas substituídas" },
        { r: "III", t: "Lighthouse — Vale, 2023",
          d: "MVP mobile que levou dados críticos de produção à palma da mão.",
          k: "~200 gestores impactados" }
      ],
      methodLabel: "Método",
      method: "Clareza · Sistema · Velocidade · Impacto",
      contactLabel: "Correspondência",
      email: "lucas.schoenherr@gmail.com",
      print: "imprimir esta lauda",
      full: "ler a edição completa ↓",
      close: "Fechar a edição de bolso"
    },
    en: {
      label: "Pocket edition",
      gloss: "the volume in a single leaf",
      name: "Lucas Schoenherr",
      line: "Senior Product Designer · GenAI & Design Systems · Rio de Janeiro · thirteen years of practice",
      worksLabel: "Works",
      works: [
        { r: "I",   t: "Gen.AI — Accenture, 2023–24",
          d: "9 generative-AI POCs unified by a dedicated design system.",
          k: "5 advanced to dev" },
        { r: "II",  t: "PMO Dashboards — Samarco, 2025",
          d: "Executive command cabin with the Strategic Mandala at its heart.",
          k: "20+ spreadsheets replaced" },
        { r: "III", t: "Lighthouse — Vale, 2023",
          d: "Mobile MVP that put critical production data in managers' hands.",
          k: "~200 managers reached" }
      ],
      methodLabel: "Method",
      method: "Clarity · System · Speed · Impact",
      contactLabel: "Correspondence",
      email: "lucas.schoenherr@gmail.com",
      print: "print this leaf",
      full: "read the full edition ↓",
      close: "Close the pocket edition"
    }
  };

  var INDEX_ENTRIES = [
    { pt: "Prefácio do autor",            en: "Author's preface",        locPt: "Cap. I · p. iv",    locEn: "Ch. I · p. iv",    go: { sel: "#preface" } },
    { pt: "Catálogo de obras",            en: "Catalogue of works",      locPt: "Cap. II · p. viii", locEn: "Ch. II · p. viii", go: { sel: "#works" } },
    { pt: "Prancha I — Gen.AI",           en: "Plate I — Gen.AI",        locPt: "Prancha I",         locEn: "Plate I",          go: { sel: ".plate", nth: 0 } },
    { pt: "Prancha II — Dashboards PMO",  en: "Plate II — PMO Dashboards", locPt: "Prancha II",      locEn: "Plate II",         go: { sel: ".plate", nth: 1 } },
    { pt: "Prancha III — Lighthouse",     en: "Plate III — Lighthouse",  locPt: "Prancha III",       locEn: "Plate III",        go: { sel: ".plate", nth: 2 } },
    { pt: "Pranchas menores · galeria",   en: "Minor plates · gallery",  locPt: "Miscellanea · p. xi", locEn: "Miscellanea · p. xi", go: { sel: "#minor-works" } },
    { pt: "Aparato técnico · instrumentos", en: "Technical apparatus · tools", locPt: "Cap. III · p. xii", locEn: "Ch. III · p. xii", go: { sel: "#apparatus" } },
    { pt: "Currículo · Ex Libris",        en: "Curriculum · Ex Libris",  locPt: "folha volante",     locEn: "feuille volante",  go: { sel: ".ti-stage", fallback: "#apparatus" } },
    { pt: "Correspondência · contato",    en: "Correspondence · contact", locPt: "Cap. IV · p. xvi", locEn: "Ch. IV · p. xvi",   go: { sel: "#contact" } },
    { pt: "Modo vela / modo dia",         en: "Candle / day mode",       locPt: "alto da página",    locEn: "page head",        go: { click: ".candle-toggle" } },
    { pt: "Edição de bolso",              en: "Pocket edition",          locPt: "uma lauda",         locEn: "one leaf",         go: { pocket: true } }
  ];

  /* ══════════════════════════════════════════════════════════
     iii. EDIÇÃO DE BOLSO
     Sobreposição com o volume condensado numa lauda. Conteúdo
     recomposto a cada abertura (acompanha o idioma corrente).
     Disparada pelo ícone de livro de bolso no chrome (ver chrome icons).
     ══════════════════════════════════════════════════════════ */
  var pocketOverlay = null;

  function buildPocket() {
    var c = POCKET[currentLang()];
    var ov = el("div", "ed-pocket");
    ov.setAttribute("role", "dialog");
    ov.setAttribute("aria-modal", "true");
    ov.setAttribute("aria-label", c.label);

    var card = el("article", "ed-pocket-card");

    var head = el("header", "ed-pocket-head");
    head.appendChild(el("span", "ed-pocket-label", c.label));
    head.appendChild(el("span", "ed-pocket-gloss", "· " + c.gloss));
    var x = el("button", "ed-pocket-close", "×");
    x.setAttribute("aria-label", c.close);
    x.addEventListener("click", closePocket);
    head.appendChild(x);
    card.appendChild(head);

    card.appendChild(el("h2", "ed-pocket-name", c.name));
    card.appendChild(el("p", "ed-pocket-line", c.line));

    card.appendChild(el("h3", "ed-pocket-h", c.worksLabel));
    var ul = el("ul", "ed-pocket-works");
    c.works.forEach(function (w) {
      var li = el("li", null);
      li.appendChild(el("span", "ed-pw-roman", w.r));
      var body = el("div", "ed-pw-body");
      body.appendChild(el("strong", "ed-pw-title", w.t));
      body.appendChild(el("span", "ed-pw-desc", w.d));
      li.appendChild(body);
      li.appendChild(el("span", "ed-pw-key", w.k));
      ul.appendChild(li);
    });
    card.appendChild(ul);

    card.appendChild(el("h3", "ed-pocket-h", c.contactLabel));
    var pc = el("p", "ed-pocket-contact");
    var mail = el("a", null, c.email);
    mail.href = "mailto:" + c.email;
    pc.appendChild(mail);
    card.appendChild(pc);

    var foot = el("footer", "ed-pocket-foot");
    var printBtn = el("button", "ed-pocket-print", "⎙ " + c.print);
    printBtn.addEventListener("click", function () { window.print(); });
    foot.appendChild(printBtn);
    var full = el("button", "ed-pocket-full", c.full);
    full.addEventListener("click", function () {
      closePocket();
      var works = document.querySelector("#works");
      if (works) works.scrollIntoView({ behavior: REDUCED ? "auto" : "smooth" });
    });
    foot.appendChild(full);
    card.appendChild(foot);

    ov.appendChild(card);
    ov.addEventListener("click", function (e) {
      if (e.target === ov) closePocket();
    });
    return ov;
  }

  function openPocket() {
    closeIndex();
    if (pocketOverlay) pocketOverlay.remove();
    pocketOverlay = buildPocket();
    document.body.appendChild(pocketOverlay);
    document.body.classList.add("ed-pocket-open");
    var x = pocketOverlay.querySelector(".ed-pocket-close");
    if (x) x.focus();
  }

  function closePocket() {
    if (!pocketOverlay) return;
    pocketOverlay.remove();
    pocketOverlay = null;
    document.body.classList.remove("ed-pocket-open");
  }

  /* ══════════════════════════════════════════════════════════
     iv. INDEX RERUM — ⌘K / Ctrl K
     Índice remissivo do volume: busca, ↑/↓, Enter, Esc.
     Disparado pelo ícone de luneta no chrome (ver chrome icons).
     ══════════════════════════════════════════════════════════ */
  var indexOverlay = null;
  var indexSel = 0;
  var indexHits = [];

  function goTo(go) {
    if (go.pocket) { openPocket(); return; }
    if (go.click) {
      var btn = document.querySelector(go.click);
      if (btn) btn.click();
      return;
    }
    var target = null;
    if (go.nth != null) target = document.querySelectorAll(go.sel)[go.nth];
    else target = document.querySelector(go.sel);
    if (!target && go.fallback) target = document.querySelector(go.fallback);
    if (target) target.scrollIntoView({ behavior: REDUCED ? "auto" : "smooth", block: "start" });
  }

  function renderIndexList(listEl, query) {
    var lang = currentLang();
    var q = normalize(query || "");
    indexHits = INDEX_ENTRIES.filter(function (en) {
      return !q || normalize(en.pt + " " + en.en).indexOf(q) !== -1;
    });
    if (indexSel >= indexHits.length) indexSel = Math.max(0, indexHits.length - 1);
    listEl.innerHTML = "";
    if (!indexHits.length) {
      listEl.appendChild(el("li", "ed-ix-empty",
        lang === "pt" ? "— verbete não consta deste volume —"
                      : "— entry not found in this volume —"));
      return;
    }
    indexHits.forEach(function (entry, i) {
      var li = el("li", "ed-ix-row" + (i === indexSel ? " sel" : ""));
      li.appendChild(el("span", "ed-ix-term", lang === "pt" ? entry.pt : entry.en));
      li.appendChild(el("span", "ed-ix-leader"));
      li.appendChild(el("span", "ed-ix-loc", lang === "pt" ? entry.locPt : entry.locEn));
      li.addEventListener("mouseenter", function () {
        indexSel = i;
        Array.prototype.forEach.call(listEl.children, function (c, j) {
          c.classList.toggle("sel", j === indexSel);
        });
      });
      li.addEventListener("click", function () {
        closeIndex();
        goTo(entry.go);
      });
      listEl.appendChild(li);
    });
  }

  function openIndex() {
    if (indexOverlay) { closeIndex(); return; }
    closePocket();
    var lang = currentLang();
    indexSel = 0;

    var ov = el("div", "ed-index");
    ov.setAttribute("role", "dialog");
    ov.setAttribute("aria-modal", "true");
    ov.setAttribute("aria-label", "Index Rerum");

    var panel = el("div", "ed-index-panel");
    var head = el("header", "ed-index-head");
    head.appendChild(el("span", "ed-index-title", "Index Rerum"));
    head.appendChild(el("span", "ed-index-hint", lang === "pt" ? "↑↓ navegar · Enter ir · Esc fechar" : "↑↓ navigate · Enter go · Esc close"));
    panel.appendChild(head);

    var input = el("input", "ed-index-input");
    input.type = "text";
    input.setAttribute("placeholder", lang === "pt" ? "buscar no volume…" : "search the volume…");
    panel.appendChild(input);

    var list = el("ul", "ed-index-list");
    panel.appendChild(list);
    ov.appendChild(panel);

    ov.addEventListener("click", function (e) { if (e.target === ov) closeIndex(); });
    input.addEventListener("input", function () { indexSel = 0; renderIndexList(list, input.value); });
    input.addEventListener("keydown", function (e) {
      if (e.key === "ArrowDown") { e.preventDefault(); indexSel = Math.min(indexSel + 1, indexHits.length - 1); renderIndexList(list, input.value); }
      else if (e.key === "ArrowUp") { e.preventDefault(); indexSel = Math.max(indexSel - 1, 0); renderIndexList(list, input.value); }
      else if (e.key === "Enter" && indexHits[indexSel]) { var g = indexHits[indexSel].go; closeIndex(); goTo(g); }
    });

    document.body.appendChild(ov);
    indexOverlay = ov;
    renderIndexList(list, "");
    input.focus();
  }

  function closeIndex() {
    if (!indexOverlay) return;
    indexOverlay.remove();
    indexOverlay = null;
  }

  /* ══════════════════════════════════════════════════════════
     ÍCONES DO CHRME — luneta (esq.) e bolso (dir.) ao redor da vela
     Injetados na .chrome-actions (renderizada pelo React). Como o
     toggle PT/EN re-renderiza o root, garantimos a presença e os
     rótulos de forma idempotente via onRootChange.
     ══════════════════════════════════════════════════════════ */

  /* Lupa — silhueta de tinta com vidro recortado, brilho e cabo torneado.
     Mesmo estilo do castiçal e do livro: fill currentColor + acentos em
     var(--paper). Por usar currentColor, herda hover (oxblood) e modo vela. */
  var LUNETA_SVG =
    '<svg width="22" height="22" viewBox="2.8 1.8 19.5 19.5" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style="display:block">' +
      '<line x1="13.6" y1="12.6" x2="18.4" y2="17.4" stroke="currentColor" stroke-width="3.2" stroke-linecap="round"/>' +
      '<circle cx="19.6" cy="18.6" r="1.9" fill="currentColor"/>' +
      '<line x1="14.8" y1="13" x2="16.2" y2="14.4" stroke="var(--paper)" stroke-width="0.8" opacity="0.55"/>' +
      '<circle cx="9.5" cy="8.5" r="6.3" fill="currentColor"/>' +
      '<circle cx="9.5" cy="8.5" r="4.4" fill="var(--paper)"/>' +
      '<path d="M6.6 5.7 A 4.4 4.4 0 0 1 10 4.2" stroke="currentColor" stroke-width="0.9" stroke-linecap="round" opacity="0.3"/>' +
    '</svg>';

  /* Livro de bolso — capa fechada, lombada à esquerda e marcador. */
  var POCKETBOOK_SVG =
    '<svg width="16" height="22" viewBox="6.5 3 11.5 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style="display:block">' +
      '<rect x="6.5" y="3" width="11.5" height="16" rx="1.2" fill="currentColor"/>' +
      '<line x1="9" y1="4.4" x2="9" y2="17.6" stroke="var(--paper)" stroke-width="0.7" opacity="0.4"/>' +
      '<line x1="16.2" y1="5.2" x2="16.2" y2="16.8" stroke="var(--paper)" stroke-width="0.7" opacity="0.4"/>' +
      '<path d="M12.2 3 L12.2 9.2 L10.8 7.7 L9.4 9.2 L9.4 3 Z" fill="var(--paper)" opacity="0.85"/>' +
    '</svg>';

  function ensureChromeIcons() {
    var actions = document.querySelector(".chrome-actions");
    if (!actions) return;
    var candle = actions.querySelector(".candle-toggle");
    if (!candle) return;
    var lang = currentLang();

    /* luneta — à ESQUERDA da vela */
    var luneta = actions.querySelector(".ed-icon--index");
    if (!luneta) {
      luneta = el("button", "ed-icon ed-icon--index");
      luneta.type = "button";
      luneta.innerHTML = LUNETA_SVG;
      luneta.addEventListener("click", openIndex);
      candle.parentNode.insertBefore(luneta, candle);
    }
    var ixLabel = lang === "pt" ? "Index Rerum — buscar no volume (⌘K)"
                                : "Index Rerum — search the volume (⌘K)";
    luneta.title = ixLabel;
    luneta.setAttribute("aria-label", ixLabel);
    luneta.setAttribute("aria-haspopup", "dialog");

    /* livro de bolso — à DIREITA da vela */
    var pocket = actions.querySelector(".ed-icon--pocket");
    if (!pocket) {
      pocket = el("button", "ed-icon ed-icon--pocket");
      pocket.type = "button";
      pocket.innerHTML = POCKETBOOK_SVG;
      pocket.addEventListener("click", openPocket);
      if (candle.nextSibling) candle.parentNode.insertBefore(pocket, candle.nextSibling);
      else candle.parentNode.appendChild(pocket);
    }
    var pkLabel = POCKET[lang].label;
    pocket.title = pkLabel;
    pocket.setAttribute("aria-label", pkLabel);
    pocket.setAttribute("aria-haspopup", "dialog");
  }

  function initChromeIcons() {
    onRootChange(ensureChromeIcons);

    /* atalhos de teclado globais */
    window.addEventListener("keydown", function (e) {
      if ((e.metaKey || e.ctrlKey) && (e.key === "k" || e.key === "K")) {
        e.preventDefault();
        openIndex();
      } else if (e.key === "Escape") {
        closeIndex();
        closePocket();
      }
    });
  }

  /* ─── boot ────────────────────────────────────────────────── */
  function boot() {
    whenReady("#root > *", function () {
      observeRoot();
      reinjectors.forEach(function (fn) { fn(); });
    });
    initLazyThree();
    initDedication();
    initChromeIcons();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
