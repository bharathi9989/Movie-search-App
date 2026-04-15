import { useContext } from "react";
import { FavoritesContext } from "../context/FavoritesContext";
import MovieCard from "../components/MovieCard";

export default function Favorites() {
  const { favorites } = useContext(FavoritesContext);

  if (favorites.length === 0) {
    return <p className="p-4">No favorites added</p>;
  }

  return (
    <div className="p-4 grid grid-cols-2 md:grid-cols-4 gap-4">
      {favorites.map((m) => (
        <MovieCard key={m.imdbID} movie={m} />
      ))}
    </div>
  );
}
