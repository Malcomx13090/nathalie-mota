<?php
function blank_theme_enqueue_styles() {
    // Manually specify the path to the CSS file
    wp_enqueue_style( 'main-style', get_template_directory_uri() . '/style.css' );
}
add_action( 'wp_enqueue_scripts', 'blank_theme_enqueue_styles' );
?>

<?php
add_action( 'wp_enqueue_scripts', 'enqueue_custom_fonts' );

function enqueue_custom_fonts() {
    // Enqueue the custom font CSS file
    wp_enqueue_style( 'custom-fonts', get_stylesheet_directory_uri() . '/fonts.css', array(), null );
}
?>
