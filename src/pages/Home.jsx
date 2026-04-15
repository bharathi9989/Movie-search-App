import { useState, useEffect } from "react";
import { searchMovies } from "../api/omdb";
import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";
import Loader from "../components/Loader";
import useDebounce from "../hooks/useDebounce";
import { getCache, setCache } from "../utils/cache";

export default function Home() {
  const [query, setQuery] = useState("avengers");
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    fetchMovies(true);
  }, [debouncedQuery, type]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100
      ) {
        setPage((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    fetchMovies();
  }, [page]);

  const fetchMovies = async (reset = false) => {
    if (!debouncedQuery.trim()) {
      setMovies([]);
      setError("");
      return;
    }
    try {
      setLoading(true);
      const key = `${debouncedQuery}_${page}_${type}`;
      const cached = getCache(key);

      let data;
      if (cached) {
        data = cached;
      } else {
        data = await searchMovies(debouncedQuery, page, type);
        setCache(key, data);
      }

      setMovies((prev) => {
        const combined = reset ? data.Search : [...prev, ...data.Search];

        const uniqueMovies = Array.from(
          new Map(combined.map((m) => [m.imdbID, m])).values(),
        );

        return uniqueMovies;
      });

      setError("");
    } catch (err) {
      setError(err.message);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-gray-900 min-h-screen text-white">
      <SearchBar
        query={query}
        setQuery={setQuery}
        type={type}
        setType={setType}
        onSearch={() => fetchMovies(true)}
      />

      {!debouncedQuery && (
        <p className="text-center mt-10 text-gray-400">
          Start typing to search movies...
        </p>
      )}

      {error && debouncedQuery && (
        <p className="text-red-500 text-center mt-4">
          {error === "Movie not found!"
            ? "No movies found"
            : "Something went wrong"}
        </p>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {movies.map((m) => (
          <MovieCard key={m.imdbID} movie={m} />
        ))}
      </div>

      {loading && <Loader />}
    </div>
  );
}
