/*! ------------------------------------------------
 * Project Name: Blayden - Personal Portfolio & Resume HTML Template
 * Project Description: Show yourself brightly with Blayden - clean and creative portfolio and resume template!
 * Tags: mix_design, resume, portfolio, personal page, cv, template, one page, responsive, html5, css3, creative, clean
 * Version: 1.0.0
 * Build Date: June 2024
 * Last Update: June 2024
 * This product is available exclusively on Themeforest
 * Author: mix_design
 * Author URI: https://themeforest.net/user/mix_design
 * File name: app.js
 * ------------------------------------------------

 * ------------------------------------------------
 * Table of Contents
 * ------------------------------------------------
 *
 *  01. Loader & Loading Animation
 *  02. Bootstrap Scroll Spy Plugin Settings
 *  03. Scroll to Top Button
 *  04. Stacking Cards
 *  05. Scroll Animations
 *  06. Fade-in Type Effect
 *  07. Blocks Marquee
 *  08. Parallax
 *  09. Swiper Slider
 *  10. Typed.js Plugin
 *  11. Magnific Popup
 *  12. Layout Masonry
 *  13. Smooth Scrolling
 *  14. Buttons Hover Effect
 *  15. SVG Fallback
 *  16. Chrome Smooth Scroll
 *  17. Images Moving Ban
 *  18. Detecting Mobile/Desktop
 *  19. PhotoSwipe Gallery Images Replace
 *  20. Contact Form
 *  21. Color Switch
 *
 * ------------------------------------------------
 * Table of Contents End
 * ------------------------------------------------ */

gsap.registerPlugin(ScrollTrigger);

// Animação dos elementos com loading__item
gsap.utils.toArray('.loading__item').forEach(item => {
  gsap.from(item, {
    opacity: 0,
    y: 50,
    duration: 1,
    scrollTrigger: {
      trigger: item,
      start: "top bottom-=70",
      toggleActions: "play none none reverse"
    }
  });
});

// --------------------------------------------- //
// Loader & Loading Animation Start
// --------------------------------------------- //
const content = document.querySelector('body');
const eagerImages = document.querySelectorAll('img:not([loading="lazy"])');
const imgLoad = imagesLoaded(eagerImages.length ? eagerImages : content);
const loadingWrap = document.querySelector('.loading-wrap');
const loadingItems = loadingWrap ? loadingWrap.querySelectorAll('.loading__item') : [];
const fadeInItems = document.querySelectorAll('.loading__fade');

function startLoader() {
  let counterElement = document.querySelector(".loader__count .count__text");
  let currentValue = 0;

  function updateCounter() {
    if (currentValue < 100) {
      let increment = Math.floor(Math.random() * 10) + 1;
      currentValue = Math.min(currentValue + increment, 100);
      counterElement.textContent = currentValue;
      let delay = Math.floor(Math.random() * 120) + 25;
      setTimeout(updateCounter, delay);
    }
  }
  updateCounter();
}
startLoader();

// --- Loader resiliência ---
// imagesLoaded não finaliza quando há <img loading="lazy"> fora do viewport
// (o browser não dispara o 'load' até o usuário rolar). Usamos uma dupla guarda:
//   1. Disparo normal quando 'done' chega (caminho feliz).
//   2. Fallback após o `window.load` + pequeno delay, caso o 'done' demore.
//   3. Hard timeout absoluto (4.5s) para garantir que a página nunca trave em 100%.
let __loaderDone = false;
function finishLoader(source) {
  if (__loaderDone) return;
  __loaderDone = true;
  // Log útil em debug local; silencioso em produção
  try { console.debug('[loader] finalizado via', source); } catch (_) {}
  hideLoader();
  pageAppearance();
}

imgLoad.on('done', () => finishLoader('imagesLoaded:done'));
imgLoad.on('fail', () => finishLoader('imagesLoaded:fail'));

// Fallback 1: quando o navegador diz que a página inteira terminou de carregar,
// espera um tick e libera o loader. Cobre o caso de imagens lazy que nunca
// disparam 'load' porque estão fora do viewport inicial.
window.addEventListener('load', () => {
  setTimeout(() => finishLoader('window.load'), 300);
});

