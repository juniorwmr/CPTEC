const Especialidade = require("../models/Especialidade");
const Perito = require("../models/Perito");

module.exports = {
  async index(req, res) {
    const especialidades = await Especialidade.findAll({
      attributes: ["id", "especialidade"],
    });
    return res.json(especialidades);
  },

  async index_paginate(req, res) {
    const { page } = req.params;
    const options = {
      attributes: ["id", "especialidade"],
      page: page,
      paginate: 10,
      order: [["especialidade"]],
    };
    const { docs, pages, total } = await Especialidade.paginate(options);
    if (page > pages) {
      return res.json({ error: "Excedeu o limite de páginas." });
    }
    return res.json([docs, pages, total]);
  },

  async storeOne(req, res) {
    const { especialidade } = req.body;
    const [new_especialidade, created] = await Especialidade.findOrCreate({
      where: { especialidade },
    });
    if (created) {
      return res.json(new_especialidade);
    }
    return res.json({ error: "Especialidade already exists." });
  },

  async store(req, res) {
    const { id_perito, especialidade } = req.body;
    try {
      const perito = await Perito.findByPk(id_perito);
      const [new_especialidade] = await Especialidade.findOrCreate({
        where: { especialidade },
      });
      await perito.addEspecialidade(new_especialidade);
      return res.json(new_especialidade);
    } catch (error) {
      return res.json({ error: error });
    }
  },
};
