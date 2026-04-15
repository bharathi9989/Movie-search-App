import { Link } from "react-router-dom";
import { useContext } from "react";
import { FavoritesContext } from "../context/FavoritesContext";

export default function MovieCard({ movie }) {
  const { favorites, addFavorite, removeFavorite } =
    useContext(FavoritesContext);

  const isFav = favorites.some((m) => m.imdbID === movie.imdbID);

  return (
    <div className="relative">
      {/* ❤️ Button */}
      <button
        onClick={() =>
          isFav ? removeFavorite(movie.imdbID) : addFavorite(movie)
        }
        className="absolute top-2 right-2 bg-white px-2 py-1 rounded shadow"
      >
        {isFav ? "❤️" : "🤍"}
      </button>

      <Link to={`/movie/${movie.imdbID}`}>
        <div className="border p-2 rounded shadow hover:scale-105 transition h-full flex flex-col">
          <img
            src={movie.Poster !== "N/A" ? movie.Poster : "/no-image.png"}
            alt={movie.Title}
            className="w-full h-60 object-cover"
            onError={(e) => (e.target.src = "/no-image.png")}
          />

          <div className="mt-2 flex-1">
            <h2 className="font-bold">{movie.Title}</h2>
            <p>{movie.Year}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}
