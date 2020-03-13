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
  define: {
    hooks: {
      afterCreate: () => console.log('全局 hook'),
    },
  },
});

sequelize.addHook('afterCreate', () => {
  console.log('常驻 hook');
});

class User extends Model<{}, {}> {}
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
    hooks: {
      afterCreate: () => console.log('user hook'),
    },
    sequelize,
    timestamps: true,
    paranoid: true,
    version: true,
    underscored: true,
    modelName: 'user',
    // 参数
  },
);

async function main() {
  // await User.findAll().then(data => console.log(data));
  User.addHook('afterCreate', 'hook_name', () => {
    // console.log('beforeCreate');
    console.log('模型 hook');
  });
  User.create({ firstName: 'lei', lastName: 'lee' });
  const user = await User.findByPk(4);
  if (user) {
    // user.destroy();
    const updatePromise = (model: User, attributes: any) => {
      // throw new Error('my error');
      return new Promise((resolve, reject) => {
        model
          .update(attributes)
          .then(data => resolve(data))
          .catch(err => reject(err));
      });
    };
    try {
      updatePromise(user, { firstName: 'wei' });
      updatePromise(user, { firstName: 'han' });
      console.log(user.get({ plain: true }));
    } catch (err) {
      console.log(err);
    }
  } else {
    console.log('找不到用户');
  }
}

main();
