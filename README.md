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

export const dev = gulp.series([...]);
```

### Gulp Commands

-   src() -> what file
-   pipe() -> do plugin or send it to the destination
-   watch() -> watch file changes
-   series() -> do tasks synchronously
-   parallel() -> do tasks simultaneously

### Gulp Plugins

-   gulp-webserver({livereload: true, open: true}) -> live webserver
-   gulp-pug -> pug to html
