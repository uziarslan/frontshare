const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();
router.use(authController.isLoggedIn);

module.exports = router;
