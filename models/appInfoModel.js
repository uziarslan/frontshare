const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const appSchema = new mongoose.Schema({
  app_name: {
    type: String,
  },
  app_logo: {
    type: String,
  },
  app_logo_symbol: {
    type: String,
  }
})

const AppInfo = mongoose.model("AppInfo", appSchema);
module.exports = AppInfo;
