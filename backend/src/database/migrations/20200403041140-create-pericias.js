"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Pericia", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      // F.K
      id_perito: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Perito", key: "id" }
      },
      id_comarca: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Comarca", key: "id" }
      },
      // F.K
      id_magistrado: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: "Magistrado", key: "id" }
      },
      // F.K
      id_perito: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Comarca", key: "id" }
      },
      numero_processo: {
        type: Sequelize.STRING,
        allowNull: false
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      honorarios: {
        type: Sequelize.INTEGER,
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
    return queryInterface.dropTable("Pericia");
  }
};
