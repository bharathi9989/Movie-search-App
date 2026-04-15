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

  // 🔥 Reset page when query/type changes
  useEffect(() => {
    setPage(1);
  }, [debouncedQuery, type]);

  // 🔥 Fetch movies when page/query/type changes
  useEffect(() => {
    fetchMovies();
  }, [debouncedQuery, page, type]);

  const fetchMovies = async () => {
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

      // ✅ Replace movies (pagination mode)
      const uniqueMovies = Array.from(
        new Map(data.Search.map((m) => [m.imdbID, m])).values(),
      );

      setMovies(uniqueMovies);
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
      {/* 🔍 Search */}
      <SearchBar
        query={query}
        setQuery={setQuery}
        type={type}
        setType={setType}
        onSearch={() => {
          setPage(1);
          fetchMovies();
        }}
      />

      {/* 🧠 Empty state */}
      {!debouncedQuery && (
        <p className="text-center mt-10 text-gray-400">
          Start typing to search movies...
        </p>
      )}

      {/* ❌ Error */}
      {error && debouncedQuery && (
        <p className="text-red-500 text-center mt-4">
          {error === "Movie not found!"
            ? "No movies found"
            : "Something went wrong"}
        </p>
      )}

      {/* 🎬 Movies Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {movies.map((m) => (
          <MovieCard key={m.imdbID} movie={m} />
        ))}
      </div>

      {/* ⏳ Loader */}
      {loading && <Loader />}

      {/* 🔥 Pagination */}
      {movies.length > 0 && (
        <div className="flex justify-center items-center gap-4 mt-6">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            className="bg-gray-700 px-4 py-2 rounded disabled:opacity-50"
            disabled={page === 1}
          >
            Prev
          </button>

          <span className="px-4 py-2">Page {page}</span>

          <button
            onClick={() => setPage((p) => p + 1)}
            className="bg-gray-700 px-4 py-2 rounded"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
