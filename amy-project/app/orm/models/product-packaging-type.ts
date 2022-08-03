import { BaseModel } from './base-model';
import { sequelize } from '../connection';
import { DataTypes } from 'sequelize';

export interface IProductPackagingType {
  id?: string;
  product_id: string;
  packagingType_id: string;

  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}

export class ProductPackagingType
  extends BaseModel<IProductPackagingType>
  implements IProductPackagingType
{
  public id?: string;
  public product_id: string;
  public packagingType_id: string;

  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;
}

ProductPackagingType.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    product_id: {
      type: DataTypes.UUID,
      references: { model: 'products', key: 'id' },
    },
    packagingType_id: {
      type: DataTypes.UUID,
      references: { model: 'packaging-types', key: 'id' },
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
    tableName: 'product-packaging-types',
    sequelize,
  },
);
