const Fest = require("../../model/festModel");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

// Getting all fests
const getFests = async (req, res) => {
  try {
    const { status, search, startingDate, endingDate } = req.query;

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
      if (status === "active") {
        filter.isActive = true;
      } else {
        filter.isActive = false;
      }
    }

    if (search) {
      filter.code = { $regex: new RegExp(search, "i") };
    }

    const fests = await Fest.find(filter).sort({ createdAt: -1 });

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

    const fest = await Fest.findOne({ _id: id });

    return res.status(200).json({ fest });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Joining a fest
const joinFest = async (req, res) => {
  try {
    const token = req.cookies.user_token;
    const { id } = req.params;

    const { _id } = jwt.verify(token, process.env.SECRET);
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      throw Error("Invalid ID!!!");
    }

    const fest = await Fest.findOne({ _id: id });

    if (!fest) {
      throw Error("No fest");
    }

    if (fest.joiners.includes(_id)) {
      return res.status(400).json({ error: "User already joined the fest" });
    }

    fest.joiners.push(_id);

    await fest.save();

    return res.status(200).json({ fest });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Adding feedback to fest
const addFeedback = async (req, res) => {
  try {
    const token = req.cookies.user_token;
    const { id } = req.params;
    const { feedback } = req.body;

    const { _id } = jwt.verify(token, process.env.SECRET);
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      throw Error("Invalid ID!!!");
    }

    const fest = await Fest.findOne({ _id: id });

    if (!fest) {
      throw Error("No fest");
    }
    fest.feedback.push({ user: _id, message: feedback });

    await fest.save();

    return res.status(200).json({ fest });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getFests,
  getFest,
  joinFest,
  addFeedback,
};
