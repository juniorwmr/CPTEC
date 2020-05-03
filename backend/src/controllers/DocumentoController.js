const Perito = require("../models/Perito");
const Documento = require("../models/Documento");
const Tipo_documento = require("../models/Tipo_documento");

module.exports = {
  async index(req, res) {
    const documento = await Documento.findAll();
    return res.json(documento);
  },

  async index_paginate(req, res) {
    const { page, id_perito } = req.params;
    const options = {
      attributes: ["id_perito", "description"],
      where: { id_perito },
      include: [
        {
          model: Tipo_documento,
          as: "Tipo_documento",
          attributes: ["tipo_documento"],
        },
      ],
      page: page,
      paginate: 10,
    };
    const { docs, pages, total } = await Documento.paginate(options);
    if (page > pages) {
      return res.json({ error: "Excedeu o limite de páginas." });
    }
    return res.json([docs, pages, total]);
  },

  async store(req, res) {
    const { id_perito, id_tipo_documento, description } = req.body;

    const perito = await Perito.findByPk(id_perito);

    if (!perito) {
      return res.status(400).json({ error: "Perito not found." });
    }

    const documento = await Documento.create({
      id_perito,
      id_tipo_documento,
      description,
    });

    return res.json(documento);
  },
};
