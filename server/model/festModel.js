const mongoose = require("mongoose");
const User = require("./userModel");

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
    time: {
      type: String,
    },
    website: {
      type: String,
    },
    contactInfo: {
      type: String,
    },
    sponsor: [
      {
        type: String,
      },
    ],
    organizer: {
      type: String,
    },
    status: {
      type: String,
      enum: ["booking started", "started", "expired"],
      default: "booking started",
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
    feedback: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: User,
        },
        message: {
          type: String,
        },
      },
    ],
    joiners: [String],
  },
  { timestamps: true }
);

const Fest = mongoose.model("Fest", festSchema);

module.exports = Fest;
