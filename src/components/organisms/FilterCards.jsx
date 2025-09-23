"use client";

import { useState, useEffect } from "react";
import CardImage from "../atoms/CardImage";
import API_URL from "@/ApiKey";

function FilterCards() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) {
      setResults([]); // se la query è vuota, non mostrare nulla
      return;
    }

    setLoading(true);

    fetch(`${API_URL}?fname=${query}`) // cerca solo per nome
      .then((response) => response.json())
      .then((data) => {
        setResults(data.data || []); // si prende l'array data dentro all'oggetto
        setLoading(false); // disattiva caricamento
      })
      .catch((err) => console.log(err));
  }, [query]);

  return (
    <div>
      <input
        type="text"
        value={query}
        placeholder="Cerca una carta..."
        onChange={(e) => setQuery(e.target.value)}
        className="border p-2 rounded mb-4 w-full"
      />

      {loading && <p>Caricamento...</p>}

      {results.length > 0 && (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {results.map((card) => (
            <li
              className="
            cards bg-gradient-to-br from-[#e0eafc] to-[#cfdef3] 
            rounded-lg shadow-md border border-[#b6c6e0] 
            text-center w-[200px] p-4 gap-2 
            flex flex-col items-center 
            hover:cursor-pointer hover:scale-110 transition-transform duration-400 ease-in-out"
              key={card.id}
            >
              {card.name}
              {
                <CardImage
                  image={card.card_images[0].image_url}
                  alt={card.name}
                  className="w-[170px] h-auto object-cover mb-2"
                />
              }
              <p className="text-green-600 font-bold mt-2">Cardmarket price:</p>
              <div className="price">
                {`$${card.card_prices[0].cardmarket_price}`}
              </div>
            </li>
          ))}
        </ul>
      )}

      {query && results.length === 0 && !loading && (
        <p>Nessuna carta trovata per "{query}"</p>
      )}
    </div>
  );
}

export default FilterCards;
