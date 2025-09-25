"use client";
import React, { useState, useEffect } from "react";
import CardResults from "./CardResults";
import Button from "../atoms/Button";

function SelectCards({
  selectedType,
  setSelectedType,
  onAddDeck,
  onAddSide,
  onAddExtra,
}) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const [cards, setCards] = useState([]);
  const [page, setPage] = useState(1);
  const perPage = 20;

  // numero totale di pagine
  const totalPages = Math.ceil(cards.length / perPage);

  // Calcola gli indici di inizio e fine per la pagina corrente
  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;

  // Ottiene le carte per la pagina corrente
  const currentCards = cards.slice(startIndex, endIndex);

  useEffect(() => {
    if (!selectedType) {
      setCards([]);
      return;
    }

    // Per un problema di API deve essere effettuata una chiamata per ogni tipo

    let url = API_URL;
    if (selectedType === "Effect Monster") {
      // Fetch tutti i mostri con effetto
      url += "&has_effect=1";
    } else {
      // Fetch per tipo preciso (Spell Card, Trap Card, Normal Monster, ecc.)
      url += `&type=${encodeURIComponent(selectedType)}`;
    }

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        let fetchedCards = data.data || [];

        // Se Effect Monster, filtriamo solo mostri, non magie/trappole
        if (selectedType === "Effect Monster") {
          fetchedCards = fetchedCards.filter((card) =>
            card.type.includes("Monster")
          );
        }

        setCards(fetchedCards);
        setPage(1);
      })
      .catch((err) => {
        console.log(err);
        setCards([]);
      });
  }, [selectedType]);

  return (
    <div className="flex flex-col items-center">
      <select
        value={selectedType || ""}
        onChange={(e) => setSelectedType(e.target.value)}
        className="my-4 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-gray-700"
      >
        <option value="">Tutte</option>
        <option value="Spell Card">Spell</option>
        <option value="Trap Card">Trap</option>
        <option value="Normal Monster">Normal Monster</option>
        <option value="Effect Monster">Effect Monster</option>
        <option value="Ritual Monster">Ritual Monster</option>
        <option value="Fusion Monster">Fusion Monster</option>
        <option value="Synchro Monster">Synchro Monster</option>
        <option value="XYZ Monster">XYZ Monster</option>
        <option value="Link Monster">Link Monster</option>
      </select>

      {selectedType && (
        <>
          <div className="mb-4 text-gray-600">
            Mostrando {cards.length} carte di tipo:{" "}
            <strong>{selectedType}</strong>
          </div>

          <CardResults
            cards={currentCards}
            onAddDeck={onAddDeck}
            onAddSide={onAddSide}
            onAddExtra={onAddExtra}
          />

          {/* Paginazione */}
          {cards.length > 0 && totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-4">
              <Button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="px-3 py-1 bg-blue-500 text-white rounded disabled:bg-gray-300"
              >
                Prev
              </Button>

              {}
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
        </>
      )}
    </div>
  );
}

export default SelectCards;
