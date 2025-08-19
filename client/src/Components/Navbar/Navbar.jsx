import React, { useState,useEffect, useRef } from "react";
import "./Navbar.css";
// import logo from "../../assets/logo-.jpg";
// import logo from "../../assets/logo1.jpg"
// import search_icon from "../../assets/search_icon.svg";
import bell_icon from "../../assets/bell_icon.svg";
import prof_img from '../../assets/profile_img.png'
import dropdown_icon from '../../assets/caret_icon.svg'
import {Link} from "react-router-dom";
function Navbar(){
    const [user ,setUser]=useState(" ");

    const navRef = useRef();

    const logout=()=>{
        
        localStorage.removeItem("user");
        window.location.href ="/"
              
    };
    useEffect(()=>{
        const data = JSON.parse(localStorage.getItem("user") || "null");
        setUser(data);
        console.log(user.name)  
    },[])

    useEffect(()=>{
        window.addEventListener('scroll',()=>{
            if(window.scrollY >=80){
                navRef.current.classList.add("nav-dark")
            }else{
                  navRef.current.classList.remove("nav-dark")
            }
        })
    },[])
    return(
        <>
        <div ref={navRef} className="navbar">
            <div className="nav-left">
                {/* <img src={logo} alt="" className="nav-logo" /> */}
                <Link to="/" className="nav-logo">
          Movies Hub
        </Link>
                <ul>
                    <Link to="/" className="Navbar_a"> Home</Link>
                    <li>Tv Shows</li>
                    <li>New & Popular</li>
                    <li>My list</li>
                    <li>Browse by Languages</li>
                    {user?<> </>: <li> <Link to="/login" className="Navbar_a">Login</Link></li>} 
                     
                    {/* <li><Link to="/login" className="Navbar_a">Login</Link></li> */}

                </ul>
            </div>
            <div className="nav-right">
                {/* <img src={search_icon} alt="search-icon" className="icons"/> */}
                <p > {user?<Link to="/users" className="Navbar_a" >All Users</Link>:<></>}</p>
                <img src={bell_icon} alt="search-icon" className="icons"/>
                <div className="nav-profile">
                <img src={prof_img} alt="search-icon" className="profile"/>
                <img src={dropdown_icon} alt="search-icon" className=""/>
                <p>{user?user.name:<></>}</p>
                <div className="dropdown">
                    <p onClick={logout}> Logout</p>
                </div>
                </div>
                
            </div>
        </div>
        </>
    )
}
export default Navbar;