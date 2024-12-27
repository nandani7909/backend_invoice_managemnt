const Customer = require('../models/customer.model');

// Get all customers
exports.getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.status(200).json({
      success: true,
      message: 'Customers fetched successfully',
      data: customers,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error fetching customers',
      error: err,
    });
  }
};

// Create a new customer
exports.createCustomer = async (req, res) => {
  try {
    const existingCustomer = await Customer.findOne({ email: req.body.email });
    if (existingCustomer) {
      return res.status(400).json({
        success: false,
        message: 'Customer with this email already exists',
      });
    }
    const customer = new Customer(req.body);
    await customer.save();
    res.status(201).json({
      success: true,
      message: 'Customer added successfully',
      data: customer,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error creating customer',
      error: err,
    });
  }
};
