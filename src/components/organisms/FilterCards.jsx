"use client"; // <<=== importantissimo

import { useState, useEffect } from "react";
import API_URL from "@/ApiKey";

function FilterCards() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}?fname=${query}`)
      .then((response) => response.json())
      .then((data) => setResults(data.data))
      .catch((err) => console.log(err));
  }, [query]);

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      <ul>
        {results.map((result) => (
          <li key={result.id}>{result.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default FilterCards;
