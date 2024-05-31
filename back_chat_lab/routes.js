const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

const productsController = require('./controllers/api/v1/productsController');
const productVariationsController = require('./controllers/api/v1/productVariationsController');

app.get('/api/v1/products', productsController.getAllProducts);
app.get('/api/v1/products/:id', productsController.getProduct);

app.get('/api/v1/product_variations', productVariationsController.getAllProductVariations);
app.get('/api/v1/products/:productId/variations/:variationId', productVariationsController.getProductVariationById);

module.exports = app;
