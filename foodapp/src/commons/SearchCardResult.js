import React, { useContext } from "react";
import { SearchContext } from "../commons/SearchProvider";
import RestaurantCard from "../components/RestaurantCard";
import "./SearchCardResult.css";

const SearchCardResult = () => {
  const { findMovies } = useContext(SearchContext);
  console.log(findMovies,"findMovies in SearchCardResult:"); 
  return (
    <>
    
      <h2 className="rslt" style={{ marginLeft: "2rem" }}>Results</h2>

      {findMovies.loading ? (
        <p>Loading search results...</p>
      ) : findMovies.apiData && findMovies.apiData.length > 0 ? (
        <div className='movieGrid'>
          {findMovies.apiData.map((el, index) => (
            <RestaurantCard key={index} apiData={el} 
            path={`https://media.themoviedb.org/t/p/w220_and_h330_face${el.poste_path}`} />
          ))}
        </div>
      ) : (
        <div className='no-results-container'>
          <div className='oops-text'>Oops!</div>
          <p className='message-text'>No results found! Try searching for something else!</p>
        </div>
      )}
    </>
  );
};

export default SearchCardResult;
