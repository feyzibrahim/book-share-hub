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

// Creating new fest
const addFest = async (req, res) => {
  try {
    const body = req.body;
    console.log("file: festController.js:76 -> addFest -> body", body);
    const imgURL = req?.file?.filename;
    console.log("file: festController.js:78 -> addFest -> imgURL", imgURL);

    if (imgURL) {
      formData = { ...formData, image_url: imgURL };
    }

    const fest = await Fest.create(body);

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

    let formData = req.body;
    const imgURL = req?.file?.filename;
    console.log("file: festController.js:78 -> addFest -> imgURL", imgURL);

    if (imgURL) {
      formData = { ...formData, image_url: imgURL };
    }

    const fest = await Fest.findOneAndUpdate(
      { _id: id },
      { $set: { ...formData } },
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
