const TABLE_NAME = 'product-packaging-types';

export function up(queryInterface, Sequelize) {
  return Promise.all([
    queryInterface.createTable(TABLE_NAME, {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      product_id: {
        type: Sequelize.UUID,
        references: { model: 'products', key: 'id' },
      },
      packagingType_id: {
        type: Sequelize.UUID,
        references: { model: 'packaging-types', key: 'id' },
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

export function down(queryInterface, Sequelize) {
  return Promise.all([queryInterface.dropTable(TABLE_NAME)]);
}
