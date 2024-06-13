const catchAsync = require("./../utils/catchAsync");
const appError = require("./../utils/appError");
const APIFeatures = require("./../utils/apiFeatures");
const User = require("../models/userModel");

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new appError("No Document With That Id", 404));
    }

    res.status(204).json({ status: "success", data: null });
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return next(new appError("No Document With That Id", 404));
    }

    res.status(200).json({ status: "success", data: { data: doc } });
  });

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);

    res.status(201).json({ status: "success", data: { data: doc } });
  });

exports.getOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (popOptions) {
      query = query.populate(popOptions);
    }
    const doc = await query;

    if (!doc) {
      return next(new appError("No Document With That Id", 404));
    }

    res.status(200).json({ status: "success", data: { data: doc } });
  });

exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    let filter = {};
    if (req.params.dealId) {
      filter = { deal: req.params.dealId };
      if (!(await Deal.findById(req.params.dealId))) {
        return next(new appError("Deleted deal or some internal error", 404));
      }
    }

    if (req.params.userId) {
      filter = { user: req.params.userId };
      if (!(await User.findById(req.params.userId))) {
        return next(
          new appError("Deleted account or some internal error", 404)
        );
      }
    }

    if (req.query.search) {
      const searchQuery = req.query.search;
      filter = {
        $or: [
          { first_name: { $regex: searchQuery, $options: 'i' } },
          { last_name: { $regex: searchQuery, $options: 'i' } }
        ],
      };
    }

    const features = new APIFeatures(Model.find(filter), req.query)
      .sort()
      .limitFields()
      .paginate();

    const doc = await features.query;
    // const doc = await features.query.explain();

    res
      .status(200)
      .json({ status: "success", results: doc.length, data: { data: doc } });
  });
