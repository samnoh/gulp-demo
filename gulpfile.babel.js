import del from 'del';
import gulp from 'gulp';
import gulpPug from 'gulp-pug';
import gulpWebserver from 'gulp-webserver';
import gulpImage from 'gulp-image';
import gulpSass from 'gulp-sass';
import gulpAutoprefixer from 'gulp-autoprefixer';
import gulpCsso from 'gulp-csso';

gulpSass.compiler = require('node-sass');

// Routes
const routes = {
    build: {
        dest: 'build'
    },
    pug: {
        watch: 'src/**/*.pug',
        src: 'src/*.pug',
        dest: 'build'
    },
    img: {
        src: 'src/img/*',
        dest: 'build/img'
    },
    sass: {
        watch: 'src/scss/**/*.scss',
        src: 'src/scss/style.scss',
        dest: 'build/css'
    }
};

// Prepare
const clean = () => del([routes.build.dest]);

// Plugins
const pug = () =>
    gulp
        .src(routes.pug.src)
        .pipe(gulpPug())
        .pipe(gulp.dest(routes.pug.dest));

const img = () =>
    gulp
        .src(routes.img.src)
        .pipe(gulpImage())
        .pipe(gulp.dest(routes.img.dest));

const sass = () =>
    gulp
        .src(routes.sass.src)
        .pipe(gulpSass().on('error', gulpSass.logError))
        .pipe(gulpAutoprefixer({ overrideBrowserslist: ['last 2 versions'] }))
        .pipe(gulpCsso())
        .pipe(gulp.dest(routes.sass.dest));

const js = () =>
    gulp
        .src()
        .pipe()
        .pipe();

// Live
const webserver = () =>
    gulp.src('build').pipe(gulpWebserver({ livereload: true, open: true, port: 8000 }));

const watch = () => {
    gulp.watch(routes.pug.watch, pug);
    gulp.watch(routes.img.src, img);
    gulp.watch(routes.sass.watch, sass);
};

// Run
const prepare = gulp.series([clean, img]);
const assets = gulp.series([pug, sass]);
const live = gulp.parallel([webserver, watch]);

export const dev = gulp.series([prepare, assets, live]);
// export const build = gulp.series([]);
