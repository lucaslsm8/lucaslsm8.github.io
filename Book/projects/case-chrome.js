/* ════════════════════════════════════════════════════════════
   CASE CHROME — paridade da home nas páginas de case
   ────────────────────────────────────────────────────────────
   i.   Index Rerum (⌘K / Ctrl K · ícone de luneta) — índice da
        PRÓPRIA prancha, derivado dos cabeçalhos de seção, mais
        entradas globais (voltar ao catálogo · edição de bolso ·
        modo vela). Busca, ↑/↓, Enter, Esc.
   ii.  Edição de bolso (ícone de livreto) — o volume numa lauda.
        Fatos espelham o CONTENT da home (regra 6 · não inventar).

   JS puro, sem build. As páginas de case são estáticas (sem React),
   então os ícones são injetados uma vez; os rótulos acompanham o
   toggle PT/EN. O nome clicável do running-head é feito no HTML.
   Requer os estilos .ed-* de design-system/case-template.css.
   ════════════════════════════════════════════════════════════ */
(function () {
  "use strict";

  var REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var HOME = "../index.html";

  function lang() {
    var l = document.body.getAttribute("data-lang") ||
            document.documentElement.lang || "pt";
    return l.indexOf("en") === 0 ? "en" : "pt";
  }

  function el(tag, className, text) {
    var n = document.createElement(tag);
    if (className) n.className = className;
    if (text != null) n.textContent = text;
    return n;
  }

  function normalize(s) {
    return String(s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  }

  /* Texto bilíngue de um nó que pode conter spans .t[lang]. Retorna
     { pt, en } — para exibir no idioma corrente e buscar em ambos. */
  function bothText(node) {
    if (!node) return { pt: "", en: "" };
    var pt = node.querySelector('.t[lang="pt"]');
    var en = node.querySelector('.t[lang="en"]');
    if (pt || en) {
      return {
        pt: (pt ? pt.textContent : "").trim().replace(/\s+/g, " "),
        en: (en ? en.textContent : "").trim().replace(/\s+/g, " ")
      };
    }
    var t = node.textContent.trim().replace(/\s+/g, " ");
    return { pt: t, en: t };
  }

  function scrollToEl(target) {
    if (!target) return;
    var top = target.getBoundingClientRect().top + window.scrollY - 80; /* compensa chrome fixo */
    /* 'instant' (não 'auto') p/ não herdar o scroll-behavior:smooth do CSS
       quando o leitor pede menos movimento. */
    window.scrollTo({ top: Math.max(0, top), behavior: REDUCED ? "instant" : "smooth" });
  }

  /* ══════════════════════════════════════════════════════════
     CONTEÚDO BILÍNGUE da edição de bolso (espelha a home).
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
      contactLabel: "Correspondência",
      email: "lucas.schoenherr@gmail.com",
      print: "imprimir esta lauda",
      full: "ver o catálogo completo ↗",
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
      contactLabel: "Correspondence",
      email: "lucas.schoenherr@gmail.com",
      print: "print this leaf",
      full: "see the full catalogue ↗",
      close: "Close the pocket edition"
    }
  };

  /* ══════════════════════════════════════════════════════════
     EDIÇÃO DE BOLSO
     ══════════════════════════════════════════════════════════ */
  var pocketOverlay = null;

  function buildPocket() {
    var c = POCKET[lang()];
    var ov = el("div", "ed-pocket");
    ov.setAttribute("role", "dialog");
    ov.setAttribute("aria-modal", "true");
    ov.setAttribute("aria-label", c.label);

    var card = el("article", "ed-pocket-card");

    var head = el("header", "ed-pocket-head");
    head.appendChild(el("span", "ed-pocket-label", c.label));
    head.appendChild(el("span", "ed-pocket-gloss", "· " + c.gloss));
    var x = el("button", "ed-pocket-close", "×");
    x.type = "button";
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
    printBtn.type = "button";
    printBtn.addEventListener("click", function () { window.print(); });
    foot.appendChild(printBtn);
    var full = el("a", "ed-pocket-full", c.full);
    full.href = HOME + "#works";
    foot.appendChild(full);
    card.appendChild(foot);

    ov.appendChild(card);
    ov.addEventListener("click", function (e) { if (e.target === ov) closePocket(); });
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
     INDEX RERUM — índice da prancha + entradas globais
     ══════════════════════════════════════════════════════════ */
  var indexOverlay = null;
  var indexSel = 0;
  var indexHits = [];

  /* Constrói o índice na abertura: seções desta página (derivadas
     dos cabeçalhos) + entradas globais. */
  function buildEntries() {
    var L = lang();
    var entries = [];

    var front = document.querySelector(".case-frontispiece");
    if (front) {
      var num = front.querySelector(".case-num");
      entries.push({
        pt: "Frontispício", en: "Frontispiece",
        loc: num ? num.textContent.trim() : (L === "pt" ? "rosto" : "title"),
        el: front
      });
    }

    document.querySelectorAll(".case-section .section-head").forEach(function (h) {
      var name = h.querySelector(".name");
      if (!name) return;
      var roman = h.querySelector(".roman");
      var t = bothText(name);
      entries.push({
        pt: t.pt, en: t.en,
        loc: roman ? roman.textContent.trim().replace(/\.+$/, "") : "·",
        el: h.closest(".case-section")
      });
    });

    entries.push({
      pt: "Catálogo de obras", en: "Catalogue of works",
      loc: L === "pt" ? "↗ home" : "↗ home", href: HOME + "#works"
    });
    entries.push({
      pt: "Edição de bolso", en: "Pocket edition",
      loc: L === "pt" ? "uma lauda" : "one leaf", pocket: true
    });
    if (document.querySelector(".candle-toggle")) {
      entries.push({
        pt: "Modo vela / modo dia", en: "Candle / day mode",
        loc: L === "pt" ? "alto da página" : "page head", click: ".candle-toggle"
      });
    }
    return entries;
  }

  function goTo(entry) {
    if (entry.pocket) { openPocket(); return; }
    if (entry.click) {
      var btn = document.querySelector(entry.click);
      if (btn) btn.click();
      return;
    }
    if (entry.href) { window.location.href = entry.href; return; }
    if (entry.el) scrollToEl(entry.el);
  }

  function renderIndexList(listEl, allEntries, query) {
    var L = lang();
    var q = normalize(query || "");
    indexHits = allEntries.filter(function (en) {
      return !q || normalize(en.pt + " " + en.en).indexOf(q) !== -1;
    });
    if (indexSel >= indexHits.length) indexSel = Math.max(0, indexHits.length - 1);
    listEl.innerHTML = "";
    if (!indexHits.length) {
      listEl.appendChild(el("li", "ed-ix-empty",
        L === "pt" ? "— verbete não consta desta prancha —"
                   : "— entry not found in this plate —"));
      return;
    }
    indexHits.forEach(function (entry, i) {
      var li = el("li", "ed-ix-row" + (i === indexSel ? " sel" : ""));
      li.appendChild(el("span", "ed-ix-term", L === "pt" ? entry.pt : entry.en));
      li.appendChild(el("span", "ed-ix-leader"));
      li.appendChild(el("span", "ed-ix-loc", entry.loc));
      li.addEventListener("mouseenter", function () {
        indexSel = i;
        Array.prototype.forEach.call(listEl.children, function (c, j) {
          c.classList.toggle("sel", j === indexSel);
        });
      });
      li.addEventListener("click", function () { closeIndex(); goTo(entry); });
      listEl.appendChild(li);
    });
  }

  function openIndex() {
    if (indexOverlay) { closeIndex(); return; }
    closePocket();
    var L = lang();
    indexSel = 0;
    var allEntries = buildEntries();

    var ov = el("div", "ed-index");
    ov.setAttribute("role", "dialog");
    ov.setAttribute("aria-modal", "true");
    ov.setAttribute("aria-label", "Index Rerum");

    var panel = el("div", "ed-index-panel");
    var head = el("header", "ed-index-head");
    head.appendChild(el("span", "ed-index-title", "Index Rerum"));
    head.appendChild(el("span", "ed-index-hint",
      L === "pt" ? "↑↓ navegar · Enter ir · Esc fechar" : "↑↓ navigate · Enter go · Esc close"));
    panel.appendChild(head);

    var input = el("input", "ed-index-input");
    input.type = "text";
    input.setAttribute("placeholder", L === "pt" ? "buscar nesta prancha…" : "search this plate…");
    panel.appendChild(input);

    var list = el("ul", "ed-index-list");
    panel.appendChild(list);
    ov.appendChild(panel);

    ov.addEventListener("click", function (e) { if (e.target === ov) closeIndex(); });
    input.addEventListener("input", function () { indexSel = 0; renderIndexList(list, allEntries, input.value); });
    input.addEventListener("keydown", function (e) {
      if (e.key === "ArrowDown") { e.preventDefault(); indexSel = Math.min(indexSel + 1, indexHits.length - 1); renderIndexList(list, allEntries, input.value); }
      else if (e.key === "ArrowUp") { e.preventDefault(); indexSel = Math.max(indexSel - 1, 0); renderIndexList(list, allEntries, input.value); }
      else if (e.key === "Enter" && indexHits[indexSel]) { var g = indexHits[indexSel]; closeIndex(); goTo(g); }
    });

    document.body.appendChild(ov);
    indexOverlay = ov;
    renderIndexList(list, allEntries, "");
    input.focus();
  }

  function closeIndex() {
    if (!indexOverlay) return;
    indexOverlay.remove();
    indexOverlay = null;
  }

  /* ══════════════════════════════════════════════════════════
     ÍCONES DO CHROME — luneta (esq.) e bolso (dir.) ao redor da vela
     ══════════════════════════════════════════════════════════ */
  var LUNETA_SVG =
    '<svg width="22" height="22" viewBox="2.8 1.8 19.5 19.5" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style="display:block">' +
      '<line x1="13.6" y1="12.6" x2="18.4" y2="17.4" stroke="currentColor" stroke-width="3.2" stroke-linecap="round"/>' +
      '<circle cx="19.6" cy="18.6" r="1.9" fill="currentColor"/>' +
      '<line x1="14.8" y1="13" x2="16.2" y2="14.4" stroke="var(--paper)" stroke-width="0.8" opacity="0.55"/>' +
      '<circle cx="9.5" cy="8.5" r="6.3" fill="currentColor"/>' +
      '<circle cx="9.5" cy="8.5" r="4.4" fill="var(--paper)"/>' +
      '<path d="M6.6 5.7 A 4.4 4.4 0 0 1 10 4.2" stroke="currentColor" stroke-width="0.9" stroke-linecap="round" opacity="0.3"/>' +
    '</svg>';

  var POCKETBOOK_SVG =
    '<svg width="16" height="22" viewBox="6.5 3 11.5 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style="display:block">' +
      '<rect x="6.5" y="3" width="11.5" height="16" rx="1.2" fill="currentColor"/>' +
      '<line x1="9" y1="4.4" x2="9" y2="17.6" stroke="var(--paper)" stroke-width="0.7" opacity="0.4"/>' +
      '<line x1="16.2" y1="5.2" x2="16.2" y2="16.8" stroke="var(--paper)" stroke-width="0.7" opacity="0.4"/>' +
      '<path d="M12.2 3 L12.2 9.2 L10.8 7.7 L9.4 9.2 L9.4 3 Z" fill="var(--paper)" opacity="0.85"/>' +
    '</svg>';

  function refreshLabels() {
    var L = lang();
    var luneta = document.querySelector(".ed-icon--index");
    if (luneta) {
      var ix = L === "pt" ? "Index Rerum — buscar nesta prancha (⌘K)"
                          : "Index Rerum — search this plate (⌘K)";
      luneta.title = ix;
      luneta.setAttribute("aria-label", ix);
    }
    var pocket = document.querySelector(".ed-icon--pocket");
    if (pocket) {
      pocket.title = POCKET[L].label;
      pocket.setAttribute("aria-label", POCKET[L].label);
    }
  }

  function ensureChromeIcons() {
    var actions = document.querySelector(".chrome-actions");
    if (!actions) return;
    var candle = actions.querySelector(".candle-toggle");
    var langToggle = actions.querySelector(".lang-toggle");
    var anchor = candle || langToggle;
    if (!anchor) return;

    /* luneta — à esquerda da vela (ou antes do toggle de idioma) */
    if (!actions.querySelector(".ed-icon--index")) {
      var luneta = el("button", "ed-icon ed-icon--index");
      luneta.type = "button";
      luneta.innerHTML = LUNETA_SVG;
      luneta.setAttribute("aria-haspopup", "dialog");
      luneta.addEventListener("click", openIndex);
      anchor.parentNode.insertBefore(luneta, anchor);
    }

    /* bolso — à direita da vela (ou antes do toggle de idioma) */
    if (!actions.querySelector(".ed-icon--pocket")) {
      var pocket = el("button", "ed-icon ed-icon--pocket");
      pocket.type = "button";
      pocket.innerHTML = POCKETBOOK_SVG;
      pocket.setAttribute("aria-haspopup", "dialog");
      pocket.addEventListener("click", openPocket);
      if (candle && candle.nextSibling) candle.parentNode.insertBefore(pocket, candle.nextSibling);
      else if (candle) candle.parentNode.appendChild(pocket);
      else langToggle.parentNode.insertBefore(pocket, langToggle);
    }

    refreshLabels();
  }

  /* ─── boot ────────────────────────────────────────────────── */
  function boot() {
    ensureChromeIcons();

    /* rótulos acompanham o toggle PT/EN (re-checa no próximo frame) */
    var lt = document.querySelector(".lang-toggle");
    if (lt) lt.addEventListener("click", function () { requestAnimationFrame(refreshLabels); });

    /* atalhos globais */
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

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
