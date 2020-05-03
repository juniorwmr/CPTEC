const Pericia = require("../models/Pericia");
const Avaliacao = require("../models/Avaliacao");

module.exports = {
  async index(req, res) {
    const avaliacao = await Avaliacao.findAll();
    return res.json(avaliacao);
  },

  async index_paginate(req, res) {
    const { page } = req.params;
    const options = {
      attributes: ["avaliacao"],
      include: [
        {
          model: Pericia,
          as: "Pericia",
          attributes: ["numero_processo"],
        },
      ],
      page: page,
      paginate: 10,
    };
    const { docs, pages, total } = await Avaliacao.paginate(options);
    if (page > pages) {
      return res.json({ error: "Excedeu o limite de páginas." });
    }
    return res.json([docs, pages, total]);
  },

  async store(req, res) {
    const { id_pericia, avaliacao } = req.body;

    const pericia = await Pericia.findByPk(id_pericia);

    if (!pericia) {
      return res.status(400).json({ error: "Pericia not found." });
    }

    try {
      const pericia_aval = await Avaliacao.findOne({
        where: { id_pericia },
      });
      if (!pericia_aval) {
        const aval = await Avaliacao.create({ id_pericia, avaliacao });
        return res.json(aval);
      } else {
        return res
          .status(400)
          .json({ error: "Pericia already has a avaliation." });
      }
    } catch (e) {
      res.status(400).json({ error: "Error." });
    }
  },
};
