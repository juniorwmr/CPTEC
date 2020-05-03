const sequelizePaginate = require("sequelize-paginate");
const { Model, DataTypes } = require("sequelize");

class Perito extends Model {
  static init(connection) {
    super.init(
      {
        name: DataTypes.STRING,
        cpf: DataTypes.STRING,
        cnpj: DataTypes.STRING,
        email: DataTypes.STRING,
        phone: DataTypes.STRING,
        status: DataTypes.INTEGER,
        street: DataTypes.STRING,
        district: DataTypes.STRING,
        number: DataTypes.INTEGER,
      },
      {
        sequelize: connection,
      }
    );
    sequelizePaginate.paginate(Perito);
    return Perito;
  }

  static associate(models) {
    this.hasMany(models.Pericia, {
      foreignKey: "id_perito",
      as: "Pericia",
    });

    // Relacionamento N-M
    this.belongsToMany(models.Especialidade, {
      foreignKey: "id_perito",
      through: "PeritoEspecialidade",
      as: "Especialidade",
    });

    // Relacionamento 1-N
    this.hasMany(models.Documento, {
      foreignKey: "id_perito",
      as: "Documento",
    });

    this.belongsTo(models.Comarca, {
      foreignKey: "id_comarca",
      as: "Comarca",
    });
  }
}

module.exports = Perito;