// Fallback 2: hard timeout absoluto (4.5s) — nunca deixa travar em 100%.
setTimeout(() => finishLoader('timeout:4500ms'), 4500);

function hideLoader() {
  gsap.to(".loader__count", {
    duration: 0.8,
    ease: 'power2.in',
    y: "100%",
    delay: 0.6
  });
  gsap.to(".loader__wrapper", {
    duration: 0.8,
    ease: 'power4.in',
    y: "-100%",
    delay: 0.9
  });
  setTimeout(() => {
    document.getElementById("loader").classList.add("loaded");
  }, 1600);
}

function pageAppearance() {
  gsap.set(loadingItems, {
    opacity: 0
  })
  gsap.to(loadingItems, {
    duration: 1.1,
    ease: 'power4',
    startAt: {
      y: 120
    },
    y: 0,
    opacity: 1,
    delay: 0.8,
    stagger: 0.05
  }, '>-=1.1');
  gsap.set(fadeInItems, {
    opacity: 0
  });
  gsap.to(fadeInItems, {
    duration: 0.8,
    ease: 'none',
    opacity: 1,
    delay: 3.2
  });
}
// --------------------------------------------- //
// Loader & Loading Animation End
// --------------------------------------------- //

// --------------------------------------------- //
// Bootstrap Scroll Spy Plugin Settings Start
// --------------------------------------------- //
// Guarded: em páginas de case (ex.: lighthouse-app.html) o #menu do topo contém
// hrefs cross-page (index.html#portfolio), que fazem o ScrollSpy do BS 5.3
// lançar exceção ao tentar resolver o href como seletor interno. Sem este
// try/catch, todo o resto do app.js ficava bloqueado — inclusive o
// scrollspy customizado do .sidebar-nav logo abaixo. Também só inicializa
// se pelo menos um link do #menu apontar pra um alvo desta página.
let scrollSpy = null;
try {
  const menuEl = document.querySelector('#menu');
  const hasInPageAnchor = menuEl && Array.from(menuEl.querySelectorAll('a[href]'))
    .some(a => {
      const href = a.getAttribute('href') || '';
      return href.startsWith('#') && href.length > 1 && document.querySelector(href);
    });

  if (hasInPageAnchor) {
    scrollSpy = new bootstrap.ScrollSpy(document.body, {
      target: '#menu',
      smoothScroll: true,
      rootMargin: '0px 0px -40%',
    });
  }
} catch (err) {
  console.warn('[ScrollSpy #menu] desabilitado nesta página:', err.message);
}
// --------------------------------------------- //
// Bootstrap Scroll Spy Plugin Settings End
// --------------------------------------------- //

// --------------------------------------------- //
// Scroll to Top Button Start
// --------------------------------------------- //
const toTop = document.querySelector("#to-top");

