const productVariation = require('../../../models/productVariation');

async function getAllProductVariations(req, res) {
  try {
    const variations = await productVariation.findAll();

    res.json(variations);
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    res.status(500).json({ error: 'Erro ao buscar produtos.' });
  }
}

async function getProductVariationById(req, res) {
  const { productId, variationId } = req.params;

  try {
    const variation = await productVariation.findOne({
      where: {
        productId: productId,
        id: variationId
      }
    });

    if (!variation) {
      return res.status(404).json({ error: 'Variação não encontrada.' });
    }

    res.json(variation);
  } catch (error) {
    console.error('Erro ao buscar variação:', error);
    res.status(500).json({ error: 'Erro ao buscar variação.' });
  }
}


module.exports = {
  getProductVariationById,
  getAllProductVariations
};
