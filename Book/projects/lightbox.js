/* ============================================================
   Lightbox das galerias — versão elaborada, COMPARTILHADA por
   todas as pranchas (genai · lighthouse · pmo · sports).
   Barra de ferramentas SVG: zoom 1:1 · tela cheia · compartilhar
   · fechar. Setas + miniaturas + legenda bilíngue + toque.
   Estilos: design-system/case-template.css (bloco .lbg*).
   ============================================================ */
(function () {
  'use strict';

  // Legenda com reconhecimento de idioma: clona o elemento, remove os
  // .t do idioma oposto e lê o texto — funciona com qualquer aninhamento
  // (p-cap com p-roman + p-txt, figcaption bilíngue, etc.).
  function capText(el, lang) {
    if (!el) return '';
    var clone = el.cloneNode(true);
    Array.prototype.slice.call(clone.querySelectorAll('.t')).forEach(function (s) {
      if (s.getAttribute('lang') !== lang) s.parentNode && s.parentNode.removeChild(s);
    });
    return (clone.textContent || '').replace(/\s+/g, ' ').trim();
  }

  var CAP_SEL = '.lh-strip__cap, .lh-plate__cap, .sl-hero__cap, .p-cap, .g-cap, .pmo-plate__cap, .sx-hero__cap, figcaption';

  function collect(gallery, clicked) {
    var lang = document.body.getAttribute('data-lang') || 'pt';
    var links = Array.prototype.slice.call(gallery.querySelectorAll('.lightboxgallery-link'));
    var items = links.map(function (link) {
      var img = link.querySelector('img');
      var cap = link.querySelector(CAP_SEL);
      var caption = capText(cap, lang) || capText(link, lang) ||
                    (link.getAttribute('aria-label') || '') || (img && img.getAttribute('alt')) || '';
      var artR = img ? getComputedStyle(img).getPropertyValue('--art-r').trim() : '';
      return { href: link.getAttribute('href'), caption: caption, thumb: img ? img.src : link.getAttribute('href'), artR: artR };
    });
    return { items: items, startIndex: Math.max(0, links.indexOf(clicked)) };
  }

  function esc(s) { return String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }

  // Ícones SVG (traço) — sempre opticamente centrados no botão, ao contrário
  // dos glifos de texto (‹ › ×), cujas métricas os deixavam tortos no círculo.
  var SVG = {
    prev: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M15 4 7 12l8 8"/></svg>',
    next: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M9 4l8 8-8 8"/></svg>',
    close: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M5 5l14 14M19 5 5 19"/></svg>',
    zoomIn: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="10.5" cy="10.5" r="6.5"/><path d="M21 21l-5.4-5.4M10.5 7.5v6M7.5 10.5h6"/></svg>',
    zoomOut: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="10.5" cy="10.5" r="6.5"/><path d="M21 21l-5.4-5.4M7.5 10.5h6"/></svg>',
    fsEnter: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M8 4H4v4M16 4h4v4M20 16v4h-4M8 20H4v-4"/></svg>',
    fsExit: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M4 8h4V4M20 8h-4V4M16 20v-4h4M8 20v-4H4"/></svg>',
    share: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="18" cy="5" r="2.6"/><circle cx="6" cy="12" r="2.6"/><circle cx="18" cy="19" r="2.6"/><path d="M8.3 13.3l7.4 4.4M15.7 6.3l-7.4 4.4"/></svg>'
  };

  function open(gallery, clicked) {
    var data = collect(gallery, clicked);
    var items = data.items; if (!items.length) return;
    var lang = document.body.getAttribute('data-lang') || 'pt';
    var T = lang === 'en'
      ? { zoomIn: 'Zoom in', zoomOut: 'Zoom out', fsEnter: 'Fullscreen', fsExit: 'Exit fullscreen', share: 'Share', close: 'Close (Esc)', copied: 'Link copied' }
      : { zoomIn: 'Ampliar', zoomOut: 'Reduzir', fsEnter: 'Tela cheia', fsExit: 'Sair da tela cheia', share: 'Compartilhar', close: 'Fechar (Esc)', copied: 'Link copiado' };
    var current = data.startIndex;
    var overlay = document.createElement('div');
    overlay.className = 'lbg-overlay';
    var multi = items.length > 1;
    var sidebar = multi ? '<div class="lbg__sidebar">' + items.map(function (it, i) {
      return '<button class="lbg__thumb' + (i === current ? ' is-active' : '') + '" data-index="' + i + '" type="button"><img src="' + esc(it.thumb) + '" alt=""></button>';
    }).join('') + '</div>' : '';
    var toolbar =
      '<div class="lbg__toolbar">' +
        '<button class="lbg__tool lbg__tool--zoom" data-action="zoom" type="button" aria-label="' + T.zoomIn + '" title="' + T.zoomIn + '">' + SVG.zoomIn + '</button>' +
        '<button class="lbg__tool lbg__tool--fs" data-action="fullscreen" type="button" aria-label="' + T.fsEnter + '" title="' + T.fsEnter + '">' + SVG.fsEnter + '</button>' +
        '<button class="lbg__tool lbg__tool--share" data-action="share" type="button" aria-label="' + T.share + '" title="' + T.share + '">' + SVG.share + '</button>' +
        '<button class="lbg__tool lbg__tool--close" data-action="close" type="button" aria-label="' + T.close + '" title="' + T.close + '">' + SVG.close + '</button>' +
      '</div>';
    overlay.innerHTML =
      toolbar +
      sidebar +
      '<div class="lbg__stage">' +
        (multi ? '<button class="lbg__nav lbg__nav--prev" data-action="prev" aria-label="Previous">' + SVG.prev + '</button>' : '') +
        '<div class="lbg__viewer">' +
          '<img src="' + esc(items[current].href) + '" alt="">' +
          '<div class="lbg__caption"><span class="lbg__caption__text">' + esc(items[current].caption) + '</span>' +
          (multi ? '<span class="lbg__counter">' + (current + 1) + ' / ' + items.length + '</span>' : '') +
          '<span class="lbg__zoomhint" aria-hidden="true">&#8853; 100%</span></div>' +
        '</div>' +
        (multi ? '<button class="lbg__nav lbg__nav--next" data-action="next" aria-label="Next">' + SVG.next + '</button>' : '') +
      '</div>';
    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';

    var viewer = overlay.querySelector('.lbg__viewer');
    var imgEl = viewer.querySelector('img');
    function applyArtR(i) { imgEl.style.setProperty('--art-r', items[i].artR || ''); }
    applyArtR(current);
    var capEl = overlay.querySelector('.lbg__caption__text');
    var cntEl = overlay.querySelector('.lbg__counter');
    var thumbs = Array.prototype.slice.call(overlay.querySelectorAll('.lbg__thumb'));

    var zoomBtn = overlay.querySelector('.lbg__tool--zoom');
    var fsBtn = overlay.querySelector('.lbg__tool--fs');

    // ----- Zoom 1:1 (revela a resolução nativa das pranchas grandes) -----
    var zoomFactor = 1;
    function updateZoomBtn() {
      if (!zoomBtn) return;
      var zoomed = viewer.classList.contains('is-zoomed');
      var able = viewer.classList.contains('is-zoomable');
      zoomBtn.classList.toggle('is-disabled', !able && !zoomed);
      zoomBtn.innerHTML = zoomed ? SVG.zoomOut : SVG.zoomIn;
      zoomBtn.setAttribute('aria-label', zoomed ? T.zoomOut : T.zoomIn);
      zoomBtn.title = zoomed ? T.zoomOut : T.zoomIn;
    }
    function updateZoomable() {
      if (!imgEl.naturalWidth) return;
      var fit = imgEl.offsetWidth || imgEl.getBoundingClientRect().width;
      zoomFactor = imgEl.naturalWidth / Math.max(1, fit);
      viewer.classList.toggle('is-zoomable', zoomFactor > 1.15);
      updateZoomBtn();
    }
    function panToFraction(fx, fy) {
      viewer.scrollLeft = fx * (viewer.scrollWidth - viewer.clientWidth);
      viewer.scrollTop = fy * (viewer.scrollHeight - viewer.clientHeight);
    }
    function panTo(e) {
      var r = viewer.getBoundingClientRect();
      panToFraction(Math.min(1, Math.max(0, (e.clientX - r.left) / r.width)),
                    Math.min(1, Math.max(0, (e.clientY - r.top) / r.height)));
    }
    function enterZoom(fx, fy) {
      imgEl.style.width = imgEl.naturalWidth + 'px'; imgEl.style.height = 'auto';
      viewer.classList.add('is-zoomed');
      panToFraction(fx == null ? 0.5 : fx, fy == null ? 0.5 : fy);
      updateZoomBtn();
    }
    function exitZoom() { viewer.classList.remove('is-zoomed'); imgEl.style.width = ''; imgEl.style.height = ''; updateZoomBtn(); }
    function toggleZoom() {
      if (viewer.classList.contains('is-zoomed')) exitZoom();
      else if (viewer.classList.contains('is-zoomable')) enterZoom(0.5, 0.5);
    }
    imgEl.addEventListener('click', function (e) {
      if (viewer.classList.contains('is-zoomed')) { e.stopPropagation(); exitZoom(); return; }
      if (viewer.classList.contains('is-zoomable')) {
        e.stopPropagation();
        var r = viewer.getBoundingClientRect();
        enterZoom(Math.min(1, Math.max(0, (e.clientX - r.left) / r.width)),
                  Math.min(1, Math.max(0, (e.clientY - r.top) / r.height)));
      }
    });
    viewer.addEventListener('mousemove', function (e) { if (viewer.classList.contains('is-zoomed')) panTo(e); });
    imgEl.addEventListener('load', updateZoomable);
    if (imgEl.complete && imgEl.naturalWidth) updateZoomable();

    // ----- Tela cheia (fullscreen nativo do overlay) -----
    function isFs() { return document.fullscreenElement === overlay; }
    function updateFsBtn() {
      if (!fsBtn) return;
      var on = isFs();
      fsBtn.innerHTML = on ? SVG.fsExit : SVG.fsEnter;
      fsBtn.setAttribute('aria-label', on ? T.fsExit : T.fsEnter);
      fsBtn.title = on ? T.fsExit : T.fsEnter;
    }
    function toggleFs() {
      if (isFs()) { if (document.exitFullscreen) document.exitFullscreen(); }
      else if (overlay.requestFullscreen) overlay.requestFullscreen().catch(function () {});
    }
    document.addEventListener('fullscreenchange', updateFsBtn);

    // ----- Compartilhar (Web Share API, com fallback p/ copiar o link) -----
    function toast(msg) {
      var t = overlay.querySelector('.lbg__toast');
      if (!t) { t = document.createElement('div'); t.className = 'lbg__toast'; overlay.appendChild(t); }
      t.textContent = msg; t.classList.add('is-on');
      clearTimeout(t._t); t._t = setTimeout(function () { t.classList.remove('is-on'); }, 1900);
    }
    function share() {
      var url; try { url = new URL(items[current].href, location.href).href; } catch (e) { url = items[current].href; }
      var title = items[current].caption || document.title;
      if (navigator.share) { navigator.share({ title: title, url: url }).catch(function () {}); }
      else if (navigator.clipboard && navigator.clipboard.writeText) { navigator.clipboard.writeText(url).then(function () { toast(T.copied); }).catch(function () { toast(url); }); }
      else { toast(url); }
    }

    function goTo(i) {
      var n = ((i % items.length) + items.length) % items.length;
      if (n === current) return;
      current = n;
      exitZoom();
      viewer.classList.remove('is-zoomable'); updateZoomBtn();
      viewer.classList.remove('is-swapping'); void viewer.offsetWidth;
      imgEl.src = items[current].href;
      applyArtR(current);
      capEl.textContent = items[current].caption;
      if (cntEl) cntEl.textContent = (current + 1) + ' / ' + items.length;
      viewer.classList.add('is-swapping');
      thumbs.forEach(function (t, k) { t.classList.toggle('is-active', k === current); });
      if (thumbs[current] && thumbs[current].scrollIntoView) thumbs[current].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
    }
    function close() {
      if (isFs() && document.exitFullscreen) document.exitFullscreen().catch(function () {});
      document.removeEventListener('fullscreenchange', updateFsBtn);
      if (overlay.parentNode) document.body.removeChild(overlay);
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
    }
    function onKey(e) {
      if (e.key === 'Escape') { e.preventDefault(); if (isFs()) { document.exitFullscreen(); } else close(); }
      else if (e.key === 'ArrowRight') { e.preventDefault(); goTo(current + 1); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); goTo(current - 1); }
      else if (e.key === 'f' || e.key === 'F') { e.preventDefault(); toggleFs(); }
      else if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); toggleZoom(); }
    }
    overlay.addEventListener('click', function (e) {
      var action = e.target.closest('[data-action]');
      if (action) {
        e.stopPropagation();
        var a = action.getAttribute('data-action');
        if (a === 'prev') goTo(current - 1);
        else if (a === 'next') goTo(current + 1);
        else if (a === 'zoom') toggleZoom();
        else if (a === 'fullscreen') toggleFs();
        else if (a === 'share') share();
        else close();
        return;
      }
      var thumb = e.target.closest('.lbg__thumb');
      if (thumb) { e.stopPropagation(); goTo(parseInt(thumb.dataset.index, 10)); return; }
      if (e.target.closest('.lbg__viewer, .lbg__sidebar, .lbg__caption, .lbg__nav, .lbg__toolbar')) return;
      close();
    });
    var sx = 0, sy = 0, ta = false;
    var stage = overlay.querySelector('.lbg__stage');
    stage.addEventListener('touchstart', function (e) { if (e.touches.length !== 1) return; ta = true; sx = e.touches[0].clientX; sy = e.touches[0].clientY; }, { passive: true });
    stage.addEventListener('touchend', function (e) { if (!ta) return; ta = false; var t = e.changedTouches[0]; var dx = t.clientX - sx, dy = t.clientY - sy; if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) { if (dx < 0) goTo(current + 1); else goTo(current - 1); } }, { passive: true });
    document.addEventListener('keydown', onKey);
  }

  function bind() {
    document.querySelectorAll('.lightboxgallery-link').forEach(function (link) {
      if (link.__lbgBound) return;
      link.__lbgBound = true;
      link.addEventListener('click', function (e) {
        e.preventDefault();
        var gallery = link.closest('.sl-gallery') || link.parentElement;
        open(gallery, link);
      });
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', bind);
  else bind();
})();
