const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const {
  // eslint-disable-next-line no-unused-vars
  src, dest, watch, series, parallel,
} = require('gulp');
const babel = require('gulp-babel');
const eslint = require('gulp-eslint');
const uglify = require('gulp-uglify');
const log = require('fancy-log');
sass.compiler = require('node-sass');
// const gulpSvelte = require('gulp-svelte');

const paths = {
  styles: {
    src: 'scss/**/*.scss',
    dest: 'build/css/',
    autop: 'build/css/autop/',
  },
  scripts: {
    src: 'js/**/*.js',
    dest: 'build/js/',
  },
};

function styles() {
  return gulp.src(paths.styles.src)
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(concat('style.css'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.styles.dest));
}

function jsCompile() {
  return gulp.src(paths.scripts.src)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.scripts.dest))
    .on('error', log);
}

function watchFile() {
  gulp.watch(paths.styles.src, styles);
  // gulp.watch(paths.scripts.src, combile_libs_js);
  gulp.watch(paths.scripts.src, jsCompile);
}

// function build() {
//   styles();
//   //  combile_libs_js();
//   jsCompile();
// }

exports.watch = watchFile;
// exports.js = js_compile;
exports.build = gulp.parallel(styles, jsCompile);
