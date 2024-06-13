const jwt = require("jsonwebtoken");
var express = require("express");
var mongoose = require("mongoose");
mongoose.set("strictQuery", false);
var path = require("path");
const catchAsync = require("../utils/catchAsync");
var router = express.Router();
var User = require("../models/userModel");
var Booking = require("../models/bookingModel");
var Log = require("../models/logModel");
var authController = require("../controllers/authController");
var bookingController = require("../controllers/bookingController");
const { check, validationResult } = require("express-validator");
const AppInfo = require("../models/appInfoModel");

// router.use(authController.isLoggedIn);
router.post(
  "/recsubmit",
  [
    check("data[phone]", "Must be a length 0f 10").isLength({
      min: 10,
      max: 10,
    }),
  ],
  function (req, res) {
    var errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      res.render("recruit", { errors: errors.mapped() });
    } else {
      // console.log(req.body.data);
      recruit.create(req.body.data, function (err, newdetails) {
        if (err) {
          console.log(err);
          res.redirect("/recruit");
        } else {
          res.redirect("/");
        }
      });
    }
  }
);

router.get("/support", authController.isLoggedIn, function (req, res) {
  if (res.locals.user === undefined) res.redirect("/");
  else res.render("support");
});
router.get("/booking", authController.isLoggedIn, function (req, res) {
  if (res.locals.user === undefined) res.redirect("/");
  else res.render("booking");
});
router.get("/booking", authController.isLoggedIn, function (req, res) {
  if (res.locals.user === undefined) res.redirect("/");
  else res.render("booking");
});
router.get("/earnings", authController.isLoggedIn, function (req, res) {
  if (res.locals.user === undefined) res.redirect("/");
  else res.render("earnings");
});
router.get("/traffic", authController.isLoggedIn, function (req, res) {
  if (res.locals.user === undefined) res.redirect("/");
  else res.render("traffic");
});
router.get("/workshop", authController.isLoggedIn, function (req, res) {
  if (res.locals.user === undefined) res.redirect("/");
  else res.render("workshop");
});
router.get("/tutorials", authController.isLoggedIn, function (req, res) {
  if (res.locals.user === undefined) res.redirect("/");
  else res.render("tutorials");
});
router.get("/mentors", authController.isLoggedIn, function (req, res) {
  if (res.locals.user === undefined) res.redirect("/");
  else res.render("mentors");
});
router.get("/students", authController.isLoggedIn, function (req, res) {
  if (res.locals.user === undefined) res.redirect("/");
  else res.render("students");
});
router.get("/collections", authController.isLoggedIn, function (req, res) {
  if (res.locals.user === undefined) res.redirect("/");
  else res.render("collections");
});
router.get("/store", authController.isLoggedIn, function (req, res) {
  if (res.locals.user === undefined) res.redirect("/");
  else res.render("store");
});
router.get("/articals", authController.isLoggedIn, function (req, res) {
  if (res.locals.user === undefined) res.redirect("/");
  else res.render("articals");
});
router.get("/news", authController.isLoggedIn, function (req, res) {
  if (res.locals.user === undefined) res.redirect("/");
  else res.render("news");
});
router.get(
  "/webapp-settings",
  authController.isLoggedIn,
  async function (req, res) {
    if (res.locals.user === undefined) res.redirect("/");
    else {
      let appInfo = await AppInfo.findOne();
      res.render("webapp-settings", { appInfo: appInfo });
    }
  }
);
router.get("/earnings", authController.isLoggedIn, function (req, res) {
  if (res.locals.user === undefined) res.redirect("/");
  else res.render("earnings");
});
router.get("/calendar", authController.isLoggedIn, function (req, res) {
  if (res.locals.user === undefined) res.redirect("/");
  else res.render("calendar");
});
router.get("/billing", authController.isLoggedIn, async function (req, res) {
  if (res.locals.user === undefined) res.redirect("/");
  else {
    const prousers = await User.find({ referredBy: req.logged, plan: "pro" });
    let ids = [];
    prousers.forEach((prouser) => {
      ids.push(prouser._id);
    });
    const prices = await Booking.find({ user: { $in: ids } });
    let balance = 0;
    prices.forEach((x) => {
      balance += x.price * 0.3;
    });
    balance -= req.logged.spent;
    console.log(balance);
    res.render("billing", { balance: balance });
  }
});
router.get("/canvas", authController.isLoggedIn, function (req, res) {
  const user = res.locals.user;
  if (user === undefined) res.redirect("/");
  // res.send(user)
  else res.render("canvas", { user: user });
});
router.post('/canvas', authController.isLoggedIn, async (req, res) => {
  const { user } = res.locals;
  const { title, poll_list, count, percentage, voteAllowance, self_note } = req.body;
  const dataObject = {
    type: "poll",
    title,
    self_note,
    count: count === "on",
    percentage: percentage === "on",
    voteAllowance: voteAllowance === "on",
    poll_list: poll_list.map((option) => ({
      value: option
    }))
  }
  await User.findByIdAndUpdate(user._id,
    {
      $push: {
        'first_list.data': dataObject
      }
    },
    { new: true }
  )
});

