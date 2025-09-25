"use client";

import { useState } from "react";
import CardImage from "../atoms/CardImage";
import Button from "../atoms/Button";
import CardTooltip from "./CardTooltip";

function CardResults({ cards, onAddDeck, onAddSide, onAddExtra }) {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <div>
      {/* 🃏 Risultati */}
      {cards.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 my-6 mx-8">
          {cards.map((card) => (
            <div
              key={card.id}
              className="border p-2 rounded shadow flex flex-col items-center relative"
              onMouseEnter={() => setHoveredCard(card)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <p className="font-bold">{card.name}</p>

              {card.card_images?.[0] && (
                <div>
                  <CardImage
                    src={card.card_images[0].image_url}
                    alt={card.name}
                    className="w-[120px] h-auto mt-2 mb-2 hover:scale-110 transition-transform duration-300 ease-in-out cursor-pointer"
                  />

                  {hoveredCard?.id === card.id && (
                    <div className="absolute bottom-10 right-1 z-50">
                      <CardTooltip
                        card={card}
                        isVisible={true}
                        setHoveredCard={setHoveredCard}
                      />
                    </div>
                  )}
                </div>
              )}

              <div className="flex gap-2 flex-wrap justify-center">
                <Button
                  className="hover:text-red-500 text-xs px-2 py-1"
                  onClick={() => onAddDeck(card)}
                >
                  Deck
                </Button>
                <Button
                  className="hover:text-gray-500 text-xs px-2 py-1"
                  onClick={() => onAddSide(card)}
                >
                  Side
                </Button>
                <Button
                  className="hover:text-violet-500 text-xs px-2 py-1"
                  onClick={() => onAddExtra(card)}
                >
                  Extra
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CardResults;
