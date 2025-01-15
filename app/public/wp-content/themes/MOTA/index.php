<?php
// Basic template for displaying content
get_header();


echo '<img id="hero-header">';

?>

<main id="main-content">
    <!-- Filtres des taxonomies -->
    <?php
    $categories = get_terms('categorie');
    $formats = get_terms('format');
    ?>
    <div id="photo-filters">
        <select id="filter-categorie">
            <option value="">Toutes les catégories</option>
            <?php foreach ($categories as $cat): ?>
                <option value="<?php echo $cat->slug; ?>"><?php echo $cat->name; ?></option>
            <?php endforeach; ?>
        </select>

        <select id="filter-format">
            <option value="">Tous les formats</option>
            <?php foreach ($formats as $format): ?>
                <option value="<?php echo $format->slug; ?>"><?php echo $format->name; ?></option>
            <?php endforeach; ?>
        </select>
    </div>

    <!-- Galerie des photos -->
    <div id="photo-gallery">
        <?php
        // Boucle pour afficher les 8 dernières photos
        $args = array(
            'post_type'      => 'photo',
            'posts_per_page' => 8,
            'post_status'    => 'publish',
        );
        $query = new WP_Query($args);

        if ($query->have_posts()) :
            while ($query->have_posts()) : $query->the_post();
                ?>
                 <div class="photo-item">
                <a href="<?php the_permalink(); ?>">
                <?php the_post_thumbnail('custom-size', array('class' => 'responsive-img')); ?>
                </a>
            </div>
                <?php
            endwhile;
            wp_reset_postdata();
        else :
            echo '<p>Aucune photo trouvée.</p>';
        endif;
        ?>
    </div>

    <!-- Bouton Charger Plus -->
     <div id="button-container">
    <button id="load-more-photos" data-page="1">Charger plus</button>
    </div>
</main>

<?php

get_footer();

?>


