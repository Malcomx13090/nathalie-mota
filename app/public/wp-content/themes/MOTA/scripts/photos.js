jQuery(document).ready(function ($) {
    let page = 1;

    // Initialize the hover effect for photos (delegation ensures new items work)
    function applyHoverEffect() {
        // Event delegation to apply hover effect for dynamically loaded photo items
        $('#photo-gallery').on('mouseenter', '.photo-item', function () {
            $(this).find('.overlay').fadeIn();
        }).on('mouseleave', '.photo-item', function () {
            $(this).find('.overlay').fadeOut();
        });
    }

    // Initialize the gallery and lightbox functionality (delegation for dynamic content)
    function initializeGallery() {
        // Event delegation for opening the lightbox on click for photo items
        $('#photo-gallery').on('click', '.photo-item', function () {
            const imageUrl = $(this).data('image-url');
            const singleUrl = $(this).data('single-url');
            const categories = $(this).data('categories');
            const reference = $(this).data('reference');
            openLightbox(imageUrl, singleUrl, categories, reference);
        });
    }

    // Function to open the lightbox and set its content
    function openLightbox(imageUrl, singleUrl, categories, reference) {
        const lightbox = $('#photo-lightbox');
        const lightboxImage = $('#lightbox-image');
        const viewDetailsButton = $('#view-details');
        const lightboxCategories = $('#lightbox-categories');
        const lightboxReference = $('#lightbox-reference');

        lightboxImage.attr('src', imageUrl);
        viewDetailsButton.attr('href', singleUrl);
        lightboxCategories.text(categories || 'No category');
        lightboxReference.text(reference || 'No reference');
        lightbox.removeClass('hidden'); // Show the lightbox
    }

    // Close lightbox when clicking outside of it
    $('#photo-lightbox').on('click', function (e) {
        if ($(e.target).is('#photo-lightbox')) {
            $(this).addClass('hidden');
        }
    });

    // Load more photos on button click
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
                    applyHoverEffect(); // Reapply hover effect to newly loaded photos
                    initializeGallery(); // Reinitialize lightbox functionality for new photos
                } else {
                    $('#load-more-photos').text('Aucune autre photo');
                    $('#load-more-photos').prop('disabled', true);
                }
            },
        });
    });

    // Refresh photos on filter change
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
                page: 0, // Reset page to 0 for a fresh start
                categorie: categorie,
                format: format,
                sort_order: sortOrder, // Pass the sort order
                date_order: dateOrder, // Pass the date order
            },
            success: function (response) {
                $('#photo-gallery').html(response); // Replace the gallery content
                page = 1; // Reset the page number
                $('#load-more-photos').text('Charger plus');
                $('#load-more-photos').prop('disabled', false);
                applyHoverEffect(); // Reapply hover effect to newly loaded photos
                initializeGallery(); // Reinitialize lightbox functionality for new photos
            },
        });
    });

    // Initialize the gallery and hover effect for existing items when the page loads
    applyHoverEffect();
    initializeGallery();
});


