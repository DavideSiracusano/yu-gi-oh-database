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

    fetch(`${API_URL}?fname=${query}`)
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

  if (loading)
    return (
      <div className="flex justify-center items-center h-40">
        <span className="loading loading-ring loading-xs"></span>
        <span className="loading loading-ring loading-sm"></span>
        <span className="loading loading-ring loading-md"></span>
        <span className="loading loading-ring loading-lg"></span>
        <span className="loading loading-ring loading-xl"></span>
      </div>
    );

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
      />

      {/* Mostra FilterCards solo se non c'è un tipo selezionato */}
      {!selectedType && (
        <FilterCards
          query={query}
          setQuery={setQuery}
          cards={currentCards}
          onAddDeck={handleAddDeck}
          onAddSide={handleAddSide}
          onAddExtra={handleAddExtra}
        />
      )}

      {/* Info sui risultati - solo quando non c'è filtro tipo */}
      {!selectedType && (
        <div className="text-center text-gray-600 mb-4">
          Mostrando {currentCards.length} di {cardsToShow.length} carte
          {query && <span> (Ricerca: {query})</span>}
        </div>
      )}

      {/* Paginazione per AllCards (quando non c'è filtro tipo) */}
      {!selectedType && cardsToShow.length > perPage && (
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
