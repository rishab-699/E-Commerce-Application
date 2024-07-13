import React, { useContext, useEffect, useState } from 'react'
import './singleproduct.css'
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Context } from '../../context/Contexts';

export default function Singleproduct() {
    const search = useLocation()
    const id = search.pathname.split('/')[2];
    const [productDetail,setProductDetail] = useState();
    const [orderSize, setOrderSize] = useState(null);
    const {user} = useContext(Context);
    const PI = "http://localhost:5000/images/";

    useEffect(()=>{
        const getData = async()=>{
            try {
                const productData = await axios.get(`http://localhost:5000/api/product/find/${id}`);
                setProductDetail(productData.data);
            } catch (error) {
                //console.log(error);
                alert('something went wrong please retry!');
                window.location.replace('/');
            }
            
        }
        getData()
    },[])
    const HandleBag = async(e)=>{
        
        if((orderSize!==null || Object.keys(productDetail.detail).length === 0) && user !== null){
            const orderData = {
                userId: user.others._id,
                products: [
                    {
                        productId: e.target.value,
                        size: orderSize,
                    }
                ]
            }
            
            //console.log(orderData);
            const token = user.accessToken.replace(/["]+/g, '');
            const userExistres = await axios.get(`http://localhost:5000/api/cart/find/${user.others._id}`).catch((error)=>{
                //console.log(error.response.status);
                if(error.response.status === 403){
                    window.location.replace('/login')
                }
            });
            //console.log(userExistres.data);
            const userExist = userExistres.data || null;
            if(userExist !== null){
                const res = await axios.put(`http://localhost:5000/api/cart/${user.others._id}`, orderData, {headers:{'token':`Bearer ${token}`}}).then(
                    response => {
                        //console.log(response.data); // Printing response data
                    }
                ).catch((error)=>{
                    //console.log(error.response.status);
                    if(error.response.status === 403){
                        window.location.replace('/login')
                    }
                });
                alert('Added to bag');
                
            }else{
            const res = await axios.post(`http://localhost:5000/api/cart/add/${user.others._id}`, orderData, {headers:{'token':`Bearer ${token}`}});
            //console.log(res.data);
            alert('Added to bag');
            }
        }else{
            if(user === null){
                alert('Please Login again');
                window.location.replace('/login')

            }else{
            alert('please select size');
            }
        }
    }
    const SizeClicked =(e)=>{
        //console.log(e.target.value);
        setOrderSize(e.target.value);
        //console.log(orderSize);
    }
    const addWishList = ()=>{
        try {
            const getWishList =  localStorage.getItem('userWishlist');
            let wishlist = getWishList? JSON.parse(getWishList) : {};
            //console.log(Object.keys(wishlist).length);
            wishlist = {
                ...wishlist,
                [productDetail._id]: productDetail // Assuming productDetail._id is unique
            };
            const updatedList = JSON.stringify(wishlist);
            localStorage.setItem('userWishlist', updatedList);
            alert('WishList updated successfully');
        } catch (error) {
            //console.log(error);
            alert('something went wrong!');
        }
       
    }

  return (

    <div>
      <div className="product-content">
        {productDetail && (<>
                <div className="product-images">
                    <div className="img"><img src={PI+productDetail.img} alt=""/></div>
                </div>
                <div className="product-infos">
                    <div className="head-sec">
                        <h2>{productDetail.pname}</h2>
                        <p>Product sub title</p>
                        <h2 id="price">Rs. {productDetail.price} MRP</h2>
                    </div>
                    <div className="sizes">
                        {productDetail.detail && productDetail.detail.map((data)=>{
                            return <button className="size-btn" name="size" key={data.size[0]} id="38" value={data.size[0]} onClick={SizeClicked}>{data.size[0]}</button>
                        })}
                    </div>
                    <div className="order-btns">
                        <button className="bag-btn" value={productDetail._id} onClick={HandleBag}>Add to Bag</button>
                        <button className="wishlist-btn" onClick={addWishList}>WISHLIST</button>
                    </div>
                    <div className="productdetails">
                        <h1>Product Details</h1>
                        <p>{productDetail.description}</p>
                    </div>
                </div>

        </>)}
        </div>

            </div>
  )
}
