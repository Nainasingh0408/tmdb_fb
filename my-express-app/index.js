const express = require("express");
const axios=require("axios"); 
const {JSON_SERVER_URL}=require("./config/constants");
const cors = require("cors");
const app = express();
const port = 4000;
const config=require('./config/config');
require('dotenv').config();


app.use(express.json());
app.use(cors());

app.get('/api/config', (req, res) => {
  res.json({
      TMDB_API_KEY: config.TMDB_API_KEY, 
      apiBaseUrl: config.apiBaseUrl,
      TMDB_ACCESS_TOKEN: config.TMDB_ACCESS_TOKEN
  });
});

const userRoutes=require('./routes/users');
app.use("/users", userRoutes);

const movieRoutes = require("./routes/movieroutes");
const favoriteRoutes = require("./routes/favorites");

app.use("/api/movies", movieRoutes);
app.use("/api/favorites", favoriteRoutes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
