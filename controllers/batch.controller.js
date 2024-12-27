const Batch = require("../models/batch.model");
const Product = require("../models/product.model");

// Get all batches
exports.getAllBatches = async (req, res) => {
  try {
    const batches = await Batch.find().populate("productId");
    res.status(200).json({
      message: "Batches fetched successfully",
      success: true,
      data: batches,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching batches", error: err, success: false });
  }
};

// Create a new batch
exports.createBatch = async (req, res) => {
  try {
    const { productId, batchCode, quantityAvailable, expiryDate } = req.body;

    if (!productId || !batchCode || !quantityAvailable || !expiryDate) {
      return res.status(400).json({
        message:
          "Missing required fields: productId, batchCode, quantityAvailable, expiryDate",
        success: false,
      });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(400).json({
        message: "Invalid productId: Product not found",
        success: false,
      });
    }

    const batch = new Batch({
      productId,
      batchCode,
      quantityAvailable,
      expiryDate,
    });
    await batch.save();

    res.status(201).json({
      message: "Batch created successfully",
      success: true,
      data: batch,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error creating batch",
      error: err,
      success: false,
    });
  }
};

// Get batches by product
exports.getBatchesByProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    if (!productId) {
      return res
        .status(400)
        .json({ message: "Product ID is required", success: false });
    }

    const batches = await Batch.find({ productId })
      .populate("productId")
      .exec();

    if (!batches.length) {
      return res.status(404).json({
        message: "No batches found for the selected product",
        success: false,
      });
    }

    const transformedBatches = batches.map((batch) => ({
      _id: batch._id,
      name: batch.batchCode,
      productId: batch.productId,
      quantityAvailable: batch.quantityAvailable,
      expiryDate: batch.expiryDate,
    }));

    res.status(200).json({
      success: true,
      message: "Batches fetched successfully",
      data: transformedBatches,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error fetching batches",
      error: err,
      success: false,
    });
  }
};
