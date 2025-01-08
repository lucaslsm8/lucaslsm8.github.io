function initSwipers() {
    if (window.innerWidth > 768) {
        // Primeiro Swiper (custom-swiper)
        const customSwiper = new Swiper(".custom-swiper", {
            effect: "coverflow",
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: "auto",
            initialSlide: 3, // Começa no terceiro slide
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
        });

        // Segundo Swiper - Configuração mais simples
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
}

// Inicializar Swipers
initSwipers();

// Reinicializar em caso de redimensionamento
let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        initSwipers();
    }, 250);
});