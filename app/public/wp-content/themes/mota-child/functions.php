<?php
add_action( 'wp_enqueue_scripts', 'mota_child_enqueue_styles' );

function mota_child_enqueue_styles() {
    // Enqueue the parent theme's stylesheet
    wp_enqueue_style( 'parent-style', get_template_directory_uri() . '/style.css' );

    // Enqueue the child theme's stylesheet (loaded after the parent style)
    wp_enqueue_style( 'child-style', get_stylesheet_directory_uri() . '/style.css', array( 'parent-style' ) );
}
?>

<?php
add_action( 'wp_enqueue_scripts', 'enqueue_custom_fonts' );

function enqueue_custom_fonts() {
    // Enqueue the custom font CSS file
    wp_enqueue_style( 'custom-fonts', get_stylesheet_directory_uri() . '/fonts.css', array(), null );
}
?>
