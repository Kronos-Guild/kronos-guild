import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const KNOWN_TAG_COLORS: Record<string, { bg: string; text: string }> = {
  BEGINNER: { bg: "bg-sky-400/30", text: "text-sky-300" },
  INTERMEDIATE: { bg: "bg-amber-400/30", text: "text-amber-300" },
  RUST: { bg: "bg-indigo-400/30", text: "text-indigo-300" },
  SOLANA: { bg: "bg-purple-400/30", text: "text-purple-300" },
  "SOLANA/WEB3.JS": { bg: "bg-purple-400/30", text: "text-purple-300" },
  GENERAL: { bg: "bg-amber-400/30", text: "text-amber-300" },
};

const RANDOM_COLORS: { bg: string; text: string }[] = [
  { bg: "bg-rose-400/30", text: "text-rose-300" },
  { bg: "bg-green-400/30", text: "text-green-300" },
  { bg: "bg-cyan-400/30", text: "text-cyan-300" },
  { bg: "bg-lime-400/30", text: "text-lime-300" },
  { bg: "bg-blue-400/30", text: "text-blue-300" },
  { bg: "bg-pink-400/30", text: "text-pink-300" },
];

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

export function getTagColors(tag: string): { bgColor: string; textColor: string } {
  const key = tag.toUpperCase();
  if (key in KNOWN_TAG_COLORS) {
    return {
      bgColor: KNOWN_TAG_COLORS[key].bg,
      textColor: KNOWN_TAG_COLORS[key].text,
    };
  }

  // Deterministically pick a random color based on hash so new tags keep same color between renders
  const idx = hashString(key) % RANDOM_COLORS.length;
  const color = RANDOM_COLORS[idx];
  return { bgColor: color.bg, textColor: color.text };
}
