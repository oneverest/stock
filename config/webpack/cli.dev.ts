import webpack from 'webpack';
import WriteFileWebpackPlugin from 'write-file-webpack-plugin';
import baseConfig from './cli.base';

if (baseConfig.plugins == undefined) {
  throw new Error();
}

export default {
  ...baseConfig,
  mode: 'development',
  plugins: [...baseConfig.plugins, new WriteFileWebpackPlugin(), new webpack.HotModuleReplacementPlugin()],
  performance: {
    hints: false,
  },
};