toTop.addEventListener("click", function (event) {
  event.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

gsap.set(toTop, {
  opacity: 0
});

gsap.to(toTop, {
  opacity: 1,
  autoAlpha: 1,
  scrollTrigger: {
    trigger: "body",
    start: "top -20%",
    end: "top -20%",
    toggleActions: "play none reverse none"
  }
});
// --------------------------------------------- //
// Scroll to Top Button End
// --------------------------------------------- //

// --------------------------------------------- //
// Stacking Cards Start
// --------------------------------------------- //
const cards = document.querySelectorAll('.stack-item');
const stickySpace = document.querySelector('.stack-offset');
const animation = gsap.timeline();
let cardHeight;

const stackWrapper = document.querySelector('.stack-wrapper');

if (document.querySelector(".stack-item") && stackWrapper) {

  function initCards() {
    animation.clear();
    cardHeight = cards[0].offsetHeight;
    cards.forEach((card, index) => {
      if (index > 0) {
        gsap.set(card, { y: index * cardHeight });
        animation.to(card, { y: 0, duration: index * 0.5, ease: "none" }, 0);
      }
    });
  }

  function setupStack() {
    initCards();
    ScrollTrigger.create({
      trigger: ".stack-wrapper",
      start: "top top",
      pin: true,
      end: () => `+=${(cards.length * cardHeight) + stickySpace.offsetHeight}`,
      scrub: true,
      animation: animation,
      invalidateOnRefresh: true
    });
    ScrollTrigger.addEventListener("refreshInit", initCards);
    // Duplo rAF garante que o browser terminou layout+paint antes de medir
    requestAnimationFrame(() => requestAnimationFrame(() => ScrollTrigger.refresh(true)));
  }

  // Inicializa após window.load para que imagens lazy dentro dos cards
  // já tenham contribuído para offsetHeight. Se o evento já disparou
  // (script carregado tarde), executa diretamente.
  if (document.readyState === 'complete') {
    requestAnimationFrame(() => requestAnimationFrame(setupStack));
  } else {
    window.addEventListener('load', () => {
      requestAnimationFrame(() => requestAnimationFrame(setupStack));
    });
  }
};
// --------------------------------------------- //
// Stacking Cards End
// --------------------------------------------- //

// --------------------------------------------- //
// Scroll Animations Start
// --------------------------------------------- //
// Animation In Up
const animateInUp = document.querySelectorAll(".animate-in-up");
animateInUp.forEach((element) => {
  gsap.fromTo(element, {
    opacity: 0,
    y: 50,
    ease: 'sine',
  }, {
    y: 0,
    opacity: 1,
    scrollTrigger: {
      trigger: element,
      toggleActions: 'play none none reverse',
    }
  });
});

// Animation Cards Stack
// Grid 2x
if (document.querySelector(".animate-card-2")) {
  gsap.set(".animate-card-2", {
    y: 100,
    opacity: 0
  });
  ScrollTrigger.batch(".animate-card-2", {
    interval: 0.1,
    batchMax: 2,
    duration: 6,
    onEnter: batch => gsap.to(batch, {
      opacity: 1,
      y: 0,
      ease: 'sine',
      stagger: {
        each: 0.15,
        grid: [1, 2]
      },
      overwrite: true
    }),
    onLeave: batch => gsap.set(batch, {
      opacity: 1,
      y: 0,
      overwrite: true
    }),
    onEnterBack: batch => gsap.to(batch, {
      opacity: 1,
      y: 0,
      stagger: 0.15,
      overwrite: true
    }),
    onLeaveBack: batch => gsap.set(batch, {
      opacity: 0,
      y: 100,
      overwrite: true
    })
  });
  ScrollTrigger.addEventListener("refreshInit", () => gsap.set(".animate-card-2", {
    y: 0,
    opacity: 1
  }));
};

// Grid 3x
if (document.querySelector(".animate-card-3")) {
  gsap.set(".animate-card-3", {
    y: 50,
    opacity: 0
  });
  ScrollTrigger.batch(".animate-card-3", {
    interval: 0.1,
    batchMax: 3,
    duration: 3,
    onEnter: batch => gsap.to(batch, {
      opacity: 1,
      y: 0,
      ease: 'sine',
      stagger: {
        each: 0.15,
        grid: [1, 3]
      },
      overwrite: true
    }),
    onLeave: batch => gsap.set(batch, {
      opacity: 1,
      y: 0,
      overwrite: true
    }),
    onEnterBack: batch => gsap.to(batch, {
      opacity: 1,
      y: 0,
      stagger: 0.15,
      overwrite: true
    }),
    onLeaveBack: batch => gsap.set(batch, {
      opacity: 0,
      y: 50,
      overwrite: true
    })
  });
  ScrollTrigger.addEventListener("refreshInit", () => gsap.set(".animate-card-3", {
    y: 0,
    opacity: 1
  }));
};

// Grid 4x
if (document.querySelector(".animate-card-4")) {
  gsap.set(".animate-card-4", {
    y: 50,
    opacity: 0
  });
  ScrollTrigger.batch(".animate-card-4", {
    interval: 0.1,
    batchMax: 4,
    delay: 1000,
    onEnter: batch => gsap.to(batch, {
      opacity: 1,
      y: 0,
      ease: 'sine',
      stagger: {
        each: 0.15,
        grid: [1, 4]
      },
      overwrite: true
    }),
    onLeave: batch => gsap.set(batch, {
      opacity: 1,
      y: 0,
      overwrite: true
    }),
    onEnterBack: batch => gsap.to(batch, {
      opacity: 1,
      y: 0,
      stagger: 0.15,
      overwrite: true
    }),
    onLeaveBack: batch => gsap.set(batch, {
      opacity: 0,
      y: 50,
      overwrite: true
    })
  });
  ScrollTrigger.addEventListener("refreshInit", () => gsap.set(".animate-card-4", {
    y: 0,
    opacity: 1
  }));
};

// Grid 5x
if (document.querySelector(".animate-card-5")) {
  gsap.set(".animate-card-5", {
    y: 50,
    opacity: 0
  });
  ScrollTrigger.batch(".animate-card-5", {
    interval: 0.1,
    batchMax: 5,
    delay: 1000,
    onEnter: batch => gsap.to(batch, {
      opacity: 1,
      y: 0,
      ease: 'sine',
      stagger: {
        each: 0.15,
        grid: [1, 5]
      },
      overwrite: true
    }),
    onLeave: batch => gsap.set(batch, {
      opacity: 1,
      y: 0,
      overwrite: true
    }),
    onEnterBack: batch => gsap.to(batch, {
      opacity: 1,
      y: 0,
      stagger: 0.15,
      overwrite: true
    }),
    onLeaveBack: batch => gsap.set(batch, {
      opacity: 0,
      y: 50,
      overwrite: true
    })
  });
  ScrollTrigger.addEventListener("refreshInit", () => gsap.set(".animate-card-5", {
    y: 0,
    opacity: 1
  }));
};
// --------------------------------------------- //
// Scroll Animations End
// --------------------------------------------- //

// --------------------------------------------- //
// Fade-in Type Effect Start
// --------------------------------------------- //
const splitTypes = document.querySelectorAll(".reveal-type");
splitTypes.forEach((char, i) => {
  const text = new SplitType(char, {
    types: 'words, chars'
  });
  gsap.from(text.chars, {
    scrollTrigger: {
      trigger: char,
      start: 'top 80%',
      end: 'top 20%',
      scrub: true,
      markers: false
    },
    opacity: 0.2,
    stagger: 0.1
  });
});
// --------------------------------------------- //
// Fade-in Type Effect End
// --------------------------------------------- //

// --------------------------------------------- //
// Blocks Marquee Start
// --------------------------------------------- //
const initMarquee = () => {
  const items = [...document.querySelectorAll(".items--gsap")];
  if (items) {
    const marqueeObject = {
      el: null,
      width: 0
    };
    items.forEach((itemBlock) => {
      marqueeObject.el = itemBlock.querySelector(".items__container");
      marqueeObject.width = marqueeObject.el.offsetWidth;
      marqueeObject.el.innerHTML += marqueeObject.el.innerHTML;
      //let dirFromLeft = "-=50%";
      let dirFromRight = "+=50%";
      let master = gsap
        .timeline()
        //.add(marquee(marqueeObject.el, 20, dirFromLeft), 0);
        .add(marquee(marqueeObject.el, 20, dirFromRight), 0);
      let tween = gsap.to(master, {
        duration: 1.5,
        timeScale: 1,
        paused: true
      });
      let timeScaleClamp = gsap.utils.clamp(1, 6);
      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          master.timeScale(timeScaleClamp(Math.abs(self.getVelocity() / 200)));
          tween.invalidate().restart();
        }
      });
    });
  }
};
const marquee = (item, time, direction) => {
  let mod = gsap.utils.wrap(0, 50);
  return gsap.to(item, {
    duration: time,
    ease: "none",
    x: direction,
    modifiers: {
      x: (x) => (direction = mod(parseFloat(x)) + "%")
    },
    repeat: -1
  });
};
initMarquee();
// --------------------------------------------- //
// Blocks Marquee End
// --------------------------------------------- //

