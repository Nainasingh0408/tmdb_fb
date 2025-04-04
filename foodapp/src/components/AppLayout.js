import {TMDB_API_KEY,TMDB_ACCESS_TOKEN} from "../config";
import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { useState, useEffect } from "react";

const AppLayout = () => {
  const [listofRes, setListofRes] = useState([]);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        `Bearer ${TMDB_ACCESS_TOKEN}`,
    },
  };

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const response = await fetch(
          `${TMDB_API_KEY}/trending/all/day?language=en-US`,
          options
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const json = await response.json();
        console.log("Trending Movies Data:", json);
        setListofRes(json.results || []);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchTrendingMovies();
  }, []);

  return listofRes.length === 0 ? (
    <Shimmer />
  ) : (
    
    <><h2 className='Trending-Word'>Trending</h2><div className="res-container">
        {listofRes.map((movie) => (
          <RestaurantCard key={movie.id} apiData={movie} />
        ))}
      </div></>
  );
};

export default AppLayout;
