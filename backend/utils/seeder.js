const Product = require('../models/product');
const dotenv = require('dotenv');
const connectDatabase = require('../config/database');

const products = require('../data/products.json');

// Setting dotenv file...
dotenv.config({ path: 'backend/config/config.env'});

connectDatabase();

const seedProducts = async () => {
    try{

        await Product.deleteMany();
        console.log('Products are deleted.');

        await Product.insertMany();
        console.log('All Products are added.');

        process.exit();
        
    } catch{
        console.log(error.message);
        process.exit();
    }
}

seedProducts();