import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './components/productList';
import ProductDetails from './components/productDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/produto/:productId/variations/:variationId" element={<ProductDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
