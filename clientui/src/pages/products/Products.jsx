import React, { useEffect, useState, useRef } from 'react'
import './products.css'
import Ads from '../../components/ads/Ads';
import Productcard from '../../components/productcard/Productcard';
import axios from 'axios';
import {Link} from 'react-router-dom'
import { useLocation } from 'react-router-dom';

export default function Products() {
const [productDetail, setProductDetail] = useState();
const PI = "http://localhost:5000/images/";
const [filtercategory, setFilterCategory] = useState(null);
const [filterPrice, setFilterPrice] = useState(null);
const {search} = useLocation() || null;
const params = new URLSearchParams(search) || null;
const category = params.get('category') || null;
useEffect(()=>{
    const getProducts = async()=>{
        try {
            let products
            if(category !== null){
                products = await axios.get(`/api/product/?category=${category}`);
            }else{
                products = await axios.get('/api/product/');
            }
            setProductDetail(products.data);
        } catch (error) {
            alert('Internal Server Error');
        }
        
    }
    getProducts();
},[category])

const [filterbtn, setFilterBtn] = useState(false);
const [responsivetab, setResponsivetab] = useState(true);
const checked = (e) => {
    setFilterCategory(e.target.value);
    if(!filterbtn){
        setFilterBtn(true);
    }
}
const pricechecked = (e) => {
    setFilterPrice(e.target.value);
    if(!filterbtn){
        setFilterBtn(true);
    }
}
const filterClick = ()=>{
    setResponsivetab(prevresponsivetab => !prevresponsivetab);
}
    const HandleSubmit = async(e)=>{
        e.preventDefault()
        try {
            //console.log(filtercategory);
            const range = filterPrice && filterPrice.split(",");
            //console.log(range);
            let products;
            if(filtercategory !== null){
                if(range !== null){
                    products = await axios.get(`/api/product/?category=${filtercategory}&basePrice=${range[0]}&topPrice=${range[1]}`);
                }else{
                    products = await axios.get(`/api/product/?category=${filtercategory}`);
                }
            }else{
                if(range !== null){
                    products = await axios.get(`/api/product/?basePrice=${range[0]}&topPrice=${range[1]}`);
                }
                
            }
            //console.log(products.data);
                setProductDetail(products.data);
        } catch (error) {
            alert('something went wrong in Products!');
            //console.log(error);
        }
    }
  return (
    <div>
      <Ads/>
        <div className="productsContainer">
            <div className="filterTab">
            <div className="filters">
            <h1 onClick={filterClick}>Filters</h1>
            <div className={responsivetab?("filter"):('responsiveFilter')}>
                <form onSubmit={HandleSubmit}>
                    <div className="main-category">
                    <div className="input-group">
                        <input type="radio" value='Sarees' onChange={checked} id=""/><h4>Sarees</h4>
                    </div>
                    <div className="input-group">
                        <input type="radio" value='Kurtis' onChange={checked} id=""/><h4>Kurtis</h4>
                    </div>
                    <div className="input-group">
                        <input type="radio" value='Indo-Western' onChange={checked} id=""/><h4>Indo-Western</h4>
                    </div>
                    <div className="input-group">
                        <input type="radio" value='Dress Materials' onChange={checked} id=""/><h4>Dress Materials</h4>
                    </div>
                    </div>
                    <div className="price-category">
                    <div className="input-group">
                        <input type="checkbox"  value="300,1000" onChange={pricechecked} id=""/><p>Rs.300- Rs.1000</p>
                    </div>
                    <div className="input-group">
                        <input type="checkbox" value="1000,2000" onChange={pricechecked} id=""/><p>Rs.1000- Rs.2000</p>
                    </div>
                    <div className="input-group">
                        <input type="checkbox"  value="2000,3000" onChange={pricechecked} id=""/><p>Rs.2000- Rs.5000</p>
                    </div>
                    <div className="input-group">
                        <input type="checkbox" value="5000" onChange={pricechecked} id=""/><p>Rs.5000 & above</p>
                    </div>
                    </div>
                    <button className={filterbtn?("filterbtn"):("nodisp")}>Apply</button>
                </form>
            </div>
          </div>
            </div>
            <div className="product">
                <h5 className="searchhead">Products</h5>
            <div className="products">
            {productDetail && productDetail.map((detail)=>{
                return <Link to={`/product/${detail._id}`}><Productcard id={detail._id} src={PI+detail.img} title={detail.pname} price={detail.price}/></Link>
            })}
            </div>
            </div>
        </div>
    </div>
  )
}
