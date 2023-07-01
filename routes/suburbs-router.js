const express = require("express");
const router = express.Router();
const suburbsController = require("../controller/suburbs-controller");

router.get("/data", suburbsController.getAll);

module.exports = router;
