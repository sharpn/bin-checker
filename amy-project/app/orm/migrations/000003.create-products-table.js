"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
const TABLE_NAME = 'products';
function up(queryInterface, Sequelize) {
    return Promise.all([
        queryInterface.createTable(TABLE_NAME, {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true,
            },
            barcode: {
                type: Sequelize.DOUBLE,
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
//# sourceMappingURL=000003.create-products-table.js.map