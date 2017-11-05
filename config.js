const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const isDev = process.env.NODE_ENV === 'dev';
const isProd = !isDev;

const src = './src';
const dist = './dist';

export default {
  src,
  dist,
  isDev,
  isProd,
  html: {
    from: `${src}/pages/**/*.ejs`,
    to: dist,
    minification: { collapseWhitespace: true, removeComments: true },
    ejsConfig: {
      data: {
        message: 'test',
      },
      options: {},
      settings: {
        ext: '.html',
      },
    },
  },
  css: {
    from: `${src}/main.scss`,
    to: dist,
    sassConfig: {
      outputStyle: 'compressed',
    },
    prefixes: {
      browsers: ['last 3 versions', '> 1%'],
    },
  },
  ts: {
    from: `${src}/main.ts`,
    to: dist,
    webpack: {
      output: { filename: '[name].js' },
      watch: isDev,
      devtool: isDev ? 'inline-source-map' : false,
      module: {
        loaders: [{ test: /\.ts(x?)$/, loader: 'babel-loader!ts-loader' }],
      },
      plugins: isProd ? [new UglifyJSPlugin()] : [],
    },
  },
  static: {
    from: `${src}/static/**`,
    to: dist,
  },
  watch: {
    all: `${dist}/**/*`,
    scss: `${src}/**/*.scss`,
    ejs: `${src}/**/*.ejs`,
    static: `${src}/static/**/*`,
  },
};
