const gulp = require('gulp')
const uglify = require('gulp-uglify-es').default
const rename = require('gulp-rename')
const stylus = require('gulp-stylus')
const concat = require('gulp-concat')
const browserSync = require('browser-sync').create();

const paths = {
    styles: {
        src: ['assets/stylus/*.styl','assets/stylus/**/*.styl'],
        dest: 'assets/css/'
    },
    scripts: {
        src: ['assets/js/components/*.js'],
        dest: ['assets/js']
    },
    html: {
        src: ['*.html']
    }
}


function styles(){
    return gulp.src(paths.styles.src)
        .pipe(stylus({
            compress: true,
        }))
        .pipe(concat('style.css'))
        .pipe(rename({
            basename: 'style',
            suffix: '.min'
        }))
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(browserSync.stream());
}

function scripts() {
    return gulp.src(paths.scripts.src, { sourcemaps: true })
      .pipe(uglify())
      .pipe(concat('main.min.js'))
      .pipe(gulp.dest(paths.scripts.dest))
      .pipe(browserSync.stream());
}

function watch() {
    browserSync.init({
        server: "./"
    });

    gulp.watch(paths.scripts.src, scripts);
    gulp.watch(paths.styles.src, styles);
    gulp.watch(paths.html.src).on('change', browserSync.reload);
}

const build = gulp.series(gulp.parallel(styles, scripts));

exports.build = build
exports.watch = watch;
exports.default = watch