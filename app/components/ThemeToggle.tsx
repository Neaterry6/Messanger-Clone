import React, { useState, useEffect } from "react";

const ThemeToggle = () => {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  useEffect(() => {
    setDark(localStorage.getItem("theme") === "dark");
  }, []);

  return (
    <button
      onClick={() => setDark((d) => !d)}
      className="px-3 py-1 rounded border bg-gray-200 dark:bg-gray-800"
    >
      {dark ? "☀️ Light" : "🌙 Dark"}
    </button>
  );
};

export default ThemeToggle;
