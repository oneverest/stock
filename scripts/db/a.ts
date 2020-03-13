import { Sequelize, Model, DataTypes } from 'sequelize';
require('dotenv').config();

const {
  USER_MOD_DB_USER,
  USER_MOD_DB_PASS,
  USER_MOD_DB_HOST,
  USER_MOD_DB_PORT,
  USER_MOD_DB_DEV_DB_NAME,
  USER_MOD_DB_TEST_DB_NAME,
  NODE_ENV,
} = process.env;
const dbName = NODE_ENV === 'development' ? USER_MOD_DB_DEV_DB_NAME : USER_MOD_DB_TEST_DB_NAME;

const sequelize = new Sequelize(String(dbName), String(USER_MOD_DB_USER), USER_MOD_DB_PASS, {
  host: USER_MOD_DB_HOST,
  dialect: 'postgres',
  port: Number(USER_MOD_DB_PORT),
});

class User extends Model {}
User.init(
  {
    // 属性
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      // allowNull 默认为 true
    },
  },
  {
    sequelize,
    paranoid: true,
    timestamps: true,
    underscored: true,
    modelName: 'user',
    version: true,
    // 参数
  },
);
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    // 注意:如果表已经存在,使用`force:true`将删除该表
    return User.sync({ force: true }).then(() => {
      // 现在数据库中的 `users` 表对应于模型定义
      sequelize.close();
      process.exit(0);
    });
    // return User.create({
    //   firstName: 'John',
    //   lastName: 'Hancock'
    // });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
    sequelize.close();
    process.exit(1);
  });
