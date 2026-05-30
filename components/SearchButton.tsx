"use client";

import { Search } from "lucide-react";

export default function SearchButton() {
  const handleClick = () => {
    (window as Window & { openCommandPalette?: () => void }).openCommandPalette?.();
  };

  return (
    <button
      onClick={handleClick}
      className="text-muted-foreground hover:text-foreground transition-colors"
      aria-label="Search"
      title="Search (⌘K)"
    >
      <Search className="h-4 w-4" />
    </button>
  );
}
