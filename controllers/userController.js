const jwt = require("jsonwebtoken");
const fs = require("fs");
const multer = require("multer");
const sharp = require("sharp");
const User = require("../models/userModel");
const catchAsync = require("./../utils/catchAsync");
const appError = require("./../utils/appError");
const crypto = require("crypto");
const factory = require("./handlerFactory");
const os = require("os");
const path = require("path");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const { stringify } = require("querystring");
const axios = require("axios");
const moment = require("moment");

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) {
      newObj[el] = obj[el];
    }
  });
  return newObj;
};

exports.getAllUsers = factory.getAll(User);

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.createProfileLink = catchAsync(async (req, res, next) => {
  if (!req.email) {
    return;
  }
  let email = req.email;
  let linkContent = email.split("@")[0];
  const user = await User.findOneAndUpdate(
    { email: req.email },
    {
      profilelink: linkContent,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  // res.status(200).json({ status: "success", data: { user: user } });
});
exports.updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new appError("Not For Password Updation. Use /updateMyPassword", 400)
    );
  }

  const filteredBody = filterObj(req.body, "name", "bio");
  if (req.file) {
    filteredBody.photo = req.file.filename;
  }
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ status: "success", data: { user: updatedUser } });
});

exports.deletePhoto = catchAsync(async (req, res, next) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    { photo: "" },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({ status: "success", data: { user: updatedUser } });
});

exports.updateLink = catchAsync(async (req, res, next) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    { profilelink: req.body.profilelink },
    {
      new: true,
      runValidators: true,
    }
  );

  // console.log(req.body.profilelink);

  res.status(200).json({ status: "success", data: { user: updatedUser } });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({ status: "success", data: null });
});

exports.getUser = factory.getOne(User, { path: "subscribers likedDeals" });

