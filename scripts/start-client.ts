import express from 'express';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import getConfig from '../config/webpack';
import webpack from 'webpack';
import { compilerPromise, logMessage } from './utils';
import paths from '../config/paths';
import chalk from 'chalk';

const webpackConfig = getConfig(process.env.NODE_ENV || 'development');

const app = express();
const PORT = process.env.PORT || 8500;
const DEVSERVER_HOST = process.env.DEVSERVER_HOST || 'http://localhost';

const start = async () => {
  const [clientConfig] = webpackConfig;
  clientConfig.entry.bundle = [
    `webpack-hot-middleware/client?path=${DEVSERVER_HOST}:${PORT}/__webpack_hmr`,
    ...clientConfig.entry.bundle,
  ];

  clientConfig.output.hotUpdateMainFilename = 'updates/[hash].hot-update.json';
  clientConfig.output.hotUpdateChunkFilename = 'updates/[id].[hash].hot-update.js';

  const webpackCompiler = webpack([clientConfig]);
  const clientCompiler = webpackCompiler.compilers.find(compiler => compiler.name === 'client') as webpack.Compiler;
  if (!clientCompiler) {
    process.exit(1);
  }
  const clientPromise = compilerPromise('client', clientCompiler);

  const watchOptions: webpack.Options.WatchOptions = {
    ignored: /node_modules/,
    stats: clientConfig.stats,
  } as webpack.WatchOptions;

  app.use((_req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });

  app.use(
    webpackDevMiddleware(clientCompiler, {
      publicPath: clientConfig.output.publicPath,
      stats: clientConfig.stats,
      watchOptions,
    }),
  );

  app.use(webpackHotMiddleware(clientCompiler));
  app.use('*', express.static(paths.clientBuild));

  try {
    await clientPromise;
    app.listen(PORT, () => {
      console.log(
        `[${new Date().toISOString()}]`,
        chalk.blue(`App is running: ${process.env.HOST || 'http://localhost'}:${PORT}`),
      );
    });
  } catch (error) {
    logMessage(error, 'error');
  }
};

start();
