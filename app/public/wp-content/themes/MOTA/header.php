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

<a href="index.php"><img class="logo" src="http://nathalie-mota.local/wp-content/uploads/2024/12/Logo1.png" alt="Logo" id="logo"></a>
<nav class="nav-menu">        
<?php
wp_nav_menu(array(
    'theme_location' => 'primary', // Doit correspondre à ce que vous avez déclaré dans `functions.php`.
    'menu_class' => 'menu-principal', // Une classe CSS personnalisée pour styliser le menu.
));
?>
</nav>

</header>