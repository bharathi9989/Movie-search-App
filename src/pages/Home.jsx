import { useState, useEffect } from "react";
import { searchMovies } from "../api/omdb";
import MovieCard from "../components/MovieCard";

export default function Home() {
  const [query, setQuery] = useState("batman");
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [type, setType] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchMovies();
  }, [page, type]);

  const fetchMovies = async () => {
    try {
      const data = await searchMovies(query, page, type);
      setMovies(data.Search);
      setError("");
    } catch (err) {
      setError(err);
      setMovies([]);
    }
  };

  return (
    <div className="p-4">
      {/* Search */}
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border p-2"
        placeholder="Search movies..."
      />

      <button onClick={fetchMovies}>Search</button>

      {/* Filter */}
      <select onChange={(e) => setType(e.target.value)}>
        <option value="">All</option>
        <option value="movie">Movie</option>
        <option value="series">Series</option>
      </select>

      {/* Error */}
      {error && <p>{error}</p>}

      {/* Movies */}
      <div className="grid grid-cols-3 gap-4">
        {movies.map((m) => (
          <MovieCard key={m.imdbID} movie={m} />
        ))}
      </div>

      {/* Pagination */}
      <button onClick={() => setPage(page - 1)}>Prev</button>
      <button onClick={() => setPage(page + 1)}>Next</button>
    </div>
  );
}
