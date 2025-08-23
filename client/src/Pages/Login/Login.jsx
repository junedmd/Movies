import React, { useState, useEffect } from 'react';
import "./Login.css";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { handleError, handleSucsess } from '../../utils';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const API = import.meta.env.VITE_API_URL;
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


  const logIn = async () => {
    console.log(email, password)
    console.log("API URL:", API);
    try {
      const response = await axios.post(`${API}/api/login`, {
        email: email,
        password: password,
      })
      console.log(response.data)
      if (response?.data?.success) {
        handleSucsess("You Login Successfully!!");
        localStorage.setItem("user", JSON.stringify({
          email: response.data.email,
          name: response.data.name,
          token: response.data.jwtToken
        }));
        navigate("/");
      } else {
        handleError(response?.data?.error || "Invalid login credentials");
      }

    } catch (e) {
       
      if (e.response?.data?.message) {
      handleError(e.response.data.message); // backend error message
    } else {
      handleError("Network error, please try again later");
    }
    console.log(e);

    console.log(e.message);
    }
  }



  return (
    <div className='login'>
      {/* <img src={Logo} alt="" className='logo' onClick={directCall} /> */}
       <Link to='/'> <span className="login-logo"> Movies Hub</span></Link>  
      <div className="login-form">
        <h1>Login</h1>
        <form action="" >

          <input type="email" placeholder='Your Email' value={email} onChange={(e) => {
            setEmail(e.target.value)

          }} />
          <input type="password" placeholder='Your Password' value={password} onChange={(e) => {
            setPassword(e.target.value)
          }} />
          <button className='btn' type='button' onClick={logIn}> Login</button>


          <div className="form-help">
            <div className="remember">
              <input type="checkbox" />
              <label htmlFor="">Remember Me</label>
            </div>
            <p> Need Help?</p>
          </div>
        </form>
        <div className="form-switch">
          <p>
            New to Movies Hub?  <Link to="/signup" > <span> Sign Up Now</span> </Link>
          </p>
        </div>
      </div>

    </div>
  )
};

export default Login;


