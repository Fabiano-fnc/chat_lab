const product = require('../../models/product'); 
const productVariation = require('../../models/productVariation');
const { fetchProducts } = require('../getProducts');

async function saveProductsToDatabase(productName) {
  try {
    // Busca os dados do produto a partir da API externa usando a função fetchProducts
      const productsData = await fetchProducts(productName); 
      // Extrai o título do produto, os preços e os dados das variações do objeto retornado pela API
      const productTitle = productsData.data.title;
      const productPrices = productsData.data.prices;
      const variationsData = productsData.data.products      
      const existingProduct = await product.findOne({
        where: {
          name: productTitle
        }
      });

      // Se o produto não existe, cria um novo registro no banco de dados
      if (!existingProduct) {
        const productCreate = await product.create({
          name: productTitle,
          prices: productPrices
        });

        // Itera sobre cada variação de produto e cria um novo registro na tabela de variações
        for (const variationData of variationsData) {
          try {
              const newVariation = await productVariation.create({
                imageUrl: variationData.image_url,
                price: variationData.price,
                title: variationData.title,
                sellerName: variationData.seller,
                sellerUrl: variationData.seller_url,
                rating: variationData.rating,
                scrapedFromUrl: variationData.scraped_from_url,
                productId: productCreate.id
              });
          
              // Exibe uma mensagem de sucesso ao salvar a variação
              console.log('Nova variação salva:', newVariation.toJSON());
          } catch (error) {
            // Exibe uma mensagem de erro se não for possível salvar a variação
              console.error('Erro ao salvar a variação:', error);
          }
        }
      }

      // Exibe uma mensagem de sucesso ao salvar o produto e suas variações no banco de dados
      console.log('Produtos salvos com sucesso no banco de dados');
  } catch (error) {
      // Exibe uma mensagem de erro se ocorrer algum problema ao salvar os produtos no banco de dados
      console.error('Erro ao salvar produtos no banco de dados:', error.message);
      throw error;
  }
}

// Exporta a função saveProductsToDatabase para que possa ser usada em outras partes do projeto
module.exports = { saveProductsToDatabase };