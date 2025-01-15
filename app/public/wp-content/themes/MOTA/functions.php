<?php
function blank_theme_enqueue_styles() {
    // Manually specify the path to the CSS file
    wp_enqueue_style( 'main-style', get_template_directory_uri() . '/style.css' );
}
add_action( 'wp_enqueue_scripts', 'blank_theme_enqueue_styles' );


add_action( 'wp_enqueue_scripts', 'enqueue_custom_fonts' );

function enqueue_custom_fonts() {
    // Enqueue the custom font CSS file
    wp_enqueue_style( 'custom-fonts', get_stylesheet_directory_uri() . '/fonts.css', array(), null );
}



function register_my_menus() {
    register_nav_menus(array(
        'primary' => __('Menu Principal', 'votre-theme'),
        'footer' => __('Menu Footer', 'votre-theme'),
    ));
}
add_action('after_setup_theme', 'register_my_menus');

function register_custom_menu() {
    register_nav_menu('primary', __('Primary Menu', 'your-theme-textdomain'));
}
add_action('after_setup_theme', 'register_custom_menu');


function ajouter_mon_script() {
    wp_enqueue_script('mon-script', get_template_directory_uri() . '/scripts/script.js', array(), null, true);
}
add_action('wp_enqueue_scripts', 'ajouter_mon_script');


add_theme_support('post-thumbnails');


function load_jquery_in_wp() {
    if (!wp_script_is('jquery', 'enqueued')) {
        wp_enqueue_script('jquery');
    }
}
add_action('wp_enqueue_scripts', 'load_jquery_in_wp');


function check_jquery_in_wp() {
    ?>
    <script>
        if (typeof jQuery !== "undefined") {
            console.log("jQuery est chargé !");
        } else {
            console.log("jQuery n'est pas chargé.");
        }
    </script>
    <?php
}
add_action('wp_footer', 'check_jquery_in_wp');



// Action pour charger plus de photos via AJAX
function load_more_photos() {
    $paged = isset($_POST['page']) ? intval($_POST['page']) : 1;
    $categorie = isset($_POST['categorie']) ? sanitize_text_field($_POST['categorie']) : '';
    $format = isset($_POST['format']) ? sanitize_text_field($_POST['format']) : '';

    $args = array(
        'post_type'      => 'photo',
        'posts_per_page' => 8,
        'paged'          => $paged,
        'post_status'    => 'publish',
    );

    if ($categorie) {
        $args['tax_query'][] = array(
            'taxonomy' => 'categorie',
            'field'    => 'slug',
            'terms'    => $categorie,
        );
    }

    if ($format) {
        $args['tax_query'][] = array(
            'taxonomy' => 'format',
            'field'    => 'slug',
            'terms'    => $format,
        );
    }

    $query = new WP_Query($args);

    if ($query->have_posts()) :
        while ($query->have_posts()) : $query->the_post();
            ?>
            <div class="photo-item">
                <a href="<?php the_permalink(); ?>">
                    <?php the_post_thumbnail('custom-size'); ?>
                </a>
            </div>
            <?php
        endwhile;
        wp_reset_postdata();
    else:
        echo ''; // Return an empty string if no posts are found
    endif;

    wp_die();
}
add_action('wp_ajax_load_more_photos', 'load_more_photos');
add_action('wp_ajax_nopriv_load_more_photos', 'load_more_photos');


function enqueue_photo_scripts() {
    wp_enqueue_script('photos', get_template_directory_uri() . '/scripts/photos.js', array('jquery'), null, true);

    // Transmettre des données à JavaScript
    wp_localize_script('photos', 'photoAjax', array(
        'url' => admin_url('admin-ajax.php'),
    ));
}
add_action('wp_enqueue_scripts', 'enqueue_photo_scripts');




add_action('after_setup_theme', 'custom_image_sizes');
function custom_image_sizes() {
    add_image_size('custom-size', 564, 495, true); // Cropped to exact dimensions
}

