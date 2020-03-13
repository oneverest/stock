import { PostgresUserRepo } from './PostgresUserRepo';
import models from '../../../infra/sequelize/models';

const userRepo = new PostgresUserRepo(models);

export { userRepo };
