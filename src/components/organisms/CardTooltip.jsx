import React from "react";
import CardImage from "../atoms/CardImage";

function CardTooltip({ card, isVisible, setHoveredCard }) {
  if (!isVisible || !card) return null;

  return (
    // div hover che racchiude informazioni
    <div
      className="absolute z-50 bg-gray-900 text-white p-4 rounded-lg shadow-xl border border-gray-700 min-w-[300px] max-w-[400px]"
      onMouseEnter={() => setHoveredCard(card)}
      onMouseLeave={() => setHoveredCard(null)}
    >
      <div className="space-y-2 text-sm">
        <div className="font-bold text-lg text-yellow-400 text-center">
          {card.name}
        </div>

        {card.card_images?.[0] && (
          <CardImage
            src={card.card_images[0].image_url}
            alt={card.name}
            className="w-18 h-28 mx-auto"
          />
        )}

        {card.type && <div>{card.type}</div>}

        {card.level && (
          <div>
            <span className="font-semibold text-purple-300">Livello:</span>{" "}
            {card.level}
          </div>
        )}

        {card.attribute && (
          <div>
            <span className="font-semibold text-green-300">Attributo:</span>{" "}
            {card.attribute}
          </div>
        )}

        {card.race && (
          <div>
            <span className="font-semibold text-orange-300">Tipo:</span>{" "}
            {card.race}
          </div>
        )}

        {(card.atk !== undefined || card.def !== undefined) && (
          <div>
            <span className="font-semibold ">⚔️/🛡️:</span> {card.atk || 0} /{" "}
            {card.def || 0}
          </div>
        )}

        {card.scale && (
          <div>
            <span className="font-semibold text-cyan-300">Scala Pendulum:</span>{" "}
            {card.scale}
          </div>
        )}

        {card.linkval && (
          <div>
            <span className="font-semibold text-pink-300">Link Rating:</span>{" "}
            {card.linkval}
          </div>
        )}

        {card.desc && (
          <div className="pt-2 border-t border-gray-600">
            <span className="font-semibold text-gray-300">Descrizione:</span>
            <div className="text-gray-200 text-xs mt-1 leading-relaxed max-h-32 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
              {card.desc}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CardTooltip;
