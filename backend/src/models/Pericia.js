const sequelizePaginate = require("sequelize-paginate");
const { Model, DataTypes } = require("sequelize");

class Pericia extends Model {
  static init(connection) {
    super.init(
      {
        numero_processo: DataTypes.STRING,
        date: DataTypes.DATE,
        honorarios: DataTypes.INTEGER,
      },
      {
        sequelize: connection,
      }
    );
    sequelizePaginate.paginate(Pericia);
    return Pericia;
  }

  static associate(models) {
    this.belongsTo(models.Perito, {
      foreignKey: "id_perito",
      as: "Perito",
    });
    this.belongsTo(models.Magistrado, {
      foreignKey: "id_magistrado",
      as: "Magistrado",
    });
    this.hasMany(models.Avaliacao, {
      foreignKey: "id_pericia",
      as: "Avaliacao",
    });
    this.belongsTo(models.Comarca, {
      foreignKey: "id_comarca",
      as: "Comarca",
    });
  }
}

module.exports = Pericia;
