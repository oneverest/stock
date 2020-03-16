import { PostgresPovRepo } from './PostgresPovRepo';
import models from 'infra/sequelize/models';

const povRepo = new PostgresPovRepo(models);

export { povRepo };
