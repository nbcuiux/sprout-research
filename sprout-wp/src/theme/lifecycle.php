<?php 

	/* Template Name: Lifecycle */

	$context = Timber::get_context();
    $context['post'] = new TimberPost();

    Timber::render('lifecycle.html', $context);