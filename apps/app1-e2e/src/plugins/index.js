const wp = require('@cypress/webpack-preprocessor');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const webpack = require('webpack');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
console.log(require('clean-webpack-plugin'));
const sassGlobImporter = require('node-sass-globbing');
const LiveReloadPlugin = require('webpack-livereload-plugin');
const MiniCSSExtractWebpackPlugin = require('mini-css-extract-plugin');
const chalk = require('chalk');

const env = process.env.NODE_ENV === 'production' ? 'production' : 'development'
const args = process.argv.slice(2)
const liveReloadEnabled = !args.includes('--no-livereload')
const watchModeEnabled = args.includes('--watch') || args.includes('-w')
// opt out of livereload with arg --no-livereload
if (liveReloadEnabled && watchModeEnabled) console.log(chalk.gray(`\nLive Reloading is enabled. use ${chalk.bold('--no-livereload')} to disable`))
process.env.NODE_ENV = env
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
        mode: 'none',
        node: {
          fs: 'empty',
          child_process: 'empty',
          net: 'empty',
          tls: 'empty',
          module: 'empty'
        },
        resolve: {
          extensions: ['.ts', '.js', '.jsx', '.tsx', '.coffee', '.scss', '.json'],
          plugins: [
            new TsconfigPathsPlugin({
      configFile: path.join(__dirname, '../../tsconfig.e2e.json'),
      extensions: ['.ts', '.js', '.jsx', '.tsx', '.coffee', '.scss', '.json']
    })
          ]
        },

        stats: {
          errors: true,
          warningsFilter: /node_modules\/mocha\/lib\/mocha.js/,
          warnings: true,
          all: false,
          builtAt: true,
          colors: true,
          modules: true,
          maxModules: 20,
          excludeModules: /main.scss/,
          timings: true,
        },

        module: {
          rules: [
            {
              test: /\.coffee/,
              exclude: /node_modules/,
              use: {
                loader: require.resolve('coffee-loader'),
              },
            },
            {
              test: /\.(ts|js|jsx|tsx)$/,
              exclude: /node_modules/,
              use: {
                loader: require.resolve('babel-loader'),
                options: {
                  plugins: [
                    // "istanbul",
                    [require.resolve('@babel/plugin-proposal-decorators'), { legacy: true }],
                    [require.resolve('@babel/plugin-proposal-class-properties'), { loose: true }],
                  ],
                  presets: [
                    require.resolve('@babel/preset-env'),
                    require.resolve('@babel/preset-react'),
                    require.resolve('@babel/preset-typescript')
                  ],
                  babelrc: false,
                },
              },
            },
            {
              test: /\.s?css$/,
              exclude: /node_modules/,
              use: [
                { loader: MiniCSSExtractWebpackPlugin.loader },
                {
                  loader: require.resolve('css-loader'),
                  options: {
                    // sourceMap: true,
                    modules: false,
                  },
                }, // translates CSS into CommonJS
                {
                  loader: require.resolve('resolve-url-loader')
                },
                {
                  loader: require.resolve('sass-loader'),
                  options: {
                    sourceMap: true,
                    importer: function (...args) {
                      args[0] = args[0].replace(/\\/g, '/')
                      args[1] = args[1].replace(/\\/g, '/')
                      return sassGlobImporter.apply(this, args)
                    },
                  },
                }, // compiles Sass to CSS, using Node Sass by default
              ],
            },
            {
              test: /\.(eot|svg|ttf|woff|woff2)$/,
              use: [
                {
                  loader: require.resolve('file-loader'),
                  options: {
                    name: './fonts/[name].[ext]',
                  },
                },
              ],
            },
            {
              test: /\.(png)$/,
              use: [
                {
                  loader: require.resolve('file-loader'),
                  options: {
                    name: './img/[name].[ext]',
                  },
                },
              ],
            },
          ],
        },

        optimization: {
          usedExports: true,
          providedExports: true,
          sideEffects: true,
          namedChunks: true,
          namedModules:true,
          removeAvailableModules: true,
          mergeDuplicateChunks: true,
          flagIncludedChunks: true,
          removeEmptyChunks: true,
        },

        bail: true,

        plugins: [
          new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
          new MiniCSSExtractWebpackPlugin(),

          // Enable source maps / eval maps
          // 'EvalDevtoolModulePlugin' is used in development
          //    because it is fast and maps to filenames while showing compiled source
          // 'SourceMapDevToolPlugin' is used in production for the same reasons as 'eval', but it
          //    shows full source and does not cause crossorigin errors like 'eval' (in Chromium < 63)
          // files will be mapped like: `cypress://../driver/cy/commands/click.coffee`
          env === 'production' ?
            new webpack.SourceMapDevToolPlugin({
              moduleFilenameTemplate: 'cypress://[namespace]/[resource-path]',
              fallbackModuleFilenameTemplate: 'cypress://[namespace]/[resourcePath]?[hash]'
            }) :
            // @ts-ignore
            new webpack.EvalDevToolModulePlugin({
              moduleFilenameTemplate: 'cypress://[namespace]/[resource-path]',
              fallbackModuleFilenameTemplate: 'cypress://[namespace]/[resourcePath]?[hash]'
            }),

          ...(liveReloadEnabled ? [new LiveReloadPlugin({ appendScriptTag: 'true', port: 0, })]: []),
        ],

        cache: true,

      }
    })
  );
};
