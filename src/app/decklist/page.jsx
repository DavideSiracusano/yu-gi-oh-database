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

import Input from "@/components/atoms/Input";
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

  // Ricerca carte
  useEffect(() => {
    if (!query) return setSearchResults([]);
    setLoading(true);
    fetch(`${API_URL}?fname=${query}`)
      .then((res) => res.json())
      .then((data) => setSearchResults(data.data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [query]);

  return (
    <div className="flex flex-col items-center">
      <h1>Deck Builder</h1>

      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Cerca una carta..."
        className="mb-4"
      />

      {loading && <p>Loading...</p>}

      {/* Risultati ricerca */}
      {searchResults.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          {searchResults.map((card) => (
            <div
              key={card.id}
              className="border p-2 rounded shadow flex flex-col items-center"
            >
              <p className="font-bold">{card.name}</p>
              {card.card_images?.[0] && (
                <CardImage
                  src={card.card_images[0].image_url}
                  alt={card.name}
                  className="w-[120px] h-auto mt-2 mb-2"
                />
              )}
              <div className="flex gap-2">
                <Button
                  className={"hover:text-red-600 "}
                  onClick={() => handleAddCard(card)}
                >
                  Deck
                </Button>
                <Button
                  className={"hover:text-gray-600 "}
                  onClick={() => handleAddSide(card)}
                >
                  Side
                </Button>
                <Button
                  className={"hover:text-violet-600"}
                  onClick={() => handleAddExtra(card)}
                >
                  Extra
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Main Deck */}
      <h3 className="text-xl font-semibold mt-4 mb-2">
        Deck principale ({deck.length}/60)
      </h3>
      {deck.length === 0 ? (
        <p>Il tuo deck è vuoto</p>
      ) : (
        <ul className="flex flex-wrap gap-2">
          {deck.map((card, index) => (
            <li
              key={index}
              className="w-[120px] border p-2 rounded shadow flex flex-col items-center"
            >
              <p className="font-bold">{card.name}</p>
              {card.card_images?.[0] && (
                <img
                  src={card.card_images[0].image_url}
                  alt={card.name}
                  className="w-[120px] h-auto mt-2 mb-2"
                />
              )}
              <Button
                className={"hover:text-red-600 "}
                onClick={() => handleRemoveCard(card.id)}
              >
                Rimuovi
              </Button>
            </li>
          ))}
        </ul>
      )}

      {/* Side Deck */}
      <h3 className="text-xl font-semibold mt-6 mb-2">
        Side Deck ({side.length}/15)
      </h3>
      {side.length === 0 ? (
        <p>Vuoto</p>
      ) : (
        <ul className="flex flex-wrap gap-2">
          {side.map((card, index) => (
            <li
              key={index}
              className="w-[120px] border p-2 rounded shadow flex flex-col items-center"
            >
              <p className="font-bold">{card.name}</p>
              {card.card_images?.[0] && (
                <img
                  src={card.card_images[0].image_url}
                  alt={card.name}
                  className="w-[120px] h-auto mt-2 mb-2"
                />
              )}
              <Button
                className={"hover:text-gray-600 "}
                onClick={() => handleRemoveSide(card.id)}
              >
                Rimuovi
              </Button>
            </li>
          ))}
        </ul>
      )}

      {/* Extra Deck */}
      <h3 className="text-xl font-semibold mt-6 mb-2">
        Extra Deck ({extra.length}/15)
      </h3>
      {extra.length === 0 ? (
        <p>Vuoto</p>
      ) : (
        <ul className="flex flex-wrap gap-2">
          {extra.map((card, index) => (
            <li
              key={index}
              className="w-[120px] border p-2 rounded shadow flex flex-col items-center"
            >
              <p className="font-bold">{card.name}</p>
              {card.card_images?.[0] && (
                <img
                  src={card.card_images[0].image_url}
                  alt={card.name}
                  className="w-[120px] h-auto mt-2 mb-2"
                />
              )}
              <Button
                className={"hover:text-violet-600"}
                onClick={() => handleRemoveExtra(card.id)}
              >
                Rimuovi
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Decklist;
