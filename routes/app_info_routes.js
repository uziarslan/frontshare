const express = require("express");
const appInfoController = require("../controllers/appInfoController");
const authController = require("../controllers/authController");

const router = express.Router();
router.use(authController.isLoggedIn);
router.use(authController.protect);

router.post("/uploadLogo", appInfoController.uploadAppLogo, appInfoController.updateAppLogo)
router.post("/uploadSymbol", appInfoController.uploadAppLogoSymbol, appInfoController.updateAppLogoSymbol)
router.post("/", appInfoController.updateAppInfo)

module.exports = router;
