const express = require('express');
const router = express.Router();
const testController = require("../Controller/testController");
router.get("/", testController.test );
module.exports = router;