import React from "react";
import "./Footer.css";
import insta_icon from '../../assets/instagram_icon.png';
import twitter_icon from "./../../assets/twitter_icon.png";
import youtube_icon from "../../assets/youtube_icon.png";
import facebook_icon from "../../assets/facebook_icon.png";
function Footer() {
    return (
        <>
            <div className="footer">
                <div className="footer-icon">
                    <img src={insta_icon} alt="" className="icon-img" />
                    <img src={facebook_icon} alt="" className="icon-img" />
                    <img src={youtube_icon} alt="" className="icon-img" />
                    <img src={twitter_icon} alt="" className="icon-img" />
                </div>
                <ul>
                    <li>Audio Description</li>
                    <li>Subtitles</li>
                    <li>Gift Cards</li>
                    <li>Privacy Policy</li>
                    <li>Terms & Conditions</li>
                    <li>Help Center</li>
                    <li>Contact Us</li>
                    <li>Careers</li>
                    <li>Press Releases</li>
                    <li>Partnerships</li>
                </ul>
                <p className="text">© 2006–2025 Movies Hub, India. All rights reserved.</p>
            </div>
        </>
    )
}
export default Footer;