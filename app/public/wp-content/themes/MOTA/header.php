<!doctype html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="<?php echo get_stylesheet_directory_uri(); ?>/style.css">
    <title>NATHALIE MOTA</title>
    <?php wp_head();?>
</head>
<body>

<header class="header-container">

<a href="http://nathalie-mota.local/"><img class="logo" src="http://nathalie-mota.local/wp-content/uploads/2024/12/Logo1.png" alt="Logo" id="logo"></a>
 
<div class="menu-wrapper">
    <!-- Toggle Button -->
    <button class="menu-toggle" aria-controls="primary-menu" aria-expanded="false">
        <span class="burger-icon">☰</span>
    </button>

    <!-- WordPress Navigation -->
    <?php 
    wp_nav_menu(array(
        'theme_location' => 'primary', // Ensure this is registered in functions.php
        'menu_class' => 'menu-principal', // Custom class for <ul>
        'container_class' => 'menu-container', // Class for the wrapping div
        'items_wrap' => '<ul id="%1$s" class="%2$s">%3$s</ul>', // Standard wrap
    ));
    ?>
</div>
</nav>


</header>