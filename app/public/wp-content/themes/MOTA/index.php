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
   <div id="photo-filters3">


   
    <div class="custom-dropdown3" data-select-id="filter-categorie">
        <div class="custom-select3">
            CATÉGORIES
            <i class="dropdown-arrow3 fa-solid fa-chevron-down" style="margin-left:55px" ></i>
        </div>
        <ul class="custom-options3">
            <li data-value=""></li>
            <?php foreach ($categories as $cat): ?>
                <li data-value="<?php echo $cat->slug; ?>"><?php echo $cat->name; ?></li>
            <?php endforeach; ?>
        </ul>
    </div>

    <select id="filter-categorie" style="display: none;">
        <option value="" >CATÉGORIES</option>
        <?php foreach ($categories as $cat): ?>
            <option value="<?php echo $cat->slug; ?>"><?php echo $cat->name; ?></option>
        <?php endforeach; ?>
    </select>

    <div class="custom-dropdown3" data-select-id="filter-format">
        <div class="custom-select3">
            FORMATS
            <i class="dropdown-arrow3 fa-solid fa-chevron-down" style="margin-left:80px"></i>
        </div>
        <ul class="custom-options3">
            <li data-value=""></li>
            <?php foreach ($formats as $format): ?>
                <li data-value="<?php echo $format->slug; ?>"><?php echo $format->name; ?></li>
            <?php endforeach; ?>
        </ul>
    </div>

    <select id="filter-format" style="display: none;">
        <option value="">FORMATS</option>
        <?php foreach ($formats as $format): ?>
            <option value="<?php echo $format->slug; ?>"><?php echo $format->name; ?></option>
        <?php endforeach; ?>
    </select>

    <div class="custom-dropdown3" data-select-id="filter-date">
        <div class="custom-select3">
            TRIER PAR
            <i class="dropdown-arrow3 fa-solid fa-chevron-down" style="margin-left:80px"></i>
        </div>
        <ul class="custom-options3">
            <li data-value=""></li>
            <li data-value="DESC">Du plus récent au plus ancien</li>
            <li data-value="ASC">Du plus ancien au plus récent</li>
        </ul>
    </div>

    <select id="filter-date" style="display: none;">
        <option value="">TRIER PAR</option>
        <option value="DESC">Du plus récent au plus ancien</option>
        <option value="ASC">Du plus ancien au plus récent</option>
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