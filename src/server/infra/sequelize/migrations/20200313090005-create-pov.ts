import { DataTypes, QueryInterface, Sequelize } from 'sequelize';
import runner from '../runner';

export default {
  up: (queryInterface: QueryInterface) => {
    const CREATE_BASE_POV = () => {
      queryInterface.createTable('pov', {
        base_id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          allowNull: false,
          primaryKey: true,
        },
        record_date: {
          type: DataTypes.DATEONLY,
          allowNull: false,
          unique: true,
        },
        net_worth: {
          type: DataTypes.DECIMAL(11, 3),
          allowNull: false,
        },
        position_ratio: {
          type: DataTypes.DECIMAL(11, 3),
          allowNull: false,
        },
        szzs: {
          type: DataTypes.DECIMAL(11, 3),
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

    return runner.run([() => CREATE_BASE_POV()]);
  },
  down: (queryInterface: QueryInterface) => {
    return runner.run([() => queryInterface.dropTable('pov')]);
  },
};
