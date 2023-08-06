const Suburbs = require("../models/suburbs-model");

const SuburbsController = {
  getAll: async (req, res) => {
    try {
      const data = await Suburbs.getAll(req.body);
      res.status(200).json(data);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err });
    }
  },
  getById: async (req, res) => {
    try {
      const id = req.params.id;
      const data = await Suburbs.getById(id);
      res.status(200).json(data);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err });
    }
  },
};

module.exports = SuburbsController;
