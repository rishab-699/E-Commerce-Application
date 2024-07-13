import React from 'react'
import './Orders.css'
import Widgetlg from '../../components/widgetlg/Widgetlg'
import { useState } from 'react'
import { useEffect } from 'react'
import axois from 'axios';

export default function Orders() {
    const [Orders, setOrders] = useState()
    useEffect(()=>{
        const fetchData = async ()=>{
          try {
            const admintoken = await localStorage.getItem("adminAccess")
            const token = admintoken.replace(/["]+/g, '');
            const resOrders = await axois.get('/api/order/', {headers:{'token':`Bearer ${token}`}})
            setOrders(resOrders.data);
          } catch (error) {
            alert('something went wrong! please try again')
          }
            
        }
        fetchData()
    },[])
  return (
    <div className='Orders'>
      <h1>Orders</h1>
      <Widgetlg orders={Orders} home={false}/>
    </div>
  )
}
