// CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Components
import NavbarElement from "./components/navbar"

// Pages
import Login from './pages/Auth/login';
import Register from './pages/Auth/register';
import Shop from './pages/shop';
import AddProductPage from './pages/Listing/AddProduct';
import DetailedProductPage from './pages/detailedProductPage';

// React
import { Routes, Route } from "react-router-dom";
import { useFirebase } from './context/firebase';
import OrderPlace from './pages/OrderPlace';
import Blog from './pages/Blog';
import Home from './pages/Home';

function App() {
  const firebase = useFirebase();
  const props = firebase.propsDetailedProduct;
  return (
    <div>
      <NavbarElement />
      <div>
        <Routes>
          <Route path="/" element={<Shop />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/addproduct" element={<AddProductPage />} />
          <Route path='/orderplace' element={<OrderPlace/>} />
          <Route path="/detailedproductpage" element={<DetailedProductPage {...props} />} />
          <Route path='/guidlines' element={<Home/>} />
          <Route path='/blog/:id' element={<Blog/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
