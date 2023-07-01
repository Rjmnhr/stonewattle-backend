const express = require("express");
const DomainInsightsController = require("../controller/domain-controller");
const router = express.Router();

router.post("/filter", DomainInsightsController.filter);

module.exports = router;
