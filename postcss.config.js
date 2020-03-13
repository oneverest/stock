const babelToolingConfig = require('./babel.config').env.tooling;

require('@babel/register')({
  ...babelToolingConfig,
  // We can't add `extentions` directly to the Babel config because it's no known property for
  // env specific configs and results in an "Unknown option" error.
  extensions: ['.ts', '.tsx', '.jsx', '.js'],
});

module.exports = require('./postcss.config.ts').default;
