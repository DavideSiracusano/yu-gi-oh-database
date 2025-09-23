"use client";

export function getDeck() {
  const saved = localStorage.getItem("userDeck");
  return saved ? JSON.parse(saved) : [];
}

export function getSideboard() {
  const saved = localStorage.getItem("userSideboard");
  return saved ? JSON.parse(saved) : [];
}

export function getExtraDeck() {
  const saved = localStorage.getItem("userExtraDeck");
  return saved ? JSON.parse(saved) : [];
}

// Aggiunge una carta al deck (max 3 copie, max 60 carte)
export function addCard(card) {
  const deck = getDeck();
  const count = deck.filter((c) => c.id === card.id).length;
  if (count >= 3 || deck.length >= 60) return deck;
  const newDeck = [...deck, card];
  localStorage.setItem("userDeck", JSON.stringify(newDeck));
  return newDeck;
}

// Aggiunge una carta alla sideboard (max 3 copie, max 15 carte)
export function addSideboard(card) {
  const deck = getSideboard();
  const count = deck.filter((c) => c.id === card.id).length;
  if (count >= 3 || deck.length >= 15) return deck;
  const newDeck = [...deck, card];
  localStorage.setItem("userSideboard", JSON.stringify(newDeck)); // <--- corretto
  return newDeck;
}

// Aggiunge una carta all'extra deck (max 3 copie, max 15 carte)
export function addExtraDeck(card) {
  const deck = getExtraDeck();
  const count = deck.filter((c) => c.id === card.id).length;
  if (count >= 3 || deck.length >= 15) return deck;
  const newDeck = [...deck, card];
  localStorage.setItem("userExtraDeck", JSON.stringify(newDeck)); // <--- corretto
  return newDeck;
}

// Rimuove una carta dal deck (solo una copia alla volta)
export function removeCard(cardId) {
  const deck = getDeck();
  const index = deck.findIndex((c) => c.id === cardId);
  if (index !== -1) deck.splice(index, 1);
  localStorage.setItem("userDeck", JSON.stringify(deck));
  return deck;
}

// Rimuove una carta dalla sideboard
export function removeSideboard(cardId) {
  const deck = getSideboard();
  const index = deck.findIndex((c) => c.id === cardId);
  if (index !== -1) deck.splice(index, 1);
  localStorage.setItem("userSideboard", JSON.stringify(deck));
  return deck;
}

// Rimuove una carta dall'extra deck
export function removeExtraDeck(cardId) {
  const deck = getExtraDeck();
  const index = deck.findIndex((c) => c.id === cardId);
  if (index !== -1) deck.splice(index, 1);
  localStorage.setItem("userExtraDeck", JSON.stringify(deck));
  return deck;
}
