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
