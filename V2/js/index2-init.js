/* ====================================================
   index2-init.js — Bento Portfolio behaviors
   1. Nav: glassmorphism on scroll
   2. Cards: staggered entrance via IntersectionObserver
   ==================================================== */

(function () {
  'use strict';

  /* --- 1. Nav scroll gloss --- */
  const header = document.getElementById('site-header');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('is-scrolled', window.scrollY > 30);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // run once on load
  }

  /* --- 2. Card entrance animation --- */
  const cards = document.querySelectorAll('.bento-card');

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        if (isIntersecting) {
          target.classList.add('is-visible');
          io.unobserve(target);
        }
      });
    },
    { threshold: 0.06, rootMargin: '0px 0px -40px 0px' }
  );

  cards.forEach((card, i) => {
    // stagger: each card enters 65ms after the previous
    card.style.transitionDelay = `${i * 65}ms`;
    io.observe(card);
  });

})();

document.addEventListener('DOMContentLoaded', function () {

    // --------------------------------------------- //
    // Works Index — preview de imagem flutuante
    // --------------------------------------------- //
    var preview    = document.getElementById('works-preview');
    var previewImg = document.getElementById('works-preview-img');

    if (!preview || !previewImg) return;

    var items = document.querySelectorAll('.works-index__item[data-preview]');
    if (!items.length) return;

    // Posição suavizada (lerp)
    var mouseX  = 0, mouseY  = 0;
    var lerpX   = 0, lerpY   = 0;
    var rafId   = null;
    var active  = false;

    // Offset para não tapar o cursor
    var OFFSET_X = 28;
    var OFFSET_Y = -115;

    document.addEventListener('mousemove', function (e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animate() {
        if (!active) return;

        // Lerp suave — fator 0.10 dá leveza cinematic
        lerpX += (mouseX - lerpX) * 0.10;
        lerpY += (mouseY - lerpY) * 0.10;

        preview.style.left = (lerpX + OFFSET_X) + 'px';
        preview.style.top  = (lerpY + OFFSET_Y) + 'px';

        rafId = requestAnimationFrame(animate);
    }

    items.forEach(function (item) {

        item.addEventListener('mouseenter', function () {
            var src = item.getAttribute('data-preview');

            // Troca a imagem só se for diferente (evita flash)
            if (previewImg.getAttribute('src') !== src) {
                previewImg.src = src;
            }

            // Garante que a posição inicial esteja correta antes do fade-in
            lerpX = mouseX;
            lerpY = mouseY;
            preview.style.left = (mouseX + OFFSET_X) + 'px';
            preview.style.top  = (mouseY + OFFSET_Y) + 'px';

            preview.classList.add('is-visible');
            active = true;
            cancelAnimationFrame(rafId);
            rafId = requestAnimationFrame(animate);
        });

        item.addEventListener('mouseleave', function () {
            preview.classList.remove('is-visible');
            active = false;
            cancelAnimationFrame(rafId);
        });
    });

    // --------------------------------------------- //
    // Ajuste de posição para não sair da viewport
    // --------------------------------------------- //
    document.addEventListener('mousemove', function (e) {
        var vpW = window.innerWidth;
        var vpH = window.innerHeight;
        var pw  = 310; // largura do preview
        var ph  = 200; // altura do preview

        // Muda o lado se estiver muito à direita
        if (e.clientX + OFFSET_X + pw > vpW) {
            OFFSET_X = -(pw + 12);
        } else {
            OFFSET_X = 28;
        }

        // Muda para baixo se estiver muito no topo
        if (e.clientY + OFFSET_Y < 0) {
            OFFSET_Y = 20;
        } else {
            OFFSET_Y = -115;
        }
    });

});
