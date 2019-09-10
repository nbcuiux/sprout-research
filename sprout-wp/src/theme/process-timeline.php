<?php 

	/* Template Name: Process Timeline */

	$context = Timber::get_context();
    $context['post'] = new TimberPost();

    Timber::render('process-timeline.html', $context);