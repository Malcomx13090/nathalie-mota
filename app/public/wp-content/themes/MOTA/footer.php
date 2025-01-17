<?php
wp_footer();
?>

<footer>
    <!-- Autres contenus du pied de page -->
    
    <div style="display: flex; justify-content: center; gap: 20px; margin: top 30px;">
    
    <?php
wp_nav_menu(array(
    'theme_location' => 'footer', // Doit correspondre à ce que vous avez déclaré dans `functions.php`.
    'menu_class' => 'menu-deco', // Une classe CSS personnalisée pour styliser le menu.
    'container_class' => 'container-deco', // Class for the wrapping div
));
?>
    </div>

   


  <!-- La modale cachée par défaut -->
  <div class="modale" id="maModale2" style="display: none;">
    <div class="modale-header">
        <p id='nodis'></p>
    </div>
    
    <div id="cf7-modal-form">
    <?php echo do_shortcode('[contact-form-7 id="142644b" title="Contact form 1"]'); ?>
    </div>
</div>




  <!-- Modal Container -->
  <div class="modale" id="maModale" style="display: none;">
    <div class="modale-header">
        <p id='nodis'></p>
    </div>
    
    <div id="cf7-modal-form">
    <?php echo do_shortcode('[contact-form-7 id="142644b" title="Contact form 1"]'); ?>
    </div>
</div>




    
</div>

<!-- Modal Overlay -->
<div class="modale-overlay" style="display: none;"></div>

</footer>
</body>
</html>