const LinkedInDataController = require("../controller/linkedin-controller");
const express = require("express");
const router = express.Router();

router.get("/data", LinkedInDataController.getAll);

module.exports = router;
