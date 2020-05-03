const sequelize = require("../database/index");
const Pericia = require("../models/Pericia");
const Perito = require("../models/Perito");

module.exports = {
  async index(req, res) {
    const peritos = await Pericia.findAll();

    return res.json(peritos);
  },

  async index_paginate(req, res) {
    const { page } = req.params;
    const options = {
      page: page,
      paginate: 10,
      attributes: [
        "numero_processo",
        [
          sequelize.Sequelize.fn(
            "date_format",
            sequelize.col("date"),
            "%d-%m-%Y"
          ),
          "date",
        ],
        "honorarios",
      ],
      order: [["numero_processo"]],
    };
    const { docs, pages, total } = await Pericia.paginate(options);
    if (page > pages) {
      return res.json({ error: "Excedeu o limite de páginas." });
    }
    return res.json([docs, pages, total]);
  },

  async store(req, res) {
    const {
      id_perito,
      id_comarca,
      numero_processo,
      date,
      honorarios,
    } = req.body;

    const perito = await Perito.findByPk(id_perito);

    if (!perito) {
      return res.status(400).json({ error: "Perito not found." });
    }
    const pericia = await Pericia.create({
      id_perito,
      id_comarca,
      numero_processo,
      date,
      honorarios,
    });

    return res.json(pericia);
  },
  async show(req, res) {
    const { id_perito } = req.params;
    const perito = await Perito.findByPk(id_perito, {
      include: { association: "perito_has_pericia" },
    });
    return res.json(perito.perito_has_pericia);
  },
};
