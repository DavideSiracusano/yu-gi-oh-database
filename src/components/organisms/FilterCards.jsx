"use client";

import { useState } from "react";
import Input from "../atoms/Input";
import CardResults from "./CardResults";

function FilterCards({
  query,
  setQuery,
  cards,
  onAddDeck,
  onAddSide,
  onAddExtra,
}) {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <div>
      {/* 🔍 Input ricerca */}

      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Cerca una carta..."
        className=" flex column items-center w-[80%] p-2 border rounded my-4 mx-auto border-blue-900 text-blue-700 text-center "
      />

      {/*   risultati */}

      <CardResults
        cards={cards}
        onAddDeck={onAddDeck}
        onAddSide={onAddSide}
        onAddExtra={onAddExtra}
      />
    </div>
  );
}

export default FilterCards;
