import { BaseModel } from './base-model';
import { sequelize } from '../connection';
import { DataTypes } from 'sequelize';

export interface IPackagingType {
  id?: string;
  name: string;

  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}

export class PackaingType
  extends BaseModel<IPackagingType>
  implements IPackagingType
{
  public id?: string;
  public name: string;

  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;
}

PackaingType.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
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
    tableName: 'packaging-types',
    sequelize,
  },
);
