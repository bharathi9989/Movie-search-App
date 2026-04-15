import { createContext, useState, useEffect } from "react";

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("fav")) || [];
    setFavorites(stored);
  }, []);

  const addFavorite = (movie) => {
    const exists = favorites.some((m) => m.imdbID === movie.imdbID);
    if (exists) return;

    const updated = [...favorites, movie];
    setFavorites(updated);
    localStorage.setItem("fav", JSON.stringify(updated));
  };

  const removeFavorite = (id) => {
    const updated = favorites.filter((m) => m.imdbID !== id);
    setFavorites(updated);
    localStorage.setItem("fav", JSON.stringify(updated));
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};
