const Pericia = require("../models/Pericia");
const Perito = require("../models/Perito");
const Comarca = require("..//models/Comarca");

module.exports = {
  async index(req, res) {
    const comarca = await Comarca.findAll({ attributes: ["id", "comarca"] });
    return res.json(comarca);
  },

  async index_paginate(req, res) {
    const { page } = req.params;
    const options = {
      attributes: ["id", "comarca"],
      page: page,
      paginate: 10,
      order: [["comarca"]],
    };
    const { docs, pages, total } = await Comarca.paginate(options);
    if (page > pages) {
      return res.json({ error: "Excedeu o limite de páginas." });
    }
    return res.json([docs, pages, total]);
  },

  async store(req, res) {
    const { comarca } = req.body;

    const [new_comarca, created] = await Comarca.findOrCreate({
      where: { comarca },
    });
    if (created) {
      return res.json(new_comarca);
    } else {
      return res.status(400).json({ error: "Comarca já existe." });
    }
  },

  async storePerito(req, res) {
    const { id_perito } = req.params;
    const { comarca } = req.body;

    const perito = await Perito.findByPk(id_pericia);

    if (!perito) {
      return res.status(400).json({ error: "Pericia not found." });
    }

    const pt = await Perito.create({ id_perito, comarca });

    return res.json(pt);
  },

  async storePericia(req, res) {
    const { id_pericia } = req.params;
    const { comarca } = req.body;

    const pericia = await Pericia.findByPk(id_pericia);

    if (!pericia) {
      return res.status(400).json({ error: "Pericia not found." });
    }

    const com = await Pericia.create({ id_pericia, comarca });

    return res.json(com);
  },
};
