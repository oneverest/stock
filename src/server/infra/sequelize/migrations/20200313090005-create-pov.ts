import { DataTypes, QueryInterface, Sequelize } from 'sequelize';
import runner from '../runner';

export default {
  up: (queryInterface: QueryInterface) => {
    const CREATE_BASE_POV = () => {
      queryInterface
        .createTable('pov', {
          base_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
          },
          record_date: {
            type: DataTypes.DATE,
            allowNull: false,
          },
          net_worth: {
            type: DataTypes.DECIMAL(3),
            allowNull: false,
          },
          position_ratio: {
            type: DataTypes.DECIMAL(3),
            allowNull: false,
          },
          szzs: {
            type: DataTypes.DECIMAL(3),
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
        })
        .then(() => {
          queryInterface.addIndex('pov', ['record_date']);
        });
    };

    return runner.run([() => CREATE_BASE_POV()]);
  },
  down: (queryInterface: QueryInterface) => {
    return runner.run([
      () =>
        queryInterface.removeIndex('pov', ['record_date']).then(() => {
          queryInterface.dropTable('pov');
        }),
    ]);
  },
};
