import path from 'path';
import fs from 'fs';

const appDirectory = fs.realpathSync(process.cwd());
const resolvePath = (relativePath: string) => path.resolve(appDirectory, relativePath);

interface Paths {
  appHtml: string;
  clientBuild: string;
  serverBuild: string;
  srcClient: string;
  srcServer: string;
  srcShared: string;
  src: string;
  publicPath: string;
  dotenv: string;
  types: string;
  resolveModules: string[];
  modelDefinition: string;
}

const paths: Paths = {
  appHtml: resolvePath('config/webpack/template.html'),
  clientBuild: resolvePath('build/client'),
  serverBuild: resolvePath('build/server'),
  srcClient: resolvePath('src/client'),
  srcServer: resolvePath('src/server'),
  srcShared: resolvePath('src/shared'),
  src: resolvePath('src'),
  publicPath: '/static/',
  dotenv: resolvePath('.env'),
  types: resolvePath('node_modules/@types'),
  modelDefinition: resolvePath('src/server/infra/sequelize/models'),
} as Paths;

paths.resolveModules = [paths.srcClient, paths.srcServer, paths.srcShared, paths.src, 'node_modules'];

export default paths;
