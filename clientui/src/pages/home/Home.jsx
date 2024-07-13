import React, { useEffect, useState } from 'react'
import Ads from '../../components/ads/Ads'
import './home.css'
import Productcard from '../../components/productcard/Productcard'
import axios from 'axios'
import Loader from '../../components/loader/Loader'
import { Link } from 'react-router-dom'

export default function Home() {
    
    const [loading, setLoading] = useState(true);
    const [newProduct, setNewProduct] = useState();
    const [allProduct, setallProduct] = useState();
    const PI = "http://localhost:5000/images/"
    useEffect(()=>{
        const fethNewProduct = async()=>{
        try {
            const products = await axios.get(`/api/product/?new=${true}`);
            const allProducts = await axios.get('api/product/');
            setNewProduct(products.data);
            setallProduct(allProducts.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false); // Set loading state to false regardless of success or failure
        }
        }
        fethNewProduct()
    }, []);
  return (
    <div className='home'>
    <Ads/>
    {loading?(<Loader />):(
        
    <>
        <div className="np">
            <Link to='/products' className='linked'><span className="npTitle">New arrivals</span></Link>
            <div className="np-container">
            {newProduct && newProduct.map((detail)=>{
                return <Link key={detail._id} className='linked' to={`/product/${detail._id}`}><Productcard id={detail._id} src={PI+detail.img} title={detail.pname} price={detail.price}/></Link>
            })}
            </div>
        </div>
        <div className="op">
            <span className="npTitle">Great Products Great Offers!</span>
            <div className="np-container">
            {allProduct && allProduct.map((detail)=>{
                return <Link key={detail._id} className='linked' to={`/product/${detail._id}`}><Productcard id={detail._id} src={PI+detail.img} title={detail.pname} price={detail.price}/></Link>
            })}
            </div>
        </div>
    </>
    )}
    </div>
  )
}
