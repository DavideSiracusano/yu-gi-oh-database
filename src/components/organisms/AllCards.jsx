"use client"; // <<=== importantissimo

import { useState, useEffect } from "react";
import CardImage from "../atoms/CardImage";
import API_URL from "@/ApiKey";
// https://ygoprodeck.com/api-guide/?utm_source=chatgpt.com

function AllCards() {
  const [allCards, setAllCards] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        setAllCards(data.data); // si prende l'array data dentro all'oggetto
        setLoading(false); // disattiva caricamento
      })
      .catch((err) => console.log(err));
  }, []);

  if (loading) return <p>Loading...✋🏻</p>;

  return (
    <div className="allCards p-5 rounded-lg shadow-md flex flex-col items-center">
      <h2>All Cards</h2>
      <ul className="flex flex-wrap gap-5 p-0 m-0 justify-center list-none w-full max-w-[1000px]">
        {allCards.map((card) => (
          <li
            className="cards bg-gradient-to-br from-[#e0eafc] to-[#cfdef3] 
         rounded-lg shadow-md border border-[#b6c6e0] 
         text-center w-[200px] p-4 gap-2 
         flex flex-col items-center 
         hover:cursor-pointer hover:scale-110 transition-transform duration-400 ease-in-out"
            key={card.id}
          >
            {card.name}
            {
              <CardImage
                image={card.card_images[0].image_url}
                alt={card.name}
                className="w-[170px] h-auto object-cover mb-2"
              />
            }
            <p className="text-green-600 font-bold mt-2">Cardmarket price:</p>
            <div className="price">
              {`$${card.card_prices[0].cardmarket_price}`}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AllCards;
