import React, { useEffect, useState } from 'react';
import "./User.css";
import Navbar from '../../Components/Navbar/Navbar'
import Footer from '../../Components/Footer/Footer';
import img from "../../assets/user-.png"
const API = import.meta.env.VITE_API_URL;
function Users() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch(`${API}/api/users`)
            .then(response => response.json())
            .then(response => setData(response.data),sponse => setData(response.data), console.log("data of the users", data))
            .catch(err => console.error(err));
    }, [])
    return (
       <div>
            <Navbar />

            <br />
            <h1 className='head-text'>All The User Details</h1>

            {data.length > 0 ? (
                <div className="user-container">
                    {data.map((card, index) => (
                        <div className="user-box" key={index}>
                            <img src={img} alt="user" className="img-card" />
                            <h2>Name: {card.name}</h2>
                            <h3>Email: {card.email}</h3>
                        </div>
                    ))}
                </div>
            ) : (
                <h2>Users are Loading......</h2>
            )}

            <Footer />
        </div>
    )
}

export default Users
