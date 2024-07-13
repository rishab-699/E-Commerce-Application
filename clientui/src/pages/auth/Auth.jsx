import React, { useRef, useState } from 'react'
import './auth.css'
import Login from '../../components/login/Login';
import Register from '../../components/register/Register';

export default function Auth() {
    const [auth, setAuth] = useState(false);
    const HandleAuth = ()=>{
        setAuth(prevauth => !prevauth);
    }
  return (
    
      <div className="login">
        <button className="auth-btn" onClick={HandleAuth}> {auth?('Login'):('Register')} </button>
        {auth?(<Register/>):(<Login/>)}
        </div>
    
  )
}
