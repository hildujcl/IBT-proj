"use client";

export default function SearchBar({ search, setSearch }) {
  return (
    <input
      type="search"
      className="search-input"
      placeholder="Search for your favorite food..."
      value={search}
      onChange={(event) => setSearch(event.target.value)}
      aria-label="Search menu"
    />
  );
}
