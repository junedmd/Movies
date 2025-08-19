import React, { useEffect, useState } from "react";
import "./Details.css";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import back_arrow from "../../assets/back_arrow_icon.png";
import Navbar from "../../Components/Navbar/Navbar";


const Details = () => {
  const { id } = useParams();
  const [movieData, setMovieData] = useState(null);
  const [loading, setLoading] = useState(true);

   const handleBack = () => {
        window.location.href = `/`;
    };
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNTU1ODJiZmY1OWE3NDQ5MjdhZGRiMjUwZmZiYjhlNSIsIm5iZiI6MTc1NDczNDUwMy45MjEsInN1YiI6IjY4OTcxZmE3Yjc3YTZmZjQ5MzVkMDg3MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.JDFhWzQYlIPmUyoxf0uilE-16YSOf2d247SnjmKRRu8"
    }
  };

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options)
      .then((response) => response.json())
      .then((data) => {
        setMovieData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);


  if (loading) {
    return <div className="movie-container">Loading...</div>;
  }

  if (!movieData) {
    return <div className="movie-container">Movie not found.</div>;
  }

  return (
    <>
    
       
    <div className="movie-container">
      <div
        className="backdrop"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movieData.backdrop_path})`
        }}
      >
        <div className="overlay">
           <img src={back_arrow} alt="" onClick={handleBack} className="arow" />
        </div>
        <div className="movie-header">
          <img
            className="poster"
            src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`}
            alt={movieData.title}
          />
          <div className="info">
            <h1>{movieData.title}</h1>
            <p className="tagline">{movieData.tagline}</p>
            <p className="genres">
              {movieData.genres.map((g) => g.name).join(", ")}
            </p>
            <p className="meta">
              {movieData.release_date} • {movieData.runtime} min •{" "}
              {movieData.spoken_languages
                .map((l) => l.english_name)
                .join(", ")}
            </p>
            <p className="rating">
              ⭐ {movieData.vote_average} / 10 ({movieData.vote_count} votes)
            </p>
            <Link to={`/video/${id}`}
              href={movieData.homepage}
              state={{
                bgImage: `https://image.tmdb.org/t/p/original${movieData.backdrop_path}`
              }}
              className="watch-link"
            >
              Watch Trailer
            </Link>
          </div>
        </div>
      </div>


      <div className="overview">
        <h2>Overview</h2>
        <p>{movieData.overview}</p>
      </div>


      <div className="production">
        <h2>Production Companies</h2>
        <div className="companies">
          {movieData.production_companies.map((comp) => (
            <div key={comp.id} className="company">
              {comp.logo_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w200${comp.logo_path}`}
                  alt={comp.name}
                />
              ) : (
                <div className="no-logo">{comp.name}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
      {/* <Footer/> */}
    </>
  );
};

export default Details;
