const LinkedinModel = require("../models/linkedin-model");

const LinkedinController = {
  getData: async (req, res) => {
    try {
      const responseData = await LinkedinModel.getData(req.body);

      return res.status(200).json(responseData);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
  getTotalCount: async (req, res) => {
    try {
      const responseData = await LinkedinModel.getTotalCount(req.body);

      return res.status(200).json(responseData);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
  getCollegeTier: async (req, res) => {
    try {
      const responseData = await LinkedinModel.getCollegeTier(req.body);

      return res.status(200).json(responseData);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
  getCompanySize: async (req, res) => {
    try {
      const responseData = await LinkedinModel.getCompanySize(req.body);

      return res.status(200).json(responseData);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
  getCompanySector: async (req, res) => {
    try {
      const responseData = await LinkedinModel.getCompanySector(req.body);

      return res.status(200).json(responseData);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
  getTitles: async (req, res) => {
    try {
      const responseData = await LinkedinModel.getTitles(req.body);

      return res.status(200).json(responseData);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
  educationalAndDesired: async (req, res) => {
    try {
      const responseData = await LinkedinModel.educationalAndDesired(req.body);

      return res.status(200).json(responseData);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
  educationalOutput: async (req, res) => {
    try {
      const responseData = await LinkedinModel.educationalOutput(req.body);

      return res.status(200).json(responseData);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
  getDesiredTitleCount: async (req, res) => {
    try {
      const responseData = await LinkedinModel.getDesiredTitleCount(req.body);

      return res.status(200).json(responseData);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
  getDesiredTitleOutput: async (req, res) => {
    try {
      const responseData = await LinkedinModel.getDesiredTitleOutput(req.body);

      return res.status(200).json(responseData);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
  getColleges: async (req, res) => {
    try {
      const responseData = await LinkedinModel.getColleges(req.body);

      return res.status(200).json(responseData);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
};

module.exports = LinkedinController;
