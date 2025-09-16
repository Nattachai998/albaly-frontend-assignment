"use client";

export default function Bar({ value, max}: { value: number; max: number}) {
  const w = Math.max(4, Math.round((value / Math.max(1, max)) * 100));
  
  return (
    <div className={`h-2.5 w-full rounded-full bg-black/10 dark:bg-white/10`}>
      <div className="h-2.5 rounded-full bg-indigo-500" style={{ width: `${w}%` }} />
    </div>
  );
}