const { Op } = require("sequelize");
const Perito = require("../models/Perito");
const Especialidade = require("../models/Especialidade");

module.exports = {
  async index(req, res) {
    const peritos = await Perito.findAll({ attributes: ["id", "name"] });
    return res.json(peritos);
  },

  async index_paginate(req, res) {
    const { page } = req.params;
    const options = {
      attributes: ["id", "name", "email", "cpf", "cnpj", "phone", "status"],
      page: page,
      paginate: 10,
      order: [["name"]],
    };
    const { docs, pages, total } = await Perito.paginate(options);
    if (page > pages) {
      return res.json({ error: "Excedeu o limite de páginas." });
    }
    return res.json([docs, pages, total]);
  },

  async index_by_cpf(req, res) {
    const peritos = await Perito.findAll({
      where: {
        cnpj: {
          [Op.is]: null,
        },
      },
    });
    return res.json(peritos);
  },

  async index_by_cnpj(req, res) {
    const peritos = await Perito.findAll({
      where: {
        cpf: {
          [Op.is]: null,
        },
      },
    });
    return res.json(peritos);
  },

  async store(req, res) {
    const {
      name,
      cpf,
      cnpj,
      email,
      phone,
      status,
      street,
      district,
      number,
      id_comarca,
      especialidade,
    } = req.body;

    try {
      const findPerito = await Perito.findOne({ where: { email } });
      if (!findPerito) {
        const perito = await Perito.create({
          name,
          cpf,
          cnpj,
          email,
          phone,
          status,
          street,
          district,
          number,
          id_comarca,
        });
        if (especialidade != 0) {
          const [new_especialidade] = await Especialidade.findOrCreate({
            where: { id: especialidade },
          });
          await perito.addEspecialidade(new_especialidade);
        }
        return res.json(perito);
      } else {
        return res.status(400).json({ error: "Perito already exists." });
      }
    } catch (e) {
      res.status(400).json({ error: e });
    }
  },
};
