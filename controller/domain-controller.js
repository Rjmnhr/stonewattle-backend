const DomainInsights = require("../models/domain-model");

const DomainInsightsController = {
  filter: async (req, res) => {
    try {
      const filter = req.body;
      const data = await DomainInsights.filter(filter);

      res.status(200).json(data);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err });
    }
  },
};

module.exports = DomainInsightsController;
