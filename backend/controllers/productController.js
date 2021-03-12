const Product = require('../models/product');

// Create new product => /api/v1/product/new


exports.getProducts = (req, res, next) => {
    res.status(200).json({
        success: true,
        message: "This route will show all products in the database."
    })
}