// ------------------------------------------------------------------------------ //
// Parallax (apply parallax effect to any element with a data-speed attribute) Start
// ------------------------------------------------------------------------------ //
gsap.to("[data-speed]", {
  y: (i, el) => (1 - parseFloat(el.getAttribute("data-speed"))) * ScrollTrigger.maxScroll(window),
  ease: "none",
  scrollTrigger: {
    start: 0,
    end: "max",
    invalidateOnRefresh: true,
    scrub: 0
  }
});
// --------------------------------------------- //
// Parallax End
// --------------------------------------------- //

// --------------------------------------------- //
// Swiper Slider Start
// --------------------------------------------- //
const testimonialsSlider = document.querySelector("testimonials-slider");

if (!testimonialsSlider) {
  const swiper = new Swiper('.swiper-testimonials', {
    slidesPerView: 1,
    spaceBetween: 20,
    initialSlide: 2,
    autoplay: {
      delay: 20000, // Delay of 20 seconds before starting the autoplay
      disableOnInteraction: false,
    },
    speed: 2000,
    loop: true,
    loopFillGroupWithBlank: true,
    pagination: {
      el: ".swiper-pagination",
      type: "fraction",
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
};
// --------------------------------------------- //
// Swiper Slider Start
// --------------------------------------------- //

$(window).on("load", function () {

  "use strict";

  // --------------------------------------------- //
  // Typed.js Plugin Settings Start
  // --------------------------------------------- //
  var animatedHeadline = $(".animated-type");
  if (animatedHeadline.length) {
    var typed = new Typed('#typed', {
      stringsElement: '#typed-strings',
      loop: true,
      typeSpeed: 60,
      backSpeed: 30,
      backDelay: 2500
    });
  }
  // --------------------------------------------- //
  // Typed.js Plugin Settings End
  // --------------------------------------------- //

});

$(function () {

  "use strict";

  // --------------------------------------------- //
  // Magnific Popup Start
  // --------------------------------------------- //
  $(".popup-trigger").magnificPopup({
    type: "inline",
    fixedContentPos: true,
    fixedBgPos: true,
    overflowY: "scroll",
    preloader: false,
    midClick: true,
    removalDelay: 600,
    mainClass: "mfp-fade",
  });
  // --------------------------------------------- //
  // Magnific Popup End
  // --------------------------------------------- //

  // --------------------------------------------- //
  // Smooth Scrolling Start
  // --------------------------------------------- //
  $('a[href*="#"]').not('[href="#"]').not('[href="#0"]').click(function (event) {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000, function () {
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) {
            return false;
          } else {
            $target.attr('tabindex', '-1');
            $target.focus();
          };
        });
      }
    }
  });
  // --------------------------------------------- //
  // Smooth Scrolling End
  // --------------------------------------------- //

  // --------------------------------------------- //
  // Buttons Hover Effect Start
  // --------------------------------------------- //
  $('.hover-default, .hover-circle, .circle, .inner-video-trigger, .socials-cards__link')
    .on('mouseenter', function (e) {
      var parentOffset = $(this).offset(),
        relX = e.pageX - parentOffset.left,
        relY = e.pageY - parentOffset.top;
      $(this).find('em').css({
        top: relY,
        left: relX
      })
    })
    .on('mouseout', function (e) {
      var parentOffset = $(this).offset(),
        relX = e.pageX - parentOffset.left,
        relY = e.pageY - parentOffset.top;
      $(this).find('em').css({
        top: relY,
        left: relX
      })
    });
  // --------------------------------------------- //
  // Buttons Hover Effect Start
  // --------------------------------------------- //

  // --------------------------------------------- //
  // SVG Fallback Start
  // --------------------------------------------- //
  if (!Modernizr.svg) {
    $("img[src*='svg']").attr("src", function () {
      return $(this).attr("src").replace(".svg", ".webp");
    });
  };
  // --------------------------------------------- //
  // SVG Fallback End
  // --------------------------------------------- //

  // --------------------------------------------- //
  // Chrome Smooth Scroll Start
  // --------------------------------------------- //
  try {
    $.browserSelector();
    if ($("html").hasClass("chrome")) {
      $.smoothScroll();
    }
  } catch (err) {};
  // --------------------------------------------- //
  // Chrome Smooth Scroll End
  // --------------------------------------------- //

  // --------------------------------------------- //
  // Images Moving Ban Start
  // --------------------------------------------- //
  $("img, a").on("dragstart", function (event) {
    event.preventDefault();
  });
  // --------------------------------------------- //
  // Images Moving Ban End
  // --------------------------------------------- //

  // --------------------------------------------- //
  // Detecting Mobile/Desktop Start
  // --------------------------------------------- //
  var isMobile = false;
  if (/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    $('html').addClass('touch');
    isMobile = true;
  } else {
    $('html').addClass('no-touch');
    isMobile = false;
  }
  //IE, Edge
  var isIE = /MSIE 9/i.test(navigator.userAgent) || /rv:11.0/i.test(navigator.userAgent) || /MSIE 10/i.test(navigator.userAgent) || /Edge\/\d+/.test(navigator.userAgent);
  // --------------------------------------------- //
  // Detecting Mobile/Desktop End
  // --------------------------------------------- //

  // --------------------------------------------- //
  // PhotoSwipe Gallery Images Replace Start
  // --------------------------------------------- //
  $('.gallery__link').each(function () {
    $(this)
      .append('<div class="picture"></div>')
      .children('.picture').css({
        'background-image': 'url(' + $(this).attr('data-image') + ')'
      });
  });
  // --------------------------------------------- //
  // PhotoSwipe Gallery Images Replace End
  // --------------------------------------------- //

  // --------------------------------------------- //
  // Contact Form Start
  // --------------------------------------------- //
  $("#contact-form").submit(function () { //Change
    var th = $(this);
    $.ajax({
      type: "POST",
      url: "mail.php", //Change
      data: th.serialize()
    }).done(function () {
      $('.contact').find('.form').addClass('is-hidden');
      $('.contact').find('.form__reply').addClass('is-visible');
      setTimeout(function () {
        // Done Functions
        $('.contact').find('.form__reply').removeClass('is-visible');
        $('.contact').find('.form').delay(300).removeClass('is-hidden');
        th.trigger("reset");
      }, 5000);
    });
    return false;
  });
  // --------------------------------------------- //
  // Contact Form End
  // --------------------------------------------- //

});

