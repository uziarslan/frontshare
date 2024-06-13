const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const bookingSchema = new mongoose.Schema({
  plan: {
    type: String,
    default: "pro",
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Booking must belong to a User!"],
  },
  price: {
    type: Number,
    require: [true, "Booking must have a price."],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  paid: {
    type: Boolean,
    default: true,
  },
});

bookingSchema.pre(/^find/, function (next) {
  this.populate("user");
  next();
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