document.addEventListener('DOMContentLoaded', function () {
    const lightbox = document.getElementById('photo-lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const viewDetailsButton = document.getElementById('view-details');
    const galleryContainer = document.getElementById('photo-gallery');
    const prevPhotoButton = document.getElementById('prev-photo');
    const nextPhotoButton = document.getElementById('next-photo');
    const lightboxCategories = document.getElementById('lightbox-categories'); // Element for category
    const lightboxReference = document.getElementById('lightbox-reference'); // Element for reference

    let photoItems = []; // To store all photo items in the gallery
    let currentPhotoIndex = -1; // To track the current photo being displayed

    if (!lightbox || !lightboxImage || !viewDetailsButton || !galleryContainer) {
        console.error("Missing required elements. Ensure the IDs are correct.");
        return;
    }

    // Initialize gallery items
    function initializeGallery() {
        photoItems = Array.from(galleryContainer.querySelectorAll('.photo-item'));
        if (photoItems.length === 0) {
            console.warn("No photo items found in the gallery.");
        }
    }

    // Open the lightbox with a specific photo
    function openLightbox(index) {
        if (index < 0 || index >= photoItems.length) return;

        currentPhotoIndex = index;

        const clickedItem = photoItems[index];
        const imageUrl = clickedItem.getAttribute('data-image-url');
        const singleUrl = clickedItem.getAttribute('data-single-url');
        const categories = clickedItem.getAttribute('data-categories'); // Get categories from data attribute
        const reference = clickedItem.getAttribute('data-reference'); // Get reference from data attribute

        if (imageUrl && singleUrl) {
            lightboxImage.src = imageUrl;
            viewDetailsButton.href = singleUrl;
            viewDetailsButton.target = '_blank';

            // Set the categories and reference in the lightbox
            lightboxCategories.textContent = categories || "No category"; // Fallback if no category
            lightboxReference.textContent = reference || "No reference"; // Fallback if no reference

            lightbox.classList.remove('hidden');
        } else {
            console.warn("Missing data attributes for photo item:", clickedItem);
        }
    }

    // Navigate to the previous photo
    function showPreviousPhoto() {
        if (currentPhotoIndex > 0) {
            openLightbox(currentPhotoIndex - 1);
        }
    }

    // Navigate to the next photo
    function showNextPhoto() {
        if (currentPhotoIndex < photoItems.length - 1) {
            openLightbox(currentPhotoIndex + 1);
        }
    }

    // Close the lightbox
    function closeLightbox() {
        lightbox.classList.add('hidden');
        currentPhotoIndex = -1; // Reset the index
    }

    // Event delegation for dynamically added or updated photo items
    galleryContainer.addEventListener('click', function (event) {
        const clickedItem = event.target.closest('.photo-item'); // Check if a photo-item was clicked
        if (!clickedItem) return;

        const imageUrl = clickedItem.getAttribute('data-image-url');
        const singleUrl = clickedItem.getAttribute('data-single-url');

        if (imageUrl && singleUrl) {
            if (event.target.closest('.fa-expand')) {
                // Update the lightbox content
                openLightbox(photoItems.indexOf(clickedItem)); // Open the lightbox for the clicked item
                console.log("Lightbox image URL:", imageUrl);
                console.log("Details button URL:", singleUrl);
            } else if (event.target.closest('.fa-eye')) {
                // Open the single URL directly
                console.log("Opening URL:", singleUrl);
                window.open(singleUrl, '_blank');
            }
        } else {
            console.warn("Missing data attributes for clicked item:", clickedItem);
        }
    });

    // Close the lightbox when clicking outside the content
    lightbox.addEventListener('click', function (event) {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });

    // Rebind actions for new content loaded via AJAX
    function rebindDynamicContent() {
        console.log('Rebinding actions for new content!');
        // Event delegation ensures new content is automatically handled.
    }

    prevPhotoButton.addEventListener('click', function (event) {
        event.stopPropagation(); // Prevent event bubbling to lightbox click
        showPreviousPhoto();
    });

    nextPhotoButton.addEventListener('click', function (event) {
        event.stopPropagation(); // Prevent event bubbling to lightbox click
        showNextPhoto();
    });

    // Reinitialize gallery when DOM is ready or new items are added dynamically
    initializeGallery();
});



document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('button-contact').addEventListener('click', function () {
        // Open the modal
        var modaleOverlay = document.querySelector('.modale-overlay'); 
        modaleOverlay.style.display = 'block';
        const modal = document.getElementById('maModale2');
        if (modal) {
            modal.style.display = 'block';
        }

    var reference = document.querySelector('.metasingle strong').nextSibling.textContent.trim();

    // Populate the "photo-ref2" field with the reference value
    var refPhotoField = document.getElementById('photo-ref2');
    if (refPhotoField) {
        refPhotoField.value = reference;
    }
});
    });


    // Optional: Close the modal when clicking outside
    document.addEventListener('click', function(event) {
        const modal = document.getElementById('maModale2');
        const overlay = document.querySelector('.modale-overlay');
    
        if (modal && !modal.contains(event.target) && event.target.id !== 'button-contact') {
            modal.style.display = 'none';
            if (overlay) {
                overlay.style.display = 'none';
            }
        }
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

document.querySelectorAll('.custom-dropdown3').forEach(dropdown => {
    const select = dropdown.querySelector('.custom-select3');
    const options = dropdown.querySelectorAll('.custom-options3 li');
    const nativeSelect = document.querySelector(`#${dropdown.getAttribute('data-select-id')}`); // Match native <select>

    options.forEach(option => {
        option.addEventListener('click', () => {
            // Update custom dropdown display
            select.textContent = option.textContent;

            // Update the hidden native <select> value
            nativeSelect.value = option.getAttribute('data-value');
            nativeSelect.dispatchEvent(new Event('change')); // Trigger the change event
            dropdown.querySelector('.custom-options3').style.display = 'none';
        });
    });

    select.addEventListener('click', () => {
        const optionsList = dropdown.querySelector('.custom-options3');
        optionsList.style.display = optionsList.style.display === 'block' ? 'none' : 'block';
    });
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



