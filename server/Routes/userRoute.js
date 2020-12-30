const express = require('express');
const router = express.Router();
const userController = require("../Controller/userController");
router.post("/", userController.decodeAdress );


module.exports = router;