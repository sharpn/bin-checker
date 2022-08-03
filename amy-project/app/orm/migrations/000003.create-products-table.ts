const TABLE_NAME = 'products';

export function up(queryInterface, Sequelize) {
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

export function down(queryInterface, Sequelize) {
  return Promise.all([queryInterface.dropTable(TABLE_NAME)]);
}
