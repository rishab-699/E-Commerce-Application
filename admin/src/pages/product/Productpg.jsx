import React from 'react'
import './product.css'
import Productcard from '../../components/productcard/productcard/Productcard'
import {Link} from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import axois from 'axios';

export default function Productpg() {
  const [productData, setProductData] = useState();
  const PI = "http://localhost:5000/images/";
  const location = useLocation()
  useEffect(()=>{
    const fetchProducts = async()=>{
      try {
        const product = await axois.get('/api/product/');
        setProductData(product.data);
      } catch (error) {
        alert('something went wrong!');
      }
    }
    fetchProducts();
  },[location.search])
  //console.log(productData);
  return (
    <div className='products'>
        <div className="productsTopbar">
            <span className="productpgTitle">Products List</span>
            <Link to="/addproducts"><button className="addProducts">Add Products</button></Link>
        </div>
        <div className="product-grid">
          {productData && productData.map((data, index)=>{
            return <Link key={index} className='linked' to={`/updateproducts/${data._id}`}><Productcard id={data.id} src = {PI+data.img} title= {data.pname} price={data.price}/></Link>
          })}
        </div>
    </div>
  )
}
