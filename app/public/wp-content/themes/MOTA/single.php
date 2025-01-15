<?php get_header(); ?>

<main class="single-post-container">
    <?php while (have_posts()) : the_post(); ?>
        <article class="post-content">
            <!-- Display the title -->
            <h1><?php the_title(); ?></h1>

            <!-- Featured image -->
            <?php if (has_post_thumbnail()) : ?>
                <div class="featured-image">
                    <?php the_post_thumbnail('large'); ?>
                </div>
            <?php endif; ?>

            <!-- Post content -->
            <div class="post-text">
                <?php the_content(); ?>
            </div>

            <!-- Categories and tags -->
            <div class="post-meta">
                <p><strong>Catégories :</strong> <?php the_category(', '); ?></p>
                <p><strong>Tags :</strong> <?php the_tags('', ', ', ''); ?></p>
            </div>
        </article>
    <?php endwhile; ?>
</main>

<?php get_footer(); ?>