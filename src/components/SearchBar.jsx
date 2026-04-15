export default function SearchBar({
  query,
  setQuery,
  type,
  setType,
  onSearch,
}) {
  return (
    <div className="flex gap-2 mb-4">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border p-2 flex-1"
        placeholder="Search movies..."
      />

      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="border p-2"
      >
        <option value="">All</option>
        <option value="movie">Movie</option>
        <option value="series">Series</option>
      </select>

      <button onClick={onSearch} className="bg-blue-500 text-white px-4">
        Search
      </button>
    </div>
  );
}
