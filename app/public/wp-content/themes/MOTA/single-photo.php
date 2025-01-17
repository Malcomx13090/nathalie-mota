<?php 
get_header();

while (have_posts()) : the_post(); 
?>
<div class="single-photo-container²">
  

<div class='photo-bio'>
    

   <div class="photo-header²">
        <h1 class="photo-title²"><?php the_title(); ?></h1>
        <ul class="photo-meta²">
            <li class='metasingle'><strong>Référence :</strong> <?php the_field('reference'); ?></li>
            <li class='metasingle'><strong>Catégorie :</strong> <?php echo get_the_term_list(get_the_ID(), 'categorie', '', ', '); ?></li>
            <li class='metasingle'><strong>Format :</strong> <?php echo get_the_term_list(get_the_ID(), 'format', '', ', '); ?></li>
            <li class='metasingle'><strong>Type :</strong> <?php the_field('type'); ?></li>
            <li class='metasingle'><strong>Année :</strong> <?php echo get_the_date('Y'); ?></li>
        </ul>
        
    </div>


    <div class ="photo-main²" > 
    <?php if (has_post_thumbnail()) : ?>
    <div class="photo-image²"> <?php the_post_thumbnail('large', array('class' => 'responsive-img²')); ?> 
   </div> <?php endif; ?> </div>




</div>
    
    <div class="related-photos²">
    

    <div class='underpic'>

    <p class="metasingle²">Cette photo vous intéresse ?</p>
    <button class="contact-button²">Contact</button>

    <!-- Pagination Arrows -->
    <div class="pagination-arrows">
            <?php 
            // Get all the posts of the 'photo' type
            $args = array(
                'post_type' => 'photo',
                'posts_per_page' => -1, // Get all posts
                'orderby' => 'date', // Order by date
                'order' => 'ASC' // Ascending order
            );
            $all_photos = new WP_Query($args);

            // Get the IDs of all the posts
            $photo_ids = wp_list_pluck($all_photos->posts, 'ID');
            
            // Find the current photo's ID in the array
            $current_post_id = get_the_ID();
            $current_index = array_search($current_post_id, $photo_ids);

            // Loop infinitely
            $prev_post_id = ($current_index === 0) ? end($photo_ids) : $photo_ids[$current_index - 1];
            $next_post_id = ($current_index === count($photo_ids) - 1) ? $photo_ids[0] : $photo_ids[$current_index + 1];

            // Display the Previous arrow (if there's a previous post)
            if ($prev_post_id) : ?>
                <a href="<?php echo get_permalink($prev_post_id); ?>" class="prev-photo">&larr;</a>
            <?php endif; ?>

            <!-- Next photo preview -->
            <?php if ($next_post_id) : ?>
                <a href="<?php echo get_permalink($next_post_id); ?>" class="next-photo-preview">
                    <?php echo get_the_post_thumbnail($next_post_id, 'thumbnail', array('class' => 'next-photo-thumbnail')); ?>
                </a>
            <?php endif; ?>

            <!-- Display the Next arrow (if there's a next post) -->
            <?php if ($next_post_id) : ?>
                <a href="<?php echo get_permalink($next_post_id); ?>" class="next-photo">&rarr;</a>
            <?php endif; ?>
        </div>
    </div>




    </div>

    
        <h2 class='metasingle'>Vous aimerez aussi</h2>
        <div class="related-photos-grid²">
            <?php
            $related_photos = new WP_Query(array(
                'post_type' => 'photo',
                'posts_per_page' => 2,
                'post__not_in' => array(get_the_ID()),
                'orderby' => 'rand',
                'tax_query' => array(
                    array(
                        'taxonomy' => 'categorie',
                        'field' => 'term_id',
                        'terms' => wp_get_post_terms(get_the_ID(), 'categorie', array('fields' => 'ids')),
                    ),
                ),
            ));

            if ($related_photos->have_posts()) :
                while ($related_photos->have_posts()) : $related_photos->the_post();
                    ?>
                    <div class="related-photo-item²">
                        <a href="<?php the_permalink(); ?>">
                            <?php the_post_thumbnail('custom-size', array('class' => 'responsive-img²')); ?>
                        </a>
                    </div>
                    <?php
                endwhile;
                wp_reset_postdata();
            endif;
            ?>
        </div>
    </div>
</div>


<?php
endwhile;

get_footer();
?>
