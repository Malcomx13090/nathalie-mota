<?php
wp_footer();
?>

<footer>
    <!-- Autres contenus du pied de page 
    <footer style="background-color: #e0e0e0; text-align: center; padding: 10px 0; font-family: Arial, sans-serif; font-size: 14px; color: #333; border-top: 1px solid #ccc;">-->
    <div style="display: flex; justify-content: center; gap: 20px;">
    <nav class="nav-menu">   
    <?php
wp_nav_menu(array(
    'theme_location' => 'footer', // Doit correspondre à ce que vous avez déclaré dans `functions.php`.
    'menu_class' => 'menu-deco', // Une classe CSS personnalisée pour styliser le menu.
    'container_class' => 'container-deco', // Class for the wrapping div
));
?>
    </div>

  <!-- La modale cachée par défaut -->
    <div class="modale" id="maModale" style="display: none;">
        <!-- Contenu de la modale -->
        <p>Contenu de la modale</p>
        <button id="fermerModale">Fermer</button>
    </div>
</footer>
</body>
</html>