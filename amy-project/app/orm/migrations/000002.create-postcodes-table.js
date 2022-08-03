"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
const TABLE_NAME = 'postcodes';
function up(queryInterface, Sequelize) {
    return Promise.all([
        queryInterface.createTable(TABLE_NAME, {
            id: {
                type: Sequelize.STRING,
                primaryKey: true,
                allowNull: false,
            },
            county_id: {
                type: Sequelize.STRING,
                allowNull: false,
                references: { model: 'counties', key: 'id' },
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false,
            },
        }),
    ]);
}
exports.up = up;
function down(queryInterface, Sequelize) {
    return Promise.all([queryInterface.dropTable(TABLE_NAME)]);
}
exports.down = down;
//# sourceMappingURL=000002.create-postcodes-table.js.map