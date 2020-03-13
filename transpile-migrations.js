const fs = require('fs');
const path = require('path');
const babelToolingConfig = require('./babel.config').env.tooling;
const migrationPath = path.resolve('src', 'server', 'infra', 'sequelize', 'migrations');

// remove all .js
fs.readdirSync(migrationPath).forEach(file => {
  if (file.endsWith('.js') && !file.startsWith('index')) {
    fs.unlinkSync(path.resolve(migrationPath, file));
  }
});

// compile
const migrationFiles = fs
  .readdirSync(migrationPath)
  .filter(f => f.endsWith('.ts') && !f.startsWith('index') && !f.endsWith('.js'));
for (let file of migrationFiles) {
  const filePath = path.resolve(migrationPath, file);
  require('@babel/core').transform(
    fs.readFileSync(filePath),
    {
      presets: [['@babel/preset-env'], '@babel/preset-typescript'],
      plugins: ['@babel/plugin-transform-typescript', 'add-module-exports'],
      babelrc: false,
      filename: filePath,
    },
    (err, result) => {
      if (err) {
        throw err;
      }
      fs.writeFileSync(filePath.replace(/^(.*)\.ts$/, '$1.js'), result.code);
    },
  );
}
