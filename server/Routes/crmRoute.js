const express = require('express');
const router = express.Router();
const crmController = require("../Controller/crmController");

router.post("/c", crmController.crmdata );


module.exports = router;