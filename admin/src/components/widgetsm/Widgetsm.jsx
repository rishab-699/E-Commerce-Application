import React from 'react'
import './widgetsm.css'
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';

export default function Widgetsm() {
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

  return (
    <div className='widgetsm'>
      <table>
        <thead>
          <tr>
            <th>User Name</th>
            <th>Mobile Number</th>
            <th>email</th>
          </tr>
          
        </thead>
        <tbody>
        {user && user.map((data, index)=>{
          return <tr key={index}>
            <td>{data.name}</td>
            <td>{data.mobileNo}</td>
            <td className='email'>{data.email}</td> 
      </tr>
        })}
        </tbody>
      </table>
    </div>
  )
}
