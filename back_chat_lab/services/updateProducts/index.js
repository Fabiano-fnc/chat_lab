const product = require('../../models/product'); 
const productVariation = require('../../models/productVariation');
const bcrypt = require('bcrypt');
const { fetchProducts } = require('../getProducts');

async function updateProducts(productName) {
  try {
    const productsData = await fetchProducts(productName); 
    const productTitle = productsData.data.title;
    const newProductPrice = productsData.data.prices;
    const variationsData = productsData.data.products;

    const existingProduct = await product.findOne({
      where: {
        name: productTitle
      }
    });
    
    if (existingProduct) {
      const existingPrice = existingProduct.prices;

      bcrypt.compare(existingPrice, newProductPrice, function(err, equal) {
        if (!equal) {
          existingProduct.update({prices: newProductPrice})
        }
      });


      for (const variationData of variationsData) {
        const existingVariation = await productVariation.findOne({
          where: {
            productId: existingProduct.id,
            title: variationData.title
          }
        });
        
        if (existingVariation) {
          if (existingVariation.price != variationData.price) {
            let historicPrices = [];
            if (existingVariation.historicPrices === null) {
              historicPrices = [variationData.price];
            } else {  
              historicPrices = [...existingVariation.historicPrices, variationData.price];
            }
            await existingVariation.update({ price: variationData.price, historicPrices: historicPrices });
          }

          if (existingVariation.rating != variationData.rating) {
            await existingVariation.update({ rating: variationData.rating });
          }

          console.log('Variação atualizada:', existingVariation.toJSON());
        }
      }
    } else {
      console.error('Produto não encontrado:', productTitle);
    }
  } catch (error) {
    console.error('Erro ao atualizar preços no banco de dados:', error.message);
    throw error;
  }
}

module.exports = { updateProducts };
