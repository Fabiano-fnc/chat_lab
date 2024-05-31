// Importa o módulo axios para fazer requisições HTTP
const axios = require('axios');

// URL do endpoint da API
const endpointUrl = 'http://85.31.60.80:26500/search';

// Função assíncrona para buscar produtos por nome
async function fetchProducts(productName) {
    try {
        // Faz uma requisição GET para o endpoint da API, passando o nome do produto como parâmetro
        const apiResponse = await axios.get(endpointUrl, {
            params: {
                text: productName
            }
        });
        // Imprime a resposta da API no console
        console.log(apiResponse)

        // Verifica o status da resposta da API
        if (apiResponse.status === 200) {

            // Se o status for 200 (OK), retorna os dados da resposta
            return apiResponse.data;
        } else if (apiResponse.status === 503) {
            // Se o status for 503 (Service Unavailable), imprime um erro e lança uma exceção
            console.error('Erro de Service Unavailable:', apiResponse.statusText);
            throw new Error(`Erro de Service Unavailable: ${apiResponse.statusText}`);
        } else {
            // Se o status for diferente de 200 e 503, lança uma exceção com o status da resposta
            throw new Error(`Erro na requisição: ${apiResponse.status}`);
        }
    } catch (error) {
        // Se ocorrer algum erro durante a requisição, imprime o erro e lança uma exceção
        console.error('Erro ao fazer a requisição:', error.message);
        throw error;
    }
}

// Exporta a função fetchProducts para ser usada em outros módulos
module.exports = { fetchProducts };