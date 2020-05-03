const Pericia = require("../models/Pericia");
const Magistrado = require("../models/Magistrado");

module.exports = {
  async index(req, res) {
    const magistrado = await Magistrado.findAll({
      attributes: ["id", "name"],
    });
    return res.json(magistrado);
  },

  async index_paginate(req, res) {
    const { page } = req.params;
    const options = {
      attributes: ["id", "name"],
      page: page,
      paginate: 10,
      order: [["name"]],
    };
    const { docs, pages, total } = await Magistrado.paginate(options);
    if (page > pages) {
      return res.json({ error: "Excedeu o limite de páginas." });
    }
    return res.json([docs, pages, total]);
  },

  async store(req, res) {
    const { id_pericia } = req.params;
    const { name } = req.body;

    const pericia = await Pericia.findByPk(id_pericia);

    if (!pericia) {
      res.status(400).json({ error: "Pericia not found." });
    }
    const magistrado = await Magistrado.create({ name, id_pericia });

    return res.json(magistrado);
  },

  async storeOne(req, res) {
    const { name } = req.body;

    const [new_pericia, created] = await Magistrado.findOrCreate({
      where: { name },
    });
    if (created) {
      return res.json(new_pericia);
    }
    return res.json({ error: "Magistrado already exists." });
  },
};
