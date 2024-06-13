const express = require("express");
const multer = require("multer");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const logController = require("../controllers/logController");

// const dealRouter = require("../routes/dealRoutes");
// const upload = multer({ dest: "/public/img/users" });
// bring back the user router from appjs
const router = express.Router();
router.use(authController.isLoggedIn);

router
  .route("/signup")
  // .delete(authController.resend)
  .post(authController.signUp, userController.createProfileLink);
router.post("/verify", authController.verify);

router.post("/login", authController.login);

// router.get("/logout", authController.logout);
router.post("/logout", authController.logout);
router.post("/forgotPassword", authController.forgotPassword);
router.post("/checkValidity/:token", authController.checkValidity);
router.patch("/resetPassword/:token", authController.resetPassword);

////////////////////////////////////////////////////////////////////////////////////

router.post("/updateProfileListData", userController.updateProfileListData);

router.use(authController.protect);

router.patch("/updateMyPassword", authController.updatePassword);
router.get("/me", userController.getMe, userController.getUser);
router.post("/birthday_today", userController.birthdayToday);
router.patch(
  "/updateMe",
  userController.uploadUserPhoto,
  userController.resizeUserPhoto,
  userController.updateMe
);
router.delete("/deleteMe", userController.deleteMe);
router.patch("/deletePhoto", userController.deletePhoto);
router.patch("/updatelink", userController.updateLink);

router.post("/resend", authController.resend);
////////////////////////////////////////////////////////////////////////////////////////////////

// router.use(authController.restrictTo('admin'));

router.route("/").post(userController.createUser);

router.route("/allUsers").post(userController.getAllUsers);
router.route("/deleteUsers").post(userController.deleteBulkUsers);
router.route("/export").post(userController.exportUsers);
router.route("/:id/show").post(userController.showUser);
router.route("/active").post(userController.activeUsers);

router
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

router.post(
  "/uploadVideo",
  userController.uploadVideo,
  userController.addUserVideo
);

router.post("/updateProfileLists", userController.updateProfileLists);
router.post("/accounts-settings", userController.updateAccountSettings);
router.post("/updateProfileSettings", userController.updateProfileSettings);
router.post(
  "/uploadProfileImage",
  userController.uploadProfileImage,
  userController.resizeProfileImage,
  userController.updateProfileImage
);
router.post(
  "/uploadProfileCoverImage",
  userController.uploadProfileCoverImage,
  userController.updateProfileCoverImage
);
router.post("/createLog", logController.createLog);
router.post("/updateLog", logController.updateLog);
router.post("/removeLog", logController.removeLog);

router.post("/deleteAccount", userController.deleteAccount);
router.post("/changePassword", authController.changePassword);

router.post("/updateBio", userController.updateBio);
router.post("/updateSocialListData", userController.updateSocialListData);

module.exports = router;
