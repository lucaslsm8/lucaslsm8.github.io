function initSwipers() {
    // Remove a verificação de largura para o primeiro Swiper
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
        // Adiciona breakpoints para ajustar comportamento em diferentes telas
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

    // Segundo Swiper mantém a mesma configuração
    const regularSwiper = new Swiper(".swiper:not(.custom-swiper)", {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: false,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            768: {
                slidesPerView: "auto",
            }
        }
    });
}

// Inicializa os Swipers quando o DOM estiver completamente carregado
document.addEventListener('DOMContentLoaded', function() {
    initSwipers();
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