// Force dark mode
document.documentElement.setAttribute('color-scheme', 'dark');
const themeBtn = document.querySelector('.color-switcher');
if (themeBtn) themeBtn.style.display = 'none';

$(document).on("click", '[data-toggle="lightbox"]', function (event) {
  event.preventDefault();
  $(this).ekkoLightbox();
});

// Unified scroll handling function
function smoothScrollTo(targetElement, offset = 0) {
  if (!targetElement) return;
  
  // Pega a altura do header fixo
  const header = document.querySelector('header');
  const headerHeight = header ? header.offsetHeight : 0;
  
  // Calcula a posição real do elemento alvo
  const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
  
  // Ajusta o scroll para alinhar com o topo do conteúdo
  window.scrollTo({
    top: targetPosition - headerHeight - offset,
    behavior: 'smooth'
  });
}

// Event delegation para links do menu lateral
document.addEventListener('click', function(e) {
  const sidebarLink = e.target.closest('.sidebar-nav .nav-link');
  if (sidebarLink) {
    e.preventDefault();
    const targetId = sidebarLink.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);
    
    // Usa um offset específico para o menu lateral
    smoothScrollTo(targetElement, 20); // Ajuste este valor conforme necessário
  }
});

// --------------------------------------------- //
// Loop slider — duplica o conteúdo do .inner para o keyframe
// translateX(-50%) cobrir todo o ciclo sem deixar buraco horizontal.
// O CSS @keyframes loop assume que existem 2 cópias dentro do .inner.
// Idempotente: marca [data-cloned] para não duplicar de novo em re-runs.
// --------------------------------------------- //
(function fixLoopSliders() {
  const inners = document.querySelectorAll('.loop-slider .inner');
  inners.forEach(inner => {
    if (inner.dataset.cloned === 'true') return;
    const originals = Array.from(inner.children);
    if (!originals.length) return;
    originals.forEach(node => {
      const clone = node.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      // Marca como duplicata para acessibilidade — leitores de tela
      // pulam, e qualquer img clonada não é re-baixada (mesma URL).
      inner.appendChild(clone);
    });
    inner.dataset.cloned = 'true';
  });
})();

