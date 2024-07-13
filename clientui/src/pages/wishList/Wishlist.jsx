import React from 'react';
import { Link } from 'react-router-dom';
import Productcard from '../../components/productcard/Productcard';
import './wishlist.css'

export default function Wishlist() {
    const productDetaildata = localStorage.getItem("userWishlist");
    const productDetail = JSON.parse(productDetaildata);
    const PI = "http://localhost:5000/images/";
    const keys = Object.keys(productDetail);
    
    return (
        <div className="product">
            <h5 className="searchhead">Your WishList</h5>
            <div className="products">
                {keys.length > 0 && keys.map((key) => {
                    const detail = productDetail[key]; // Accessing product detail using the key
                    return (
                        <Link key={key} className='linked wishlist-products' to={`/product/${key}`}>
                            <Productcard
                                id={key}
                                src={PI + detail.img}
                                title={detail.pname}
                                price={detail.price}
                                Wishlist = {true}
                            />
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
