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




function ajouter_mon_script() {
    wp_enqueue_script('mon-script', get_template_directory_uri() . '/scripts/script.js', array(), null, true);
}
add_action('wp_enqueue_scripts', 'ajouter_mon_script');


add_theme_support('post-thumbnails');