import gulp from 'gulp';
import webpack from 'webpack-stream';
import rimraf from 'rimraf';

const $ = require('gulp-load-plugins')();

import config from './config';

gulp.task('clean', cb => {
  rimraf(config.dist, cb);
});

gulp.task('static', () =>
  gulp.src(config.static.from).pipe(gulp.dest(config.static.to)),
);

gulp.task('css', () =>
  gulp
    .src(config.css.from)
    .pipe($.if(config.isDev, $.sourcemaps.init()))
    .pipe($.sass(config.css.sassConfig).on('error', $.sass.logError))
    .pipe($.if(config.isDev, $.sourcemaps.write()))
    .pipe($.autoprefixer(config.css.prefixes))
    .pipe($.if(config.isProd, $.cssnano()))
    .pipe(gulp.dest(config.css.to))
    .pipe($.connect.reload()),
);

gulp.task('html', () =>
  gulp
    .src(config.html.from)
    .pipe(
      $.ejs(
        config.html.ejsConfig.data,
        config.html.ejsConfig.options,
        config.html.ejsConfig.settings,
      ).on('error', $.util.log),
    )
    .pipe($.htmlmin(config.html.minification))
    .pipe(gulp.dest(config.html.to)),
);

gulp.task('js', () =>
  gulp
    .src(config.ts.from)
    .pipe(webpack(config.ts.webpack))
    .pipe(gulp.dest(config.ts.to)),
);

gulp.task('server', ['build'], () => {
  $.connect.server({
    port: 5000,
    root: 'dist',
    livereload: true,
  });
});

gulp.task('livereload', ['server'], () =>
  $.watch(config.watch.all).pipe($.connect.reload()),
);

gulp.task('watch', ['build'], cb => {
  gulp.watch(config.watch.scss, ['css']);
  gulp.watch(config.watch.ejs, ['html']);
  gulp.watch(config.watch.static, ['static']);
});

gulp.task('build', ['clean'], () => gulp.start('html', 'css', 'js', 'static'));
gulp.task('prod', ['build']);
gulp.task('dev', ['build', 'server', 'livereload', 'watch']);

gulp.task('default', ['dev']);
