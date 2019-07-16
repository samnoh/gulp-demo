import del from 'del';
import gulp from 'gulp';
import gulpPug from 'gulp-pug';
import gulpWebserver from 'gulp-webserver';
import gulpImage from 'gulp-image';
import gulpSass from 'gulp-sass';
import gulpAutoprefixer from 'gulp-autoprefixer';
import gulpCsso from 'gulp-csso';
import gulpBro from 'gulp-bro';
import babelify from 'babelify';
import gulpGhPages from 'gulp-gh-pages';

gulpSass.compiler = require('node-sass');

// Routes
const routes = {
    build: {
        src: 'build/**/*',
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
    },
    js: {
        watch: 'src/js/**/*.js',
        src: 'src/js/main.js',
        dest: 'build/js'
    },
    ghPages: {
        cache: '.publish'
    }
};

// Prepare
const clean = () => del([routes.build.dest, ghPages.cache]);

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
        .src(routes.js.src)
        .pipe(
            gulpBro({
                transform: [
                    babelify.configure({ presets: ['@babel/preset-env'] }),
                    ['uglifyify', { global: true }]
                ]
            })
        )
        .pipe(gulp.dest(routes.js.dest));

const ghPagesDeploy = () => gulp.src(routes.build.src).pipe(gulpGhPages());

// Live
const webserver = () =>
    gulp.src('build').pipe(gulpWebserver({ livereload: true, open: true, port: 8000 }));

const watch = () => {
    gulp.watch(routes.pug.watch, pug);
    gulp.watch(routes.img.src, img);
    gulp.watch(routes.sass.watch, sass);
    gulp.watch(routes.js.watch, js);
};

// Run
const prepare = gulp.series([clean, img]);
const assets = gulp.series([pug, sass, js]);
const live = gulp.parallel([webserver, watch]);

export const build = gulp.series([prepare, assets]);
export const dev = gulp.series([build, live]);
export const deploy = gulp.series([build, ghPagesDeploy, clean]);
