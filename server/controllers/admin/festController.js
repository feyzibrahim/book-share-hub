const Fest = require("../../model/festModel");
const mongoose = require("mongoose");
const { sendFestivalAnnouncementEmail } = require("../../util/mailFunction");
const User = require("../../model/userModel");

// Getting all fests
const getFests = async (req, res) => {
  try {
    const {
      status,
      search,
      page = 1,
      limit = 10,
      startingDate,
      endingDate,
    } = req.query;

    let filter = {};
    // Date
    if (startingDate) {
      const date = new Date(startingDate);
      filter.createdAt = { $gte: date };
    }
    if (endingDate) {
      const date = new Date(endingDate);
      filter.createdAt = { ...filter.createdAt, $lte: date };
    }

    if (status) {
      filter.status = status;
    }

    if (search) {
      filter.code = { $regex: new RegExp(search, "i") };
    }

    const skip = (page - 1) * limit;

    const fests = await Fest.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalAvailableFests = await Fest.countDocuments(filter);

    return res.status(200).json({ fests, totalAvailableFests });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Getting one fest with URL params
const getFest = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw Error("Invalid ID!!!");
    }

    const fest = await Fest.findOne({ _id: id }).populate({
      path: "feedback",
      populate: {
        path: "user",
        model: "User",
        select: "email firstName lastName profileImageURL",
      },
    });

    return res.status(200).json({ fest });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Creating new fest
const addFest = async (req, res) => {
  try {
    const { start_date, time, ...rest } = req.body;

    const startDateWithTime = new Date(`${start_date}T${time}`);

    const festData = {
      time: startDateWithTime,
      ...rest,
    };

    const fest = await Fest.create(festData);

    const users = await User.find({
      role: { $in: ["buyer", "renter", "publisher"] },
    });

    // Extract emails from the users
    const emails = users.map((user) => user.email);

    emails.map((em) => {
      sendFestivalAnnouncementEmail(em, start_date, time, fest.name);
    });

    return res.status(200).json({ fest });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Editing existing fests
const editFest = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw Error("Invalid ID!!!");
    }

    const fest = await Fest.findOneAndUpdate(
      { _id: id },
      { $set: { ...req.body } },
      { new: true }
    );

    if (!fest) {
      throw Error("No such Fest");
    }

    res.status(200).json({ fest });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Deleting a fest testing only
const deleteFest = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw Error("Invalid ID!!!");
    }

    const fest = await Fest.findOneAndDelete({ _id: id });

    if (!fest) {
      throw Error("No such Fest");
    }

    res.status(200).json({ fest });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getFests,
  getFest,
  addFest,
  editFest,
  deleteFest,
};
