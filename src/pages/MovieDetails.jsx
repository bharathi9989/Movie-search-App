import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMovieDetails } from "../api/omdb";

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    getMovieDetails(id).then(setMovie);
  }, [id]);

  if (!movie) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <img src={movie.Poster} className="w-64" />
      <h1 className="text-2xl font-bold">{movie.Title}</h1>
      <p>{movie.Genre}</p>
      <p>{movie.Plot}</p>
      <p>{movie.Actors}</p>
    </div>
  );
}
