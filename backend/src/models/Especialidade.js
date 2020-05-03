const sequelizePaginate = require("sequelize-paginate");
const { Model, DataTypes } = require("sequelize");

class Especialidade extends Model {
  static init(connection) {
    super.init(
      {
        especialidade: DataTypes.STRING,
      },
      {
        sequelize: connection,
      }
    );
    sequelizePaginate.paginate(Especialidade);
    return Especialidade;
  }

  // Relacionamento N-M
  static associate(models) {
    this.belongsToMany(models.Perito, {
      foreignKey: "id_especialidade",
      through: "PeritoEspecialidade",
      as: "Perito",
    });
  }
}

module.exports = Especialidade;
