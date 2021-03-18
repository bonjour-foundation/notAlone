const gulp = require('gulp');

const replace = require('replace');
const removeCode = require('gulp-remove-code');

const replaceFiles = ['./src/environments/environment.prod.ts'];

const del = require('del');

gulp.task('pwa', (done) => {

    del(['./www/']);

    gulp.src('./src/index.html')
        .pipe(removeCode({ pwa: true }))
        .pipe(gulp.dest('./src/'));

    replace({
        regex: "cordova: true",
        replacement: "cordova: false",
        paths: replaceFiles,
        recursive: false,
        silent: false
    });

    done();

});

gulp.task('cordova', (done) => {

    del(['./www/']);

    gulp.src('./src/index.html')
        .pipe(removeCode({ cordova: true }))
        .pipe(gulp.dest('./src/'));

    done();

});
