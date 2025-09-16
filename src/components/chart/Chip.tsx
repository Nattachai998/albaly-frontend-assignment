"use client";

export default function Chip({ value, positive = true }: { value: string; positive?: boolean }) {
  const base = positive
    ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300"
    : "bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-300";

  return (
    <span className={`rounded-full px-2 py-0.5 text-xs ${base}`}>{value}</span>
  );
}