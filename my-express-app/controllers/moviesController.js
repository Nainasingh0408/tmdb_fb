const axios = require("axios");
const { TMDB_API_KEY,TMDB_ACCESS_TOKEN } = require("../config/config");

const getTrendingMovies = async (req, res) => {
  try {
    const response = await axios.get(
      `${ TMDB_API_KEY }`,
      {
        headers: {
          Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
          accept: "application/json",
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch trending movies" });
  }
};

module.exports = { getTrendingMovies };
