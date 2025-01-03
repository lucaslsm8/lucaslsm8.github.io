(function($) {
    $.fn.slidingCarousel = function (options) {
        options = $.extend({}, $.fn.slidingCarousel.defaults, options || {});

        const pluginData = {
            container: $(this),
            sinus: [0],
            images: null,
            mIndex: null
        };

        const preload = function(callback) {
            const images = pluginData.container.find('.slide img');
            const total = images.length;
            const shift = total % 2;
            const middle = total < 3 ? total : ~~(total / 2) + shift;
            const result = [];

            // Definir opacidade inicial para todos os slides
            pluginData.container.find('.slide').css({
                visibility: 'visible',
                display: 'block',
                opacity: 0.4 // Valor base de opacidade
            });

            const loadPromises = images.map((index, element) => {
                return new Promise((resolve) => {
                    const img = new Image();
                    
                    $(img).on('load error', function() {
                        const position = (index + middle - shift) % total;
                        result[position] = element;
                        
                        element.ratio = this.width / this.height;
                        element.origH = this.height;
                        element.idx = index;
                        
                        resolve();
                    });
                    
                    img.src = element.src;
                });
            }).get();

            Promise.all(loadPromises).then(() => {
                pluginData.mIndex = middle;
                pluginData.sinsum = 0;
                pluginData.images = result.reverse();

                for (let n = 1, freq = 0; n < total; n++) {
                    pluginData.sinus[n] = (n <= middle) 
                        ? Math.sin(freq += (1.6/middle)) 
                        : pluginData.sinus[total-n];

                    if (n < middle) {
                        pluginData.sinsum += pluginData.sinus[n] * options.squeeze;
                    }
                }
                
                callback(pluginData.images);
            });
        };

        const setupEvents = function() {
            const container = pluginData.container;
            
            container.on('click', '.slide p > a', function(e) {
                const idx = $(this).find('img')[0].idx;
                const arr = pluginData.images;

                while (arr[pluginData.mIndex-1].idx != idx) {
                    arr.push(arr.shift());
                }
                doLayout(arr, true);
            });

            let touchStartX = 0;
            container
                .on('touchstart', function(e) {
                    touchStartX = e.originalEvent.touches[0].pageX;
                })
                .on('touchend', function(e) {
                    const touchEndX = e.originalEvent.changedTouches[0].pageX;
                    const diff = touchStartX - touchEndX;
                    
                    if (Math.abs(diff) > 50) {
                        if (diff > 0) {
                            container.find('.navigate-right').trigger('click');
                        } else {
                            container.find('.navigate-left').trigger('click');
                        }
                    }
                });

            container
                .on('click', '.navigate-right', function() {
                    const images = pluginData.images;
                    images.splice(0, 0, images.pop());
                    doLayout(images, true);
                })
                .on('click', '.navigate-left', function() {
                    const images = pluginData.images;
                    images.push(images.shift());
                    doLayout(images, true);
                });
        };

        const doLayout = function(images, animate) {
            const mid = pluginData.mIndex;
            const sin = pluginData.sinus;
            let posx = 0;
            
            const width = images[mid-1].origH * images[mid-1].ratio;
            const middle = (pluginData.container.width() - width)/2;
            const offset = middle - pluginData.sinsum;
            const height = images[mid-1].origH;
        
            pluginData.container.find('span').stop().fadeOut(200);
        
            images.forEach((img, i) => {
                const idx = Math.abs(i+1-mid);
                const top = idx * 40; // Reduzido de 15 para 8
                const diff = sin[i] * options.squeeze;
                const left = posx += diff;
        
                const el = $(img).closest('.slide');
                img.cWidth = (height-(top*2)) * img.ratio;
        
                const animateProps = {
                    height: height - (top*2),
                    zIndex: mid-idx,
                    top: top + 20, // Adicionado offset base de 50px
                    left: left+offset,
                    opacity: i==mid-1 ? 1 : sin[i+1]*0.4,
                    visibility: 'visible'
                };
        
                if (animate) {
                    el.stop().animate(animateProps, {
                        duration: 300, // Aumentado para 300ms
                        complete: i === mid-1 ? () => {
                            el.find('span').stop().fadeIn(200);
                        } : null
                    });
                } else {
                    el.css(animateProps);
                    if (i === mid-1) {
                        el.find('span').stop().fadeIn(200);
                    }
                }

                if (options.shadow) {
                    el.addClass('shadow');
                }
            });

            if (!animate) {
                pluginData.container
                    .find('.navigate-left').css('left', middle+200)
                    .end()
                    .find('.navigate-right').css('left', middle+width-200);
            }
        };

        const setupCarousel = function() {
            preload(doLayout);
            setupEvents();
        };

        this.initialize = function() {
            setupCarousel();
        };

        return this.initialize();
    };

    $.fn.slidingCarousel.defaults = {
        shadow: false,
        squeeze: 124,
        animate: 300 // Aumentado para 300
    };

})(jQuery);

