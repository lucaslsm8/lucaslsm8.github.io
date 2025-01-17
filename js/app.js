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
      start: "top bottom-=100",
      toggleActions: "play none none reverse"
    }
  });
});

// --------------------------------------------- //
// Loader & Loading Animation Start
// --------------------------------------------- //
const content = document.querySelector('body');
const imgLoad = imagesLoaded(content);
const loadingWrap = document.querySelector('.loading-wrap');
const loadingItems = loadingWrap.querySelectorAll('.loading__item');
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

imgLoad.on('done', instance => {
  hideLoader();
  pageAppearance();
});

function hideLoader() {
  gsap.to(".loader__count", {
    duration: 0.8,
    ease: 'power2.in',
    y: "100%",
    delay: 1.8
  });
  gsap.to(".loader__wrapper", {
    duration: 0.8,
    ease: 'power4.in',
    y: "-100%",
    delay: 2.2
  });
  setTimeout(() => {
    document.getElementById("loader").classList.add("loaded");
  }, 3200);
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
const scrollSpy = new bootstrap.ScrollSpy(document.body, {
  target: '#menu',
  smoothScroll: true,
  rootMargin: '0px 0px -40%',
});
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

if (document.querySelector(".stack-item")) {

  function initCards() {
    animation.clear();
    cardHeight = cards[0].offsetHeight;
    //console.log("initCards()", cardHeight);
    cards.forEach((card, index) => {
      if (index > 0) {
        gsap.set(card, {
          y: index * cardHeight
        });
        animation.to(card, {
          y: 0,
          duration: index * 0.5,
          ease: "none"
        }, 0);
      }
    });
  };
  initCards();

  ScrollTrigger.create({
    trigger: ".stack-wrapper",
    start: "top top",
    pin: true,
    end: () => `+=${(cards.length * cardHeight) + stickySpace.offsetHeight}`,
    scrub: true,
    animation: animation,
    //markers: true,
    invalidateOnRefresh: true
  });

  ScrollTrigger.addEventListener("refreshInit", initCards);
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
      return $(this).attr("src").replace(".svg", ".png");
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

// Scroll Spy aprimorado
$(document).ready(function () {
  const sections = $('.main-content div[id]');
  const navLinks = $('.sidebar-nav .nav-link');
  const fixedOffset = 130; // Altura do header (80px) + padding do conteúdo (50px)

  // Função para atualizar o menu ativo
  function updateActiveSection() {
    const scrollPosition = $(window).scrollTop();

    // Encontra a seção atual
    sections.each(function () {
      const top = $(this).offset().top - fixedOffset;
      const bottom = top + $(this).outerHeight();

      if (scrollPosition >= top && scrollPosition < bottom) {
        navLinks.removeClass('active');
        navLinks.filter('[href="#' + $(this).attr('id') + '"]').addClass('active');
        return false;
      }
    });
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
  const sections = document.querySelectorAll('.main-content div[id]');
  const navLinks = document.querySelectorAll('.sidebar-nav .nav-link');
  const headerOffset = document.querySelector('header')?.offsetHeight || 0;
  const scrollOffset = headerOffset + 20; // Ajuste fino adicional

  function updateActiveSection() {
    const scrollPosition = window.scrollY + scrollOffset;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${section.id}`) {
            link.classList.add('active');
          }
        });
      }
    });
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

document.addEventListener('DOMContentLoaded', function() {
    // Verifica se o jQuery e Masonry existem
    if (typeof jQuery !== 'undefined' && typeof jQuery.fn.masonry !== 'undefined') {
        // Inicializa o Masonry
        $('.grid').masonry({
            itemSelector: '.grid-item',
            columnWidth: '.grid-sizer',
            percentPosition: true
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
  // Wait for images to load
  const flexContainer = document.querySelector('.flex-container');
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

