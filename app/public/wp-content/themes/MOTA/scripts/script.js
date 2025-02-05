document.addEventListener('DOMContentLoaded', function() {
    // Sélectionnez l'élément avec l'ID menu-item-28
    var menuItem = document.getElementById('menu-item-28');

    // Vérifiez si l'élément existe pour éviter les erreurs
    if (menuItem) {
        // Ajoutez un écouteur d'événement pour le clic
        menuItem.addEventListener('click', function(event) {
            event.preventDefault(); // Empêche le comportement par défaut du lien, si c'en est un

            // Sélectionnez la modale
            var modale = document.getElementById('maModale');

            // Affichez la modale en modifiant son style
            if (modale) {
                modale.style.display = 'block';
            }
        });
    }

    // Gestion de la fermeture de la modale
    var fermerBouton = document.getElementById('fermerModale');
    if (fermerBouton) {
        fermerBouton.addEventListener('click', function() {
            var modale = document.getElementById('maModale');
            if (modale) {
                modale.style.display = 'none';
            }
        });
    }
});


document.addEventListener('DOMContentLoaded', function() {
    var menuItem = document.getElementById('menu-item-28');
    var modale = document.getElementById('maModale');
    var overlay = document.createElement('div');
    overlay.className = 'modale-overlay';
    document.body.appendChild(overlay);

    if (menuItem) {
        menuItem.addEventListener('click', function(event) {
            event.preventDefault();
            if (modale && overlay) {
                modale.style.display = 'block';
                overlay.style.display = 'block';
            }
        });
    }

    var fermerBouton = document.getElementById('fermerModale');
    if (fermerBouton) {
        fermerBouton.addEventListener('click', function() {
            if (modale && overlay) {
                modale.style.display = 'none';
                overlay.style.display = 'none';
            }
        });
    }

    // Fermer la modale en cliquant sur l'overlay
    if (overlay) {
        overlay.addEventListener('click', function() {
            if (modale && overlay) {
                modale.style.display = 'none';
                overlay.style.display = 'none';
            }
        });
    }
});

var menuItem = document.getElementById('menu-item-28');
menuItem.addEventListener('click', function(event) {
    event.preventDefault();
    var modale = document.getElementById('maModale');
    console.log('Menu item clicked, modale:', modale); // Vérifiez si la modale est bien ciblée
    if (modale) {
        modale.style.display = 'block';
    }
});

var fermerBouton = document.getElementById('fermerModale');
fermerBouton.addEventListener('click', function() {
    var modale = document.getElementById('maModale');
    console.log('Close button clicked, modale:', modale); // Vérifiez si l'élément est bien trouvé
    if (modale) {
        modale.style.display = 'none';
    }
});



// Submit form via AJAX using CF7's AJAX functionality
var cf7Form = document.querySelector('#cf7-modal-form form');
if (cf7Form) {
    cf7Form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        // Submit the form using Contact Form 7's AJAX
        var cf7 = window.wpcf7;
        var form = this;

        // Trigger the form submission via AJAX
        cf7.submit(form).then(function(response) {
            // On success, hide the modal and show success message
            if (response.status === 'mail_sent') {
                alert('Message sent successfully');
                form.reset(); // Reset form fields
                modale.style.display = 'none'; // Close the modal
                overlay.style.display = 'none';
            } else {
                alert('There was an error sending your message.');
            }
        }).catch(function(error) {
            console.error('Error:', error);
            alert('An error occurred.');
        });
    });
}









