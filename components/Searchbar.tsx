"use client";

import { useState } from "react";

export default function Searchbar({
  onSearch,
}: {
  onSearch: (query: string) => void;
}) {
  const [query, setQuery] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  }

  return (
    <input
      type="text"
      placeholder="Search coins..."
      //           type="text"
      // value={query}
      // onChange={handleChange}
      className="p-2 rounded bg-gray-700 text-gray-100 border border-gray-600 focus:outline-none focus:border-blue-400"
    />
  );
}
