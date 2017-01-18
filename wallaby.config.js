var babel = require('babel-core');

module.exports = function(wallaby) {
  return {
    files: [
      'package.json',
      'src/**/*.js',
      '!src/**/*.test.js',
      '!src/client/**/*'
    ],

    tests: [
      'src/**/*.test.js'
    ],

    compilers: {
      '**/*.js': wallaby.compilers.babel({
        babel: babel,
        plugins: [
          'transform-es2015-modules-commonjs',
          'transform-async-to-generator'
        ]
      })
    },

    env: {
      type: 'node',
      runner: 'node',
      params: {
        env: // @see https://wallabyjs.com/docs/config/runner.html
        'NODE_ENV=test;' +
        'PORT=4001;' +
        'APP_NAME=UFO_TEST;' +
        'LOG_LEVEL=OFF;'
      }
    },

    testFramework: 'mocha@2.1.0'
  };
};
