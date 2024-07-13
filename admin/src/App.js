import './App.css';
import Navbar from './components/navbar/Navbar';
import Topbar from './components/topbar/Topbar';
import Home from './pages/home/Home';
import Productpg from './pages/product/Productpg';
import Editproducts from './pages/product/editproducts/Editproducts';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './pages/login/Login';
import Orders from './pages/orders/Orders';
import Orderdata from './components/orderdata/Orderdata';

function App() {
  const token = localStorage.getItem("adminAccess");
  return (
    <div className="App">
      {token?(<BrowserRouter>
      
      <Topbar />
      <div className="container">
        <Navbar />
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/products' element={<Productpg/>}/>
          <Route path='/addproducts' element={<Editproducts isEdit={true}/>}/>
          <Route path='/updateproducts/:id' element={<Editproducts isEdit={false}/>}/>
          <Route path='/Orders' element={<Orders/>}/>
          <Route path='/OrdersData/:id' element={<Orderdata/>}/>


        </Routes>
      </div>
      </BrowserRouter>):(<Login/>)}
      
    </div>
  );
}

export default App;
