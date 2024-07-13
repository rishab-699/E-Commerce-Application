import React, { useState } from 'react'
import logo from '../../media/LOGO.svg'
import './navbar.css';
import {Link} from 'react-router-dom';

export default function Navbar() {
  const [userfunction, setUserfunction] = useState(false);
  const [categoryfunction, setCategoryfunction] = useState(true);
  const [searchfunction, setSearchfunction] = useState(true);
  const userInfo = JSON.parse(localStorage.getItem("userAccess"));
  const HandleUserClick = ()=>{
    setUserfunction(prevuserfunction => !prevuserfunction);
  }
  const HandburgerClick = ()=>{
    setCategoryfunction(prevcategoryfunction => !prevcategoryfunction)
  }
  const SearchClick = ()=>{
    setSearchfunction(prevsearchfunction => !prevsearchfunction)
  
  }
  return (
    <div className='navbar'>
      <div className="left">
        <Link className='linked' to='/'><img src={logo} alt="" className="logo" /></Link>

        <div className="navbarCategories">
          <ul className={categoryfunction?("navbarList"):('responsiveNavbarList')}>
            <li className="navbarListItem"><Link to={`/products?category=Sarees`} className='linked'>Sarees</Link></li>
            <li className="navbarListItem"><Link to={`/products?category=Kurtis`} className='linked'>Kurtis</Link></li>
            <li className="navbarListItem"><Link to={`/products?category=Dress Material`} className='linked'>Dress Material</Link></li>
            <li className="navbarListItem"><Link to={`/products?category=Indo-Western`} className='linked'>Indo-Western</Link></li>
          </ul>
        </div>
      </div>
      <div className="right">
      <div className="handburger" onClick={HandburgerClick}>
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>
        <div className="search" onClick={SearchClick}>
          <label className="searchIcon"><i className="fa-solid fa-magnifying-glass"></i></label>
          <input type="text" className={searchfunction?('searchInput'):('responsivesearchInput')} placeholder='search here!' />
        </div>
        <i className="fa-solid fa-user navbarIcon" onClick={HandleUserClick}></i>
        <Link className='linked' to="/wishlist"><i className="fa-regular fa-heart navbarIcon"></i></Link>
        <Link className='linked' to="/cart"><i className="fa-solid fa-bag-shopping navbarIcon"></i></Link>
      </div>
      <div className={userfunction?('profileTab'):('noDisp')} id="profiletab">
        <div>
            <h3>welcome</h3>
            {userInfo?(<h3 className='navbarUserName'>{userInfo.others.name}</h3>):(
            <button className='LoginBtn'>
                <Link className='linked' to="/login">login/signup</Link>
            </button>)}
            
        </div>
        <ul>
            <li className='profilelistItems'><Link className='linked' to="/Cart">Orders</Link></li>
            <li className='profilelistItems'><Link className='linked' to="/wishlist">Wish List</Link></li>
            <li className='profilelistItems'><Link className='linked' to="/bag">Bag</Link></li>
            <li className='profilelistItems'><Link className='linked' to="/orderlist">Orders List</Link></li>
        </ul>
      </div>
    </div>
  )
}
