import paths from '../config/paths';
import nodemon from 'nodemon';
import { logMessage } from './utils';
import envBuilder from '../config/env';

require('dotenv').config();

const env = envBuilder();
console.log(env);

const script = nodemon({
  args: process.argv.slice(2),
  script: `${paths.cliBuild}/cli.js`,
  ignore: ['src', 'scripts', 'config', './*.*', 'build/client', '**/tmp'],
  delay: 200,
});

script.on('restart', () => {
  logMessage('Server side app has been restarted.', 'warning');
});

script.on('quit', () => {
  console.log('Process ended');
  process.exit();
});

script.on('error', () => {
  logMessage('An error occured. Exiting', 'error');
  process.exit(1);
});
