import React from 'react'
import "./Home.css"
import Navbar from '../../Components/Navbar/Navbar';
import Footer from "../../Components/Footer/Footer"

import image1 from "../../../public/tom.avif"

import play_icon from './../../assets/play_icon.png';
import info_icon from './../../assets/info_icon.png';
import TitleCard from "./../../Components/TitleCard/TitleCard.jsx"

function Home() {
  return (
    <div className='home'>
        <Navbar/>
        <div className="hero">
        <img src={image1} alt='' className='banner-img'/>
        <div className="hero-caption">
            {/* <img src={title1} alt=""  className='caption-img'/> */}
            <p>Jack Harper, a technician on a desolate Earth tasked with repairing drones, who begins to question his reality after encountering a crashed spacecraft. </p>
            <div className="hero-btns">
                <button className='btn sm-btn'>
                     <img src={play_icon} alt=''/>
                     Play
                </button>
                <button className='btn dark-btn'>
                     <img src={info_icon} alt=''/>
                    More Info
                </button>  
            </div>
           <TitleCard/>
        </div>
        </div>

         <div className="more-card">
            <TitleCard title={"BlockBuster Movies"} category={"top_rated"}/>
             <TitleCard title={"New UpComing"} category={"popular"}/>
            <TitleCard title={"Only on Netflix"}  category={"now_playing"}/>
            <TitleCard title={"Top Pics for You"} category={"upcoming"}/>
        </div>
        
        <Footer/>
    </div>
  ) 
}

export default Home




