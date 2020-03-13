import { Client } from 'pg';
require('dotenv').config();

const {
  USER_MOD_DB_USER,
  USER_MOD_DB_HOST,
  USER_MOD_DB_PORT,
  USER_MOD_DB_DEV_DB_NAME,
  USER_MOD_DB_TEST_DB_NAME,
  NODE_ENV,
} = process.env;
const dbName = NODE_ENV === 'development' ? USER_MOD_DB_DEV_DB_NAME : USER_MOD_DB_TEST_DB_NAME;

/**
 * postgresql 在 linux 下，未设置默认密码，脚本会提示认证错误，需以 postgres 登录到 psql，运行下面命令
 *
 * ALTER USER postgres PASSWORD 'postgres';
 */
const client = new Client({
  user: 'postgres',
  password: 'postgres',
  host: USER_MOD_DB_HOST,
  database: 'postgres',
  port: Number(USER_MOD_DB_PORT),
});

client.connect();

const sqls = [`DROP DATABASE ${dbName}`, `DROP USER ${USER_MOD_DB_USER}`];

sqls
  .reduce(async (prev, sql) => {
    try {
      await prev;
      await client.query(sql);
    } catch (error) {
      // 3D000: database does not exist
      // 42704: role does not exist
      if (['3D000', '42704'].indexOf(String(error.code)) === -1) {
        throw error;
      }
    }
  }, Promise.resolve())
  .then(() => {
    console.log('Deleted db');
    process.exit(0);
  })
  .catch(err => {
    console.log(err);
    process.exit(1);
  });