/////// this will be used when admin will add a user
exports.createUser = async (req, res) => {
  try {
    const url = crypto.randomBytes(8).toString("hex");
    const user = new User({
      ...req.body,
      url: url,
      joined_date: new Date(),
    });
    await user.save({ validateBeforeSave: false });
    res.status(201).json({ message: "User added successfully", data: user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.activeUsers = async (req, res, next) => {
  try {
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    const onlineUsers = await User.find({
      "recent_activity.online_at": { $gte: fiveMinutesAgo },
    });
    const pageCounts = [];

    onlineUsers.forEach((user) => {
      const page = user.recent_activity.last_visited_page;
      const existingPageCount = pageCounts.find((entry) => entry.page === page);
      if (existingPageCount) {
        existingPageCount.count++;
      } else {
        pageCounts.push({ page, count: 1 });
      }
    });

    pageCounts.sort((a, b) => b.count - a.count);
    const topPages = pageCounts.slice(0, 3);

    const locations = onlineUsers
      .filter((user) => user.recent_activity.location) // Filter out users without location
      .map((user) => ({
        lat: user.recent_activity.location.split(", ")[0],
        long: user.recent_activity.location.split(", ")[1],
        location: user.recent_activity.city || "",
        street: "",
        name: (user.first_name || "") + " " + (user.last_name || ""),
      }));

    res.status(200).json({
      count: onlineUsers.length,
      users: onlineUsers,
      topPages,
      locations: locations,
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return next(new appError("User not found!", 404));
    }
    user.set(req.body);

    await user.save();

    res.status(200).json({ message: "success", data: user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteUser = factory.deleteOne(User);

//////////////////////////////////////////////////////////////////////////////////////////////
/////// Needed Later For Image Uploads

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new appError("Not An Image. Upload An Image", 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadUserPhoto = upload.single("photo");

exports.exportUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  const selectedFields = [
    "first_name",
    "last_name",
    "email",
    "phone",
    "url",
    "plan",
    "role",
  ];

  const tempDir = path.join(os.tmpdir(), "csv_exports");
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir);
  }
  const csvFilePath = path.join(tempDir, "users.csv");

  const csvWriter = createCsvWriter({
    path: csvFilePath,
    header: selectedFields.map((field) => ({
      id: field,
      title: field.charAt(0).toUpperCase() + field.slice(1),
    })),
  });

  const selectedUsers = users.map((user) => {
    const selectedUser = {};
    selectedFields.forEach((field) => {
      selectedUser[field] = user[field];
    });
    return selectedUser;
  });

  csvWriter
    .writeRecords(selectedUsers)
    .then(() => {
      console.log("CSV file created successfully");
      res.sendFile(csvFilePath, {
        headers: {
          "Content-Disposition": `attachment; filename=users.csv`,
        },
      });
    })
    .catch((error) => {
      console.error("Error creating CSV file:", error);
      res.status(500).send("Internal Server Error");
    });
});

exports.showUser = catchAsync(async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    return res.status(200).json({ data: user });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

exports.deleteBulkUsers = catchAsync(async (req, res) => {
  try {
    const { userIDs } = req.body;
    const deleteResult = await User.deleteMany({ _id: { $in: userIDs } });

    if (deleteResult.deletedCount > 0) {
      res.status(200).json({ message: "Users deleted successfully" });
    } else {
      res.status(404).json({ message: "No users found for deletion" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) {
    return next();
  }

  const ext = req.file.mimetype.split("/")[1];
  req.file.filename = `user-${req.user.id}-${Date.now()}.${ext}`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/img/users/${req.file.filename}`);

  next();
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const uploadVideo = multer({ storage: storage });

exports.uploadVideo = uploadVideo.single("video");

exports.addUserVideo = catchAsync(async (req, res, next) => {
  const newVid = await User.create({
    video: req.file.filename,
  });

  res.status(201).json({
    status: "success",
    data: {
      newVid,
    },
  });
});

const profileImageStorage = multer.memoryStorage();

const profileImageFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new appError("Not An Image. Upload An Image", 400), false);
  }
};

const profileImageUpload = multer({
  storage: profileImageStorage,
  fileFilter: profileImageFilter,
});

exports.uploadProfileImage = profileImageUpload.single("image");

exports.resizeProfileImage = catchAsync(async (req, res, next) => {
  if (!req.file) {
    return next();
  }

  const ext = req.file.mimetype.split("/")[1];
  req.file.filename = `user-${req.user.id}-avatar`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/img/users/${req.file.filename}`);
  next();
});

exports.updateProfileImage = catchAsync(async (req, res, next) => {
  const filename = req.file.filename;

  await User.findByIdAndUpdate(
    req.user.id,
    { image: filename },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({ status: "success", image: filename });
});

const profileCoverImageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/img/users");
  },
  filename: function (req, file, cb) {
    const filename = "user-" + req.user.id + "-cover";
    cb(null, filename);
  },
});

const profileCoverImageUpload = multer({ storage: profileCoverImageStorage });

exports.uploadProfileCoverImage = profileCoverImageUpload.single("image");

exports.updateProfileCoverImage = catchAsync(async (req, res, next) => {
  const filename = req.file.filename;

  await User.findByIdAndUpdate(
    req.user.id,
    { cover_image: filename },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({ status: "success", image: filename });
});

exports.updateProfileLists = catchAsync(async (req, res, next) => {
  const filteredBody = {
    "first_list.show": req.body.first_list.show,
    "first_list.data": req.body.first_list.data,
    "second_list.show": req.body.second_list.show,
    "second_list.data": req.body.second_list.data,
    "third_list.show": req.body.third_list.show,
    "third_list.data": req.body.third_list.data,
  };

  await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  const url = req.user.url;

  res.status(200).json({ status: "success", link: url });
});

exports.updateProfileListData = catchAsync(async (req, res, next) => {
  const { first_list, second_list, third_list, pathname } = req.body;

  const user = await User.findOne({ last_name: pathname });

  if (user) {
    const filteredBody = {};

    if (first_list && first_list.data) {
      filteredBody["first_list.data"] = first_list.data;
    }

    if (second_list) {
      filteredBody["second_list.data"] = second_list.data;
    }

    if (third_list) {
      filteredBody["third_list.data"] = third_list.data;
    }

    await User.findByIdAndUpdate(user._id, filteredBody, {
      new: true,
      runValidators: true,
    });

    const url = user.url;

    res.status(200).json({ status: "success", link: url });
  } else {
    res
      .status(500)
      .json({ message: "Cannot find the user who created the poll" });
  }
});

exports.updateAccountSettings = catchAsync(async (req, res, next) => {
  const filteredBody = {
    showBio: req.body.showBio,
    showCanvas: req.body.showCanvas,
  };

  await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  const url = req.user.url;

  res.status(200).json({ status: "success", link: url });
});

exports.updateProfileSettings = catchAsync(async (req, res, next) => {
  const filteredBody = filterObj(
    req.body,
    "first_name",
    "last_name",
    "email",
    "phone",
    "address",
    "city",
    "state",
    "zip_code",
    "gender",
    "date_of_birth",
    "activity_status",
    "title",
    "bio"
  );

  await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ status: "success" });
});

exports.deleteAccount = catchAsync(async (req, res, next) => {
  await User.findByIdAndDelete(req.user.id);

  res.status(200).json({ status: "success" });
});

exports.updateBio = catchAsync(async (req, res, next) => {
  const filteredBody = filterObj(
    req.body,
    "canvas_bio.display_name",
    "canvas_bio.title",
    "canvas_bio.location",
    "canvas_bio.free_text",
    "use_real_name",
    "use_real_location"
  );

  await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ status: "success" });
});

exports.updateSocialListData = catchAsync(async (req, res, next) => {
  const filteredBody = {
    social_list: req.body.socialData,
  };

  await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  const url = req.user.url;

  res.status(200).json({ status: "success", link: url });
});

exports.birthdayToday = catchAsync(async (req, res, next) => {
  try {
    const today = new Date();
    const todayMonth = today.getMonth() + 1; // Month is zero-based, so add 1
    const todayDay = today.getDate();

    const pipeline = [
      {
        $addFields: {
          monthOfBirth: { $month: "$date_of_birth" },
          dayOfBirth: { $dayOfMonth: "$date_of_birth" },
        },
      },
      {
        $match: {
          monthOfBirth: todayMonth,
          dayOfBirth: todayDay,
        },
      },
      {
        $project: {
          first_name: 1,
          last_name: 1,
          url: 1,
          date_of_birth: 1,
        },
      },
    ];

    const users = await User.aggregate(pipeline);

    res.status(200).json({ status: "success", birthdays: users });
  } catch (error) {
    res.status(500).json(error.message);
  }
});