$(document).ready(function() {
    function initCarousel() {
        const windowWidth = $(window).width();
        let squeeze = 200;
        let animate = 300;

        // Ajusta os parâmetros baseado no tamanho da tela
        if (windowWidth <= 480) {
            squeeze = 80;
            animate = 250;
        } else if (windowWidth <= 768) {
            squeeze = 100;
            animate = 300;
        } else if (windowWidth <= 1024) {
            squeeze = 150;
            animate = 300;
        }

        // Inicializa o carrossel com os parâmetros ajustados
        $("#carousel").slidingCarousel({
            squeeze: squeeze,
            animate: animate,
            shadow: true,
            adjustHeight: true // Nova opção para ajuste automático de altura
        });
    }

    // Função para recalcular dimensões do carrossel
    function updateCarouselDimensions() {
        // Destrói a instância atual
        $("#carousel").removeData('slidingCarousel');
        // Reinicializa com novos parâmetros
        initCarousel();
    }

    // Inicialização inicial
    initCarousel();

    // Listener de redimensionamento com debounce
    $(window).on('resize', _.debounce(updateCarouselDimensions, 250));

    // Adiciona suporte a gestos touch
    let touchStartX = 0;
    let touchEndX = 0;

    $("#carousel").on('touchstart', function(e) {
        touchStartX = e.originalEvent.touches[0].clientX;
    });

    $("#carousel").on('touchend', function(e) {
        touchEndX = e.originalEvent.changedTouches[0].clientX;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                $(this).find('.navigate-right').trigger('click');
            } else {
                $(this).find('.navigate-left').trigger('click');
            }
        }
    });

    function adjustCarouselHeight() {
        const carousel = document.querySelector('#carousel');
        if (!carousel) return;

        const slides = carousel.querySelectorAll('.slide');
        
        slides.forEach(slide => {
            const img = slide.querySelector('img');
            if (img) {
                // Aguarda o carregamento da imagem
                img.onload = function() {
                    const aspectRatio = img.naturalWidth / img.naturalHeight;
                    const maxHeight = window.innerHeight * 0.7; // 70% da altura da viewport
                    const calculatedWidth = maxHeight * aspectRatio;
                    
                    slide.style.height = 'auto';
                    img.style.maxWidth = '100%';
                    img.style.width = 'auto';
                    img.style.height = 'auto';
                    img.style.maxHeight = `${maxHeight}px`;
                }
            }
        });
    }

    // Adicione aos event listeners
    window.addEventListener('load', adjustCarouselHeight);
    window.addEventListener('resize', adjustCarouselHeight);

    function initMobileCarousel() {
        const carousel = document.querySelector('#carousel');
        if (!carousel) return;

        let startX;
        let scrollLeft;
        let isDown = false;
        const slidesContainer = carousel.querySelector('.slides-container');

        // Touch events
        slidesContainer.addEventListener('touchstart', (e) => {
            isDown = true;
            startX = e.touches[0].pageX - slidesContainer.offsetLeft;
            scrollLeft = slidesContainer.scrollLeft;
        });

        slidesContainer.addEventListener('touchend', () => {
            isDown = false;
        });

        slidesContainer.addEventListener('touchmove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.touches[0].pageX - slidesContainer.offsetLeft;
            const walk = (x - startX) * 2; // Inverteu o cálculo original para ajustar a direção
        
            // Atualiza a posição do scroll
            slidesContainer.scrollLeft = scrollLeft - walk;
        });

        // Ajuste automático após o scroll
        slidesContainer.addEventListener('touchend', () => {
            const slideWidth = slidesContainer.querySelector('.slide').offsetWidth;
            const currentScroll = slidesContainer.scrollLeft;
            const targetSlide = Math.round(currentScroll / slideWidth);
            
            slidesContainer.scrollTo({
                left: targetSlide * slideWidth,
                behavior: 'smooth'
            });
        });

        // Ajuste de altura do carrossel
        adjustCarouselHeight();
    }

    document.addEventListener('DOMContentLoaded', function() {
        if (window.innerWidth <= 768) {
            initMobileCarousel();
        }
    });
});