import { useState } from 'react';

function QuickSearch({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchClick = () => {
    onSearch(searchTerm);
  };

  return (
    <div className="flex md-8">
      <div className="mt-3 flex-grow">
        <input
          type="text"
          name="search"
          id="search"
          className="block w-full rounded-md border-0 py-1.5 pr-14 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          onChange={handleInputChange}
          value={searchTerm}
        />
      </div>
      <div className="mt-3 ml-2">
        <button
          className="bg-gray-800 text-white py-2 px-4 rounded-md"
          onClick={handleSearchClick}
        >
          Pesquisar
        </button>
      </div>
    </div>
  );
}

export default QuickSearch;
