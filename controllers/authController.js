const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const User = require("../models/userModel");
const AppInfo = require("../models/appInfoModel");
const AppError = require("../utils/appError");
const Mailer = require("../utils/email");
const random = require("../utils/utils");
const crypto = require("crypto");
const catchAsync = require("./../utils/catchAsync");
const { stringify } = require("querystring");
const axios = require('axios');

const signToken = (id) =>
  jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRESIN,
  });

const date = new Date();
exports.signUp = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    joined_date: date,
    referredBy: req.body.referredBy,
    email_verified: req.body.email_verified,
    identity_verified: req.body.identity_verified,
    balance: req.body.balance,
    image: req.body.image,
    cover_image: req.body.cover_image,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    url: crypto.randomBytes(8).toString("hex"),
    role: req.body.role,
    plan: req.body.plan,
    address: req.body.address,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    phone: req.body.phone,
    title: req.body.title,
    bio: req.body.bio,
    verification_token: crypto.randomBytes(20).toString("hex")
  });
  await Mailer.verificationEmail(newUser);

  const token = signToken(newUser._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRESIN * 24 * 60 * 60 * 1000
    ),
    httpOnly: false,
  };

  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);
  res.status(200).json({
    status: "success",
    token,
    data: {
      newUser,
    },
  });
  req.email = req.body.email;
  next();
});

exports.verify = async (req, res, next) => {
  try {
    const { verification_token } = req.body;
    const user = await User.findOne({ verification_token: verification_token });

    if (!user) {
      return res.status(404).json({message: "Token not valid"});
    }
 
    user.email_verified = true;
    user.verification_token = undefined
    await user.save()

    res.status(200).json({
      message: "Account verified successfully",
    });
  } catch (err) {
    res.status(422).json({ error: err.message });
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Please provide correct email and password", 400));
  }
  const user = await User.findOne({ email: email }).select("+password");

  if (user && user.email_verified === false){
    return res.status(200).json({
      status: "failure",
      message: "Please verify your email before logging in!"
    });
  }
  if (
    !user ||
    !(await user.verifyPassword(password, user.password)) /*||
      !user.verified*/
  ) {
    return next(new AppError("Unable to login! Invalid Credentials!", 400));
  }

  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRESIN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  try {

    res.cookie("jwt", token, cookieOptions);
    console.log(req.query);
    res.status(200).json({
      status: "success",
      token,
      data: {
        user,
      },
    });
  } catch (error) {
    console.log(error);
    return next(new AppError("Email Not Sent", 500));
  }
};

exports.logout = (req, res) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 1),
    // secure: true,
    httpOnly: true,
  });

  // if (process.env.NODE_ENV === "production") cookieOptions.secure = true;
  res.set("Cache-Control", "no-store"); // Add this line to prevent caching
  res.status(200).json({ status: "success" });
};

exports.protect = catchAsync(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  //console.log(token);

  if (!token) {
    return next(new AppError("Not Logged In", 401));
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  //console.log(decoded);

  const freshUser = await User.findById(decoded.id);
  if (!freshUser) {
    return next(new AppError("User For This Token Does Not Exist", 401));
  }

  if (freshUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError("User Recently Changed The Password. Login Again", 401)
    );
  }

  req.user = freshUser;
  // res.locals.user = freshUser;

  next();
});

exports.resend = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({
      email: email,
      verified: true,
    });
    if (user) {
      return next(new AppError("hahahaa got u", 400));
    }
    await User.findOneAndDelete({ email: email });
    res.status(204).json({
      status: "success",
      data: null,
    });
    next();
  } catch (err) {
    console.log(err);
  }
};

exports.isLoggedIn = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      const appInfo = await AppInfo.findOne();
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );
      res.locals.appInfo = appInfo;

      if (!decoded) {
        res.locals.user = undefined;
        return next();
      }
      const freshUser = await User.findById(decoded.id);

      if (!freshUser) {
        // res.locals.user = null;
        return next();
      }

      if (freshUser.changedPasswordAfter(decoded.iat)) {
        // res.locals.user = null;
        return next();
      }

      res.locals.user = freshUser;
      req.logged = freshUser;
      return next();
    } catch (err) {
      return next();
    }
  } else {
    res.locals.user = undefined;
  }

  next();
};

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError("Permission Denied", 403));
    }

    next();
  };
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({error: 'User not found'})
    }

    const resetToken = crypto.randomBytes(20).toString("hex");

    user.passwordResetToken = resetToken;
    user.passwordResetExpires = Date.now() + 10 * 60 * 1000;
    await user.save();
    await Mailer.forgetPasswordEmail(user, email, resetToken);

    res.json({ message: "Password reset email sent" });
  } catch (error) {
    return res.status(422).json({ error: error.message });
  }
};

