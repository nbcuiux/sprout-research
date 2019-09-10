<?php 

	/* Template Name: Splash */

	$context = Timber::get_context();
    $context['post'] = new TimberPost();

    Timber::render('splash.html', $context);