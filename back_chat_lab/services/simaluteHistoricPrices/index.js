const productVariation = require('../../models/productVariation');

async function simulateHistoricPrices() {
  try {
    const variationsData = await productVariation.findAll();
    const historicPrices = 33213

      if (variationsData) {
        for (const variationData of variationsData) {
          try {
            variationData.push(historicPrices)
          
              console.log('Nova variação salva:', newVariation.toJSON());
          } catch (error) {
              console.error('Erro ao salvar a variação:', error);
          }
        }
      }

      console.log('Produtos salvos com sucesso no banco de dados');
  } catch (error) {
      console.error('Erro ao salvar produtos no banco de dados:', error.message);
      throw error;
  }
}

module.exports = { simulateHistoricPrices };