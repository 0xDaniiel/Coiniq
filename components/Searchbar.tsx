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
      value={query}
      onChange={handleChange}
      placeholder="Search coins..."
      className="w-full p-2 mb-4 rounded bg-gray-800 text-gray-100 border border-gray-700 focus:outline-none focus:border-blue-400"
    />
  );
}
