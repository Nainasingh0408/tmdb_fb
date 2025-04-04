const express = require("express");
const axios = require("axios");
const router = express.Router();
const {TMDB_API_KEY, TMDB_ACCESS_TOKEN}=require('../config/config');
const { getTrendingMovies } = require("../controllers/moviesController");

//MOVIE SEARCH API 
router.get("/search", async (req, res) => {
    try {
      const {query} = req.query;
  
      if(!query||query.trim()===""){
        return res.status(400).json({error:"Search query is required"});
      }
      const tmdbUrl=`${TMDB_API_KEY}/search/movie?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=1`;

      const response = await axios.get(tmdbUrl, 
        {
            // params:{
            //     query,
            //     include_adult:false,
            //     language:"en-US",
            //     page:1,
            //     api_key:`${TMDB_API_KEY}`,
            // },
            headers:{
                Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
                accept:"application/json",
            },
        }
    );    
    res.join({results:response.data.results});
    } catch (error) {
        console.error("Error fetching search movies:", error);
        res.status(500).json({error:"Failed to fetch search movies"});  
    }
});
  

router.get("/trending", getTrendingMovies);

module.exports = router;
