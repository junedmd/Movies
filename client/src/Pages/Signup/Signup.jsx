import React, { useState, useEffect } from 'react';
import "./Signup.css";

import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { handleError, handleSucsess } from '../../utils';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const API = import.meta.env.VITE_API_URL;
function Signup() {
     const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const [name, setName] = useState('');
useEffect(() => {
  try {
    const store = JSON.parse(localStorage.getItem("user") || "{}");
    if (store?.name) {
      navigate("/");
      handleSucsess("You are Already Logged In");
    }
  } catch (e) {
    console.log("Invalid localStorage:", e);
  }
}, []);
const navigate = useNavigate();
    
const SignIn = async ()=>{
    console.log("API URL:", API);
    try{
        const response = await axios.post(`${API}/api/signup`, {
          name: name,
          email: email,
          password: password,
        });
        console.log(response.data)
        if (response?.data?.success===true) {
          handleSucsess(" You Signup Successfully!!! ");
          setTimeout(() => {
            navigate("/login");
          }, 1500);}
          else{
            handleError("Please fills all the details")
          }
    }
    catch(e){
 if (e.response && e.response.data) {
    if (e.response) {
    handleError(e.response.data.message || "Something went wrong");
  } else {
    handleError("Network error");
  }
  console.log(e.message);
  }
  console.log(e.message);
    }
}

  return (
    <div>
      <div className='login'>
           
            <span className="login-logo" > Movies Hub</span>
            <div className="login-form">
              <h1>Signup</h1>
              <form action="" >
                
                  <input type="Your Name" placeholder='Your Name' value={name} onChange={(e) => {
                    setName(e.target.value)
      
                  }} /> 
      
                <input type="email" placeholder='Your Email' value={email} onChange={(e) => {
                  setEmail(e.target.value)
      
                }} />
                <input type="password" placeholder='Your Password' value={password} onChange={(e) => {
                  setPassword(e.target.value)
                }} />
                <button className='btn' type='button' onClick={SignIn}>SignUp</button>
      
      
                <div className="form-help">
                  <div className="remember">
                    <input type="checkbox" />
                    <label htmlFor="">Remember Me</label>
                  </div>
                  <p> Need Help?</p>
                </div>
              </form>
              <div className="form-switch">
      
                 <p>Already have account? <Link to="/login"><span> Login Now</span></Link> </p>
              </div>
            </div> 
            <ToastContainer />
          </div>
    </div>
  )
}

export default Signup
