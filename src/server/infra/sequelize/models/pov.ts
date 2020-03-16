import { Sequelize, Model, DataTypes, BuildOptions } from 'sequelize';

export interface Pov extends Model {
  readonly username: string;
}

export type PovStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): Pov;
};

export default (sequelize: Sequelize): PovStatic => {
  const Pov = sequelize.define(
    'pov',
    {
      base_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      net_worth: {
        type: DataTypes.DECIMAL(11, 3),
        allowNull: false,
      },
      position_ratio: {
        type: DataTypes.DECIMAL(11, 3),
        allowNull: false,
      },
      record_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      szzs: {
        type: DataTypes.DECIMAL(11, 3),
        allowNull: false,
      },
    },
    {
      tableName: 'pov',
      underscored: true,
      timestamps: true,
      version: true,
      paranoid: true,
      indexes: [{ unique: true, fields: ['record_date'] }],
    },
  ) as PovStatic;

  return Pov;
};
