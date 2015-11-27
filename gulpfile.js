var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var notify = require('gulp-notify');
var uglify = require('gulp-uglify');
var htmlreplace = require('gulp-html-replace');
var del = require('del');


function errorHandler(err) {
  console.log(err.toString());
  this.emit('end');
}
 
gulp.task('build', function () {
  return browserify({
    entries: 'src/app.js',
    extensions: ['.js'],
    debug: true
  })
  .transform(babelify, { sourceMap: true, presets: ['es2015']})
  .bundle()
  .on('error', notify.onError("Error: <%= error.message %>"))
  .pipe(source('app-debug.js'))
  .pipe(gulp.dest('build'));
});

gulp.task('build:prod', function () {
  return browserify({
    entries: 'src/app.js',
    extensions: ['.js'],
    debug: false
  })
  .transform(babelify, { sourceMap: false, presets: ['es2015']})
  .bundle()
  .on('error', notify.onError("Error: <%= error.message %>"))
  .pipe(source('app-release.js'))
  .pipe(buffer())
  .pipe(uglify())
  .pipe(gulp.dest('build'));
});

gulp.task('clean:export', function(){
  return del(['./export/**/*']);
});

gulp.task('export', ['clean:export','build:prod'],function(){
  // Copy dist files to export
  gulp.src(['build/app-release.js'])
  .pipe(gulp.dest('./export/'));

  // Copy resource files to export
  gulp.src(['resources/**/*'])
  .pipe(gulp.dest('./export/resources/'));

  // copy index.html, by inserting the prod app js file
  gulp.src('index.html')
  .pipe(htmlreplace({
    'js': 'app-release.js'
  }))
  .pipe(gulp.dest('./export/'));
});

gulp.task('watch', function() {
  gulp.watch(['src/**/*.js'], ['build']);
});
 
gulp.task('default', ['build']);
