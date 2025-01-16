document.addEventListener('DOMContentLoaded', function() {
    // Verifica se o Swiper existe
    if (typeof Swiper === 'undefined') {
        console.error('Swiper não está carregado');
        return;
    }

    // Inicializa os Swipers
    const customSwiper = new Swiper(".custom-swiper", {
        effect: "coverflow",
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: "auto",
        initialSlide: 3,
        coverflowEffect: {
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: false,
        },
        keyboard: {
            enabled: true
        },
        spaceBetween: 20,
        loop: true,
        pagination: {
            el: ".custom-swiper .swiper-pagination",
            clickable: true
        },
        navigation: {
            nextEl: '.custom-swiper .swiper-button-next',
            prevEl: '.custom-swiper .swiper-button-prev',
        },
        breakpoints: {
            320: {
                slidesPerView: "auto",
                effect: "coverflow"
            },
            768: {
                slidesPerView: "auto",
                effect: "coverflow"
            }
        }
    });

    // Inicializa o segundo Swiper
    const regularSwiper = new Swiper(".regular-swiper", {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: false,
        navigation: {
            nextEl: '.regular-swiper .swiper-button-next',
            prevEl: '.regular-swiper .swiper-button-prev',
        },
        pagination: {
            el: '.regular-swiper .swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            768: {
                slidesPerView: "auto",
            }
        }
    });
});

// Reinicializa em caso de redimensionamento com debounce
let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        initSwipers();
    }, 250);
});

// Adiciona listener para orientação do dispositivo
window.addEventListener('orientationchange', function() {
    setTimeout(function() {
        initSwipers();
    }, 300);
});