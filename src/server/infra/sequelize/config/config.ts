require('dotenv').config();

const {
  USER_MOD_DB_USER,
  USER_MOD_DB_PASS,
  USER_MOD_DB_HOST,
  USER_MOD_DB_PORT,
  USER_MOD_DB_DEV_DB_NAME,
  USER_MOD_DB_TEST_DB_NAME,
  USER_MOD_DB_PROD_DB_NAME,
} = process.env;

const dbCrendentials = {
  development: {
    username: USER_MOD_DB_USER,
    password: USER_MOD_DB_PASS,
    database: USER_MOD_DB_DEV_DB_NAME,
    host: USER_MOD_DB_HOST,
    port: USER_MOD_DB_PORT,
    dialect: 'postgres',
  },
  production: {
    username: USER_MOD_DB_USER,
    password: USER_MOD_DB_PASS,
    database: USER_MOD_DB_PROD_DB_NAME,
    host: USER_MOD_DB_HOST,
    port: USER_MOD_DB_PORT,
    dialect: 'postgres',
  },
  test: {
    username: USER_MOD_DB_USER,
    password: USER_MOD_DB_PASS,
    database: USER_MOD_DB_TEST_DB_NAME,
    host: USER_MOD_DB_HOST,
    port: USER_MOD_DB_PORT,
    dialect: 'postgres',
  },
};

export default dbCrendentials;
