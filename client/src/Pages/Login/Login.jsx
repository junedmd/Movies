import React, { useState, useEffect } from 'react';
import "./Login.css";

import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { handleError, handleSucsess } from '../../utils';
const API = import.meta.env.VITE_API_URL;
function Login() {

  const [signState, setSignState] = useState('Login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const directCall = () => {
    window.location.href = "/"
  }

  useEffect(() => {
    const store = JSON.parse(localStorage.getItem("user") || "{}");
    if (store?.name) {
      window.location.href = "/"
      return handleSucsess(" You are Already Login")
    }
  }, []);


  const SignIn = async (e) => {

    e.preventDefault();

    try {


      if (signState === "Sign Up") {


        const response = await axios.post(`${API}/api/users`, {
          name: name,
          email: email,
          password: password,
        });
        if (response?.data?.success) {
          handleSucsess(" You Signup Successfully!!! ")
          setTimeout(() => {
            window.location.href = "/login";
          }, 1500);

          setSignState("Login")

        } else {
          // alert(response?.data?.message)
          handleError(" Please fill all the details.")
          // toast.success(response?.data?.message);

        };
        setName("");
        setPassword("");
        setEmail('');
      } else {
        const response = await axios.post(`${API}/api/logins`, {
          email: email,
          password: password,
        });

        if (response?.data?.success) {
          // alert(response?.data?.message)
          handleSucsess("You Login Successfully");
          localStorage.setItem("user", JSON.stringify(response?.data?.data))
          setTimeout(() => {
            window.location.href = "/";
          }, 1500);

        } else {
          // alert(response?.data?.message)
          handleError("Please Check your Cardentails..")
          toast(response?.data?.message);
        };
        setName("");
        setPassword("");
        setEmail('');
      }

    } catch (e) {
      console.log(e.message)
    };
  }


  return (
    <div className='login'>
      {/* <img src={Logo} alt="" className='logo' onClick={directCall} /> */}
      <span className="login-logo" onClick={directCall}> Movies Hub</span>
      <div className="login-form">
        <h1>{signState}</h1>
        <form action="" >
          {
            signState === "Sign Up" ? <input type="Your Name" placeholder='Your Name' value={name} onChange={(e) => {
              setName(e.target.value)

            }} /> : <></>
          }


          <input type="email" placeholder='Your Email' value={email} onChange={(e) => {
            setEmail(e.target.value)

          }} />
          <input type="password" placeholder='Your Password' value={password} onChange={(e) => {
            setPassword(e.target.value)
          }} />
          <button className='btn' type='button' onClick={SignIn}> {signState === "Sign Up" ? "Sign Up" : "Login"}</button>


          <div className="form-help">
            <div className="remember">
              <input type="checkbox" />
              <label htmlFor="">Remember Me</label>
            </div>
            <p> Need Help?</p>
          </div>
        </form>
        <div className="form-switch">

          {signState === "Sign Up" ? <p>Already have account? <span onClick={() => {
            setSignState("Login")
          }}> Login Now</span></p> : <p>
            New to Movies Hub? <span onClick={() => {
              setSignState("Sign Up")
            }}> Sign Up Now</span>
          </p>}
        </div>
      </div>
      <ToastContainer />
    </div>
  )
};

export default Login;
