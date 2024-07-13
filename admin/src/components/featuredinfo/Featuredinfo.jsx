import React,{useEffect, useState} from 'react'
import './featuredinfo.css'
import axios from 'axios'

export default function Featuredinfo() {
  const [incomeStat, setIncomeStat] = useState([]);
  const [percentage, setpercentage] = useState(0);
  const [orders, setOrders] = useState([]);
  const [orderpercentage, setOrderpercentage] = useState(0);
  const [users, setusers] = useState([]);
  const [userPercentage, setuserPercentage] = useState(0);
  useEffect(()=>{
    const getStat = async()=>{
      try {
        const admintoken = await localStorage.getItem("adminAccess")
        const token = admintoken.replace(/["]+/g, '');
        const resStat = await axios.get("/api/order/income", {headers:{'token':`Bearer ${token}`}});
          setIncomeStat(resStat.data);
          setpercentage((resStat.data[0].total*100)/resStat.data[1].total);
        const resOrderCount = await axios.get("/api/reports/totalorders");
        setOrders(resOrderCount.data);
        
        const total = resOrderCount.data[0].count;
        const count = resOrderCount.data[1].count;

        if (typeof total === 'number' && typeof count === 'number' && total !== 0) {
          const percentage = (count * 100) / total;
          setOrderpercentage(percentage);
        } else {
          
          setOrderpercentage(0);
        }
        const resusercount = await axios.get("/api/reports/totalusers");
        setusers(resusercount.data);
        //console.log(resusercount.data);
        const totaluser = resusercount.data[0].count;
        const countuser = resusercount.data[1].count;

        if (typeof totaluser === 'number' && typeof countuser === 'number' && totaluser !== 0) {
          //console.log('total:', totaluser);
          //console.log('count:', countuser);
          const percentage = (countuser * 100) / totaluser;
          setuserPercentage(percentage);
        } else {
          setuserPercentage(0);
        }

      } catch (error) {
        //console.log(error)
        alert('Something went wrong while fetching featured Info');
      }
    };
    getStat()
  },[]);
  return (
    <div className='featured'>
      <div className="featuredItem">
        <span className="featureTitle">Sales</span>
        <div className="featuredMoneyContainer">
        <span className="featureMoney">Rs. {(incomeStat !== undefined && incomeStat.length > 0) && incomeStat[1].total}</span>

            <span className="featureMoneyRate">%{Math.floor(percentage)}
                {
                  percentage<0?
                  (<i className="fa-solid fa-arrow-down-long featuredNegativeIcon"></i>):
                  (<i className="fa-solid fa-arrow-up featuredPositiveIcon"></i>)
                }           
                </span>
        </div>
        <span className="featurecardInfo">compare to last month</span>
        
      </div>
      <div className="featuredItem">
        <span className="featureTitle">Orders</span>
        <div className="featuredMoneyContainer">
            <span className="featureMoney">{(orders !== undefined && orders.length > 0) && orders[1].count}</span>
            <span className="featureMoneyRate">%{Math.floor(orderpercentage)}
            {
                  orderpercentage<100?
                  (<i className="fa-solid fa-arrow-down-long featuredNegativeIcon"></i>):
                  (<i className="fa-solid fa-arrow-up featuredPositiveIcon"></i>)
                }
                
                </span>
            </div>
            <span className="featurecardInfo">compare to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featureTitle">Users</span>
        <div className="featuredMoneyContainer">
            <span className="featureMoney">{(users !== undefined && users.length > 0) && users[1].count}</span>
            <span className="featureMoneyRate">%{Math.floor(userPercentage)}
            {
                  userPercentage<100?
                  (<i className="fa-solid fa-arrow-down-long featuredNegativeIcon"></i>):
                  (<i className="fa-solid fa-arrow-up featuredPositiveIcon"></i>)
                }
                
                </span>
            </div>
            <span className="featurecardInfo">compare to last month</span>
        
      </div>
    </div>
  )
}
