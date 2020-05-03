"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("PeritoEspecialidade", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      id_perito: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Perito", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      id_especialidade: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Especialidade", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("PeritoEspecialidade");
  },
};
