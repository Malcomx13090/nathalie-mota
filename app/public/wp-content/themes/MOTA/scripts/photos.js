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
    const lightbox = document.getElementById('photo-lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const viewDetailsButton = document.getElementById('view-details');
    const galleryContainer = document.getElementById('photo-gallery'); // Replace with your gallery container's ID

    // Event delegation for dynamically added or updated photo items
    galleryContainer.addEventListener('click', function (event) {
        const clickedItem = event.target.closest('.photo-item'); // Check if a photo-item was clicked
        if (clickedItem) {
            const imageUrl = clickedItem.getAttribute('data-image-url');
            const singleUrl = clickedItem.getAttribute('data-single-url');

            if (imageUrl && singleUrl) {
                // Update the lightbox content
                lightboxImage.src = imageUrl;
                viewDetailsButton.href = singleUrl;
                console.log("URL: " + singleUrl); // Log the URL
                viewDetailsButton.target = '_blank'; // Open in a new tab

                // Show the lightbox
                lightbox.classList.remove('hidden');
            }
        }
    });

    // Close the lightbox when clicking outside the content
    lightbox.addEventListener('click', function (event) {
        if (event.target === lightbox) {
            lightbox.classList.add('hidden');
        }
    });
});



document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('button-contact').addEventListener('click', function () {
        // Open the modal
        const modal = document.getElementById('maModale2');
        if (modal) {
            modal.style.display = 'block';
        }
    });

    // Optional: Close the modal when clicking outside
    document.addEventListener('click', function (event) {
        const modal = document.getElementById('maModale2');
        if (modal && !modal.contains(event.target) && event.target.id !== 'button-contact') {
            modal.style.display = 'none';
        }
    });
});


document.addEventListener('click', function (event) {
    const modal = document.getElementById('maModale2');
    const button = document.getElementById('button-contact');
    if (modal && event.target !== button && !modal.contains(event.target)) {
        modal.style.display = 'none';
    }
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

