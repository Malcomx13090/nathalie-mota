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
  <!-- Modal Container -->
  <div class="modale" id="maModale" style="display: none;">
    <div class="modale-header">
        <p id='nodis'>pppp</p>
    </div>
    
    <form class="modale-form">
        <label for="nom">NOM</label>
        <input type="text" id="nom" name="nom" required>
        
        <label for="email">E-MAIL</label>
        <input type="email" id="email" name="email" required>
        
        <label for="photo-ref">RÉF. PHOTO</label>
        <input type="text" id="photo-ref" name="photo-ref">
        
        <label for="message">MESSAGE</label>
        <textarea id="message" name="message" rows="5" required></textarea>
        
        <button type="submit" class="submit-button">Envoyer</button>
    </form>
</div>

    
</div>

<!-- Modal Overlay -->
<div class="modale-overlay" style="display: none;"></div>

</footer>
</body>
</html>