"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Documento", {
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
        references: { model: "Perito", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },
      // F.K
      id_tipo_documento: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Tipo_documento", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },
      description: {
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
    return queryInterface.dropTable("Documento");
  }
};
