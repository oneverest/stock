import webpack from 'webpack';
import chalk from 'chalk';
import { compilerPromise, logMessage, sleep } from './utils';
import rimraf from 'rimraf';
import paths from '../config/paths';
import getConfig from '../config/webpack';
import { choosePort } from 'react-dev-utils/WebpackDevServerUtils';
import nodemon from 'nodemon';
import fs from 'fs';
import puppeteer from 'puppeteer';

const webpackConfig = getConfig(process.env.NODE_ENV || 'development');

const HOST = process.env.HOST || 'http://localhost';

const generateStaticHtml = async () => {
  const PORT = await choosePort('localhost', 8505);

  process.env.PORT = String(PORT);

  const script = nodemon({
    script: `${paths.serverBuild}/server.js`,
    ignore: ['*'],
  });

  script.on('start', async () => {
    try {
      await sleep(10000);
      const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      });
      const page = await browser.newPage();
      await page.goto(`${HOST}:${PORT}`);
      const pageContent = await page.content();
      fs.writeFileSync(`${paths.clientBuild}/index.html`, pageContent);
      await browser.close();
      script.emit('quit');
    } catch (error) {
      script.emit('quit');
      console.log(error);
    }
  });

  script.on('exit', code => process.exit(code));
  script.on('crash', () => process.exit(1));
};

const watch = (compiler: webpack.Compiler, config: webpack.Configuration) => {
  compiler.watch({}, (errors, stats) => {
    if (!errors && !stats.hasErrors()) {
      console.log(stats.toString(config.stats));
      return;
    }

    console.error(chalk.red(stats.compilation.errors));
  });
};

const build = async () => {
  rimraf.sync(paths.clientBuild);
  rimraf.sync(paths.serverBuild);

  const [clientConfig, serverConfig] = webpackConfig;
  const webpackCompiler = webpack([clientConfig, serverConfig]);

  const clientCompiler = webpackCompiler.compilers.find(compiler => compiler.name === 'client');
  const serverCompiler = webpackCompiler.compilers.find(compiler => compiler.name === 'server');

  if (clientCompiler && serverCompiler) {
    const clientPromise = compilerPromise('client', clientCompiler);
    const serverPromise = compilerPromise('server', serverCompiler);
    watch(clientCompiler, clientConfig);
    watch(serverCompiler, serverConfig);

    try {
      await clientPromise;
      await serverPromise;
      await generateStaticHtml();
      logMessage('Done!', 'info');
    } catch (error) {
      logMessage(error, 'error');
    }
  }
};

build();
