const wp = require('@cypress/webpack-preprocessor')
const pathsPlugin = require('tsconfig-paths-webpack-plugin');
const path = require('path');
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config

  // TODO: make this require('@nrwl/cypress/plugins/preprocessor');
  on('file:preprocessor',
    wp({
      webpackOptions: {
        resolve: {
          extensions: ['.ts', '.js'],
          plugins: [
            new pathsPlugin({
              configFile: path.join(__dirname, '../../tsconfig.e2e.json'),
              extensions: [".ts", ".js"]
            })
          ]
        },
        module: {
          rules: [
            {
              test: /\.ts$/,
              loader: 'ts-loader',
              options: {
                configFile: path.join(__dirname, '../../tsconfig.e2e.json'),
                // https://github.com/TypeStrong/ts-loader/pull/685
                experimentalWatchApi: true
              }
            },
          ],
        }
      }
    })
  );
};
