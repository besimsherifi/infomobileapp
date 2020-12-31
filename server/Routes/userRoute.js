const express = require('express');
const router = express.Router();
const userController = require("../Controller/userController");
router.post("/reverse", userController.decodeAdress );


module.exports = router;