exports.checkValidity = async (req, res) => {
  try {
    const { token } = req.params;
    const user = await User.findOne({
      passwordResetToken: token,
      passwordResetExpires: { $gt: Date.now() }

    });

    if (user) {
      return res.status(200).json({ status: "Valid" });
    } else {
      return res.status(404).json({ status: "Not Valid" });
    }
  } catch (error) {
    res.status(422).json({ error: error.message });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword, confirmNewPassword } = req.body;

    const user = await User.findOne({
      passwordResetToken: token
    });

    if (!user) {
      return res.status(404).json({ error: "Invalid reset token" });
    }

    if (newPassword !== confirmNewPassword) {
      return res
        .status(400)
        .json({ error: "New password and confirm password do not match" });
    }

    user.password = newPassword;
    user.passwordResetToken = undefined;
    await user.save();
    await Mailer.resetPasswordEmail(user);

    res.json({ message: "Password reset successful" });
  } catch (error) {
    res.status(422).json({ error: error.message });
  }
};

exports.updatePassword = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  if (!(await user.verifyPassword(req.body.passwordCurrent, user.password))) {
    return next(new AppError("Current Password Is Incorrect", 401));
  }

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;

  await user.save();
  const token = signToken(user._id);
  res.status(200).json({
    status: "success",
    token,
  });
});

exports.changePassword = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  if (!(await user.verifyPassword(req.body.oldPassword, user.password))) {
    // return next(new AppError("Current Password Is Incorrect", 401));
    res
      .status(200)
      .json({ status: "fail", oldPassword: "Old password is incorrect" });
    return next();
  }

  user.password = req.body.newPassword;
  await user.save();
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRESIN * 24 * 60 * 60 * 1000
    ),
    // secure: true,
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;
  res.cookie("jwt", token, cookieOptions);
  res.status(200).json({ status: "success", token, data: { user } });
});

exports.googleCallback = async(req, res) => {
  try {
    const request_user = req.user;
    var user = await User.findOne({ email: request_user.email })
    const date = new Date();
    if (!user){
      var user = await new User({
        joined_date: date,
        email_verified: true,
        first_name: request_user.given_name,
        last_name: request_user.family_name,
        url: crypto.randomBytes(8).toString("hex"),
        email: request_user.email,
        })
      await user.save({ validateBeforeSave: false });
    }
    const token = signToken(user._id);
    const cookieOptions = {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRESIN * 24 * 60 * 60 * 1000
      ),
      httpOnly: false,
    };

    if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

    res.cookie("jwt", token, cookieOptions);
    res.redirect("/feed");
  }
  catch(err){
    res.status(422).json({ error: err.message });
  }
};

exports.facebookLogin = catchAsync(async (req, res)=>{
  try {
    const urlParams = req.query;
    const access_token = await getAccessTokenFromCode(urlParams.code)
    data = await getFacebookUserData(access_token);
    if(data.email) {
      var user = await User.findOne({ email: data.email })
      if (!user){
        var user = await new User({
          joined_date: date,
          email_verified: true,
          identity_verified: true,
          balance: req.body.balance,
          image: req.body.image,
          first_name: data.first_name,
          last_name: data.last_name,
          url: crypto.randomBytes(8).toString("hex"),
          email: data.email,
          })
          await user.save({ validateBeforeSave: false });
      }
      const token = signToken(user._id);
      const cookieOptions = {
        expires: new Date(
          Date.now() + process.env.JWT_COOKIE_EXPIRESIN * 24 * 60 * 60 * 1000
        ),
        httpOnly: false,
      };

      if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

      res.cookie("jwt", token, cookieOptions);
      res.status(200).json({
        status: "success",
        token,
        data: {
          user,
        },
      });
    }
  }
  catch(err){
    res.status(422).json({ error: err.message });
  }
});

exports.facebookLoginUrl = (req, res,) => {
  const stringifiedParams = stringify({
    client_id: process.env.FACEBOOK_APP_ID,
    redirect_uri: process.env.FACEBOOK_REDIRECT_URL,
    scope: ['email', 'public_profile'].join(','), // comma seperated string
    response_type: 'code',
    auth_type: 'rerequest',
    display: 'popup',
  });
  res.status(200).json({ status: "success", data: { url: `https://www.facebook.com/v4.0/dialog/oauth?${stringifiedParams}` } });
};

async function getAccessTokenFromCode(code) {
  try {
  const response = await axios({
    url: 'https://graph.facebook.com/v4.0/oauth/access_token',
    method: 'get',
    params: {
      client_id: process.env.FACEBOOK_APP_ID,
      client_secret: process.env.FACEBOOK_APP_SECRET,
      redirect_uri: process.env.FACEBOOK_REDIRECT_URL,
      scope: ['email', 'public_profile'].join(','),
      code,
    },
  });
  return response.data.access_token;
  }
  catch(error) {
    console.log(error);
    return 'response.data.access_token;'
  }
};

async function getFacebookUserData(access_token) {
  const response  = await axios({
    url: 'https://graph.facebook.com/me',
    method: 'get',
    params: {
      fields: ['id', 'email', 'first_name', 'last_name'].join(','),
      access_token: access_token,
    },
  });
  return response.data;
};