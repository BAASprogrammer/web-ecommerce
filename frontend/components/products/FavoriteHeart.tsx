"use client";
import { useRef, useState, type ReactNode } from "react";

interface FavoriteHeartProps {
  isFavorite: boolean;
  onToggle: () => void;
  id?: string;
  className?: string;
  label?: ReactNode;
}

export default function FavoriteHeart({
  isFavorite,
  onToggle,
  id,
  className,
  label,
}: FavoriteHeartProps) {
  const [burstKey, setBurstKey] = useState(0);
  const [justAdded, setJustAdded] = useState(false);
  const timerRef = useRef<number | null>(null);

  const handleClick = () => {
    onToggle();
    setJustAdded(!isFavorite);
    setBurstKey((key) => key + 1);
    if (timerRef.current) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => setJustAdded(false), 900);
  };

  const animated = burstKey > 0;

  return (
    <button
      id={id}
      type="button"
      onClick={handleClick}
      aria-label={isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
      className={className}
    >
      <span className="relative inline-flex items-center justify-center">
        <span
          key={`favorite-icon-${burstKey}`}
          className={
            animated ? (isFavorite ? "animate-heart-beat" : "animate-heart-out") : ""
          }
        >
          {isFavorite ? "❤️" : "🤍"}
        </span>

        {justAdded && (
          <span
            key={`favorite-burst-${burstKey}`}
            className="pointer-events-none absolute inset-0 flex items-center justify-center gap-1 text-rose-500"
            aria-hidden="true"
          >
            <span className="animate-heart-burst" style={{ animationDelay: "0ms" }}>
              ❤
            </span>
            <span className="animate-heart-burst" style={{ animationDelay: "90ms" }}>
              ❤
            </span>
            <span className="animate-heart-burst" style={{ animationDelay: "180ms" }}>
              ❤
            </span>
          </span>
        )}
      </span>

      {label}
    </button>
  );
}