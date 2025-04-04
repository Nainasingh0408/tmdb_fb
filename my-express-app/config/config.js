require('dotenv').config();


module.exports = {
  JSON_SERVER_URL : process.env.JSON_SERVER_URL || "http://localhost:5000/favorites",
  TMDB_API_KEY: process.env.TMDB_API_KEY,
  apiBaseUrl:"http://localhost:4000",
  TMDB_ACCESS_TOKEN: process.env.TMDB_ACCESS_TOKEN,
  };
  