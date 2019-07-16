import gulp from 'gulp';
import gulpPug from 'gulp-pug';
import gulpWebserver from 'gulp-webserver';
import del from 'del';

// Routes
const routes = {
    build: {
        dest: 'build'
    },
    pug: {
        watch: 'src/**/*.pug',
        src: 'src/*.pug',
        dest: 'build'
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

// Live
const webserver = () =>
    gulp.src('build').pipe(gulpWebserver({ livereload: true, open: true, port: 8000 }));

const watch = () => {
    gulp.watch(routes.pug.watch, pug);
};

// Run
const prepare = gulp.series([clean]);
const assets = gulp.series([pug]);
const live = gulp.parallel([webserver, watch]);

export const dev = gulp.series([prepare, assets, live]);
// export const build = gulp.series([]);
