import "../componentscss/Fav.css";
import React, { useEffect, useState } from "react";
import RestaurantCard from "./RestaurantCard";
import {apiBaseUrl,JSON_SERVER_URL} from "../config";
// import the api's base url or token or key by config it makes it safer and helps to work with it easily
const Fav = () => {
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState([]); // ensure state exists

  useEffect(() => {
    setLoading(true);
    fetch(`${JSON_SERVER_URL}`)
      .then((response) => response.json())
      .then((data) => {
        setFavorites(data); //Update state 
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching favorites:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div>
     <section className='searchCard'>
      <section className='wrap'>
        <p className='welcome'>Welcome.</p>
        <p className='descriptionOfSearch'>
          Millions of movies, TV shows, and people to discover. Explore now.
        </p>
        </section>
      </section>
      <h1 className="fav">My Favourites</h1>
      <div className="res-container">
        {loading ? (
          <h4>Loading...</h4>
        ) : (
          favorites.map((movie) => (
            <RestaurantCard 
              key={movie.id || movie.title} 
              apiData={movie}
              isAdded={true} //isAdded
              favorites={favorites}
              setFavorites={setFavorites} //setFavorites function
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Fav;
