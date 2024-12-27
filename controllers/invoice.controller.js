const Invoice = require("../models/invoice.model");

// Get all invoices
exports.getAllInvoices = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const { search } = req.query;

    const searchCriteria = {};

    if (search) {
      searchCriteria.$or = [
        { invoiceNumber: { $regex: search, $options: "i" } },
        { invoiceType: { $regex: search, $options: "i" } },
        { "customerId.name": { $regex: search, $options: "i" } },
      ];
    }

    const invoices = await Invoice.find(searchCriteria)
      .populate("customerId")
      .populate("products.productId")
      .skip(skip)
      .limit(limit);

    const totalInvoices = await Invoice.countDocuments(searchCriteria);
    const totalPages = Math.ceil(totalInvoices / limit);

    if (invoices.length === 0) {
      return res.status(404).json({
        status: "failed",
        success: false,
        message: "No invoices found",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Invoices fetched successfully",
      data: invoices,
      pagination: {
        totalInvoices,
        totalPages,
        currentPage: page,
        limit,
      },
    });
  } catch (err) {
    return res.status(500).json({
      status: "failed",
      success: false,
      message: "Error fetching invoices",
      error: err.message || err,
    });
  }
};

// Create a new invoice
exports.createInvoice = async (req, res) => {
  try {
    const uniqueInvoiceNumber = `INV-${Math.floor(Math.random() * 100000)}`;

    req.body.invoiceNumber = uniqueInvoiceNumber;

    const invoice = new Invoice(req.body);
    await invoice.save();
    res.status(201).json({
      data: invoice,
      status: "success",
      message: "Invoice created successfully",
    });
  } catch (err) {
    res
      .status(500)
      .json({
        message: "Error creating invoice",
        error: err,
        status: "failed",
      });
  }
};

// Update an invoice
exports.updateInvoice = async (req, res) => {
  try {
    const updatedInvoice = await Invoice.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedInvoice);
  } catch (err) {
    res.status(500).json({ message: "Error updating invoice", error: err });
  }
};

// Delete an invoice
exports.deleteInvoice = async (req, res) => {
  try {
    await Invoice.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json({ status: "success", message: "Invoice deleted successfully" });
  } catch (err) {
    res.status(500).json({
      status: "failed",
      message: "Error deleting invoice",
      error: err,
    });
  }
};

// Get invoice by ID
exports.getInvoiceById = async (req, res) => {
  try {
    const invoiceId = req.params.id;
    const invoice = await Invoice.findById(invoiceId)
      .populate("customerId")
      .populate("products.productId");

    if (!invoice) {
      return res.status(404).json({
        status: "failed",
        message: "Invoice not found",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Invoice fetched successfully",
      data: invoice,
    });
  } catch (err) {
    return res.status(500).json({
      status: "failed",
      message: "Error fetching invoice",
      error: err.message || err,
    });
  }
};
