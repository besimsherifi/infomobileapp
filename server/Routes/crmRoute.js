const express = require('express');
const router = express.Router();
const crmController = require("../Controller/crmController");
router.post("/", crmController.crmdata );


module.exports = router;