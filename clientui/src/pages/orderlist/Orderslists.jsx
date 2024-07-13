import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../context/Contexts'
import axios from 'axios';
import './orderlist.css'
import Productcard from '../../components/productcard/Productcard';
import { Link } from 'react-router-dom';
export default function Orderslists() {
    const {user} = useContext(Context);
    const [orderData, setOrderdata] = useState();
    const [orderProduct, setOrderProduct] = useState();
    const PI = "http://localhost:5000/images/";
    useEffect(()=>{
        const fetchData = async()=>{
            try {
                const res = await axios.get(`/api/order/find/${user.others._id}`);
                //console.log(res.data);
                setOrderdata(res.data);
                const productIds = res.data.map((data)=>{
                    return data.products.map(data => data.productId);
                })
                const onlyIds = await Promise.all(productIds);
                const resProducts = await axios.post(`/api/cart/findProducts`, { ids: onlyIds });
                //console.log(resProducts.data);
                setOrderProduct(resProducts.data);
            } catch (error) {
                alert('something went wrong in orderList!');
                //console.log(error);
                //console.log(user);
            }
        }
        fetchData()
    },[])
  return (
    <div className='orderlist'>
      <div className="orderContainer">
        {orderData && orderData.map((data, index)=>{
            return <div key={index} className="orderlistData">
            <div className="orderlistOrderHead">
                <div className="orderlistOrderId">
                    <p className="labels">Order Id:</p>
                    <span className="orderlistOrderData">{data._id}</span>
                </div>
                {data.status === 'shipped' && 
                    <div className="orderlistOrderId">
                        <p className="labels">Shipment Id:</p>
                        <span className="orderlistOrderData">{data.shippmentId}</span>
                    </div>
                }
                <div className="orderlistOrderId">
                    <p className="labels">Status:</p>
                    <span className="orderlistOrderData">{data.status}</span>
                </div>
            </div>
            <div className="orderlistOrderProducts">
                <div className="orderProductsLeft">
                {data.products.map((Pdata)=>{
                    return orderProduct&& orderProduct.map((data, index)=>{
                        if(data._id === Pdata.productId){
                        return <div key={index} className='orderProductContainer'>
                            <Link to={`/product/${data._id}`}><Productcard id={data._id} src={PI+data.img} title={data.pname} price={data.price}/></Link>
                        </div>
                        }
                        
                    })
                })
                
                }
                </div>
                <div className="orderProductsRight">
                <div className="billDetails">
                    <div className="order-pricing">
                        <div className="price-table">
                            <h4>Price details</h4>
                            <div className="pt-row">
                                <p>Total MRP</p>
                                <p>{data.amount.grossAmt}</p>
                            </div>
                            <div className="pt-row">
                                <p>Shipping charges</p>
                                <p>{data.amount.shippingCharges}</p>
                            </div>
                            <div className="pt-row">
                                <p>Platform fee</p>
                                <p>{data.amount.platformFee}</p>
                            </div>
                            <div className="pt-row">
                                <p>Discounted price</p>
                                <p>{data.amount.discountedPrice}</p>
                            </div>
                            <div className="pt-row total">
                                <h5>Total Amount:</h5>
                                <h5>{data.amount.netAmt}</h5>
                            </div>
                        </div>
                    </div>
          </div>
                </div>
            </div>
        </div>
        })}
      </div>
    </div>
  )
}
