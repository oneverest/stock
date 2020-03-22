import rimraf from 'rimraf';
import chalk from 'chalk';
import getConfig from '../config/webpack';
import paths from '../config/paths';
import webpack from 'webpack';
import { logMessage, compilerPromise } from './utils';

const webPackConfig = getConfig(process.env.NODE_ENV || 'development');

const build = async () => {
  rimraf.sync(paths.cliBuild);

  const [clientConfig, serverConfig, cliConfig] = webPackConfig;
  const webpackCompiler = webpack([cliConfig]);

  const name = 'cli';
  const cliCompiler = webpackCompiler.compilers.find(compiler => compiler.name === name);

  if (cliCompiler) {
    const cliPromise = compilerPromise(name, cliCompiler);

    cliCompiler.watch({}, (error, stats) => {
      if (!error && !stats.hasErrors()) {
        console.log(stats.toString(cliConfig.stats));
        return;
      }

      console.log(chalk.red(stats.compilation.errors));
    });

    try {
      await cliPromise;
      logMessage('Done!', 'info');
      process.exit();
    } catch (error) {
      logMessage(error, 'error');
    }
  }
};

build();
