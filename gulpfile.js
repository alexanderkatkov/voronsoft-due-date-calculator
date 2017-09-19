/**
 * Get Plugins & Config
 * Gulp plugins are processed by 'gulp-load-plugins'.
 * Plugins not prefixed with "gulp-" such as 'path' or 'yargs' must be processed manually.
 */
// Gulp & gulp-plugins load
var gulp = require('gulp');
// set {DEBUG: true} to list plugins and their names
var autoPlugin = require('gulp-load-plugins')({/*DEBUG: true, */lazy: false});
// Manually load plugins not processed by gulp-load-plugins.
var manualPlugin = {
  'del':         require('del'),
  // 'mergeStream': require('merge-stream'),
  'path':        require('path'),
  // 'mozJpeg':     require('imagemin-mozjpeg'),
  // 'pngQuant':    require('imagemin-pngquant'),
  // 'svgo':        require('imagemin-svgo')
};
// Not proper working with gulp-load-plugins when is used into function
var gutil = require('gulp-util');
/**
 * Loading config file
 * Config file stores all main settings variables and helper functions for current project.
 */
var config = require('./gulpconfig')();
/**
 * Define project environment
 * To init build task switch environment from dev to build
 * CMD command: gulp {task name} --type build
 */
var env = gutil.env.type ? gutil.env.type : 'dev';

// SASS --> CSS task
gulp.task(
  'sass', ['cleanCss'], function() {
    consoleLog('Compiling SASS --> CSS; Environment: ' + env);
    return gulp.src(config.srcPath.sass)
      .pipe(autoPlugin.plumber({errorHandler: onError}))
      .pipe(autoPlugin.rigger())
      .pipe(autoPlugin.sourcemaps.init({loadMaps: true}))
      .pipe(autoPlugin.sass({
        errLogToConsole: true,
        outputStyle: 'expanded',
        precision: 10
      }))
      .pipe(autoPlugin.autoprefixer(config.autoprefixerSettings))
      .pipe(autoPlugin.groupCssMediaQueries()) // Combines Media Queries by dimension
      .pipe(autoPlugin.csscomb())
      .pipe(env === 'build' ? gulp.dest(config.buildPath.css) : gutil.noop())
      .pipe(env === 'build' ? autoPlugin.cleanCss() : gutil.noop())
      .pipe(env === 'build' ? autoPlugin.rename({suffix: '.min'}) : gutil.noop())
      .pipe(autoPlugin.sourcemaps.write('.'))
      .pipe(gulp.dest(config.buildPath.css))
      .pipe(autoPlugin.plumber.stop())
      .pipe(autoPlugin.notify({message: 'SASS --> CSS task complete', onLast: true}));
});

// LESS --> CSS task
gulp.task(
  'less', ['cleanCss'], function() {
    consoleLog('Compiling LESS --> CSS; Environment: ' + env);
    return gulp.src(config.srcPath.less)
      .pipe(autoPlugin.plumber({errorHandler: onError}))
      .pipe(autoPlugin.rigger())
      .pipe(autoPlugin.sourcemaps.init({loadMaps: true}))
      .pipe(autoPlugin.less())
      .pipe(autoPlugin.autoprefixer(config.autoprefixerSettings))
      .pipe(autoPlugin.groupCssMediaQueries()) // Combines Media Queries by dimension
      .pipe(autoPlugin.csscomb())
      .pipe(env === 'build' ? gulp.dest(config.buildPath.css) : gutil.noop())
      .pipe(env === 'build' ? autoPlugin.cleanCss() : gutil.noop())
      .pipe(env === 'build' ? autoPlugin.rename({suffix: '.min'}) : gutil.noop())
      .pipe(autoPlugin.sourcemaps.write('.'))
      .pipe(gulp.dest(config.buildPath.css))
      .pipe(autoPlugin.plumber.stop())
      .pipe(autoPlugin.notify({message: 'LESS --> CSS task complete', onLast: true}));
});

