"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
const TABLE_NAME = 'packaging-types';
function up(queryInterface, Sequelize) {
    return Promise.all([
        queryInterface.createTable(TABLE_NAME, {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true,
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
//# sourceMappingURL=000004.create-packaging-types-table.js.map