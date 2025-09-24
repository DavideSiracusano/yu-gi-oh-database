"use client";

import { useState, useEffect } from "react";
import CardImage from "../atoms/CardImage";
import API_URL from "@/ApiKey";

function AllCards() {
  const [allCards, setAllCards] = useState([]);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1); // pagina corrente
  const [perPage] = useState(20); // carte per pagina
  const [loading, setLoading] = useState(true);

  // Carica tutte le carte
  useEffect(() => {
    setLoading(true);
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setAllCards(data.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  // Filtra le carte quando cambia query
  useEffect(() => {
    if (!query) {
      setResults([]); // nessun filtro
      return;
    }

    fetch(`${API_URL}?fname=${query}`)
      .then((res) => res.json())
      .then((data) => {
        setResults(data.data || []);
      })
      .catch((err) => console.log(err));
  }, [query]);

  if (loading) return <p className="text-center">Loading...✋🏻</p>;

  // Carte da mostrare in base a query
  const cardsToShow = query ? results : allCards;

  // Paginazione
  const totalPages = Math.ceil(cardsToShow.length / perPage);

  /* indice iniziale che parte da 0 e moltiplica per 20, la seconda pagina parte da 20, (2-1)*20 ecc ) */
  const startIndex = (page - 1) * perPage;
  // indice finale che parte da 0 + 20
  const endIndex = startIndex + perPage;
  // carte da mostrare
  const currentCards = cardsToShow.slice(startIndex, endIndex);

  return (
    <div>
      <input
        type="text"
        value={query}
        placeholder="Cerca una carta..."
        onChange={(e) => setQuery(e.target.value)}
        className="border p-2 rounded mb-4 w-full"
      />

      {currentCards.length > 0 ? (
        <ul className="grid  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {currentCards.map((card) => (
            <li
              key={card.id}
              className=" bg-gray-100 p-5 rounded shadow flex flex-col items-center
                hover:cursor-pointer hover:scale-105 transition-transform duration-200 ease-in-out"
            >
              <p>{card.name}</p>
              {card.card_images && card.card_images.length > 0 && (
                <CardImage
                  src={card.card_images[0].image_url}
                  alt={card.name}
                  className="w-[150px] h-auto mt-2"
                />
              )}
              <p className="text-green-600 font-bold mt-2">Cardmarket price:</p>
              <div className="price">
                {`$${card.card_prices[0].cardmarket_price}`}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>
          {query
            ? `Nessuna carta trovata per "${query}"`
            : "Nessuna carta disponibile"}
        </p>
      )}

      {/* Paginazione */}
      {cardsToShow.length > perPage && (
        <div className="flex justify-center gap-2 mt-4">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-3 py-1 bg-blue-500 text-white rounded disabled:bg-gray-300"
          >
            Prev
          </button>
          <span className="px-3 py-1">
            {page} / {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="px-3 py-1 bg-blue-500 text-white rounded disabled:bg-gray-300"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default AllCards;
