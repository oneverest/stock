import path from 'path';

export default {
  config: path.resolve('src', 'server', 'infra', 'sequelize', 'config', 'config.ts'),
  'models-path': path.resolve('src', 'server', 'infra', 'sequelize', 'models'),
  'seeders-path': path.resolve('src', 'server', 'infra', 'sequelize', 'seeders'),
  'migrations-path': path.resolve('src', 'server', 'infra', 'sequelize', 'migrations'),
};
