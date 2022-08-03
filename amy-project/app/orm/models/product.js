"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const base_model_1 = require("./base-model");
const connection_1 = require("../connection");
const sequelize_1 = require("sequelize");
class Product extends base_model_1.BaseModel {
}
exports.Product = Product;
Product.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    barcode: {
        type: sequelize_1.DataTypes.DOUBLE,
        allowNull: false,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
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
    tableName: 'products',
    sequelize: connection_1.sequelize,
});
//# sourceMappingURL=product.js.map