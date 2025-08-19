import React, { useEffect, useState } from "react";
import "./VideoPage.css";
import back_arrow from "../../assets/back_arrow_icon.png"
import { useLocation, useParams, useNavigate } from "react-router-dom";

function Video() {

    const { id } = useParams();
    const location = useLocation();
    const bgImage = location.state?.bgImage;
    
   const navigate = useNavigate();   // ✅ initialize nvaigate

  const handleBack = () => {
    navigate(-1);   // ✅ goes back one page in history
  };


    const [data, setData] = useState({
        name: "",
        key: "",
        published_at: "",
        typeof: ""
    });
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNTU1ODJiZmY1OWE3NDQ5MjdhZGRiMjUwZmZiYjhlNSIsIm5iZiI6MTc1NDczNDUwMy45MjEsInN1YiI6IjY4OTcxZmE3Yjc3YTZmZjQ5MzVkMDg3MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.JDFhWzQYlIPmUyoxf0uilE-16YSOf2d247SnjmKRRu8'
        }
    };


    useEffect(() => {
        fetch(` https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
            .then(response => response.json())
            .then(response => setData(response.results[0]))
            .catch(err => console.error(err));
    }, [])

   

    return (
        <>

            <div className="player" >

                <img src={back_arrow} alt="" onClick={handleBack} />
                <iframe width='70%' height='80%' src={`https://www.youtube.com/embed/${data.key}`} allowFullScreen className="figure-box"></iframe>

                <div className="player-info">
                    <p>Date: {data.published_at.slice(0, 10)} </p>
                    <p>Name:{data.name}</p>
                    <p>Type:  {data.type}</p>
                </div>
            </div>
        </>
    )
}
export default Video;

