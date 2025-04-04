const express = require("express");
const axios=require("axios");
const {JSON_SERVER_URL} = require("../config/constants"); 
const router = express.Router();

// **Push API (Add)**
router.post("/push", async (req, res) => {
    try {
      const{data:favorites}=await axios.get(JSON_SERVER_URL);
      const newMovie = req.body;
      const movieExists = favorites.some((movie) => movie.id === newMovie.id);

      if(movieExists) {
        return res.status(400).json({ message: "Movie already exists!" });
      }
      const response = await axios.post(JSON_SERVER_URL, newMovie);
  
      res.status(201).json({ message: "Movie added!", item: response.data });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // **Remove API (Delete)**
  router.delete("/remove/:id", async (req, res) => {
    try {
      const movieId  = parseInt(req.params.id);
      await axios.delete(`${JSON_SERVER_URL}/${movieId}`);
      res.json({ message: "Movie removed", id: movieId });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  

router.put("/:id",(req,res)=>{
    res.send(`put request ${req.params.id}`);
});

module.exports = router;
// http://localhost:4000/users/push
// http://localhost:4000/users/remove/1
