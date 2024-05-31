const Product = require('./models/Product');

async function testeSalvarProduto() {
    try {
        const novoProduto = await Product.create({
            name: 'Notebook',
            price: 1500,
            description: 'Um notebook poderoso para suas necessidades de computação.'
        });

        console.log('Novo produto salvo:', novoProduto.toJSON());
    } catch (error) {
        console.error('Erro ao salvar o produto:', error);
    }
}

testeSalvarProduto();
