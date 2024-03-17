const mongoose = require("mongoose");
const Category = require("../model/categoryModel");
const User = require("./userModel");
const { Schema } = mongoose;

const productsSchema = new Schema(
  {
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    stockQuantity: {
      type: Number,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: Category,
    },
    imageURL: {
      type: String,
    },
    price: {
      type: Number,
    },
    markup: {
      type: Number,
    },
    status: {
      type: String,
      enum: [
        "draft",
        "published",
        "out of stock",
        "low quantity",
        "unpublished",
      ],
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: User,
    },
    productType: {
      type: String,
      enum: ["sell", "rent"],
    },
    attributes: [
      {
        name: {
          type: String,
        },
        value: {
          type: String,
        },
        isHighlight: {
          type: Boolean,
        },
      },
    ],
    moreImageURL: [
      {
        type: String,
      },
    ],
    isActive: {
      type: Boolean,
    },
    rating: {
      type: Number,
    },
    numberOfReviews: {
      type: Number,
    },
    offer: {
      type: Number,
    },
  },
  { timestamps: true }
);

const Products = mongoose.model("Products", productsSchema);

module.exports = Products;
