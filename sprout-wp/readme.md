# Ami's Wordpress Theme Starter

Wordpress starter pack for building themes from scratch. Includes:

* JS Babel compiling with Browserify
* Sass compiling
* Watch and autoreload
* Icon fonts
* Uses [Timber](https://www.upstatement.com/timber/) for nice templating
* Entire theme is compiled from your ```/src``` folder

## Setting it up


### 1. Set up wordpress
* Create an empty database
* Go to the root folder and copy a file named
	**site-config-example.json** to **site-config.json** in the same directory
* Replace the database parameters in with your database settings
* Replace ```siteUrl``` with the url of your wp instance
* Replace ```themeName``` with the name of your new theme

### 2. Install node and packages

Go to a terminal and run the following commands from the root folder:

	npm install
	npm install -g gulp-cli
	
Make sure you have node version 5.0 + installed to run this. To find this out type

	node --version
	
If you dont have the right version, please download the latest from <https://nodejs.org/en/>

### 3. Set up a blank theme
* Go to ```src/theme/style.css``` and in the comments replace the details with the details your theme in this format:

	
		/*
		* Theme Name: Wordpress Starter theme
		* Description: Wordpress Starter theme
		* Author: Me
		*/


* Go to the root directory and run gulp.


		gulp


* A browser should load and direct you to the wp install page. Follow the instructions.

* After installing, your new theme will be automatically selected.
* To set up a new theme under a different name, just change the ```themeName``` parameter in ```site-config.json```, and then run gulp again.

	
	