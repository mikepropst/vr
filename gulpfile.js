var gulp = require('gulp'),
	less = require('gulp-less'),
	jade = require('gulp-jade'),
	cssmin = require('gulp-cssmin'),
	del = require('del'),
	connect = require('gulp-connect');


// Server
gulp.task('connect', function() {
  connect.server({
    root: 'dist',
    livereload: true
  });
});

// watcher
gulp.task('watch',['connect'],function(){
	gulp.watch("./src/jade/**/*",['jade']);
});

//Jade templates
gulp.task('jade',function(){
	gulp.src("./src/jade/*.jade")
	.pipe(jade())
	.pipe(gulp.dest("./dist"))
	.pipe(connect.reload());
});

//Clean dist
gulp.task('cleaner',function(){
	del("./dist");
});

//move images and scripts
gulp.task('movestuff',function(){
	gulp.src(["./src/js/**/*","./src/img/**/*","./src/fonts/**/*"],{
		base: "src"
	})
	.pipe(gulp.dest("./dist/"));
});

// Compile Less and Minify CSS
gulp.task('less',function(){
	gulp.src("./src/less/vr.less")
	.pipe(less())
	.pipe(cssmin())
	.pipe(connect.reload())
	.pipe(gulp.dest("./dist/css/"));
});

// DO EEEEET
gulp.task('default',['cleaner','movestuff','jade','less'], function() {
  console.log("I did that shit!!");
});