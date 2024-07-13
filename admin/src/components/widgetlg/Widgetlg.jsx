import React from 'react'
import './widgetlg.css'
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';

export default function Widgetlg(props) {
  const {orders,home } = props;
  const homeClass = home?('homepg'):('');
  const [user, setUser] = useState();
  useEffect(()=>{
    const fetchData = async()=>{
      const admintoken = await localStorage.getItem("adminAccess")
      const token = admintoken.replace(/["]+/g, '') || null;
      try {
        const resData = await axios.get(`/api/user/`, {headers:{'token':`Bearer ${token}`}});
      setUser(resData.data);
      } catch (error) {
        if(token === null){
          alert('Session Timed out! LogIn again');
          window.location.replace('/login')
        }else{
          alert('Something went wrong fetching user Details!');
        }
      }
      
      
    }
    fetchData();
  },[])

  const HandleViewOrder = (e)=>{
    console.log(e.target.value);
    window.location.replace(`/OrdersData/${e.target.value}`);
  }

  return (
    <div className={`widgetlg ${homeClass}`}>
      <table>
        <thead>
          <tr>
          <th>User Name</th>
          <th>Mobile Number</th>
          <th>Address</th>
          <th>Amount</th>
          <th>Pay Type</th>
          <th>Status</th>
          <th>View Order</th>
          </tr>
          
        </thead>
        <tbody>
        {orders && orders.map((data, index)=>{
          return <tr key={index}>
            <td>{user && user.map((userData)=> {if(userData._id === data.userId){return userData.name}})}</td>
            <td>{user && user.map((userData)=> {if(userData._id === data.userId){return userData.mobileNo}})}</td>
            <td>{home?(data.address.city):(data.address.address+','+data.address.city+'- '+data.address.pincode)}</td>
            <td>{data.amount.netAmt}</td>
            <td>{data.payType}</td>
            <td><p className={data.status+" orderType"}>{data.status}</p></td>
            <td><button onClick={HandleViewOrder} value={data._id} className='ViewCompleteOrderBtn'>View</button></td>
            
      </tr>
        })}
        </tbody>
      </table>
    </div>
  )
}
