"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Avaliacao", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      // F.K
      id_pericia: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: "Pericia", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },
      avaliacao: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Avaliacao");
  }
};
