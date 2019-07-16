import gulp from 'gulp';
import gulpPug from 'gulp-pug';
import del from 'del';

// Prepare
const clean = () => del(['build/']);

// Assets
const routes = {
    pug: {
        src: 'src/*.pug',
        dest: 'build'
    }
};

const pug = () =>
    gulp
        .src(routes.pug.src)
        .pipe(gulpPug())
        .pipe(gulp.dest(routes.pug.dest));

// Run
const prepare = gulp.series([clean]);
const assets = gulp.series([pug]);

export const dev = gulp.series([prepare, assets]);
// export const build = gulp.series([]);
