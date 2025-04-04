
const config = {
    apiBaseUrl: "http://localhost:4000",
    TMDB_API_KEY: process.env.REACT_APP_TMDB_API_KEY,
    TMDB_ACCESS_TOKEN: process.env.REACT_APP_TMDB_ACCESS_TOKEN,
    JSON_SERVER_URL : process.env.JSON_SERVER_URL || "http://localhost:5000/favorites",
  };
  
  export default config;
  export const { TMDB_API_KEY, apiBaseUrl, TMDB_ACCESS_TOKEN,JSON_SERVER_URL } = config;
  