"use client";

import { useEffect, useState } from "react";
import { useDebounce } from "./useDebounce";

export default function SearchBox({ initialQuery = "", onSearch }) {
  const [term, setTerm] = useState(initialQuery);

  const debouncedTerm = useDebounce(term, 300);

  useEffect(() => {
    onSearch(debouncedTerm);
  }, [debouncedTerm, onSearch]);

  return (
    <div className="search-box">
      <span>⌕</span>

      <input
        type="text"
        value={term}
        onChange={(event) => setTerm(event.target.value)}
        placeholder="Search dishes..."
      />
    </div>
  );
}
