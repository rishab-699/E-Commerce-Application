import './App.css';
import Home from './pages/home/Home';
import Navbar from './components/navbar/Navbar';
import Products from './pages/products/Products';
import Singleproduct from './pages/singleProduct/Singleproduct';
import Login from './pages/auth/Auth'
import Orders from './pages/orders/Orders';
import Cart from './pages/cart/Cart';
import Wishlist from './pages/wishList/Wishlist';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Orderslists from './pages/orderlist/Orderslists';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/products?q=keyword' element={<Products />}/>
        <Route path='/products' element={<Products />}/>
        <Route path='/product/:id' element={<Singleproduct/>}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/cart' element={<Cart />}/>
        <Route path='/wishlist' element={<Wishlist />}/>
        <Route path='/order/:id' element={<Orders />}/>
        <Route path='/orderlist' element={<Orderslists />}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
