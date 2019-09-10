<?php 

	/* Template Name: Sprout mockup */

	$context = Timber::get_context();
  $context['post'] = new TimberPost();
  Timber::render('sprout-mock.html', $context);