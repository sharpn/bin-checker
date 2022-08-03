const TABLE_NAME = 'postcodes';

export function up(queryInterface, Sequelize) {
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

export function down(queryInterface, Sequelize) {
  return Promise.all([queryInterface.dropTable(TABLE_NAME)]);
}
