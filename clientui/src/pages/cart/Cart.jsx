import React, { useEffect, useState, useContext } from 'react';
import './cart.css';
import axios from 'axios';
import { Context } from '../../context/Contexts';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
    const [orderData, setOrderData] = useState([]);
    const [sizes, setSizes] = useState([]);
    const navigate = useNavigate();
    const PI = "http://localhost:5000/images/";
    const { user } = useContext(Context);
    const [netAmt, setNetAmt] = useState(0);
    const [cartData, setCartdata]= useState();
    const [grossAmt, setgrossAmt]= useState(0)
    let shippingCharges=99, platformFee=0.25, discountedPrice=500;
    useEffect(() => {
        const fetchData = async () => {
            try {
                const userExistRes = await axios.get(`/api/cart/find/${user.others._id}`);
                const userExist = userExistRes.data || null;
                const productIds = userExist.products.map(data => data.productId);
                setCartdata(userExist._id);
                const onlyIds = await Promise.all(productIds);
                setSizes(userExist.products);
                const res = await axios.post(`/api/cart/findProducts`, { ids: onlyIds });
                //console.log(cartData);
                setOrderData(res.data);
                countPrice(res.data, userExist.products);
            } catch (error) {
                //console.log(error);
            }
        };
        fetchData();
    }, [user]);

    const HandleDelete = async (e) => {
        try {
            const value = e.currentTarget.getAttribute('data-value');
            //console.log(value);
            const res = await axios.post('http://localhost:5000/api/cart/CartProduct', {
                userId: user.others._id,
                productId: value,
                orderId: cartData
            });
            alert('Deleted successfully');
            //console.log(res.data);
        } catch (err) {
            alert('something went wrong in cart!');
            //console.log(err);
        }
    };

    const countPrice = (orderData, sizes) => {
        let totalProductPrice = 0;
        orderData.forEach(data => {
            sizes.forEach(sizeData => {
                if (sizeData.productId === data._id) {
                    totalProductPrice += (data.price * sizeData.qty);
                }
            });
        });
        setNetAmt(0);
        let netamt = totalProductPrice+shippingCharges+platformFee-discountedPrice
        setNetAmt(netamt);
        setgrossAmt(totalProductPrice);
        
    };

    const HandleProcessClick = async()=>{
        
        const additionalData = {
            grossAmt,
            netAmt,
            shippingCharges,
            platformFee,
            discountedPrice
          };
          navigate(`/order/${user.others._id}`, { state: additionalData });
    }

    return (
        <div className='cart'>
            <h5>Your Bag</h5>
            <div className='cartProduct'>
                <div className="productDetail">
                    <span className="productDetailTitle">Items in bag</span>
                    {orderData.length > 0 ? (
                        orderData.map((data, index) => (
                            <div className="productInfo" key={index}>
                                <button onClick={HandleDelete} data-value={data._id} className='cancel-btn'><i value={data} className="fa-regular fa-circle-xmark cancel-btn"></i></button>
                                <img src={PI + data.img} alt="" />
                                <div className="productInfoContent">
                                    <span className="pTitle">{data.pname}</span>
                                    <span className="pSubTitle">Sub Title</span>
                                    <div className="measurements">
                                        {sizes.map((sizeData, idx) => (
                                            (sizeData.productId === data._id && sizeData.size !== null) && (
                                                <span key={idx} className="pSize">Size: {sizeData.size}</span>
                                            )
                                        ))}
                                        {sizes.map((sizeData, idx) => (
                                            sizeData.productId === data._id && (
                                                <input key={idx}
                                                    type="number"
                                                    onChange={(e) => {
                                                        sizeData.qty = parseInt(e.target.value, 10);
                                                        countPrice(orderData, sizes);
                                                    }}
                                                    defaultValue={sizeData.qty}
                                                    min={1}
                                                />
                                            )
                                        ))}
                                    </div>
                                    <span className="pPrice">Rs. {data.price}</span>
                                </div>
                            </div>
                        ))
                    ) : (<h1 className="productDetailTitle"> NO DATA TO SHOW</h1>)}
                </div>
                <div className="billDetail">
                    <span className="productDetailTitle">BILL</span>
                    <div className="order-pricing">
                        <div className="price-table">
                            <h4>Price details</h4>
                            <div className="pt-row">
                                <p>Total MRP</p>
                                <p>{grossAmt}</p>
                            </div>
                            <div className="pt-row">
                                <p>Shipping charges</p>
                                <p>{shippingCharges}</p>
                            </div>
                            <div className="pt-row">
                                <p>Platform fee</p>
                                <p>{platformFee}</p>
                            </div>
                            <div className="pt-row">
                                <p>Discounted price</p>
                                <p>{discountedPrice}</p>
                            </div>
                            <div className="pt-row total">
                                <h5>Total Amount:</h5>
                                <h5>{netAmt}</h5>
                            </div>
                        </div>
                        <button className="book-order" onClick={HandleProcessClick}>Proceed to Payments</button>
                    </div>  
                </div>
            </div>
        </div>
    );
}
