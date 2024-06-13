const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const logSchema = new mongoose.Schema(
  {
    version: { type: String, default: undefined },
    date: { type: String, default: undefined },
    data: { type: String, default: undefined },
    log_date: { type: String, default: undefined },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const Log = mongoose.model("Log", logSchema);
module.exports = Log;
