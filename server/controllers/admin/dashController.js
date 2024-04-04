const Order = require("../../model/orderModel");
const User = require("../../model/userModel");
const moment = require("moment");
const jwt = require("jsonwebtoken");
const Mongoose = require("mongoose");

// Reading the admin Dashboard sales chart data
const readRevenueData = async (req, res) => {
  try {
    const numberOfDates = req.query.numberOfDates || 7;
    const token = req.cookies.user_token;
    const { _id, role } = jwt.verify(token, process.env.SECRET);

    const matchStage = {
      $match: {
        createdAt: {
          $gte: moment().subtract(numberOfDates, "days").toDate(),
          $lte: new Date(),
        },
      },
    };

    let lookupStage = [
      {
        $lookup: {
          from: "products",
          localField: "products.productId",
          foreignField: "_id",
          as: "productDetails",
        },
      },
    ];

    if (role !== "superAdmin") {
      lookupStage.push({
        $match: {
          "productDetails.createdBy": new Mongoose.Types.ObjectId(_id),
        },
      });
    }

    const totalSales = await Order.aggregate([
      matchStage,
      ...lookupStage,
      {
        $group: {
          _id: null,
          totalSales: { $sum: "$totalPrice" },
        },
      },
    ]);

    const eachDayData = await Order.aggregate([
      matchStage,
      ...lookupStage,
      {
        $unwind: "$products",
      },
      {
        $group: {
          _id: {
            date: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
            orderId: "$_id",
          },
          totalSum: { $sum: "$totalPrice" },
          totalMarkup: { $sum: "$products.markup" },
        },
      },
      {
        $group: {
          _id: "$_id.date",
          totalSum: { $sum: "$totalSum" },
          totalMarkup: { $sum: "$totalMarkup" },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]);

    const salesSum = totalSales[0];

    return res.status(200).json({ salesSum, eachDayData });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Reading the count of users
const readUserCount = async (req, res) => {
  try {
    const numberOfDates = req.query.numberOfDates || 7;

    const userCount = await User.find({
      role: { $in: ["buyer", "renter", "publisher"] },
    }).count();

    const userCountsByDay = await User.aggregate([
      {
        $match: {
          role: { $in: ["buyer", "renter", "publisher"] },
          createdAt: {
            $gte: moment().subtract(numberOfDates, "days").toDate(),
            $lte: new Date(),
          },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    return res.status(200).json({ userCount, userCountsByDay });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Reading the total count of products sold, and products sold on each day
const readSalesData = async (req, res) => {
  try {
    const token = req.cookies.user_token;
    const { _id, role } = jwt.verify(token, process.env.SECRET);

    const numberOfDates = req.query.numberOfDates || 7;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - numberOfDates);

    let matchStage = { $match: { createdAt: { $gte: startDate } } };

    let lookupStage = [
      {
        $lookup: {
          from: "products",
          localField: "products.productId",
          foreignField: "_id",
          as: "productsDetails",
        },
      },
    ];

    if (role !== "superAdmin") {
      lookupStage.push({
        $match: {
          "productsDetails.createdBy": new Mongoose.Types.ObjectId(_id),
        },
      });
    }

    const unwindStage = { $unwind: "$products" };

    const groupStage = {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
        totalProductsCount: { $sum: "$products.quantity" },
      },
    };

    const sortStage = { $sort: { _id: 1 } };

    const aggregationPipeline = [
      matchStage,
      ...lookupStage,
      unwindStage,
      groupStage,
      sortStage,
    ];

    const productsByDay = await Order.aggregate(aggregationPipeline);

    let totalProductsCount = 0;
    productsByDay.forEach((day) => {
      totalProductsCount += day.totalProductsCount;
    });

    return res.status(200).json({ totalProductsCount, productsByDay });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const readProfitData = async (req, res) => {
  try {
    const token = req.cookies.user_token;
    const { _id, role } = jwt.verify(token, process.env.SECRET);

    const numberOfDates = req.query.numberOfDates || 7;
    const query = {};
    const startDate = new Date();

    if (numberOfDates !== null) {
      startDate.setDate(startDate.getDate() - numberOfDates);
      query.createdAt = { $gte: startDate };
    }

    const lookupStage = [
      {
        $lookup: {
          from: "products",
          localField: "products.productId",
          foreignField: "_id",
          as: "productsDetails",
        },
      },
    ];

    if (role !== "superAdmin") {
      lookupStage.push({
        $match: {
          "productsDetails.createdBy": new Mongoose.Types.ObjectId(_id),
        },
      });
    }

    const profit = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate },
        },
      },
      ...lookupStage,
      {
        $group: {
          _id: null,
          totalMarkupSum: { $sum: "$totalPrice" },
        },
      },
    ]);

    const profitByDay = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate },
        },
      },
      ...lookupStage,
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
          dailyMarkupSum: { $sum: "$totalPrice" },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);
    const totalProfit = profit[0];
    return res.status(200).json({ totalProfit, profitByDay });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Reading the best 5 most sold products
const readMostSoldProducts = async (req, res) => {
  try {
    const numberOfDates = req.query.numberOfDates || 7;
    const limit = req.query.limit || 5;
    const startDate = new Date();

    if (numberOfDates !== null) {
      startDate.setDate(startDate.getDate() - numberOfDates);
    }

    const mostSoldProducts = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate },
        },
      },
      {
        $unwind: "$products",
      },
      {
        $group: {
          _id: "$products.productId",
          totalQuantitySold: { $sum: "$products.quantity" },
        },
      },
      {
        $sort: {
          totalQuantitySold: -1,
        },
      },
      {
        $limit: limit,
      },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      {
        $unwind: "$productDetails",
      },
      {
        $project: {
          _id: "$productDetails._id",
          name: "$productDetails.name",
          totalQuantitySold: "$totalQuantitySold",
        },
      },
    ]);

    return res.status(200).json({ mostSoldProducts });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  readRevenueData,
  readUserCount,
  readSalesData,
  readProfitData,
  readMostSoldProducts,
};
