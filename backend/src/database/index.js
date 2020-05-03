const Sequelize = require("sequelize");
const dbConfig = require("../config/database");

// Models
const Perito = require("../models/Perito");
const Pericia = require("../models/Pericia");
const Especialidade = require("../models/Especialidade");
const Documento = require("../models/Documento");
const Magistrado = require("../models/Magistrado");
const Avaliacao = require("../models/Avaliacao");
const Comarca = require("../models/Comarca");
const Tipo_documento = require("../models/Tipo_documento");

const connection = new Sequelize(dbConfig);

// Models com Conexão
Perito.init(connection);
Pericia.init(connection);
Especialidade.init(connection);
Documento.init(connection);
Magistrado.init(connection);
Avaliacao.init(connection);
Comarca.init(connection);
Tipo_documento.init(connection);

// ASSOCIAÇÕES / RELACIONAMENTOS
Pericia.associate(connection.models);
Perito.associate(connection.models);
Especialidade.associate(connection.models);
Documento.associate(connection.models);
Magistrado.associate(connection.models);
Avaliacao.associate(connection.models);
Comarca.associate(connection.models);
Tipo_documento.associate(connection.models);

module.exports = connection;
