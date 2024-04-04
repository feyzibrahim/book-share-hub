const Product = require("../../model/productModel");
const mongoose = require("mongoose");

const getProducts = async (req, res) => {
  try {
    const {
      category,
      price,
      search,
      sort,
      page = 1,
      limit = 40,
      productType,
    } = req.query;

    let filter = {};
    if (category) filter.category = { $in: category.split(",") };
    if (search) {
      filter.name = { $regex: new RegExp(search, "i") };
    }
    if (price) {
      if (price === "Under 250") {
        filter.price = { $lte: 250 };
      }
      if (price === "250-500") {
        filter.price = { $gte: 250, $lte: 500 };
      }
      if (price === "500-1000") {
        filter.price = { $gte: 500, $lte: 1000 };
      }
      if (price === "1000-1500") {
        filter.price = { $gte: 1000, $lte: 1500 };
      }
      if (price === "2000-3000") {
        filter.price = { $gte: 2000, $lte: 3000 };
      }
      if (price === "Above 3000") {
        filter.price = { $gte: 3000 };
      }
    }

    let sortOptions = {};

    if (sort === "created-desc") {
      sortOptions.createdAt = 1;
    }

    if (sort === "price-asc") {
      sortOptions.price = 1;
    }
    if (sort === "price-desc") {
      sortOptions.price = -1;
    }
    if (!sort) {
      sortOptions.createdAt = -1;
    }

    if (productType) {
      filter.productType = productType;
    }

    const skip = (page - 1) * limit;
    const products = await Product.find(
      {
        status: { $in: ["published", "low quantity"] },
        ...filter,
      },
      {
        name: 1,
        imageURL: 1,
        price: 1,
        markup: 1,
        numberOfReviews: 1,
        rating: 1,
        offer: 1,
        productType: 1,
      }
    )
      .sort(sortOptions)
      .skip(skip)
      .limit(parseInt(limit))
      .populate("category", { name: 1 });

    const totalAvailableProducts = await Product.countDocuments({
      status: { $in: ["published", "low quantity"] },
      ...filter,
    });

    res.status(200).json({ products, totalAvailableProducts });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw Error("Invalid ID!!!");
    }

    const product = await Product.findOne({ _id: id })
      .populate("category", {
        name: 1,
      })
      .populate("createdBy", {
        firstName: 1,
        lastName: 1,
        email: 1,
        role: 1,
        profileImgURL: 1,
        profileImageURL: 1,
      });

    res.status(200).json({ product });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAvailableQuantity = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw Error("Invalid ID!!!");
    }

    const stockQuantity = await Product.findOne(
      { _id: id },
      { stockQuantity: 1 }
    );

    res.status(200).json({ stockQuantity: stockQuantity.stockQuantity });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getProducts,
  getProduct,
  getAvailableQuantity,
};
