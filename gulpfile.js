const { src, dest, watch, series } = require('gulp');
const imagemin = require('gulp-imagemin');
const imagewebp = require('gulp-webp');
const del = require('del');


function optimizeImage() {
  return src('src/images/**/*.{jpg,png}')
    .pipe(imagemin([
      imagemin.mozjpeg({ quality: 80, progressive: true }),
      imagemin.optipng({ optimizationLevel: 2 }),
    ]))
    .pipe(dest('dist/images/optimized/'))
}

function webpImage() {
  return src('dist/images/optimized/**/*.{jpg,png}')
    .pipe(imagewebp())
    .pipe(dest('dist/images/webp/'))
}

function clean() {
  return del(['dist/**', '!dist']);
}

function watchTask() {
  watch('src/images/**/*{jpg,png}', optimizeImage);
  watch('dist/images/**/*{jpg,png}', webpImage);
}

exports.default = series(
  clean,
  optimizeImage,
  webpImage,
  watchTask
)