// --------------------------------------------- //
// Sidebar sticky via GSAP ScrollTrigger pin
// Backup robusto quando `position: sticky` do CSS falha por alguma pegadinha
// de ancestral com overflow/transform. Só dispara em >= lg e desliga em mobile.
// Usa window.matchMedia nativo p/ compatibilidade com qualquer GSAP 3.x.
// --------------------------------------------- //
(function pinSidebar() {
  const col = document.querySelector('.sidebar-col');
  const row = col && col.closest('.row');
  if (!col || !row) return;
  if (typeof ScrollTrigger === 'undefined') return;

  const mql = window.matchMedia('(min-width: 992px)');
  let st = null;

  function apply() {
    if (mql.matches && !st) {
      st = ScrollTrigger.create({
        trigger: col,
        start: 'top 80px',        // pin quando o topo do col encostar 80px do viewport
        endTrigger: row,
        end: 'bottom bottom',     // libera quando a .row terminar
        pin: col,
        pinSpacing: false,        // não adiciona espaço após o pin (não estraga o layout)
        anticipatePin: 1,
        invalidateOnRefresh: true
      });
    } else if (!mql.matches && st) {
      st.kill();
      st = null;
    }
  }

  apply();

  if (typeof mql.addEventListener === 'function') {
    mql.addEventListener('change', apply);
  } else if (typeof mql.addListener === 'function') {
    mql.addListener(apply); // Safari < 14
  }

  // Recalcula o pin após todas as imagens carregarem (evita medidas erradas)
  window.addEventListener('load', () => {
    if (typeof ScrollTrigger !== 'undefined' && ScrollTrigger.refresh) {
      ScrollTrigger.refresh();
    }
  });
})();

