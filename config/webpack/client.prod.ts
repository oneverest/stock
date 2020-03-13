import baseConfig from './client.base';
const generateSourceMap = process.env.OMIT_SOURCEMAP === 'true' ? false : true;

const config = {
  ...baseConfig,
  mode: 'production',
  devtool: generateSourceMap ? 'source-map' : false,
};

if (config.output == undefined) {
  throw new Error('config.output undefined');
}
config.output.filename = 'bundle.[hash:8].js';

export default config;
