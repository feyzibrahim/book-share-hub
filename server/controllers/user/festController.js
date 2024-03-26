const Fest = require("../../model/festModel");
const mongoose = require("mongoose");

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
      if (status === "active") {
        filter.isActive = true;
      } else {
        filter.isActive = false;
      }
    }

    if (search) {
      filter.code = { $regex: new RegExp(search, "i") };
    }

    const skip = (page - 1) * limit;

    const fests = await Fest.find(filter, {
      description: 0,
    })
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

    const fest = await Fest.findOne({ _id: id });

    return res.status(200).json({ fest });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getFests,
  getFest,
};
