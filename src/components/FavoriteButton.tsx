"use client";

import { useState, useEffect, useCallback } from "react";

interface FavoriteButtonProps {
  itemId: string;
  itemLabel?: string;
  size?: "sm" | "md";
  onToggle?: (isFavorite: boolean) => void;
}

const STORAGE_KEY = "contractlens-favorites";

export function getFavorites(): Record<string, { label: string; addedAt: number }> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

export function getFavoritesCount(): number {
  return Object.keys(getFavorites()).length;
}

export default function FavoriteButton({ itemId, itemLabel, size = "md", onToggle }: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const favs = getFavorites();
    setIsFavorite(!!favs[itemId]);
  }, [itemId]);

  const toggle = useCallback(() => {
    const favs = getFavorites();
    const newState = !isFavorite;

    if (newState) {
      favs[itemId] = { label: itemLabel || itemId, addedAt: Date.now() };
    } else {
      delete favs[itemId];
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(favs));
    setIsFavorite(newState);
    setAnimating(true);
    setTimeout(() => setAnimating(false), 400);

    window.dispatchEvent(new CustomEvent("favorites-changed"));
    onToggle?.(newState);
  }, [isFavorite, itemId, itemLabel, onToggle]);

  const iconSize = size === "sm" ? "w-4 h-4" : "w-5 h-5";

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle();
      }}
      className={`group relative p-1.5 rounded-lg transition-all duration-200 hover:bg-rose-500/10 focus:outline-none focus:ring-2 focus:ring-rose-500/30 ${
        animating ? "scale-125" : "scale-100"
      }`}
      title={isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      <svg
        className={`${iconSize} transition-all duration-300 ${
          isFavorite
            ? "fill-amber-400 text-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.4)]"
            : "fill-none text-[var(--color-muted)] group-hover:text-amber-400/60"
        }`}
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={isFavorite ? 0 : 1.5}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
      </svg>
    </button>
  );
}