router.get('/canvas/:id', async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id)
  res.json(user.first_list)
})

router.get("/changelog", authController.isLoggedIn, function (req, res) {
  Log.find({})
    .then((logs) => {
      if (res.locals.user === undefined) {
        res.redirect("/");
      } else {
        logs.sort((a, b) => parseInt(b.log_date) - parseInt(a.log_date));
        res.render("changelog", { logs: logs });
      }
    })
    .catch((err) => {
      console.error(err);
    });
});
router.get("/chat", authController.isLoggedIn, function (req, res) {
  if (res.locals.user === undefined) res.redirect("/");
  else res.render("chat");
});
router.get("/compose", authController.isLoggedIn, function (req, res) {
  if (res.locals.user === undefined) res.redirect("/");
  else res.render("compose");
});
router.get("/account-detail", authController.isLoggedIn, function (req, res) {
  if (res.locals.user === undefined) res.redirect("/");
  else res.render("account-detail");
});
router.get("/costumers", authController.isLoggedIn, function (req, res) {
  if (res.locals.user === undefined) res.redirect("/");
  else res.render("costumers");
});
router.get("/database", authController.isLoggedIn, function (req, res) {
  if (res.locals.user === undefined) res.redirect("/");
  else res.render("database");
});
router.get("/economy", authController.isLoggedIn, function (req, res) {
  if (res.locals.user === undefined) res.redirect("/");
  else res.render("economy");
});
router.get("/email-detail", authController.isLoggedIn, function (req, res) {
  if (res.locals.user === undefined) res.redirect("/");
  else res.render("email-detail");
});
router.get("/faq", authController.isLoggedIn, function (req, res) {
  if (res.locals.user === undefined) res.redirect("/");
  else res.render("faq");
});
router.get("/feed", authController.isLoggedIn, function (req, res) {
  if (res.locals.user === undefined) res.redirect("/");
  else res.render("feed");
});
router.get("/referral", authController.isLoggedIn, function (req, res) {
  if (res.locals.user === undefined) res.redirect("/");
  else res.render("referral");
});
router.get("/inbox", authController.isLoggedIn, function (req, res) {
  if (res.locals.user === undefined) res.redirect("/");
  else res.render("inbox");
});
router.get("/privacy-policy", authController.isLoggedIn, function (req, res) {
  if (res.locals.user === undefined) res.redirect("/");
  else res.render("privacy-policy");
});
router.get("/", bookingController.createBookingCheckout, function (req, res) {
  res.render("landing");
});
router.get("/notifications", authController.isLoggedIn, function (req, res) {
  if (res.locals.user === undefined) res.redirect("/");
  else res.render("notifications");
});
router.get("/order-detail", authController.isLoggedIn, function (req, res) {
  if (res.locals.user === undefined) res.render("/");
  else res.render("order-detail");
});
router.get("/orders", authController.isLoggedIn, function (req, res) {
  if (res.locals.user === undefined) res.redirect("/");
  else res.render("orders");
});
router.get("/plans", authController.isLoggedIn, function (req, res) {
  if (res.locals.user === undefined) res.redirect("/");
  else res.render("plans");
});
router.get("/profile", authController.isLoggedIn, function (req, res) {
  if (res.locals.user === undefined) res.redirect("/");
  else res.render("profile");
});
router.get("/settings", authController.isLoggedIn, function (req, res) {
  const user = res.locals.user;
  if (user === undefined) res.redirect("/");
  else res.render("settings", { user: user });
});
router.get("/tickets", authController.isLoggedIn, function (req, res) {
  if (res.locals.user === undefined) res.redirect("/");
  else res.render("tickets");
});
router.get("/404", authController.isLoggedIn, function (req, res) {
  res.render("404");
});
router.get("/500", authController.isLoggedIn, function (req, res) {
  res.render("500");
});

router.get("/test", authController.isLoggedIn, function (req, res) {
  if (res.locals.user === undefined) res.redirect("/");
  else res.render("test");
});

router.get(
  "/:profilelink",
  catchAsync(async function (req, res) {
    // if (res.locals.user === undefined) res.redirect("/");
    // else {
    //   const user = await User.findOne({ url: req.params.profilelink });
    //   if (user === null) res.render("404");
    //   else res.render("preview", { user: user, SOUNDCLOUD_CLIENT_KEY: process.env.SOUNDCLOUD_CLIENT_KEY });
    // }

    const user = await User.findOne({ url: req.params.profilelink });
    if (user === null || !user.showCanvas) res.render("404");
    else
      res.render("preview", {
        user: user,
        SOUNDCLOUD_CLIENT_KEY: process.env.SOUNDCLOUD_CLIENT_KEY,
      });
  })
);

router.get("*", function (req, res) {
  res.render("404");
});

module.exports = router;
