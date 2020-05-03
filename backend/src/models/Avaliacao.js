const sequelizePaginate = require("sequelize-paginate");
const { Model, DataTypes } = require("sequelize");

class Avaliacao extends Model {
  static init(connection) {
    super.init(
      {
        avaliacao: DataTypes.STRING,
      },
      {
        sequelize: connection,
      }
    );
    sequelizePaginate.paginate(Avaliacao);
    return Avaliacao;
  }

  // Relacionamento 1-N
  static associate(models) {
    this.belongsTo(models.Pericia, {
      foreignKey: "id_pericia",
      as: "Pericia",
    });
  }
}

module.exports = Avaliacao;
