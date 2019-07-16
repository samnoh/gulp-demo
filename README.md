# Gulp Demo

-   [Gulp](https://gulpjs.com/)

## TIL

### Gulp

-   Install

```Shell
npm install -g gulp-cli
npm install --save-dev gulp
```

-   gulpfile.js

```JavaScript
import gulp from 'gulp';
import dummy from 'dummy';

const test = () =>
    gulp
        .src(...)
        .pipe(dummy())
        .pipe(gulp.dest(...));

export const dev = gulp.series([test]);
```

### Gulp Commands

-   src() -> what files
-   dest() -> build destination
-   pipe() -> do plugin or send it to the build destination
-   watch() -> watch file changes
-   series() -> do tasks synchronously
-   parallel() -> do tasks simultaneously

### Gulp Plugins

-   gulp-webserver({livereload: true, open: true}) -> live webserver
-   gulp-pug -> pug to html
-   gulp-image -> compress images
-   gulp-sass -> scss to css
-   gulp-bro -> babelify js
-   gulp-gh-pages -> publish contents to GitHub page
