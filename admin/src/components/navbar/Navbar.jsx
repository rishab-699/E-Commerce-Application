import React from 'react'
import './navbar.css'
import {Link} from 'react-router-dom';

export default function Navbar() {
  return (
    <div className='navbar'>
      <div className="navbarWrapper">
        <div className="navbarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="navbarList">
            <li className="navbarListItem active">
            <Link className='linked' to='/'><i className="fa-solid fa-house navbarListIcon"></i>
              HOME</Link>
            </li>
            <li className="navbarListItem">
            <Link className='linked' to='/offer'><i className="fa-solid fa-indian-rupee-sign navbarListIcon"></i>Offers</Link>
            </li>
            <li className="navbarListItem">
            <i className="fa-solid fa-arrow-trend-up navbarListIcon"></i>
              SALE
            </li>
          </ul>
        </div>
        <div className="navbarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3>
          <ul className="navbarList">
            <li className="navbarListItem">
            <i className="fa-regular fa-user navbarListIcon"></i>
              users
            </li>
            <li className="navbarListItem">
            <Link className='linked' to='/products'> <i className="fa-solid fa-chart-line navbarListIcon"></i>
              Products</Link>
            </li>
            <li className="navbarListItem">
            <Link className='linked' to='/Orders'><i className="fa-solid fa-indian-rupee-sign navbarListIcon"></i>
              Orders</Link>
            </li>
            <li className="navbarListItem">
            <i className="fa-solid fa-chart-simple navbarListIcon"></i>
              Reports
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
