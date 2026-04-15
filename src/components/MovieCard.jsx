import { Link } from "react-router-dom";

export default function MovieCard({ movie }) {
  return (
    <Link to={`/movie/${movie.imdbID}`}>
      <div className="border p-2 rounded shadow hover:scale-105 transition">
        <img
          src={movie.Poster !== "N/A" ? movie.Poster : "/no-image.png"}
          alt={movie.Title}
          className="w-full h-60 object-cover"
        />
        <h2 className="font-bold">{movie.Title}</h2>
        <p>{movie.Year}</p>
      </div>
    </Link>
  );
}
