<?php
// Basic template for displaying content
get_header();


echo '<div id="hero-header">
    <h1 class="hero-title">PHOTGRAPHE EVENT</h1>
</div>';

?>

<main id="main-content">
    <!-- Filtres des taxonomies -->
    <?php
    $categories = get_terms('categorie');
    $formats = get_terms('format');
    ?>
    <div id="photo-filters">
        <select id="filter-categorie">
            <option value="">CATÉGORIES</option>
            <?php foreach ($categories as $cat): ?>
                <option value="<?php echo $cat->slug; ?>"><?php echo $cat->name; ?></option>
            <?php endforeach; ?>
        </select>

        <select id="filter-format">
            <option value="">FORMATS</option>
            <?php foreach ($formats as $format): ?>
                <option value="<?php echo $format->slug; ?>"><?php echo $format->name; ?></option>
            <?php endforeach; ?>
        </select>

        <select id="filter-date">
    <option value="">TRIER PAR</option>
    <option id="filter-date" value="DESC">Du plus récent au plus ancien</option>
    <option id="filter-date" value="ASC">Du plus ancient au plus récent</option>
</select>

    </div>

    

    <!-- Galerie des photos -->
    <div id="photo-gallery">
        <?php
        $sort_order = isset($_GET['sort_order']) ? $_GET['sort_order'] : 'DESC';
        // Boucle pour afficher les 8 dernières photos
        $args = array(
            'post_type'      => 'photo',
            'posts_per_page' => 8,
            'post_status'    => 'publish',
            
        );
        $query = new WP_Query($args);

        if ($query->have_posts()) :
            while ($query->have_posts()) : $query->the_post();
            $image_full_url = get_the_post_thumbnail_url(get_the_ID(), 'full');
        $single_url = get_permalink(get_the_ID());
        ?>
                
                 <div class="photo-item" data-image-url="<?php echo esc_url($image_full_url); ?>" 
                 data-single-url="<?php echo esc_url($single_url); ?>" id="photo<?php echo get_the_ID();?>">
                 
                
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




<div class="lightbox hidden" id="photo-lightbox" >
    <div class="lightbox-content">
        <img id="lightbox-image" class="lightbox-image" src="" alt="Photo">
        <a id="view-details" class="open-single-photo" href="#" target="_blank">VOIR LES DÉTAILS</a>
    </div>    
</div>
<?php

get_footer();

?>