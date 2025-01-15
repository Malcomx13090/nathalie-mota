jQuery(document).ready(function ($) {
    let page = 1;
    $('#load-more-photos').on('click', function () {
        page++;
        const categorie = $('#filter-categorie').val();
        const format = $('#filter-format').val();
        $.ajax({
            url: photoAjax.url,
            type: 'POST',
            data: {
                action: 'load_more_photos',
                page: page,
                categorie: categorie,
                format: format,
            },
            success: function (response) {
                if (response) {
                    $('#photo-gallery').append(response);
                } else {
                    $('#load-more-photos').text('Aucune autre photo');
                    $('#load-more-photos').prop('disabled', true);
                }
            },
        });
    });
    // Rafraîchir les photos lors d'un changement de filtre
    $('#filter-categorie, #filter-format').on('change', function () {
        const categorie = $('#filter-categorie').val();
        const format = $('#filter-format').val();
        $.ajax({
            url: photoAjax.url,
            type: 'POST',
            data: {
                action: 'load_more_photos',
                page: 0,
                categorie: categorie,
                format: format,
            },
            success: function (response) {
                $('#photo-gallery').html(response);
                page = 1;
                $('#load-more-photos').text('Charger plus');
                $('#load-more-photos').prop('disabled', false);
            },
        });
    });
});




document.addEventListener('DOMContentLoaded', function () {
    const toggleButton = document.querySelector('.menu-toggle');
    const menuContainer = document.querySelector('.menu-container');

    if (toggleButton && menuContainer) {
        toggleButton.addEventListener('click', function () {
            const isExpanded = toggleButton.getAttribute('aria-expanded') === 'true';
            toggleButton.setAttribute('aria-expanded', !isExpanded);
            menuContainer.classList.toggle('active'); // Toggle visibility
        });
    } else {
        console.error("Toggle button or menu container not found.");
    }
});
