import React, {useState, useEffect, useRef, useContext} from 'react'
import './orders.css'
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { Context } from '../../context/Contexts';


export default function Orders() {
  const [orderData, setOrderData] = useState([]);
  const search = useLocation()
  const id = search.pathname.split('/')[2];
  const orderAmounts = search.state
  const {user} = useContext(Context);
  const fullName = useRef(user?(user.others.name):('Full Name'));
  const mobileNo = useRef(user?(user.others.mobileNo):('Full Name'));
  const address = useRef('')
  const [addressErr, setaddressErr] = useState();
  const city = useRef('')
  const [cityErr, setcityErr] = useState();
  const [orderSections, setOrderSections] = useState(true);
  const pincode = useRef('')
  const [pincodeErr, setpincodeErr] = useState();
  const [paymentType, setPaytype] = useState();
  useEffect(() => {
    const timeout = setTimeout(()=>{
      const fetchData = async () => {
        try {
            const userExistRes = await axios.get(`http://localhost:5000/api/cart/find/${id}`);
            const userExist = userExistRes.data || null;
            if(userExist !== null){
              setOrderData(userExist);
              //console.log(orderData);
            }else{
              setOrderData('NO DATA AVAILABLE')
            }
        }catch(err){
          //console.log(err);
        }
    }
    fetchData();
    },1000);
  },[])
  
  const HandleAddressFormClick = (e)=>{
    e.preventDefault();
    if(address.current.value === '' && city.current.value === '' && pincode.current.value === ''){
      setaddressErr('Address field is Empty');
      setcityErr('City field is empty')
      setpincodeErr('Pincode is empty')
    }else{
      setOrderSections(false);
    }
  }
  //console.log(orderAmounts);
  const HandleFormSubmit = async(e)=>{
    e.preventDefault();

    const OrderData = {
      userId: id,
      products: orderData.products,
      amount: orderAmounts,
      address:{
        address: address.current.value,
        city: city.current.value,
        pincode: pincode.current.value
      },
      payType: paymentType
    }
    //console.log(OrderData);
    try {
      const res = await axios.post('/api/order/add', OrderData);
      alert('Order Placed Successfully');
      //console.log(res.data);
      window.location.replace('/orderlist')
    } catch (error) {
      alert('Something went wrong!');
    }

  }
  return (
    <div className='order'>
      <form onSubmit={HandleFormSubmit}>
        <div className={orderSections?("AddressForm"):('noDisp')}>
        <h1>orders</h1>
          <div className="input-container">
            <label>Full Name:</label>
            <input type="text" className='addressInput' ref={fullName} defaultValue={fullName.current}/>
          </div>
          <div className="input-container">
            <label>Mobile No:</label>
            <input type="text" className='addressInput' ref={mobileNo} defaultValue={mobileNo.current}/>
          </div>
          <div className="input-container">
            <label>Address</label>
            <textarea ref={address} className='addressInput'></textarea>
            <span className="formErr">{addressErr}</span>
          </div>
          <div className="multipleInput">
            <div className="input-container">
              <label>City:</label>
              <input type="text" ref={city} className='addressInput' />
              <span className="formErr">{cityErr}</span>

            </div>
            <div className="input-container">
              <label>PinCode:</label>
              <input type="text" ref={pincode} className='addressInput' />
              <span className="formErr">{pincodeErr}</span>

            </div>
          </div>
          <button className='addressFormButton' onClick={HandleAddressFormClick}>Next</button>
        </div>
        <div className={orderSections?("noDisp"):('orderSection')}>
          <h1>Order Details Payment</h1>
          <button className='orderSectionBackBtn' onClick={(e)=> {e.preventDefault(); setOrderSections(prevordersections => !prevordersections)}}>Back</button>
          <div className="orderBillInfo">
            <div className="address">
              <div className="addressContainer">
              <span className="addressInfo">{fullName.current.value}</span>
              <span className="addressInfo">{mobileNo.current.value}</span>
              </div>
              <span className="addressInfo">{address.current.value}</span>
              <div className="addressContainer">
              <span className="addressInfo">{city.current.value}</span>
              <span className='addressInfo'>{pincode.current.value}</span>
              </div>
            </div>
          </div>
          <div className="billDetails">
                    <div className="order-pricing">
                        <div className="price-table">
                            <h4>Price details</h4>
                            <div className="pt-row">
                                <p>Total MRP</p>
                                <p>{orderAmounts.grossAmt}</p>
                            </div>
                            <div className="pt-row">
                                <p>Shipping charges</p>
                                <p>{orderAmounts.shippingCharges}</p>
                            </div>
                            <div className="pt-row">
                                <p>Platform fee</p>
                                <p>{orderAmounts.platformFee}</p>
                            </div>
                            <div className="pt-row">
                                <p>Discounted price</p>
                                <p>{orderAmounts.discountedPrice}</p>
                            </div>
                            <div className="pt-row total">
                                <h5>Total Amount:</h5>
                                <h5>{orderAmounts.netAmt}</h5>
                            </div>
                        </div>
                    </div>
          </div>
          <div className="paymentDetails">
            <div className="UPI">
            <input type="radio" id="online" value='online' name='payType' onChange={(e)=> setPaytype(e.target.value)} className='paymentdetailschkBox' />
            <label htmlFor="online" className="checkButtonLabel">ONLINE payment</label>
            </div>
            <div className="UPI">
            <input type="radio" id="card" value='card' name='payType' onChange={(e)=> setPaytype(e.target.value)} className='paymentdetailschkBox' />
            <label htmlFor="card" className="checkButtonLabel">ONLINE card payment</label>
            </div>
            <div className="UPI">
            <input type="radio" id="cod" value='cod' name='payType' onChange={(e)=> setPaytype(e.target.value)} className='paymentdetailschkBox' />
            <label htmlFor="cod" className="checkButtonLabel">COD</label>
            </div>
          </div>
          <button className='addressFormButton' type="submit">Confirm</button>
        </div>
      </form>
    </div>
  )
}
