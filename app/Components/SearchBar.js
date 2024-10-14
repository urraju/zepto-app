export default function SearchBar({ searchQuery, setSearchQuery }) {
  return (
    <input
      type="text"
      placeholder="Search books by title..."
      className="py-3 px-3 border text-sm text-black rounded w-full outline-none focus:border-orange-500 focus:border-opacity-45"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
  );
}
