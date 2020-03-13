import config from './config';
import { Sequelize } from 'sequelize';

require('dotenv').config();

const { NODE_ENV } = process.env;

const { username, password, database, host, dialect, port } = config[NODE_ENV];

export const connection = new Sequelize(String(database), String(username), password, {
  host,
  dialect: dialect as any,
  port: Number(port),
  dialectOptions: {
    multipleStatements: true,
  },
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
  logging: false,
});
