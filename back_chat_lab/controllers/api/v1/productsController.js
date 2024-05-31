const product = require('../../../models/product');
const productVariation = require('../../../models/productVariation');

async function getAllProducts(req, res) {
  try {
    const products = await product.findAll();
    const variations = await productVariation.findAll();
    
    const productsWithVariations = products.map(product => {
      const productVariations = variations.filter(variation => variation.productId === product.id);
      return {
        id: product.id,
        name: product.name,
        prices: product.prices,
        variations: productVariations
      };
    });

    res.json(productsWithVariations);
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    res.status(500).json({ error: 'Erro ao buscar produtos.' });
  }
}

async function getProduct(req, res) {
  try {
    const productId = req.params.id; 
    const productInfo = await product.findOne({ where: { id: productId } });

    if (!productInfo) {
      return res.status(404).json({ error: 'Produto não encontrado.' });
    }

    const variations = await productVariation.findAll({ where: { productId } });

    const productWithVariations = {
      id: productInfo.id,
      name: productInfo.name,
      prices: productInfo.prices,
      variations: variations
    };

    res.json(productWithVariations); 
  } catch (error) {
    console.error('Erro ao buscar informações do produto:', error);
    res.status(500).json({ error: 'Erro ao buscar informações do produto.' });
  }
}

module.exports = {
  getAllProducts,
  getProduct
};
