/**
 * MELI PLAY UX CHALLENGE - JAVASCRIPT
 * Interactive functionality and animations
 */

// ===== MOBILE MENU TOGGLE =====
function initMobileMenu() {
  const menuToggle = document.getElementById('mobileMenuToggle');
  const mainNav = document.getElementById('mainNav');

  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      mainNav.classList.toggle('active');
    });

    // Close menu when clicking nav links
    const navLinks = mainNav.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        mainNav.classList.remove('active');
      });
    });
  }
}

// ===== SMOOTH SCROLLING =====
function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));

      if (target) {
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// ===== DYNAMIC PARTICLE GENERATION =====
function createParticles() {
  const heroParticles = document.getElementById('heroParticles');
  if (!heroParticles) return;

  // Clear existing particles
  heroParticles.innerHTML = '';

  // Create particles dynamically
  const particleCount = window.innerWidth < 768 ? 10 : 20;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';

    // Random positioning
    const top = Math.random() * 100;
    const left = Math.random() * 100;

    particle.style.top = top + '%';
    particle.style.left = left + '%';
    particle.style.animationDelay = Math.random() * 6 + 's';
    particle.style.animationDuration = (4 + Math.random() * 4) + 's';

    // Vary particle sizes
    const size = 3 + Math.random() * 3;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';

    heroParticles.appendChild(particle);
  }
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        entry.target.classList.add('animated');
      }
    });
  }, observerOptions);

  // Observe elements for scroll animations
  const elementsToAnimate = document.querySelectorAll('.process-step, .quote-card, .file-card');

  elementsToAnimate.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    el.style.transitionDelay = (index * 0.1) + 's';
    observer.observe(el);
  });
}

// ===== HEADER SCROLL EFFECT =====
function initHeaderScrollEffect() {
  const header = document.querySelector('header');
  let lastScrollY = window.pageYOffset;
  let ticking = false;

  function updateHeader() {
    const currentScrollY = window.pageYOffset;

    if (currentScrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    lastScrollY = currentScrollY;
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateHeader);
      ticking = true;
    }
  });

  // Add active state to nav links based on scroll position
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('header nav a');

  function updateActiveLink() {
    let current = '';
    const scrollPosition = window.pageYOffset + 200; // Aumentado para 200

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = sectionId;
      }
    });

    // Se não encontrou nenhuma seção, usa a última se estiver perto do fim da página
    if (!current && (window.innerHeight + window.pageYOffset) >= document.body.offsetHeight - 200) {
      const lastSection = sections[sections.length - 1];
      current = lastSection ? lastSection.getAttribute('id') : '';
    }

    navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href === `#${current}`) {
        link.classList.add('active');
      }
    });
  }

  // Debounce para melhor performance
  let scrollTimer;
  window.addEventListener('scroll', () => {
    if (scrollTimer) {
      clearTimeout(scrollTimer);
    }
    scrollTimer = setTimeout(updateActiveLink, 10);
  });

  updateActiveLink(); // Chama uma vez no carregamento
}

// ===== PERFORMANCE: PAUSE ANIMATIONS WHEN TAB IS HIDDEN =====
function initVisibilityHandler() {
  document.addEventListener('visibilitychange', () => {
    const particles = document.querySelectorAll('.particle');

    if (document.hidden) {
      particles.forEach(particle => {
        particle.style.animationPlayState = 'paused';
      });
    } else {
      particles.forEach(particle => {
        particle.style.animationPlayState = 'running';
      });
    }
  });
}

// ===== ACCESSIBILITY: KEYBOARD NAVIGATION =====
function initKeyboardNavigation() {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      document.body.classList.add('keyboard-navigation');
    }
  });

  document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
  });
}

// ===== COPY EMAIL TO CLIPBOARD =====
function initEmailCopy() {
  const emailLink = document.querySelector('a[href^="mailto:"]');

  if (emailLink && navigator.clipboard) {
    emailLink.addEventListener('click', function(e) {
      e.preventDefault();
      const email = this.href.replace('mailto:', '');

      navigator.clipboard.writeText(email).then(() => {
        // Animação visual com check
        const originalContent = this.innerHTML;
        const originalBg = this.style.backgroundColor;

        // Troca para check verde
        this.innerHTML = '✓';
        this.style.backgroundColor = 'rgba(76, 175, 80, 0.2)';
        this.style.transform = 'scale(1.2)';

        setTimeout(() => {
          this.style.transform = 'scale(1)';
        }, 150);

        setTimeout(() => {
          this.innerHTML = originalContent;
          this.style.backgroundColor = originalBg;
        }, 1500);
      }).catch(err => {
        // Fallback: open email client
        window.location.href = this.href;
      });
    });
  }
}

// ===== STATS COUNTER ANIMATION =====
function animateStatsCounters() {
  const statNumbers = document.querySelectorAll('.stat-number');

  const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
        const target = entry.target;
        const finalValue = target.textContent;

        // Only animate numeric values
        if (/^\d+$/.test(finalValue)) {
          const duration = 1500;
          const start = 0;
          const end = parseInt(finalValue);
          const startTime = performance.now();

          function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            const easeOutQuad = progress * (2 - progress);
            const current = Math.floor(easeOutQuad * (end - start) + start);

            target.textContent = current;

            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            } else {
              target.textContent = finalValue;
              target.classList.add('counted');
            }
          }

          requestAnimationFrame(updateCounter);
        }
      }
    });
  }, observerOptions);

  statNumbers.forEach(stat => observer.observe(stat));
}

// ===== PERFORMANCE MONITORING =====
function optimizePerformance() {
  // Check if user prefers reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    document.body.classList.add('reduced-motion');
    return;
  }

  // Use Intersection Observer for performance optimization
  const performanceObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      } else {
        entry.target.classList.remove('in-view');
      }
    });
  }, { threshold: 0.1 });

  // Observe heavy animation elements
  document.querySelectorAll('.particle, .file-card, .process-step').forEach(el => {
    performanceObserver.observe(el);
  });
}

// ===== CONSOLE MESSAGE =====
function showConsoleMessage() {
  console.log(`
  🎬 Meli Play UX Challenge
  ========================

  Olá! Obrigado por visitar meu projeto.

  Este site foi desenvolvido com:
  • HTML5 semântico
  • CSS3 com custom properties
  • JavaScript vanilla (sem frameworks)
  • Design responsivo e acessível
  • Otimizações de performance

  Gostou do que viu? Vamos conversar!
  📧 lucas.schoenherr@outlook.com
  `);
}

// ===== INITIALIZE ALL FUNCTIONS =====
function initializeApp() {
  // Wait for DOM to be fully loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
}

function init() {
  console.log('🚀 Initializing Meli Play UX Challenge...');

  // Initialize all features
  initMobileMenu();
  initSmoothScrolling();
  createParticles();
  initScrollAnimations();
  initHeaderScrollEffect();
  initVisibilityHandler();
  initKeyboardNavigation();
  initEmailCopy();
  animateStatsCounters();
  optimizePerformance();
  showConsoleMessage();

  console.log('✅ All features initialized successfully!');
}

// Start the application
initializeApp();

// ===== WINDOW RESIZE HANDLER =====
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    // Recreate particles on resize for better distribution
    createParticles();
  }, 250);
});

// ===== EXPORT FOR TESTING (if needed) =====
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    initMobileMenu,
    initSmoothScrolling,
    createParticles,
    initScrollAnimations
  };
}
