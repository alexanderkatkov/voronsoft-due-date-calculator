/**
 * GULP config file.
 * All PATH variables are going here.
 */

module.exports = function () {
	'use strict';
	// Main Config variable
	//  * HINT: for styling purpose every folder path must end with "/" or filename and begin with "./" providing clear urls
	// ** HINT: There are some exceptions from upper rule

	return {
		'basePath': './',
		'vendorPath': './src/vendor/', // defined in .bowerrc file
		'buildPath': {
			'css': './assets/css/',
			'img': './assets/img/',
			'pngSprites': './assets/img/png-sprites/',
			'js': './assets/js/',
			'svg': './assets/img/svg/',
			'svgSprites': './assets/img/svg_sprites/',
			'font': './assets/fonts/'
		},
		'srcPath': {
			'img': ['./src/img/**/*.*', '!./src/img/png_sprites'],
			'pngSprites': './src/img/png_sprites/',
			'js': ['./src/js/voronsoft-due-date-calculator-admin.js', './src/js/voronsoft-due-date-calculator-vendor.js', './src/js/voronsoft-due-date-calculator-public.js'],
			'less': ['./src/less/style.less', './src/less/vendor.less'],
			'sass': ['./src/scss/voronsoft-due-date-calculator-admin.scss', './src/scss/voronsoft-due-date-calculator-public.scss'],
			'svg': './src/img/svg/**/*.svg',
			'svgSprites': './src/img/svg_sprites/',
			'font': './src/fonts/**/*.{scss,css,eot,ttf,woff,woff2,svg}',
		},
		'helperVars': {
			//IMG folder for clean IMG function
			'imgBuildClean': ['./img/**/*.*', '!./img/png_sprites/**/*.*'],
			// here we put SCSS mixins for PNG sprites
			'pngSpriteSassPath': './src/sass/module/png_sprites/',
			// clear URL to use it inside CSS files
			'pngSpriteImgPath': '/img/png-sprites'
		},
		// Browser definitions for autoprefixer
		'autoprefixerSettings': [
			'> 3%',
			'ie >= 9',
			'iOS >= 7',
			'Android >= 4.1',
			'bb >= 10'
		],
	};
};
