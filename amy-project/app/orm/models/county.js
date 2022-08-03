"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.County = void 0;
const base_model_1 = require("./base-model");
const connection_1 = require("../connection");
const sequelize_1 = require("sequelize");
class County extends base_model_1.BaseModel {
}
exports.County = County;
County.init({
    id: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
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
    modelName: 'counties',
    sequelize: connection_1.sequelize,
});
//# sourceMappingURL=county.js.map