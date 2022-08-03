"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
const TABLE_NAME = 'counties';
function up(queryInterface, Sequelize) {
    return Promise.all([
        queryInterface.createTable(TABLE_NAME, {
            id: {
                type: Sequelize.STRING,
                primaryKey: true,
                allowNull: false,
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
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
//# sourceMappingURL=000001.create-counties-table.js.map