import { BaseModel } from './base-model';
import { sequelize } from '../connection';
import { Association, DataTypes } from 'sequelize';
import { County, ICounty } from './county';

export interface IPostcode {
  id: string;
  county_id: string;

  readonly county?: ICounty;

  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}

export class Postcode extends BaseModel<IPostcode> implements IPostcode {
  public id: string;
  public county_id: string;

  public readonly county?: County;

  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;

  public static associations: {
    county: Association<Postcode, County>;
  };
}

Postcode.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    county_id: {
      type: DataTypes.STRING,
      references: { model: 'counties', key: 'id' },
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: 'postcodes',
    sequelize,
  },
);

Postcode.hasOne(County, {
  as: 'county',
  foreignKey: 'id',
  sourceKey: 'county_id',
});
