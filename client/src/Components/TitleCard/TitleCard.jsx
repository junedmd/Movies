import React, { useEffect, useRef, useState } from "react";
import "./TitleCard.css";
// import Cards_data from './../../assets/cards/Cards_data';
import { Link } from "react-router";


const TitleCard = (({ title, category }) => {

    const [data,setData]=useState([]);

    const cardsRef = useRef();

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNTU1ODJiZmY1OWE3NDQ5MjdhZGRiMjUwZmZiYjhlNSIsIm5iZiI6MTc1NDczNDUwMy45MjEsInN1YiI6IjY4OTcxZmE3Yjc3YTZmZjQ5MzVkMDg3MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.JDFhWzQYlIPmUyoxf0uilE-16YSOf2d247SnjmKRRu8'
        }
    };

    


    const handleWheel = (event) => {
        event.preventDefault();
        cardsRef.current.scrollLeft += event.deltaY;

    }
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
        .then(response => response.json())
        .then(response => setData(response.results))
        .then(response=> console.log(data))
        .catch(err => console.error(err));
       

        cardsRef.current.addEventListener('wheel', handleWheel)
    }, [])

    return (
        <>
            <div className="title-cards">
                <h2>{title ? title : "Popular Movies"}</h2>
                <div className="card-list" ref={cardsRef}>
                    {
                        data.map((card, index) => {
                            return  <Link to={`/details/${card.id}`}> <div className="card" key={index}>
                                <img src={ `https://image.tmdb.org/t/p/w500`+card.poster_path} alt=""  className="img-part"/>
                                <p> {card.title}</p>
                            </div></Link>
                        })
                    }
                </div>
            </div>
        </>
    )

})

export default TitleCard;