// JS Concatination Task
gulp.task(
  'js', ['cleanJs'], function() {
    consoleLog('Concat All JS files; Environment: ' + env);
    return gulp.src(config.srcPath.js)
      .pipe(autoPlugin.plumber({errorHandler: onError}))
      .pipe(autoPlugin.rigger())
      .pipe(autoPlugin.sourcemaps.init({loadMaps: true}))
      .pipe(env === 'build' ? gulp.dest(config.buildPath.js) : gutil.noop())
      .pipe(env === 'build' ? autoPlugin.uglify() : gutil.noop())
      .pipe(env === 'build' ? autoPlugin.rename({suffix: '.min'}) : gutil.noop())
      .pipe(autoPlugin.sourcemaps.write('.'))
      .pipe(gulp.dest(config.buildPath.js))
      .pipe(autoPlugin.plumber.stop())
      .pipe(autoPlugin.notify({message: 'Concat All JS files task complete', onLast: true}));
});

// JS Concatination Task
gulp.task(
  'img', ['cleanImg'], function() {
    consoleLog('Optimizing IMG files for production...');
    return gulp.src(config.srcPath.img)
      .pipe(autoPlugin.plumber({errorHandler: onError}))
			.pipe(autoPlugin.imagemin())
      .pipe(gulp.dest(config.buildPath.img))
      .pipe(autoPlugin.plumber.stop())
      .pipe(autoPlugin.notify({message: 'Optimizing IMG files completed', onLast: true}));
});

// Fonts Copy Task
gulp.task(
  'font', ['cleanFont'], function () {
    consoleLog('Copying FONT files for production...');
    return gulp.src(config.srcPath.font)
      .pipe(autoPlugin.plumber({errorHandler: onError}))
      .pipe(gulp.dest(config.buildPath.font))
      .pipe(autoPlugin.plumber.stop())
      .pipe(autoPlugin.notify({message: 'Copying FONT files completed', onLast: true}));
});

/**
 * Group of Clean tasks for build folders.
 */
// Clean: CSS
gulp.task(
  'cleanCss', function() {
    consoleLog('Cleaning CSS & MAP files at ' + config.buildPath.css);
    return manualPlugin.del(config.buildPath.css + '**/*.css');
});

// Clean: JS
gulp.task(
  'cleanJs', function() {
    consoleLog('Cleaning JS & MAP files at ' + config.buildPath.js);
    return manualPlugin.del(config.buildPath.js + '**/*.*');
});

// Clean: IMG
gulp.task(
  'cleanImg', function() {
    consoleLog('Cleaning IMG files at ' + config.buildPath.img);
    return manualPlugin.del(config.helperVars.imgBuildClean);
});

// Clean: FONT
gulp.task(
  'cleanFont', function() {
    consoleLog('Cleaning IMG files at ' + config.buildPath.font);
    return manualPlugin.del(config.buildPath.font + '**/*.*');
});

// Watch JS / SASS changes
gulp.task('watch', function() {
	gulp.watch(config.srcPath.sass, ['sass']);
	gulp.watch(config.srcPath.js, ['js']);
});

/**
 * Here we define custom helper functions for project.
 */
/**
 * Error function for plumber.
 * @param  object error Error object.
 *
 * @return void
 */
var onError = function(error) {
  gutil.beep();
  // console.log(error.message);
  consoleLog(error.message);
  this.emit('end');
};

// Console log multipurpose function using "gulp-util".
/**
 * Outputs standard console logs im more readable way.
 * @param  string, array msg Message or Array of messages to output.
 *
 * @return void
 */
function consoleLog(msg) {
  if (typeof (msg) === 'object') {
    for (var item in msg) {
      if (msg.hasOwnProperty(item)) {
        gutil.log(gutil.colors.green(msg[item]));
      }
    }
  } else {
    gutil.log(gutil.colors.green(msg));
  }
}
