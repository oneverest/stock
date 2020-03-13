import webpack from 'webpack';
import path from 'path';
import resolvers from './resolvers';
import loaders from './loaders';
import plugins from './plugins';
import paths from '../paths';
import nodeExternals from 'webpack-node-externals';

const config: webpack.Configuration = {
  name: 'server',
  target: 'node',
  entry: {
    server: [
      require.resolve('core-js/stable'),
      require.resolve('regenerator-runtime/runtime'),
      path.resolve(paths.srcServer, 'index.ts'),
    ],
  },
  externals: [
    nodeExternals({
      whitelist: /\.css$/,
    }),
  ],
  output: {
    filename: 'server.js',
    path: paths.serverBuild,
    publicPath: paths.publicPath,
  },
  resolve: { ...resolvers },
  module: {
    rules: loaders.server,
  },
  plugins: [...plugins.shared, ...plugins.server],
  stats: {
    assets: false,
    cached: false,
    cachedAssets: false,
    chunks: false,
    chunkModules: false,
    children: false,
    colors: true,
    hash: false,
    modules: false,
    performance: false,
    reasons: false,
    timings: true,
    version: false,
  },
  node: {
    __dirname: false,
  },
};

export default config;
