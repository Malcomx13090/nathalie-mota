<?php 
get_header();

while (have_posts()) : the_post();
    ?>
    <h1><?php the_title(); ?></h1>
    <?php if (has_post_thumbnail()) : ?>
        <div>
            <!-- Make the thumbnail clickable -->
            <a href="<?php the_permalink(); ?>">
            <?php the_post_thumbnail('medium', array('class' => 'responsive-img')); ?>
            </a>
        </div>
    <?php endif; ?>

    <p><?php the_content(); ?></p>

    <p><strong>Référence :</strong> <?php the_field('reference'); ?></p>
    <p><strong>Type :</strong> <?php the_field('type'); ?></p>

    <p><strong>Catégories :</strong> <?php echo get_the_term_list(get_the_ID(), 'categorie', '', ', '); ?></p>
    <p><strong>Formats :</strong> <?php echo get_the_term_list(get_the_ID(), 'format', '', ', '); ?></p>
    <?php
endwhile;

get_footer();
