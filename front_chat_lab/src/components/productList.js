import QuickSearch from "./quickSearch";
import axios from 'axios';
import { useState, useEffect } from 'react';

function formatNumber(number) {
  let numStr = String(number);
  numStr = numStr.slice(0, 1) + '.' + numStr.slice(1);
  numStr = numStr.slice(0, 5) + ',' + numStr.slice(5);
  return numStr;
}

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  useEffect(() => {
    axios.get(`http://localhost:3000/api/v1/products`)
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Erro ao obter produtos:', error);
      });
  }, []);

  const handleClick = (id, variationId) => {
    window.location.href = `/produto/${id}/variations/${variationId}`;
  };

  const handleSearch = (searchTerm) => {
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-xl font-bold text-gray-900">Pesquisar Produtos</h2>
        <QuickSearch onSearch={handleSearch} />
        <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
          {(filteredProducts).map((product) => (
            
            <div key={product.id}>
              <div className="relative">
                <div className="relative h-72 w-full overflow-hidden rounded-lg">
                  <img
                    onClick={() => handleClick(product.id)}
                    src={product.variations[0]?.imageUrl}
                    alt={product?.imageAlt}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="relative mt-4">
                  <h3 className="text-sm font-medium text-gray-900">{product?.name}</h3>
                </div>
                <div className="absolute inset-x-0 top-0 flex h-72 items-end justify-end overflow-hidden rounded-lg p-4">
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50"
                  />
                  <p className="relative text-lg font-semibold text-white">Menor preço: R$ {formatNumber(product.prices?.min)}</p>
                </div>
              </div>
              <div className="mt-6">
                <button
                  onClick={() => handleClick(product?.id, product?.variations[0].id)}
                  className="relative flex items-center justify-center rounded-md border border-transparent bg-gray-100 px-8 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200"
                >
                  Ver Variações do Produto
                  <span className="sr-only"></span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
