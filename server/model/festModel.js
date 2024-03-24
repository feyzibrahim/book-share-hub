const mongoose = require("mongoose");

const festSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    location: {
      address: {
        type: String,
      },
      city: {
        type: String,
      },
      country: {
        type: String,
      },
    },
    start_date: {
      type: Date,
    },
    end_date: {
      type: Date,
    },
    website: {
      type: String,
    },
    organizer: {
      type: String,
    },
    guests: [
      {
        name: {
          type: String,
        },
        genre: { type: String },
        description: { type: String },
      },
    ],
  },
  { timestamps: true }
);

const Fest = mongoose.model("Fest", festSchema);

module.exports = Fest;
