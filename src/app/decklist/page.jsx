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
import API_URL from "@/ApiKey";

function Decklist() {
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
      fetch(`${API_URL}?fname=${query}`)
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
    color, // inserisce colore dinamicamente tramite prop
    onRemove,
    emptyMessage = "Vuoto",
  }) => (
    <div className="w-full max-w-6xl">
      <h3 className={`text-xl font-semibold mt-6 mb-4 text-center ${color}`}>
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
              {card.card_images?.[0] && (
                <CardImage
                  src={card.card_images[0].image_url}
                  alt={card.name}
                  className="w-30  mx-auto"
                />
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
      />

      {/* Indicatore loading */}
      {loading && (
        <div className="text-center py-4">
          <p className="text-gray-500">Caricamento...</p>
        </div>
      )}

      {/* Sezioni dei deck */}

      {/* Main Deck */}

      <DeckSection
        title="Main Deck"
        cards={deck}
        maxCards={60}
        color="text-orange-500"
        onRemove={handleRemoveCard}
        emptyMessage="Il tuo deck principale è vuoto"
      />

      {/* Side Deck */}

      <DeckSection
        title="Side Deck"
        cards={side}
        maxCards={15}
        color="text-yellow-500"
        onRemove={handleRemoveSide}
      />

      {/* Extra Deck */}

      <DeckSection
        title="Extra Deck"
        cards={extra}
        maxCards={15}
        color="text-violet-400"
        onRemove={handleRemoveExtra}
      />
    </div>
  );
}

export default Decklist;
