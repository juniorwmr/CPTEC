const { Model, DataTypes } = require("sequelize");

class Tipo_documento extends Model {
  static init(connection) {
    super.init(
      {
        tipo_documento: DataTypes.STRING
      },
      {
        sequelize: connection
      }
    );
  }

  // Relacionamento 1-N
  static associate(models) {
    this.hasMany(models.Documento, {
      foreignKey: "id_tipo_documento",
      as: "Documento"
    });
  }
}

module.exports = Tipo_documento;
