"use client";
import { usePasswordStrength } from "@/hooks/ui/usePasswordStrength";
import { STRENGTH_BG, STRENGTH_COLORS, STRENGTH_LABELS } from "@/data/password";

export default function PasswordStrength({ password }: { password: string }) {
  const strength = usePasswordStrength(password);

  if (!password) return null;

  return (
    <div className="mt-2">
      <div className="flex gap-1 mb-1">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`flex-1 h-1 rounded-sm transition-colors duration-300 ${
              i <= strength ? STRENGTH_BG[strength] : "bg-gray-200"
            }`}
          />
        ))}
      </div>
      <span className={`text-xs font-semibold ${STRENGTH_COLORS[strength]}`}>
        {STRENGTH_LABELS[strength]}
      </span>
    </div>
  );
}
