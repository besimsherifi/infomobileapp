const express = require('express');
const router = express.Router();
const crmController = require("../Controller/crmController");

router.post("/c", crmController.crmdata );
router.post("/cc", crmController.crmdata2 );

module.exports = router;