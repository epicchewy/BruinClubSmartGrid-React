var gulp = require('gulp');
var browserSync = require('browser-sync');
var nodemon = require('gulp-nodemon');
var browserify = require('browserify');
var reactify = require('reactify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');

gulp.task('default', ['browser-sync'], function () {
	var bundler = browserify({
		entries: ['./app/src/app.js'], // Only need initial file, browserify finds the dependencies
		transform: [reactify], // We want to convert JSX to normal javascript <--> !!This is pretty important!!
		debug: true, // Gives us sourcemapping
		cache: {},
		packageCache: {},
		fullPaths: true
	});

	var watcher = watchify(bundler);

	return watcher
		.on('update', function() { // When any files update
			var updateStart = Date.now();
			console.log('Updating!');
			watcher.bundle() // Create new bundle that uses the cache for high performance
				.on('error', function(err){
		      console.log(err.message);
		    })
				.pipe(source('app.js'))
				// This is where you add uglifying etc.
				.pipe(gulp.dest('./app/js'));
			console.log('Updated!', (Date.now() - updateStart) + 'ms');
		})
		.bundle() // Create the initial bundle when starting the task
		.on('error', function(err){
      console.log(err.message);
    })
		.pipe(source('app.js'))
		.pipe(gulp.dest('./app/js'));

});

gulp.task('browser-sync', ['nodemon'], function() {
	browserSync.init(null, {
		proxy: "http://localhost:8000",
        files: ["public/**/*.*"],
        browser: "google chrome",
        port: 7000,
	});
});
gulp.task('nodemon', function (cb) {
	var started = false;
	
	return nodemon({
		script: 'server.js'
	}).on('start', function () {
		if (!started) {
			cb();
			started = true; 
		} 
	});
});