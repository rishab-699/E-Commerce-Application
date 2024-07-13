import React, {useState, useEffect, useRef} from 'react'
import './orderdata.css'
import { useLocation } from 'react-router-dom';
import axios from 'axios'

export default function Orderdata() {
    const [orderData, setOrderData] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [orders, setorders]= useState();
    const [user, setUser]= useState()
    const search = useLocation();
    const shipping = useRef(null);
    const id = search.pathname.split('/')[2];
    const PI = "http://localhost:5000/images/";
    
    const [cartData, setCartdata]= useState();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const orderDataRes = await axios.get(`/api/order/findorder/${id}`);
                const orderData = orderDataRes.data || null;
                setorders(orderData);
                const admintoken = await localStorage.getItem("adminAccess")
                const token = admintoken.replace(/["]+/g, '');
                const userRes = await axios.get(`/api/user/find/${orderData.userId}`, {headers:{'token':`Bearer ${token}`}});
                const user = userRes.data || null;
                setUser(user);
                const productIds = orderData.products.map(data => data.productId);
                setCartdata(orderData._id);
                const onlyIds = await Promise.all(productIds);
                setSizes(orderData.products);
                const res = await axios.post(`/api/cart/findProducts`, { ids: onlyIds });
                setOrderData(res.data);
                
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);
    const OrderUpdate = async(e)=>{
        e.preventDefault();
        if(shipping.current.value !== null){
        const data = {
            shippmentId: shipping.current.value,
            status: "shipped"
        }
        try{
            const admintoken = await localStorage.getItem("adminAccess")
            const token = admintoken.replace(/["]+/g, '');
        const res = await axios.put(`/api/order/${id}`,data,{headers:{'token':`Bearer ${token}`}})
        alert('Successfully updated');
        }catch(error){
            alert('something went wrong!')
        }
        }
        else{
            alert('please provide shipment details');
        }
    }
    const HandleDelete = async()=>{
        try {
            const admintoken = await localStorage.getItem("adminAccess")
                const token = admintoken.replace(/["]+/g, '');
            const res=await axios.delete(`/api/order/${id}`,{headers:{'token':`Bearer ${token}`}});
            alert('order successfully deleted');
            window.location.replace('/Orders')
        } catch (error) {
            alert('error while deleting the order');
        }
    }
  return (
    <div className='orderdata'>
      <h1>User Order</h1>
      <button className='deleteBtn' onClick={HandleDelete}>Delete Order</button>
      <div className="orderContainer">
        <div className="orderlistData">
            <div className="userInfo">
                <div className="orderlistOrderHead">
                    <div className="orderlistOrderId">
                        <p className="labels">Name:</p>
                        <span className="orderlistOrderData">{user && user.name}</span>
                    </div>
                    <div className="orderlistOrderId">
                        <p className="labels">Contact:</p>
                        <span className="orderlistOrderData">{user && user.mobileNo}</span>
                    </div>
                    <div className="orderlistOrderId">
                        <p className="labels">Pay type:</p>
                        <span className="orderlistOrderData">{orders && orders.payType}</span>
                    </div>
                </div>
                <div className="orderlistOrderHead">
                    <div className="orderlistOrderId">
                        <p className="labels">Address:</p>
                        <span className="orderlistOrderData">{orders && orders.address.address+', '+orders.address.city+"- "+orders.address.pincode}</span>
                    </div>
                    <div className="orderlistOrderId">
                        <p className="labels">ShippingId:</p>
                        {orders && orders.shippmentId?(<span className="orderlistOrderData">{orders && orders.shippmentId}</span>):
                        (<input type='text' ref={shipping} className='shipmentId'/>)
                        }
                    </div>
                </div>
            </div>
            <div className="orderlistOrderHead">
                <div className="orderlistOrderId">
                    <p className="labels">Order Id:</p>
                    <span className="orderlistOrderData">{orders && orders._id}</span>
                </div>
                <div className="orderlistOrderId">
                    <p className="labels">Status:</p>
                    <span className="orderlistOrderData">{orders && orders.status}</span>
                </div>
            </div>
            <div className="orderlistOrderProducts">
                <div className="orderProductsLeft">
                <h1>products</h1>

                <div className='orderProductContainer'>
                            {orderData.length > 0 ? (
                        orderData.map((data, index) => (
                            <div className="productInfo" key={index}>
                                <button data-value={data._id} className='cancel-btn'><i value={data} className="fa-regular fa-circle-xmark cancel-btn"></i></button>
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
                                                    
                                                    value={sizeData.qty}
                                                    min={1}
                                                    disabled

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
                </div>
                <div className="orderProductsRight">
                <div className="billDetails">
                    <div className="order-pricing">
                        <div className="price-table">
                            <h4>Price details</h4>
                            <div className="pt-row">
                                <p>Total MRP</p>
                                <p>{orders && orders.amount.grossAmt}</p>
                            </div>
                            <div className="pt-row">
                                <p>Shipping charges</p>
                                <p>{orders && orders.amount.shippingCharges}</p>
                            </div>
                            <div className="pt-row">
                                <p>Platform fee</p>
                                <p>{orders && orders.amount.platformFee}</p>
                            </div>
                            <div className="pt-row">
                                <p>Discounted price</p>
                                <p>{orders && orders.amount.discountedPrice}</p>
                            </div>
                            <div className="pt-row total">
                                <h5>Total Amount:</h5>
                                <h5>{orders && orders.amount.netAmt}</h5>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
            {orders && !orders.shippmentId && <button className='confirm' onClick={OrderUpdate}>Update</button>}
        </div>
       
    
    </div>
    </div>
  )
}
