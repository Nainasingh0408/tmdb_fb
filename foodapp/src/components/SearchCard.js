import React, { useCallback, useContext, useEffect, useRef } from "react";
import "../componentscss/SearchCard.css";
import { SearchContext } from "../commons/SearchProvider";
import { debounce } from "./debounce";
import {TMDB_API_KEY,TMDB_ACCESS_TOKEN} from "../config";

const SearchCard = ({ onSearchTrigger }) => {                // Receive trigger
  const { findMovies, setFindMovies, searchInput, setSearchInput } = useContext(SearchContext);
  const searchInputRef = useRef(null); 
  const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          `Bearer ${TMDB_ACCESS_TOKEN}`,
      },
    };
                       // Create ref for search input

  useEffect(() => {
    if (onSearchTrigger) {
      searchInputRef.current?.focus();                    //  Focus when triggered
    }
  }, [onSearchTrigger]);  // Watch trigger changes

  const searchMovies = (query) => {
    if (!query.trim()) return;

    setFindMovies({ apiData: [], loading: true });

    fetch(`${TMDB_API_KEY}/search/movie?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=1`,options)
      .then((res) => res.json())
      .then((res) => {
        setFindMovies({ apiData: res.results || [], loading: false });
      })
      .catch((err) => {
        console.error(err);
        setFindMovies({ apiData: [], loading: false });
      });
  };

  const handleInput = (e) => {
    setSearchInput(e.target.value);
  };

  const debouncedSearch = useCallback(
    debounce((query) => {
      if (query.trim()) {
        searchMovies(query);
      }
    }, 300),
    []
  );

  useEffect(() => {
    if (searchInput.trim() !== "") {
      debouncedSearch(searchInput);
    }
  }, [searchInput]);

  return (
    <section className='searchCard'>
      <section className='wrap'>
        <p className='welcome'>Welcome.</p>
        <p className='descriptionOfSearch'>
          Millions of movies, TV shows, and people to discover. Explore now.
        </p>
        <div className='search-box'>
          <input
            ref={searchInputRef}  // Attach ref to input
            className='search-input'
            type='search'
            value={searchInput}
            onChange={handleInput}
            placeholder='Search for a movie, TV show, or person...'
          />
          <div className='search_btn_container'>
            <button className='searchbutton' onClick={() => searchMovies(searchInput)}>
              Search
            </button>
          </div>
        </div>
      </section>
    </section>
  );
};

export default SearchCard;
