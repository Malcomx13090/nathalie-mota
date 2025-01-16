jQuery(document).ready(function ($) {
    let page = 1;
    $('#load-more-photos').on('click', function () {
        page++;
        const categorie = $('#filter-categorie').val();
        const format = $('#filter-format').val();
        const sortOrder = $('#filter-sort').val(); // Get the sort order
        const dateOrder = $('#filter-date').val(); // Get the date order filter

        $.ajax({
            url: photoAjax.url,
            type: 'POST',
            data: {
                action: 'load_more_photos',
                page: page,
                categorie: categorie,
                format: format,
                sort_order: sortOrder,
                date_order: dateOrder, // Send the date filter value
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
    $('#filter-categorie, #filter-format, #filter-sort, #filter-date').on('change', function () {
        const categorie = $('#filter-categorie').val();
        const format = $('#filter-format').val();
        const sortOrder = $('#filter-sort').val(); // Get the sort order
        const dateOrder = $('#filter-date').val(); // Get the date order filter

        $.ajax({
            url: photoAjax.url,
            type: 'POST',
            data: {
                action: 'load_more_photos',
                page: 0,
                categorie: categorie,
                format: format,
                sort_order: sortOrder, // Pass the sort order
                date_order: dateOrder, // Pass the date order
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




const imageGallery = [
    'http://nathalie-mota.local/wp-content/uploads/2024/12/nathalie-0-scaled.jpeg',
    'http://nathalie-mota.local/wp-content/uploads/2024/12/nathalie-1-scaled.jpeg',
    'http://nathalie-mota.local/wp-content/uploads/2024/12/nathalie-2-scaled.jpeg',
    'http://nathalie-mota.local/wp-content/uploads/2024/12/nathalie-3-scaled.jpeg',
    'http://nathalie-mota.local/wp-content/uploads/2024/12/nathalie-4-scaled.jpeg',
    'http://nathalie-mota.local/wp-content/uploads/2024/12/nathalie-5-scaled.jpeg',
    'http://nathalie-mota.local/wp-content/uploads/2024/12/nathalie-6-scaled.jpeg',
    'http://nathalie-mota.local/wp-content/uploads/2024/12/nathalie-7-scaled.jpeg',
    'http://nathalie-mota.local/wp-content/uploads/2024/12/nathalie-8-scaled.jpeg',
    'http://nathalie-mota.local/wp-content/uploads/2024/12/nathalie-9-scaled.jpeg',
    'http://nathalie-mota.local/wp-content/uploads/2024/12/nathalie-10-scaled.jpeg',
    'http://nathalie-mota.local/wp-content/uploads/2024/12/nathalie-11-scaled.jpeg',
    'http://nathalie-mota.local/wp-content/uploads/2024/12/nathalie-12-scaled.jpeg',
    'http://nathalie-mota.local/wp-content/uploads/2024/12/nathalie-13-scaled.jpeg',
    'http://nathalie-mota.local/wp-content/uploads/2024/12/nathalie-14-scaled.jpeg',
    'http://nathalie-mota.local/wp-content/uploads/2024/12/nathalie-15-scaled.jpeg',
    // Add more URLs as needed
];

// Select the hero header element
const heroHeader = document.getElementById('hero-header');

// Choose a random image
const randomImage = imageGallery[Math.floor(Math.random() * imageGallery.length)];

// Set the random image as the background
heroHeader.style.backgroundImage = `url('${randomImage}')`;