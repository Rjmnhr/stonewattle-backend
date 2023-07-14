const DomainInsights = require("../models/domain-model");

const DomainInsightsController = {
  filter: (req, res) => {
   
    DomainInsights.filter(req.body, (err, data) => {
      if (err) {
        res.status(500).json({ message: err.message });
      } else {
        res.status(200).json(data);
      }
    });
  },
};

module.exports = DomainInsightsController;
