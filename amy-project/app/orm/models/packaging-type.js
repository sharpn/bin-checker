"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PackaingType = void 0;
const base_model_1 = require("./base-model");
const connection_1 = require("../connection");
const sequelize_1 = require("sequelize");
class PackaingType extends base_model_1.BaseModel {
}
exports.PackaingType = PackaingType;
PackaingType.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
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
    tableName: 'packaging-types',
    sequelize: connection_1.sequelize,
});
//# sourceMappingURL=packaging-type.js.map