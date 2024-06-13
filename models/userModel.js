const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const bcrypt = require("bcrypt");
const crypto = require("crypto");
const validator = require("validator");
const { stringify } = require("querystring");

const userSchema = new mongoose.Schema(
  {
    joined_date: {
      type: Date,
      required: true,
    },
    referredBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    email_verified: {
      type: Boolean,
      required: true,
      default: false,
    },
    use_real_name: {
      type: Boolean,
      required: true,
      default: false,
    },
    use_real_location: {
      type: Boolean,
      required: true,
      default: false,
    },
    identity_verified: {
      type: Boolean,
      required: true,
      default: false,
    },
    balance: { type: Number, default: 0 },
    image: { type: String, default: undefined },
    cover_image: { type: String, default: undefined },
    first_name: { type: String, default: undefined },
    last_name: { type: String, default: undefined },
    url: String,
    role: {
      type: String,
      enum: ["user", "employee", "admin"],
      default: "user",
    },
    activity_status: {
      type: String,
      enum: ["online", "away", "busy"],
      default: "online",
    },
    gender: {
      type: String,
      enum: ["male", "female"],
    },
    plan: {
      type: String,
      enum: ["basic", "pro_monthly", "pro_annually"],
      default: "basic",
    },
    address: String,
    city: String,
    state: String,
    zip_code: String,
    date_of_birth: Date,
    email: {
      type: String,
      required: [true, "Email is Required"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Invalid Email"],
    },
    password: {
      type: String,
      required: [true, "Password is Required"],
      match: [
        /^(?=.*[!@#\$%])(?=.*[A-Z])(?=.*\d).{8,}$/,
        "Password must be 8 characters long with atleast one capital, one digit and one symbol(!@#$%).",
      ],
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [false, "Comfirm Password is Required"],
      // minLength: [8, "Password Too Small"],
      select: false,
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: "Passwords Do Not Match",
      },
    },
    phone: { type: String, default: undefined },
    social_list: [{ type: String }],

    first_list: {
      show: { type: Boolean, default: true },
      data: [
        {
          type: { type: String, default: undefined },
          music_size: { type: String, default: undefined },
          link: { type: String, default: undefined },
          text: { type: String, default: undefined },
          self_note: { type: String, default: "" },
          title: { type: String, default: "" },
          text_block_color: { type: String, default: undefined },
          show: { type: Boolean, default: true },
          count: { type: Boolean, default: false },
          percentage: { type: Boolean, default: false },
          voteAllowance: { type: Boolean, default: false },
          poll_list: [
            {
              value: {
                type: String,
                default: "",
              },
              count: {
                type: Number,
                default: 0,
              },
            },
          ],
        },
      ],
    },
    second_list: {
      show: { type: Boolean, default: false },
      data: [
        {
          type: { type: String, default: undefined },
          music_size: { type: String, default: undefined },
          link: { type: String, default: undefined },
          text: { type: String, default: undefined },
          title: { type: String, default: "" },
          self_note: { type: String, default: "" },
          text_block_color: { type: String, default: undefined },
          show: { type: Boolean, default: true },
          count: { type: Boolean, default: false },
          percentage: { type: Boolean, default: false },
          voteAllowance: { type: Boolean, default: false },
          poll_list: [
            {
              value: {
                type: String,
                default: "",
              },
              count: {
                type: Number,
                default: 0,
              },
            },
          ],
        },
      ],
    },
    third_list: {
      show: { type: Boolean, default: false },
      data: [
        {
          type: { type: String, default: undefined },
          music_size: { type: String, default: undefined },
          link: { type: String, default: undefined },
          text: { type: String, default: undefined },
          title: { type: String, default: "" },
          self_note: { type: String, default: "" },
          text_block_color: { type: String, default: undefined },
          show: { type: Boolean, default: true },
          count: { type: Boolean, default: false },
          percentage: { type: Boolean, default: false },
          voteAllowance: { type: Boolean, default: false },
          poll_list: [
            {
              value: {
                type: String,
                default: "",
              },
              count: {
                type: Number,
                default: 0,
              },
            },
          ],
        },
      ],
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    verification_token: {
      type: String,
      select: false,
    },
    verification_token_time: {
      type: Date,
    },
    id_verified_date: {
      type: Date,
    },
    subscribe_date: {
      type: Date,
    },
    showBio: {
      type: Boolean,
      default: true,
    },
    showCanvas: {
      type: Boolean,
      default: true,
    },
    recent_activity: mongoose.Schema.Types.Mixed,
    canvas_bio: {
      display_name: {
        type: String,
        default: "",
      },
      title: {
        type: String,
        default: "",
      },
      location: {
        type: String,
        default: "",
      },
      free_text: {
        type: String,
        default: "",
      },
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;

  next();
});

userSchema.pre("save", async function (next) {
  if (this.isModified("identity_verified") && this.identity_verified === true) {
    this.id_verified_date = new Date();
  }

  if (
    this.isModified("plan") &&
    (this.plan === "pro_annually" || this.plan === "pro_monthly") &&
    !this.subscribe_date
  ) {
    this.subscribe_date = new Date();
  }

  next();
});

userSchema.pre("save", async function (next) {
  this.timeStamp = Date.now();

  next();
});

userSchema.post("save", async function () {
  const message = `Here is your 5 digit OTP : ${this.verification_token}`;

  // await sendEmail({
  //     email: this.email,
  //     subject: 'your 5 digit otp valid for 10 mins only',
  //     message
  // });
});

userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) {
    return next();
  }

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.methods.verifyPassword = async function (
  LoginPassword,
  signUpPassword
) {
  return await bcrypt.compare(LoginPassword, signUpPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimestamp < changedTimestamp;
  }

  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

// userSchema.methods.emailVerify = function () {
//     this.verification_token = random();
//     this.verification_token_time = Date.now() + 10 * 1000 * 60;
// }

const User = mongoose.model("User", userSchema);
module.exports = User;
