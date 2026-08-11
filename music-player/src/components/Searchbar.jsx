function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <label className="search-bar">
      <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6.5" /><path d="m16 16 4 4" /></svg>
      <input
        type="text"
        placeholder="Search by song or artist..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </label>
  );
}

export default SearchBar;
