const Product = require("../../model/productModel");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

// Getting all products to list on admin dashboard
const getProducts = async (req, res) => {
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

    if (status) {
      filter.status = status;
    }
    if (search) {
      filter.name = { $regex: new RegExp(search, "i") };
    }
    const skip = (page - 1) * limit;

    // Getting products based on user role

    const token = req.cookies.user_token;

    const { _id, role } = jwt.verify(token, process.env.SECRET);

    if (role === "renter" || role === "publisher") {
      filter.createdBy = _id;
    }

    // Date
    if (startingDate) {
      const date = new Date(startingDate);
      filter.createdAt = { $gte: date };
    }
    if (endingDate) {
      const date = new Date(endingDate);
      filter.createdAt = { ...filter.createdAt, $lte: date };
    }

    const products = await Product.find(filter, {
      attributes: 0,
      moreImageURL: 0,
    })
      .skip(skip)
      .limit(limit)
      .populate("category", { name: 1 })
      .populate("createdBy");

    const totalAvailableProducts = await Product.countDocuments(filter);

    res.status(200).json({ products, totalAvailableProducts });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get single Product
const getProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw Error("Invalid ID!!!");
    }

    const product = await Product.findOne({ _id: id });

    if (!product) {
      throw Error("No Such Product");
    }

    res.status(200).json({ product });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Creating new Product
const addProduct = async (req, res) => {
  try {
    let formData = { ...req.body, isActive: true };
    const files = req?.files;

    const attributes = JSON.parse(formData.attributes);

    formData.attributes = attributes;

    const token = req.cookies.user_token;

    const { _id } = jwt.verify(token, process.env.SECRET);
    formData.createdBy = _id;

    if (files && files.length > 0) {
      formData.moreImageURL = [];
      formData.imageURL = "";
      files.map((file) => {
        if (file.fieldname === "imageURL") {
          formData.imageURL = file.filename;
        } else {
          formData.moreImageURL.push(file.filename);
        }
      });
    }

    const product = await Product.create(formData);
    const newProduct = await Product.findOne({ _id: product._id }).populate(
      "createdBy"
    );

    res.status(200).json({ product: newProduct });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a Product
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const formData = req.body;
    console.log("Updation: ", formData);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw Error("Invalid ID!!!");
    }

    const files = req?.files;

    if (files && files.length > 0) {
      formData.moreImageURL = [];
      formData.imageURL = "";
      files.map((file) => {
        if (file.fieldname === "imageURL") {
          formData.imageURL = file.filename;
        } else {
          formData.moreImageURL.push(file.filename);
        }
      });

      if (formData.imageURL === "") {
        delete formData.imageURL;
      }

      if (formData.moreImageURL.length === 0 || formData.moreImageURL === "") {
        delete formData.moreImageURL;
      }
    }

    if (formData.moreImageURL === "") {
      formData.moreImageURL = [];
    }

    if (formData.attributes) {
      const attributes = JSON.parse(formData.attributes);
      formData.attributes = attributes;
    }

    const product = await Product.findOneAndUpdate(
      { _id: id },
      { $set: { ...formData } },
      { new: true }
    );

    if (!product) {
      throw Error("No Such Product");
    }

    res.status(200).json({ product });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Deleting a Product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw Error("Invalid ID!!!");
    }

    const product = await Product.findOneAndDelete({ _id: id });

    if (!product) {
      throw Error("No Such Product");
    }

    res.status(200).json({ product });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getProducts,
  getProduct,
  addProduct,
  deleteProduct,
  updateProduct,
};
