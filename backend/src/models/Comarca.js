const sequelizePaginate = require("sequelize-paginate");
const { Model, DataTypes } = require("sequelize");

class Comarca extends Model {
  static init(connection) {
    super.init(
      {
        comarca: DataTypes.STRING,
      },
      {
        sequelize: connection,
      }
    );
    sequelizePaginate.paginate(Comarca);
    return Comarca;
  }

  // Relacionamento 1-N
  static associate(models) {
    this.hasMany(models.Perito, {
      foreignKey: "id_comarca",
      as: "Perito",
    });
    this.hasMany(models.Pericia, {
      foreignKey: "id_comarca",
      as: "Pericia",
    });
  }
}

module.exports = Comarca;
