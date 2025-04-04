let favorites = [];

const getFavorites = (req, res) => res.json(favorites);

const addFavorite = (req, res) => {
  const movie = req.body;
  if (!favorites.some((fav) => fav.id === movie.id)) {
    favorites.push(movie);
    res.status(201).json(movie);
  } else {
    res.status(400).json({ error: "Movie already is in favourites" });
  }
};

const removeFavorite = (req, res) => {
  const movieId = req.params.id;
  favorites = favorites.filter((movie) => movie.id !== movieId);
  res.json({ message: "Movie removed from favorites" });
};

module.exports = { getFavorites, addFavorite, removeFavorite };
