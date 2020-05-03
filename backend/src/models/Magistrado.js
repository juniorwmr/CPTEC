const sequelizePaginate = require("sequelize-paginate");
const { Model, DataTypes } = require("sequelize");

class Magistrado extends Model {
  static init(connection) {
    super.init(
      {
        name: DataTypes.STRING,
      },
      {
        sequelize: connection,
      }
    );
    sequelizePaginate.paginate(Magistrado);
    return Magistrado;
  }

  // Relacionamento 1-N
  static associate(models) {
    this.hasMany(models.Pericia, {
      foreignKey: "id_magistrado",
      as: "Pericia",
    });
  }
}

module.exports = Magistrado;
