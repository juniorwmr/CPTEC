const Tipo_documento = require("../models/Tipo_documento");
const Documento = require("../models/Documento");

module.exports = {
  async index(req, res) {
    const typedoc = await Tipo_documento.findAll();
    return res.json(typedoc);
  },
  async store(req, res) {
    const { tipo_documento } = req.body;

    const [new_tipo_documento, created] = await Tipo_documento.findOrCreate({
      where: { tipo_documento }
    });
    if (created) {
      return res.json(new_tipo_documento);
    }
    return res.json({ error: "Magistrado already exists." });
  }
};