// Scroll Spy aprimorado
$(document).ready(function () {
  const navLinks = $('.sidebar-nav .nav-link');
  const sections = navLinks.map(function () {
    const href = $(this).attr('href');
    return href && href.startsWith('#') ? $(href)[0] : null;
  });
  const fixedOffset = 130; // Altura do header (80px) + padding do conteúdo (50px)

  // Função para atualizar o menu ativo
  function updateActiveSection() {
    const scrollPosition = $(window).scrollTop();
    let activeSection = null;

    // Encontra a seção atual
    sections.each(function () {
      const top = $(this).offset().top - fixedOffset;

      if (scrollPosition >= top) {
        activeSection = this;
      }
    });

    if (activeSection) {
      navLinks.removeClass('active');
      navLinks.filter('[href="#' + $(activeSection).attr('id') + '"]').addClass('active');
    }
  }

  // Atualiza ao carregar e ao rolar
  updateActiveSection();
  $(window).on('scroll', updateActiveSection);

  // Scroll suave ao clicar
  navLinks.on('click', function (e) {
    e.preventDefault();
    const target = $($(this).attr('href'));
    const currentScroll = $(window).scrollTop();
    const targetOffset = target.offset().top - fixedOffset;

    // Scroll direto para a posição
    $('html, body').stop().animate({
      scrollTop: targetOffset
    }, {
      duration: 500,
      easing: 'easeInOutCubic',
      start: function() {
        // Previne outros eventos de scroll durante a animação
        $(window).off('scroll', updateActiveSection);
      },
      complete: function() {
        // Reativa os eventos de scroll após a animação
        $(window).on('scroll', updateActiveSection);
        updateActiveSection();
      }
    });
  });
});

