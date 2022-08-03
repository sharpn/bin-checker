const TABLE_NAME = 'packaging-types';

export function up(queryInterface, Sequelize) {
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

export function down(queryInterface, Sequelize) {
  return Promise.all([queryInterface.dropTable(TABLE_NAME)]);
}
