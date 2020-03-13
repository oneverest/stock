import { DataTypes, QueryInterface, Sequelize } from 'sequelize';
import runner from '../runner';

export default {
  up: (queryInterface: QueryInterface) => {
    const CREATE_BASE_USER = () => {
      queryInterface.createTable('base_user', {
        base_user_id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          allowNull: false,
          primaryKey: true,
        },
        username: {
          type: DataTypes.STRING(250),
          allowNull: true,
        },
        user_email: {
          type: DataTypes.STRING(250),
          allowNull: false,
          unique: true,
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
        created_at: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updated_at: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        deleted_at: {
          type: DataTypes.DATE,
          allowNull: true,
          defaultValue: null,
        },
        version: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
      });
    };

    return runner.run([() => CREATE_BASE_USER()]);
  },
  down: (queryInterface: QueryInterface) => {
    return runner.run([() => queryInterface.dropTable('base_user')]);
  },
};
