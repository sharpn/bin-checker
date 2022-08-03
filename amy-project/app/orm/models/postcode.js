"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Postcode = void 0;
const base_model_1 = require("./base-model");
const connection_1 = require("../connection");
const sequelize_1 = require("sequelize");
const county_1 = require("./county");
class Postcode extends base_model_1.BaseModel {
}
exports.Postcode = Postcode;
Postcode.init({
    id: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
    },
    county_id: {
        type: sequelize_1.DataTypes.STRING,
        references: { model: 'counties', key: 'id' },
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
    tableName: 'postcodes',
    sequelize: connection_1.sequelize,
});
Postcode.hasOne(county_1.County, {
    as: 'county',
    foreignKey: 'id',
    sourceKey: 'county_id',
});
//# sourceMappingURL=postcode.js.map