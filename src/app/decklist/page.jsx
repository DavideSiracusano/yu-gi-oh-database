"use client";
import React, { useState, useEffect } from "react";
import {
  addCard,
  removeCard,
  getDeck,
  addSideboard,
  removeSideboard,
  getSideboard,
  addExtraDeck,
  removeExtraDeck,
  getExtraDeck,
} from "@/components/organisms/HandleDeck";
import FilterCards from "@/components/organisms/FilterCards";
import CardImage from "@/components/atoms/CardImage";
import Button from "@/components/atoms/Button";

function Decklist() {
  const API_URL_NAME = process.env.NEXT_PUBLIC_API_URL_NAME;

  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [deck, setDeck] = useState([]);
  const [side, setSide] = useState([]);
  const [extra, setExtra] = useState([]);
  const [loading, setLoading] = useState(false);

  // Carica deck da localStorage
  useEffect(() => {
    setDeck(getDeck());
    setSide(getSideboard());
    setExtra(getExtraDeck());
  }, []);

  // Funzioni di aggiunta/rimozione per ogni tipo di deck
  const handleAddCard = (card) => setDeck(addCard(card));
  const handleRemoveCard = (cardId) => setDeck(removeCard(cardId));

  const handleAddSide = (card) => setSide(addSideboard(card));
  const handleRemoveSide = (cardId) => setSide(removeSideboard(cardId));

  const handleAddExtra = (card) => setExtra(addExtraDeck(card));
  const handleRemoveExtra = (cardId) => setExtra(removeExtraDeck(cardId));

  // Ricerca carte con debounce
  useEffect(() => {
    if (query.trim() === "") return setSearchResults([]);

    const delayDebounce = setTimeout(() => {
      setLoading(true);
      fetch(`${API_URL_NAME}${query}`)
        .then((res) => res.json())
        .then((data) => setSearchResults(data.data || []))
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  // Componente riutilizzabile per le sezioni del deck
  const DeckSection = ({
    title, // inserisce titolo dinamicamente tramite prop
    cards,
    maxCards,
    onRemove,
    emptyMessage = "Vuoto",
  }) => (
    <div className="w-full max-w-6xl">
      <h3 className={`rainbow-text  font-semibold mt-6 mb-4 text-center`}>
        {title} ({cards.length}/{maxCards})
      </h3>
      {cards.length === 0 ? (
        <p className="text-gray-500 text-center py-8">{emptyMessage}</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {cards.map((card, index) => (
            <div
              key={`${card.id}-${index}`}
              className=" flex-wrap p-2  hover:shadow-lg transition-shadow"
            >
              <p className="font-bold text-sm text-center mb-2 line-clamp-2">
                {card.name}
              </p>
              {card.card_images?.[0] ? (
                <CardImage
                  src={card.card_images[0].image_url}
                  alt={card.name}
                  className="w-30  mx-auto"
                />
              ) : (
                // Skeleton immagine singola se non c'è immagine
                <div className="skeleton h-32 w-32 mx-auto"></div>
              )}
              <Button
                className="text-xs w-full px-2 py-1 hover:text-red-600 transition-colors"
                onClick={() => onRemove(card.id)}
              >
                Rimuovi
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div>
      {/* Sezione ricerca */}
      <FilterCards
        query={query}
        setQuery={setQuery}
        cards={searchResults}
        onAddDeck={handleAddCard}
        onAddSide={handleAddSide}
        onAddExtra={handleAddExtra}
        loading={loading} // ← passa loading
      />

      {/* Skeleton di ricerca */}
      {loading && searchResults.length === 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 my-6 mx-8">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col items-center border p-2 rounded shadow"
            >
              {/* Skeleton immagine */}
              <div className="skeleton h-32 w-32 mb-2 bg-gray-200"></div>
              {/* Skeleton nome */}
              <div className="skeleton h-4 w-20 mb-2 bg-gray-200"></div>
              {/* Skeleton bottoni */}
              <div className="flex gap-2 flex-wrap justify-center mt-2">
                <div className="skeleton h-6 w-16 rounded bg-gray-200"></div>
                <div className="skeleton h-6 w-16 rounded bg-gray-200"></div>
                <div className="skeleton h-6 w-16 rounded bg-gray-200"></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Sezioni dei deck */}

      {/* Main Deck */}
      <DeckSection
        title="Main Deck"
        cards={deck}
        maxCards={60}
        onRemove={handleRemoveCard}
        emptyMessage="Il tuo deck principale è vuoto"
      />

      {/* Side Deck */}
      <DeckSection
        title="Side Deck"
        cards={side}
        maxCards={15}
        onRemove={handleRemoveSide}
      />

      {/* Extra Deck */}
      <DeckSection
        title="Extra Deck"
        cards={extra}
        maxCards={15}
        onRemove={handleRemoveExtra}
      />
    </div>
  );
}

export default Decklist;
