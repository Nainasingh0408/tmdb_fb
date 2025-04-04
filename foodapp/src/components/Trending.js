import React, { useEffect, useState } from "react";
import RestaurantCard from "./RestaurantCard";
import {TMDB_ACCESS_TOKEN,TMDB_API_KEY} from "../config";

const Trending = () => {
  const [popularMovies, setPopularMovies] = useState({ data: null, loading: true });
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        `Bearer ${TMDB_ACCESS_TOKEN}`,
    },
  };

  const fetchPopularMovies = () => {
    fetch(`${TMDB_API_KEY}/movie/popular`, options)
      .then((res) => res.json())
      .then((res) => {
        console.log(res, "res");
        setPopularMovies({ data: res, loading: false });
      })
      .catch((err) => console.error(err));
  };

  console.log(popularMovies, "this is the popular movie data");

  useEffect(() => {
    fetchPopularMovies();
  }, []);

  return (
    <>
      <h2 className='Trending-Word'>What's Popular</h2>
        <div className='res-container'>
        {!popularMovies.loading &&
          popularMovies?.data?.results?.map((el, i) => {
            return <RestaurantCard apiData={el} path='https://media.themoviedb.org/t/p/w220_and_h330_face' />;
          })}
      </div>
    </>
  );
};

export default Trending;
