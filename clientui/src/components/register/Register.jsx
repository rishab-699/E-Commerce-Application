import React, { useRef } from 'react'
import './register.css'
import axios from 'axios'

export default function Register() {
  const fullName = useRef()
  const email = useRef()
  const phno = useRef()
  const password = useRef()

  const HandleSubmit =async(e)=>{
    e.preventDefault();
    try {
      const userData = {
        name: fullName.current.value,
        email: email.current.value,
        password: password.current.value,
        mobileNo: phno.current.value
      }
      const data = await axios.post('http://localhost:5000/api/auth/register', userData);
      window.location.replace("/login")

    } catch (error) {
      
    }
  }

  return (
    <div className='register'>
        <h1>Register Now!</h1>
      <form className='registerForm' onSubmit={HandleSubmit}>
        <div className="inputgrp">
            <label className="inputLabel">Full Name</label>
            <input type="text" placeholder='Your Name' ref={fullName} className='input'/>
        </div>
        <div className="inputgrp">
            <label className="inputLabel">email</label>
            <input type="email" placeholder='abc@email.com' ref={email} className='input'/>
        </div>
        <div className="inputgrp">
            <label className="inputLabel">Phone No:</label>
            <input type="text" placeholder='abc@email.com' ref={phno} className='input'/>
        </div>
        <div className="inputgrp">
            <label className="inputLabel">Password</label>
            <input type="password" placeholder='********' ref={password} className='input'/>
        </div>
        <div className="info">
            <input type="checkbox"/> <h5>By registering, I accept all Terms & Conditions of the company.</h5>
        </div>
        <button className='Register-btn'>Register</button>
      </form>
    </div>
  )
}
