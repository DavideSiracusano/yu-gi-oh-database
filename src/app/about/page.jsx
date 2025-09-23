import React from "react";

function About() {
  return (
    <div className=" p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-justify">About</h1>

      <p className="mb-4 text-justify">
        Questo progetto è stato realizzato come parte del corso di Front End
        Development offerto da <strong>Riverloop</strong> e finanziato da{" "}
        <strong>Formatemp</strong>. L'obiettivo era creare un'applicazione
        interattiva per consultare e gestire carte di Yu-Gi-Oh.
      </p>

      <p className="mb-4 text-justify">
        L'applicazione utilizza le API di{" "}
        <a
          href="https://ygoprodeck.com/api-guide/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          YGOPRODeck
        </a>{" "}
        per recuperare informazioni sulle carte, inclusa la ricerca per nome, le
        immagini, i prezzi da Cardmarket e le banlist aggiornate. Queste API
        sono gratuite e forniscono dati completi e aggiornati sul gioco.
      </p>

      <p className="mb-4 text-justify">
        Le funzionalità principali del progetto includono:
      </p>

      <ul className="list-disc list-inside mb-4">
        <li>Visualizzazione di tutte le carte con immagine e prezzo</li>
        <li>Filtri di ricerca per nome delle carte</li>
        <li>
          Gestione del deck personale, side deck e extra deck con salvataggio in
          localStorage
        </li>
        <li>Visualizzazione delle banlist TCG e OCG aggiornate</li>
      </ul>

      <p className="mb-4 text-justify">
        Il progetto è stato pensato come esercizio pratico per approfondire
        React, Next.js, fetch API e la gestione dello stato con hooks.
      </p>
    </div>
  );
}

export default About;
