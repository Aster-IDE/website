"use client";

import { Moon, Sun } from "lucide-react";
import { useRef } from "react";

type ThemeMode = "light" | "dark";

const STORAGE_KEY = "theme-mode";

function applyTheme(mode: ThemeMode) {
  const root = document.documentElement;
  root.classList.toggle("dark", mode === "dark");
  root.dataset.theme = mode;
}

export default function ThemeToggle() {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const toggleTheme = () => {
    const root = document.documentElement;
    const currentlyDark = root.classList.contains("dark");
    const nextMode: ThemeMode = currentlyDark ? "light" : "dark";

    localStorage.setItem(STORAGE_KEY, nextMode);
    applyTheme(nextMode);
  };

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={toggleTheme}
      className="inline-flex h-6 w-11 cursor-pointer items-center justify-center rounded-sm border border-border bg-card text-muted-foreground transition-colors hover:border-primary hover:text-primary"
      aria-label="Toggle theme"
      title="Toggle light/dark theme"
      suppressHydrationWarning
      data-theme-toggle="true"
    >
      <Moon className="h-4 w-4 dark:hidden" suppressHydrationWarning />
      <Sun className="hidden h-4 w-4 dark:block" suppressHydrationWarning />
    </button>
  );
}
