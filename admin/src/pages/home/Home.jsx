import React from 'react'
import './home.css'
import Featuredinfo from '../../components/featuredinfo/Featuredinfo'
import Chart from '../../components/chart/Chart'
import userData from '../../dummyData';
import Widgetsm from '../../components/widgetsm/Widgetsm';
import Widgetlg from '../../components/widgetlg/Widgetlg';
import { useMemo } from 'react';
import { useEffect } from 'react';
import axios from 'axios'
import { useState } from 'react';

export default function Home() {
  const [incomeStat, setIncomeStat] = useState([]);
  const[orders, setOrders] = useState();
  const months = useMemo(
    ()=>[
      'jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec'
    ],[]
  );

  useEffect(()=>{
    const getStat = async()=>{
      try {
        const admintoken = await localStorage.getItem("adminAccess")
      const token = admintoken.replace(/["]+/g, '');
        const resStat = await axios.get("/api/order/income", {headers:{'token':`Bearer ${token}`}});
        setIncomeStat([]);

        resStat.data.forEach(item => {
          setIncomeStat(prev => [
            ...prev,
            { name: months[item._id - 1], "Income": item.total }
          ]);
        });
        const resOrders = await axios.get('/api/order/',{ params: {status:"pending"} }, {headers:{'token':`Bearer ${token}`}})
        setOrders(resOrders.data);
      } catch (error) {
        alert('something went wrong!');
      }
    };
    getStat();
  },[months]);

  return (
    <div className='home'>
      <Featuredinfo />
      <Chart title="Monthly Sales" data={incomeStat} dataKey="Income" grid={true} />
      <div className="homeWidgets">
        <Widgetsm/>
        <Widgetlg orders={orders} home={true} />
      </div>
    </div>

  )
}
