import baseConfig from './client.base';
import webpack from 'webpack';
import WriteFileWebpackPlugin from 'write-file-webpack-plugin';

const generateSourceMap = process.env.OMIT_SOURCEMAP === 'true' ? false : true;

if (baseConfig.plugins == undefined) {
  throw new Error('baseConfig.plugins undefined');
}

const config = {
  mode: 'development',
  ...baseConfig,
  plugins: [new webpack.HotModuleReplacementPlugin(), new WriteFileWebpackPlugin(), ...baseConfig.plugins],
  devtool: generateSourceMap ? 'cheap-module-inline-source-map' : false,
  performance: {
    hints: false,
  },
};

export default config;
