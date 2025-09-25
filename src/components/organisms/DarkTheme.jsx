"use client";

import React from "react";
import { useState, useEffect } from "react";
import Button from "../atoms/Button";

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
      <Button onClick={() => setTheme(!theme)}> {theme ? "🌞 " : "🌛"}</Button>
    </div>
  );
}

export default DarkTheme;
