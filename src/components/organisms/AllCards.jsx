"use client";

import { useState, useEffect } from "react";
import FilterCards from "./FilterCards";
import {
  addCard,
  getDeck,
  addSideboard,
  getSideboard,
  addExtraDeck,
  getExtraDeck,
} from "@/components/organisms/HandleDeck";
import SelectCards from "./SelectCards";
import Button from "../atoms/Button";

function AllCards() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const API_URL_NAME = process.env.NEXT_PUBLIC_API_URL_NAME;

  const [allCards, setAllCards] = useState([]);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1); // pagina corrente
  const [perPage] = useState(20); // carte per pagina
  const [loading, setLoading] = useState(true);

  // AGGIUNGI QUESTO STATO - era mancante!
  const [selectedType, setSelectedType] = useState("");

  // stati deck
  const [deck, setDeck] = useState([]);
  const [side, setSide] = useState([]);
  const [extra, setExtra] = useState([]);

  // Carica deck da localStorage
  useEffect(() => {
    setDeck(getDeck());
    setSide(getSideboard());
    setExtra(getExtraDeck());
  }, []);

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

    fetch(`${API_URL_NAME}${query}`)
      .then((res) => res.json())
      .then((data) => {
        setResults(data.data || []);
      })
      .catch((err) => console.log(err));
  }, [query]);

  // Reset pagina quando cambia il tipo selezionato
  useEffect(() => {
    setPage(1);
  }, [selectedType]);

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

  // handler per aggiungere carte
  const handleAddDeck = (card) => {
    addCard(card); // salva su localStorage
    setDeck(getDeck()); // aggiorna lo stato con i dati persistiti
  };

  const handleAddSide = (card) => {
    addSideboard(card);
    setSide(getSideboard());
  };

  const handleAddExtra = (card) => {
    addExtraDeck(card);
    setExtra(getExtraDeck());
  };

  return (
    <div>
      <SelectCards
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        onAddDeck={handleAddDeck}
        onAddSide={handleAddSide}
        onAddExtra={handleAddExtra}
        loading={loading}
      />

      {/* Skeleton carte in caricamento */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 my-6 mx-8">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="border p-2 rounded shadow flex flex-col items-center"
            >
              <div className="skeleton h-32 w-32 mb-2 bg-gray-200"></div>
              <div className="skeleton h-4 w-20 mb-2 bg-gray-200"></div>
              <div className="flex gap-2 flex-wrap justify-center mt-2">
                <div className="skeleton h-6 w-16 rounded bg-gray-200"></div>
                <div className="skeleton h-6 w-16 rounded bg-gray-200"></div>
                <div className="skeleton h-6 w-16 rounded bg-gray-200"></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Mostra FilterCards solo se non c'è un tipo selezionato */}
      {!selectedType && !loading && (
        <FilterCards
          query={query}
          setQuery={setQuery}
          cards={currentCards}
          onAddDeck={handleAddDeck}
          onAddSide={handleAddSide}
          onAddExtra={handleAddExtra}
          loading={loading}
        />
      )}

      {/* Info sui risultati - solo quando non c'è filtro tipo */}
      {!selectedType && !loading && (
        <div className="text-center text-gray-600 mb-4">
          Mostrando {currentCards.length} di {cardsToShow.length} carte
          {query && <span> (Ricerca: {query})</span>}
        </div>
      )}

      {/* Paginazione per AllCards */}
      {!selectedType && !loading && cardsToShow.length > perPage && (
        <div className="flex justify-center gap-2 mt-4">
          <Button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-3 py-1 bg-blue-500 text-white rounded disabled:bg-gray-300"
          >
            Prev
          </Button>
          <span className="px-3 py-1">
            {page} / {totalPages}
          </span>
          <Button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="px-3 py-1 bg-blue-500 text-white rounded disabled:bg-gray-300"
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}

export default AllCards;
