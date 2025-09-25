"use client";

import React, { useState, useEffect } from "react";
import Button from "@/components/atoms/Button";

function Banlist() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const [banlist, setBanlist] = useState([]);
  const [query, setQuery] = useState("tcg"); // default a tcg
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) return;
    setLoading(true);
    fetch(`${API_URL}?banlist=${query}`)
      .then((res) => res.json())
      .then((data) => {
        setBanlist(data.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [query]);

  return (
    <div className="p-4 ">
      {/* Bottoni TCG / OCG */}
      <div className="flex justify-center gap-2 mb-4">
        <Button
          className="p-2 hover:bg-blue-600 hover:text-white rounded"
          onClick={() => setQuery("tcg")}
        >
          TCG Banlist
        </Button>
        <Button
          className="p-2 hover:bg-red-600 hover:text-white rounded"
          onClick={() => setQuery("ocg")}
        >
          OCG Banlist
        </Button>
      </div>

      {/* Skeleton daisyUI durante il caricamento */}
      {loading ? (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="cards bg-gray-100 p-3 rounded shadow flex flex-col items-center"
            >
              <div className="skeleton h-32 w-36 mb-2 bg-gray-200"></div>
              <div className="skeleton h-4 w-24 mb-1 bg-gray-200"></div>
              <div className="skeleton h-4 w-32 mt-2 bg-gray-200"></div>
            </div>
          ))}
        </div>
      ) : (
        // Lista banlist
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {banlist.map((card) => (
            <div
              key={card.id}
              className="cards bg-gray-100 p-3 rounded shadow flex flex-col items-center"
            >
              <p className="font-bold">{card.name}</p>
              {card.card_images?.[0] && (
                <img
                  src={card.card_images[0].image_url}
                  alt={card.name}
                  className="w-[150px] h-auto mt-2"
                />
              )}
              <p className="text-red-600 mt-2">
                Status: {card.banlist_info?.[`ban_${query}`]}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Banlist;
