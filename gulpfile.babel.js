'use strict';

import plugins       from 'gulp-load-plugins';
import browser       from 'browser-sync';
import gulp          from 'gulp';
import yaml          from 'js-yaml';
import fs            from 'fs';
import webpackStream from 'webpack-stream';
import webpack2      from 'webpack';
import named         from 'vinyl-named';
import yargs         from 'yargs';
import rimraf        from 'rimraf';


// Load all Gulp plugins into one variable
const $ = plugins();

// Check for --production flag
const PRODUCTION = !!(yargs.argv.production);


gulp.task('build',
 gulp.series(clean, gulp.parallel(sass, javascript, html, images)));

// Build the site, run the server, and watch for file changes
gulp.task('default',
  gulp.series('build', server, watch));




const { COMPATIBILITY, PORT, PATHS } = loadConfig();


function loadConfig() {
    let ymlFile = fs.readFileSync('config.yml', 'utf8');
    return yaml.load(ymlFile);
}


// Delete the "dist" folder
// This happens every time a build starts
function clean(done) {
  rimraf(PATHS.dist, done);
}



// Compile Sass into CSS
// In production, the CSS is compressed
function sass() {
  return gulp.src(PATHS.sassentrie)
    .pipe($.sourcemaps.init())
    .pipe($.sass({
      // includePaths: PATHS.sass
    })
      .on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: COMPATIBILITY
    }))
    .pipe(gulp.dest(PATHS.dist + '/assets/css'))
    .pipe(browser.reload({ stream: true }));
}


let webpackConfig = {
  module: {
    rules: [
      {
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
}
// Combine JavaScript into one file
// In production, the file is minified
function javascript() {
  return gulp.src(PATHS.entries)
    .pipe(named())
    .pipe($.sourcemaps.init())
    .pipe(webpackStream(webpackConfig, webpack2))
    // .pipe($.if(PRODUCTION, $.uglify()
    //   .on('error', e => { console.log(e); })
    // ))
    // .pipe($.if(!PRODUCTION, $.sourcemaps.write()))
    // .pipe($.babel({
    //     presets: ['env']
    // }))
    .pipe(gulp.dest(PATHS.dist + '/assets/js'));
}


// Copy images to the "dist" folder
// In production, the images are compressed
function images() {
  return gulp.src('src/assets/img/**/*')
    .pipe($.if(PRODUCTION, $.imagemin({
      progressive: true
    })))
    .pipe(gulp.dest(PATHS.dist + '/assets/img'));
}


// Copy images to the "dist" folder
// In production, the images are compressed
function html() {
  return gulp.src('src/**/*.html')
    .pipe($.if(PRODUCTION, $.htmlmin({
      collapseWhitespace: true
    })))
    .pipe(gulp.dest(PATHS.dist));
}


// Start a server with BrowserSync to preview the site in
function server(done) {
  browser.init({
    server: PATHS.dist,
    port: PORT,
    https: true
  });
  done();
}


function copyHtml() {
  return gulp.src('src/index.html').pipe(gulp.dest(PATHS.dist));
}



// Watch for changes to static assets, pages, Sass, and JavaScript
function watch() {
  gulp.watch('src/**/*.html').on('all', gulp.series(copyHtml, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', sass);
  gulp.watch('src/assets/js/**/*.js').on('all', gulp.series(javascript, browser.reload));
}
