import React from "react";

function About() {
  return (
    <div className="aboutPage">
      <div className="flex flex-col items-center px-8 py-20 space-y-8 w-full">
        {/* Titolo principale */}
        <h1 className="aboutText ext text-4xl font-bold mb-4 text-center">
          About Yu-Gi-Oh Database
        </h1>

        {/* Sezione introduzione */}
        <div className="bg-white shadow-md rounded-lg p-6 text-center w-full max-w-5xl">
          <p className="text-gray-700 mb-2">
            Questo progetto è stato realizzato come parte del corso di{" "}
            <strong>Front End Development</strong> offerto da{" "}
            <strong>Riverloop</strong> e finanziato da{" "}
            <strong>Formatemp</strong>.
          </p>
          <p className="text-gray-700">
            L'obiettivo era creare un'applicazione interattiva per consultare e
            gestire carte di Yu-Gi-Oh.
          </p>
        </div>

        {/* Sezione API */}
        <div className="bg-blue-50 shadow-md rounded-lg p-6 text-center w-full max-w-5xl">
          <p className="text-gray-800 mb-2">
            L'applicazione utilizza le API di{" "}
            <a
              href="https://ygoprodeck.com/api-guide/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline hover:text-blue-700"
            >
              YGOPRODeck
            </a>{" "}
            per recuperare informazioni sulle carte, inclusa la ricerca per
            nome, le immagini, i prezzi da Cardmarket e le banlist aggiornate.
          </p>
          <p className="text-gray-800">
            Queste API sono gratuite e forniscono dati completi e aggiornati sul
            gioco.
          </p>
        </div>

        {/* Sezione funzionalità principali */}
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-5xl">
          <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">
            Funzionalità principali
          </h2>
          <ul className="text-center list-disc list-inside text-gray-700 space-y-2">
            <li className="aboutText">
              Visualizzazione di tutte le carte con immagine e prezzo
            </li>
            <li className="aboutText">
              Filtri di ricerca per nome delle carte
            </li>
            <li className="aboutText">
              Gestione del deck personale, side deck e extra deck con
              salvataggio in localStorage
            </li>
            <li className="aboutText">
              Visualizzazione delle banlist TCG e OCG aggiornate
            </li>
          </ul>
        </div>

        {/* Sezione approfondimento */}
        <div className="bg-blue-50 shadow-md rounded-lg p-6 text-center w-full max-w-5xl">
          <p className="text-gray-800">
            Il progetto è stato pensato come esercizio pratico per approfondire
            React, Next.js, fetch API e la gestione dello stato con hooks.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
