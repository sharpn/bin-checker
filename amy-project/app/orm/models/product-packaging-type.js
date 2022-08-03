"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductPackagingType = void 0;
const base_model_1 = require("./base-model");
const connection_1 = require("../connection");
const sequelize_1 = require("sequelize");
class ProductPackagingType extends base_model_1.BaseModel {
}
exports.ProductPackagingType = ProductPackagingType;
ProductPackagingType.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    product_id: {
        type: sequelize_1.DataTypes.UUID,
        references: { model: 'products', key: 'id' },
    },
    packagingType_id: {
        type: sequelize_1.DataTypes.UUID,
        references: { model: 'packaging-types', key: 'id' },
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
}, {
    tableName: 'product-packaging-types',
    sequelize: connection_1.sequelize,
});
//# sourceMappingURL=product-packaging-type.js.map