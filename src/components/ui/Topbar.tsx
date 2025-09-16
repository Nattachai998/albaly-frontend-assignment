import { Bars3Icon } from "@heroicons/react/24/outline";

export default function Topbar({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-black/10 dark:border-white/10 bg-white/70 dark:bg-neutral-900/70 backdrop-blur px-4 md:px-6">
        <button
            className="p-2 lg:hidden rounded hover:bg-black/5 dark:hover:bg-white/10"
            onClick={onMenuClick}
        >
            <Bars3Icon className="h-6 w-6" />
        </button>
        <div className="font-medium">Albaly Insights</div>
        <div className="ml-auto flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500" />
        </div>
    </header>
  );
}
