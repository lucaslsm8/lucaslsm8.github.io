// ------------------------------------------------
// portfolio-init.js
// Inicializações específicas do portfólio de Lucas Schoenherr.
// Consolidado a partir dos blocos inline <script> do index.html.
// ------------------------------------------------

// --------------------------------------------- //
// Tema padrão — inicia em dark mode
// --------------------------------------------- //
document.addEventListener('DOMContentLoaded', function () {
    document.documentElement.setAttribute('data-theme', 'dark');
});

// --------------------------------------------- //
// Lightbox gallery — handler de clique
// --------------------------------------------- //
document.querySelectorAll('.lightboxgallery-link').forEach(function (item) {
    item.addEventListener('click', function (event) {
        event.preventDefault();
        var imgSrc = event.currentTarget.href;
        var overlay = document.createElement('div');
        overlay.classList.add('lightboxgallery-overlay');
        overlay.innerHTML = '<img loading="lazy" decoding="async" src="' + imgSrc + '" alt="">';
        document.body.appendChild(overlay);

        overlay.addEventListener('click', function () {
            document.body.removeChild(overlay);
        });
    });
});

// --------------------------------------------- //
// Masonry Layout — relayout de segurança no carregamento
// (complementa a inicialização principal em app.js)
// --------------------------------------------- //
document.addEventListener('DOMContentLoaded', function () {
    var gallery = document.querySelector('.my-gallery');
    if (!gallery) return;

    var imgs = gallery.querySelectorAll('img');
    var loaded = 0;

    function onImageReady() {
        loaded++;
        if (loaded === imgs.length) {
            setTimeout(function () {
                if (typeof jQuery !== 'undefined' && jQuery('.my-gallery').data('masonry')) {
                    jQuery('.my-gallery').masonry('layout');
                }
            }, 300);
        }
    }

    imgs.forEach(function (img) {
        if (img.complete) {
            onImageReady();
        } else {
            img.addEventListener('load', onImageReady);
            img.addEventListener('error', onImageReady);
        }
    });

    // Fallback: força layout após 1s independente do carregamento
    setTimeout(function () {
        if (typeof jQuery !== 'undefined' && jQuery('.my-gallery').data('masonry')) {
            jQuery('.my-gallery').masonry('layout');
        }
    }, 1000);
});
