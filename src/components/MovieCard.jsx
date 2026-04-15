import { Link } from "react-router-dom";

export default function MovieCard({ movie }) {
  return (
    <Link to={`/movie/${movie.imdbID}`}>
      <div className="border p-2">
        <img src={movie.Poster} alt={movie.Title} />
        <h2>{movie.Title}</h2>
        <p>{movie.Year}</p>
      </div>
    </Link>
  );
}
