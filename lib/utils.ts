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

export function getTagColors(tag: string): {
  bgColor: string;
  textColor: string;
} {
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

export const variantStyles = {
  default: {
    container: "bg-neutral-100/15 border-neutral-100/10",
    title: "text-white",
    subtitle: "text-slate-300",
    description: "text-slate-400",
  },
  blue: {
    container:
      "bg-blue-100/20 dark:bg-blue-900/20 border-blue-200/30 dark:border-blue-800/30",
    title: "text-blue-900 dark:text-blue-100",
    subtitle: "text-blue-700 dark:text-blue-300",
    description: "text-blue-600 dark:text-blue-400",
  },
  green: {
    container:
      "bg-green-100/20 dark:bg-green-900/20 border-green-200/30 dark:border-green-800/30",
    title: "text-green-900 dark:text-green-100",
    subtitle: "text-green-700 dark:text-green-300",
    description: "text-green-600 dark:text-green-400",
  },
  purple: {
    container:
      "bg-purple-100/20 dark:bg-purple-900/20 border-purple-200/30 dark:border-purple-800/30",
    title: "text-purple-900 dark:text-purple-100",
    subtitle: "text-purple-700 dark:text-purple-300",
    description: "text-purple-600 dark:text-purple-400",
  },
  orange: {
    container:
      "bg-orange-100/20 dark:bg-orange-900/20 border-orange-200/30 dark:border-orange-800/30",
    title: "text-orange-900 dark:text-orange-100",
    subtitle: "text-orange-700 dark:text-orange-300",
    description: "text-orange-600 dark:text-orange-400",
  },
  gradient: {
    container:
      "bg-gradient-to-r from-indigo-100/20 to-purple-100/20 dark:from-indigo-900/20 dark:to-purple-900/20 border-indigo-200/30 dark:border-indigo-800/30",
    title: "text-indigo-900 dark:text-indigo-100",
    subtitle: "text-indigo-700 dark:text-indigo-300",
    description: "text-indigo-600 dark:text-indigo-400",
  },
} as const;
