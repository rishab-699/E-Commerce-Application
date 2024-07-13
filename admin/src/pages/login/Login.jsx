import React from 'react'
import { useRef } from 'react'
import axios from 'axios';
import './login.css'

export default function Login() {
    const loginPassword = useRef('');
    const HandleSubmit = async(e)=>{
        e.preventDefault();
        try {
            const AdminInfo = {
                email:'admin@gmail.com',
                password:loginPassword.current.value
                }
            const login = await axios.post("/api/auth/login", AdminInfo);
            localStorage.setItem('adminAccess', JSON.stringify(login.data.accessToken));
            alert('successfully logged in!')
            window.location.replace('/')
        } catch (error) {
            alert('something went wrong! please try again');
            //console.log(error);
        }
    }
  return (
    <div className='login'>
        <h2>Admin Login</h2>
        <form className="loginForm" onSubmit={HandleSubmit}>
            <div className="loginInputContainer">
                <label className="loginLabel">Password</label>
                <input type="password" placeholder='*********' ref={loginPassword} className='loginInput' />
            </div>
            <div className="loginInputContainer">
                <button className="loginButton">Log In</button>
            </div>
        </form>
    </div>
  )
}
