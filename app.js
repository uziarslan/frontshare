const express = require("express");
const dotenv = require("dotenv");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser");
const compression = require("compression");
const viewRoutes = require("./routes/view_routes");
const userRoutes = require("./routes/user_routes");
const blockRoutes = require("./routes/block_routes");
const bookingRoutes = require("./routes/booking_routes");
const appInfoRoutes = require("./routes/app_info_routes");
const paypal = require("paypal-rest-sdk");
const jwt = require("jsonwebtoken");
const User = require("./models/userModel");
const AppInfo = require("./models/appInfoModel");
const Log = require("./models/logModel");
const axios = require("axios");
var authController = require("./controllers/authController");
const { exec } = require("child_process"); // to launch browser on successul connection with db
const passport = require("passport");
const passportSetup = require("./passport");
const crypto = require("crypto");

app.use(express.json({ limit: "400kb" }));

// Facebook Login Routes
app.get("/facebook/login", authController.facebookLogin);
app.get("/facebookLoginUrl", authController.facebookLoginUrl);

// Google login routes
app.use(passport.initialize());
app.get("/auth/google", passport.authenticate("google", ["profile", "email"]));
app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    session: false,
    scope: ["profile", "email"],
  }),
  authController.googleCallback
);

//middleware to keep track of online users
//////////////////////////////////////
app.use(async (req, res, next) => {
  const appInfo = await AppInfo.findOne();
  if (appInfo) {
    res.locals.appInfo = appInfo;
  } else {
    const info = new AppInfo({
      app_name: "FrontShare",
      app_logo: "web-app-logo",
      app_logo_symbol: "web-app-logo-symbol",
    });
    await info.save();

    res.locals.appInfo = info;
  }

  const changelogVersion = await Log.findOne({}).sort({ _id: -1 })

  if (changelogVersion) {
    res.locals.changelogVersion = changelogVersion;
  } else {
    const date = new Date().getTime();
    const newLog = Log({
      version: "1.0.0",
      date: date,
      data: "System Generated",
      log_date: date,
    });
    await newLog.save()
    res.locals.changelogVersion = newLog;
  }

  const token = req.headers.cookie;
  const page = req.headers.referer;
  if (token && token.includes("jwt=")) {
    try {
      const decodedToken = jwt.verify(
        token.split("jwt=")[1],
        process.env.JWT_SECRET
      );
      const userId = decodedToken.id;

      await User.findOneAndUpdate(
        { _id: userId },
        { "recent_activity.online_at": new Date() }
      );

      if (page) {
        await User.findOneAndUpdate(
          { _id: userId },
          { "recent_activity.last_visited_page": "/" + page.split("/").pop() }
        );
      }

      /////commented out temporarily to avoid ipaddress erros

      // const user = await User.findById(userId);
      // if (user && (!user.recent_activity.location_updated_at ||
      //    (new Date(user.recent_activity.location_updated_at) <= new Date(Date.now() - 5 * 60 * 1000)))) {
      //   const ipAddress = req.ip;
      //   if (ipAddress !== '::1') {
      //     const response = await axios.get(`http://ip-api.com/json/${ipAddress}`);
      //     const data = response.data;
      //     if (data && data.status === 'success') {
      //       await User.findOneAndUpdate({ _id: userId }, { "recent_activity.location_updated_at": new Date(), "recent_activity.location": `${data.lat}, ${data.lon}`, "recent_activity.city": data.city});
      //     }
      //   }
      // }
    } catch (error) { }
  }
  next();
});
////////////////////////////////////
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }));
paypal.configure({
  mode: "sandbox", //sandbox or live
  client_id:
    "AYOkgdbnHFjMi-IEJmMtpk_FiYCXQB62yhQBV2JIitYf2ZQNSeAapqEdggMaQh2p54IM-dQsstOTnD5C",
  client_secret:
    "EFOQyBkNPIUnwzPqKu4a6r4mok_UyzA2o8AeMJH_2AaMzfkgbIrRTXTeiy1AmHT9N_Muzyxde0m4iiKT",
});
// Including Routes!
// app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");
// app.use(methodOverride("_method"));
app.use(express.static(__dirname + "/public"));
//Connection To Database
mongoose.connect(
  "mongodb+srv://Zatacka:eN5cxPM8V4jB26Wn@users.d9lak6p.mongodb.net/test",
  { useNewUrlParser: true, useUnifiedTopology: true },
  (error) => {
    if (!error) {
      console.log("Connection to db successful");

      // Open browser with the URL
      const url = `http://localhost:${port}`;
      const command = process.platform === "win32" ? "start" : "open";
      exec(`${command} ${url}`);
    } else {
      console.log(error);
    }
  }
);
mongoose.set("strictQuery", false);

app.use(cookieParser());

app.use(compression());

dotenv.config({ path: "./config.env" });

app.use("/", viewRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/blocks", blockRoutes);
app.use("/api/v1/bookings", bookingRoutes);
app.use("/api/v1/appInfo", appInfoRoutes);

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log("Listening on port", port);
});
