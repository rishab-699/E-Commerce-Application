import React, {useContext, useRef} from 'react'
import './login.css'
import axios from 'axios';
import { Context } from '../../context/Contexts';

export default function Login() {
  const loginPassword = useRef('');
  const loginEmail = useRef('');
  const {dispatch, isFetching} = useContext(Context);
    const HandleSubmit = async(e)=>{
        e.preventDefault();
        dispatch({type: 'LOGIN_START'})
        try {
            const UserInfo = {
                email: loginEmail.current.value,
                password:loginPassword.current.value
                }
            const login = await axios.post("/api/auth/login", UserInfo);
            dispatch({type: 'LOGIN_SUCCESS', payload:login.data })
            alert('successfully logged in!');
            window.location.replace('/')
        } catch (error) {
          alert('something went wrong in Login!');
            console.log(error);
        }
    }
  return (
    
    <div className='login-form'>
        <h1>Login</h1>
      <form className='loginForm' onSubmit={HandleSubmit}>
        <div className="inputgrp">
            <label className="inputLabel">email</label>
            <input type="email" ref={loginEmail} placeholder='abc@email.com' className='input'/>
        </div>
        <div className="inputgrp">
            <label className="inputLabel">Password</label>
            <input type="password" ref={loginPassword} placeholder='********' className='input'/>
        </div>
        <button className='login-btn' disabled={isFetching}>Login</button>
      </form>
    </div>
    
  )
}
