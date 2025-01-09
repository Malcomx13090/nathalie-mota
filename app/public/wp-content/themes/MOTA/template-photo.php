<?php
// Ajouter les filtres pour les taxonomies
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

<div id="photo-gallery">
    <?php
    // Afficher les 8 derniers CPT 'photo'
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
                <?php the_post_thumbnail('medium'); ?>
            </div>
            <?php
        endwhile;
        wp_reset_postdata();
    else :
        echo '<p>Aucune photo trouvée.</p>';
    endif;
    ?>
</div>

<button id="load-more-photos" data-page="1">Charger plus</button>