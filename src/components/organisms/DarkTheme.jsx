"use client";

import React from "react";
import { useState, useEffect } from "react";

function DarkTheme() {
  const [theme, setTheme] = useState(false);

  useEffect(() => {
    if (theme) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <div className="absolute top-4 right-4">
      <button onClick={() => setTheme(!theme)}> {theme ? "🌞 " : "🌛"}</button>
    </div>
  );
}

export default DarkTheme;
