import gulp from 'gulp';
import imagemin from 'gulp-imagemin';
// import flatten from 'gulp-flatten';
import gulpif from 'gulp-if';
import config from './config';

export const images = (cb) => {
  gulp.src('app/images/**/*')
    .pipe(gulpif(config.isProd && config.imagesOptimize, imagemin()))
    .pipe(gulp.dest(`${config.dist}/assets/images/`));

  // gulp.src('app/blocks/**/**/*.(jpg|jpeg|webp|svg|png)')
  //   .pipe(gulpif(config.isProd && config.imagesOptimize, imagemin()))
  //   .pipe(flatten())
  //   .pipe(gulp.dest(`${config.dist}/assets/images`));

  cb();
};
