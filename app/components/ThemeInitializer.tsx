"use client";

import { useEffect } from "react";

export default function ThemeInitializer() {
  useEffect(() => {
    const savedTheme =
      localStorage.getItem(
        "lms-dark-mode"
      );

    if (savedTheme === "true") {
      document.documentElement.classList.add(
        "dark"
      );
    } else {
      document.documentElement.classList.remove(
        "dark"
      );
    }
  }, []);

  return null;
}