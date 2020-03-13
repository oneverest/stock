import rimraf from 'rimraf';
import chalk from 'chalk';
import getConfig from '../config/webpack';
import paths from '../config/paths';
import webpack from 'webpack';
import { logMessage, compilerPromise } from './utils';

const webPackConfig = getConfig(process.env.NODE_ENV || 'development');

const build = async () => {
  rimraf.sync(paths.clientBuild);
  rimraf.sync(paths.serverBuild);

  const [clientConfig] = webPackConfig;
  const webpackCompiler = webpack([clientConfig]);

  const name = 'client';
  const clientComipler = webpackCompiler.compilers.find(compiler => compiler.name === name);

  if (clientComipler) {
    const clientPromise = compilerPromise(name, clientComipler);

    clientComipler.watch({}, (error, stats) => {
      if (!error && !stats.hasErrors()) {
        console.log(stats.toString(clientConfig.stats));
        return;
      }

      console.log(chalk.red(stats.compilation.errors));
    });

    try {
      await clientPromise;
      logMessage('Done!', 'info');
      process.exit();
    } catch (error) {
      logMessage(error, 'error');
    }
  }
};

build();
