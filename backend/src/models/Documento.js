const sequelizePaginate = require("sequelize-paginate");
const { Model, DataTypes } = require("sequelize");

class Documento extends Model {
  static init(connection) {
    super.init(
      {
        description: DataTypes.STRING,
      },
      {
        sequelize: connection,
      }
    );
    sequelizePaginate.paginate(Documento);
    return Documento;
  }

  // Relacionamento 1-N
  static associate(models) {
    this.belongsTo(models.Perito, {
      foreignKey: "id_perito",
      as: "Perito",
    });
    this.belongsTo(models.Tipo_documento, {
      foreignKey: "id_tipo_documento",
      as: "Tipo_documento",
    });
  }
}

module.exports = Documento;
