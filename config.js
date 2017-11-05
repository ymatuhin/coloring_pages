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
    ejs: {
      data: {
        message: 'test',
      },
      options: {},
      settings: {
        ext: '.html',
      },
    },
    htmlmin: { collapseWhitespace: true, removeComments: true },
    from: `${src}/**/*.ejs`,
    to: dist,
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
  watch: {
    all: `${dist}/**/*.{css,html,js,png,svg,jpg,gif}`,
    scss: `${src}/**/*.scss`,
    ejs: `${src}/**/*.ejs`,
  },
};
