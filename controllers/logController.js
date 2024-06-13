const Log = require("../models/logModel");
const catchAsync = require("./../utils/catchAsync");

exports.createLog = catchAsync(async (req, res, next) => {
  const date = new Date().getTime();
  const newLog = new Log({
    version: req.body.version,
    date: req.body.date,
    data: req.body.data,
    log_date: date,
  });

  newLog.save()
    .then(savedLog => {
      res.status(200).json({ status: "success" });
    })
    .catch(err => {
      console.error(err);
    });
});

exports.updateLog = catchAsync(async (req, res, next) => {
  const date = new Date().getTime();
  const newLog = {
    version: req.body.version,
    date: req.body.date,
    data: req.body.data,
    log_date: date,
  };
  Log.findOneAndUpdate({_id: req.body._id}, newLog, {new: true})
    .then(updatedLog => {
      res.status(200).json({ status: "success" });
    })
    .catch(err => {
      console.error(err);
    });
});

exports.removeLog = catchAsync(async (req, res, next) => {
  Log.findByIdAndDelete({_id: req.body._id})
    .then(removedLog => {
      res.status(200).json({ status: "success" });
    })
    .catch(err => {
      console.error(err);
    });
});
