import { connection as sequelize } from '../config';
import { Sequelize } from 'sequelize';
import path from 'path';
import paths from '../../../../../config/paths';
// We need import every model here
import './baseUser';
// And we must put every model filename in this array
const modelsPath = ['baseUser.ts'];

const models: any = {};
let loaded = false;

// convert base_user to BaseUser
function toCamelCase(str: string): string {
  const _ = str.indexOf('_');
  if (~_) {
    return toCamelCase(
      str.substring(0, _) +
        str
          .substring(_ + 1)
          .substring(0, 1)
          .toUpperCase() +
        str.substring(_ + 2),
    );
  } else {
    return str.substring(0, 1).toUpperCase() + str.substring(1);
  }
}

const createModels = () => {
  if (loaded) {
    return models;
  }

  const modelList = modelsPath.map(p => sequelize.import(path.resolve(paths.modelDefinition, p)));

  for (const model of modelList) {
    const modelName = toCamelCase(model.name);
    models[modelName] = model;
  }

  // create relationships for model
  Object.keys(models).forEach(modelName => {
    if (models[modelName].associate) {
      models[modelName].associate(models);
    }
  });

  models['Sequelize'] = Sequelize;
  models['sequelize'] = sequelize;
  loaded = true;
  return models;
};

export default createModels();
