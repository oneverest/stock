import { Sequelize, Model, DataTypes, BuildOptions } from 'sequelize';

export interface User extends Model {
  readonly username: string;
}

export type UserStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): User;
};

export default (sequelize: Sequelize): UserStatic => {
  const BaseUser = sequelize.define(
    'base_user',
    {
      base_user_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      user_email: {
        type: DataTypes.STRING(250),
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING(250),
        allowNull: true,
      },
      user_password: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      is_email_verified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      email_token: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
    },
    {
      tableName: 'base_user',
      underscored: true,
      timestamps: true,
      version: true,
      paranoid: true,
      indexes: [{ unique: true, fields: ['user_email'] }],
    },
  ) as UserStatic;

  // BaseUser.associate = (models) => {
  //   BaseUser.hasOne(models.Trader, { as: 'Trader', foreignKey: 'trader_base_id' })
  // }

  return BaseUser;
};
