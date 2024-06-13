const AppInfo = require("../models/appInfoModel");
const multer = require("multer");

exports.updateAppInfo = async (req, res) => {
  const body = req.body;

  try {
    let appInfo = await AppInfo.findOne();

    if (!appInfo) {
      appInfo = new AppInfo(body);
    } else {
      appInfo.set(body);
    }

    await appInfo.save();

    res.status(200).json({ status: 'success', data: appInfo });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const appLogoStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/img");
  },
  filename: function (req, file, cb) {
    const filename = "web-app-logo";
    cb(null, filename);
  },
});

const appLogoUpload = multer({ storage: appLogoStorage });

exports.uploadAppLogo = appLogoUpload.single("image");

exports.updateAppLogo = async (req, res, next) => {
  let appInfo = await AppInfo.findOne();

  try {
    if(!req.file) {
      return res.status(400).json({error: "Please upload a file"})
    }

    const filename = req.file.filename;

    if (!appInfo) {
      appInfo = new AppInfo({app_logo: filename});
    } else {
      appInfo.set({app_logo: filename});
    }

    await appInfo.save();

    res.status(200).json({ status: "success", image: filename });
  } catch(error) {
    res.status(500).json({ error: error.message });
  }
};

const appLogoSymbolStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/img");
  },
  filename: function (req, file, cb) {
    const filename = "web-app-logo-symbol";
    cb(null, filename);
  },
});

const appLogoSymbolUpload = multer({ storage: appLogoSymbolStorage });

exports.uploadAppLogoSymbol = appLogoSymbolUpload.single("image");

exports.updateAppLogoSymbol = async (req, res, next) => {
  let appInfo = await AppInfo.findOne();

  try {
    if(!req.file) {
      return res.status(400).json({error: "Please upload a file"})
    }
    
    const filename = req.file.filename;

    if (!appInfo) {
      appInfo = new AppInfo({app_logo_symbol: filename});
    } else {
      appInfo.set({app_logo_symbol: filename});
    }

    await appInfo.save();

    res.status(200).json({ status: "success", image: filename });
  } catch(error) {
    res.status(500).json({ error: error.message });
  }
};