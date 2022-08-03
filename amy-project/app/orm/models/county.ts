import { BaseModel } from './base-model';

import { sequelize } from '../connection';
import { DataTypes } from 'sequelize';

export interface ICounty {
  id?: string;
  name: string;

  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}

export class County extends BaseModel<ICounty> implements ICounty {
  public id: string;
  public name: string;

  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;
}

County.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
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
    modelName: 'counties',
    sequelize,
  },
);
