<?php 

	/* Template Name: USA index */

	$context = Timber::get_context();
    $context['post'] = new TimberPost();

    Timber::render('usa-index.html', $context);