import { BaseModel } from './base-model';
import { sequelize } from '../connection';
import { DataTypes } from 'sequelize';

export interface IProduct {
  id?: string;
  barcode: number;
  name: string;

  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}

export class Product extends BaseModel<IProduct> implements IProduct {
  public id?: string;

  public barcode: number;
  public name: string;

  public readonly updatedAt?: Date;
  public readonly createdAt?: Date;
}

Product.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    barcode: {
      type: DataTypes.DOUBLE,
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
    tableName: 'products',
    sequelize,
  },
);
