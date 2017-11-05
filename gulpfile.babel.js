import gulp from 'gulp';
import webpack from 'webpack-stream';

const $ = require('gulp-load-plugins')();

import config from './config';

gulp.task('clear', cb => $.rimraf(config.dist, cb));

gulp.task('server', () => {
  const server = $.liveServer.static(config.dist, 5000);
  server.start();

  gulp.watch(config.watch.all, file => {
    server.notify.apply(server, [file]);
  });
});

gulp.task('css', () =>
  gulp
    .src(config.css.from)
    .pipe($.if(config.isDev, $.sourcemaps.init()))
    .pipe($.sass(config.css.sassConfig).on('error', $.sass.logError))
    .pipe($.if(config.isDev, $.sourcemaps.write()))
    .pipe($.autoprefixer(config.css.prefixes))
    .pipe($.if(config.isProd, $.cssnano()))
    .pipe(gulp.dest(config.css.to)),
);

gulp.task('html', () =>
  gulp
    .src(config.html.from)
    .pipe(
      $.ejs(
        config.html.ejs.data,
        config.html.ejs.options,
        config.html.ejs.settings,
      ).on('error', $.util.log),
    )
    .pipe($.htmlmin(config.html.htmlmin))
    .pipe(gulp.dest(config.html.to)),
);

gulp.task('js', () =>
  gulp
    .src(config.ts.from)
    .pipe(webpack(config.ts.webpack))
    .pipe(gulp.dest(config.ts.to)),
);

gulp.task('watch', cb => {
  gulp.watch(config.watch.scss, ['css']);
  gulp.watch(config.watch.ejs, ['html']);
});

gulp.task('build', ['clear', 'html', 'css', 'js']);
gulp.task('prod', ['build']);
gulp.task('dev', ['build', 'server', 'watch']);

gulp.task('default', ['dev']);
