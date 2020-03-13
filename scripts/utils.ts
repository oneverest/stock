import chalk from 'chalk';

/*eslint @typescript-eslint/no-explicit-any: off */

export const logMessage = (message: any, level = 'info') => {
  const color = level === 'error' ? 'red' : level === 'warning' ? 'yellow' : level === 'info' ? 'blue' : 'white';
  console.log(`[${new Date().toLocaleString()}]`, chalk[color](message));
};

export const compilerPromise = (name: string, compiler: any) => {
  return new Promise((resolve, reject) => {
    compiler.hooks.compile.tap(name, () => {
      logMessage(`[${name}] Compiling `);
    });
    compiler.hooks.done.tap(name, (stats: any) => {
      if (!stats.hasErrors()) {
        return resolve();
      }
      return reject(`Failed to compile ${name}`);
    });
  });
};

export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const clientOnly = () => process.argv.includes('--client-only');

export default {
  clientOnly,
  compilerPromise,
  logMessage,
  sleep,
};