function initScrollSpy() {
  const navLinks = document.querySelectorAll('.sidebar-nav .nav-link');
  const sections = Array.from(navLinks)
    .map(link => {
      const href = link.getAttribute('href');
      return href?.startsWith('#') ? document.querySelector(href) : null;
    })
    .filter(Boolean);
  const headerOffset = document.querySelector('header')?.offsetHeight || 0;
  const scrollOffset = headerOffset + 20; // Ajuste fino adicional

  function updateActiveSection() {
    const scrollPosition = window.scrollY + scrollOffset;
    let activeSection = null;

    sections.forEach(section => {
      const sectionTop = section.getBoundingClientRect().top + window.scrollY;

      if (scrollPosition >= sectionTop) {
        activeSection = section;
      }
    });

    if (activeSection) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${activeSection.id}`) {
          link.classList.add('active');
        }
      });
    }
  }

  window.addEventListener('scroll', updateActiveSection);
  updateActiveSection();
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', initScrollSpy);

function updateCarouselSize() {
  const carousel = document.getElementById('carousel');
  if (!carousel) return;
  
  const width = window.innerWidth;
  const container = carousel.closest('.carousel-container');
  
  if (width <= 768) {
    container.style.overflow = 'hidden';
  } else {
    container.style.overflow = 'visible';
  }
}

// Função atualizada para inicializar o Masonry
function initMasonry() {
  // Seleciona .grid e .my-gallery, mas exclui galerias que já usam layout próprio
  // (como .gallery-grid, que renderiza com CSS Grid e não deve ser tocado pelo Masonry)
  const grids = $('.grid, .my-gallery').not('.gallery-grid');
  if (!grids.length) return; // Verifica se algum elemento existe
  
  grids.each(function() {
    const grid = $(this);
    let msnry;
    
    // Configuração inicial
    grid.css({
      'opacity': '0',
      'visibility': 'hidden'
    });
    
    // Verifica se já tem data-masonry (inicializado inline no HTML)
    const hasDataMasonry = grid.attr('data-masonry') !== undefined;
    
    if (!hasDataMasonry) {
      // Inicializa o Masonry com configurações otimizadas
      msnry = grid.masonry({
        itemSelector: '.grid-item',
        columnWidth: '.grid-sizer',
        percentPosition: true,
        transitionDuration: '0.4s',
        initLayout: false,
        gutter: 20,
        fitWidth: true
      }).data('masonry');
    } else {
      // Para elementos que já têm data-masonry, apenas obtém a instância
      msnry = grid.masonry().data('masonry');
    }

    // Função para revelar a grid
    const revealGrid = () => {
      grid.css({
        'opacity': '1',
        'visibility': 'visible'
      });
      if (msnry) {
        msnry.layout();
      }
    };

    // Carregamento de imagens
    imagesLoaded(grid[0], { background: true }, function() {
      // Pequeno atraso para garantir que tudo esteja pronto
      setTimeout(revealGrid, 100);
      
      // Força um relayout após um tempo maior para garantir
      setTimeout(() => {
        if (msnry) {
          msnry.layout();
        }
      }, 500);
    });
    
    // Adiciona evento para cada imagem carregada individualmente
    grid.find('img').each(function() {
      const img = $(this);
      img.on('load', function() {
        if (msnry) {
          setTimeout(() => msnry.layout(), 100);
        }
      });
    });
  });

  // Gerenciamento de eventos de redimensionamento otimizado
  const debouncedResize = debounce(() => {
    $('.grid, .my-gallery').each(function() {
      const msnry = $(this).data('masonry');
      if (msnry) {
        msnry.layout();
      }
    });
  }, 250);

  window.addEventListener('resize', debouncedResize);
  window.addEventListener('orientationchange', () => {
    setTimeout(() => debouncedResize(), 200);
  });
}

// Inicialização melhorada
document.addEventListener('DOMContentLoaded', () => {
  // Aguarda um curto período para garantir que outros recursos estejam carregados
  setTimeout(() => {
    if (typeof jQuery !== 'undefined' && typeof jQuery.fn.masonry !== 'undefined') {
      initMasonry();
    } else {
      console.warn('Masonry ou jQuery não estão disponíveis');
    }
  }, 300);
});

// Adiciona um evento para quando a janela estiver totalmente carregada
window.addEventListener('load', () => {
  // Força um relayout do masonry após o carregamento completo da página
  setTimeout(() => {
    $('.grid, .my-gallery').each(function() {
      const msnry = $(this).data('masonry');
      if (msnry) {
        msnry.layout();
      }
    });
  }, 500);
});

// Função debounce para evitar múltiplas chamadas
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

document.addEventListener('DOMContentLoaded', () => {
  // Wait for images to load
  const flexContainer = document.querySelector('.flex-container');
  if (!flexContainer) {
    return;
  }

  const images = flexContainer.querySelectorAll('img');
  
  Promise.all([
    // Wait for CSS to be ready
    document.fonts.ready,
    // Wait for all images to load
    Promise.all([...images].map(img => {
      if (img.complete) return Promise.resolve();
      return new Promise(resolve => {
        img.onload = resolve;
        img.onerror = resolve; // Handle errors gracefully
      });
    }))
  ]).then(() => {
    // Add loaded class once everything is ready
    flexContainer.classList.add('loaded');
  });
});


