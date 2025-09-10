"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChartPieIcon,
  LightBulbIcon,
  XMarkIcon,
  ArrowRightStartOnRectangleIcon
} from "@heroicons/react/24/outline";

const nav = [
  { href: "/overview", label: "Overview", icon: ChartPieIcon },
  { href: "/insights", label: "Insights", icon: LightBulbIcon },
];

export default function Sidebar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();

  return (
    <>
        {/* Backdrop (mobile) */}
        <div
            onClick={onClose}
            className={`fixed inset-0 z-40 bg-black/40 md:hidden transition-opacity ${
            open ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
        />
        <aside
            className={`fixed inset-y-0 left-0 z-50 w-72 transform bg-white text-gray-900
                        dark:bg-neutral-900 dark:text-neutral-100 border-r border-black/10 dark:border-white/10
                        transition-transform md:translate-x-0 ${
                        open ? "translate-x-0" : "-translate-x-full"
                        } md:static`}
            aria-label="Sidebar"
        >
            <div className="flex h-full flex-col">
                <div className="flex h-16 items-center justify-between border-b border-black/10 dark:border-white/10 px-4">
                    <span className="font-semibold tracking-wide">Albaly Dashboard</span>
                    <button
                        className="p-2 md:hidden rounded hover:bg-black/5 dark:hover:bg-white/10"
                        onClick={onClose}
                        aria-label="Close sidebar"
                    >
                    <XMarkIcon className="h-6 w-6" />
                    </button>
                </div>

                <nav className="flex-1 overflow-y-auto px-2 py-4 space-y-1">
                    {nav.map(({ href, label, icon: Icon }) => {
                        const active = pathname?.startsWith(href);
                        return (
                            <Link
                                key={href}
                                href={href}
                                onClick={onClose}
                                className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors
                                    ${
                                    active
                                        ? "bg-neutral-800 text-white dark:bg-white/10 dark:text-white"
                                        : "hover:bg-black/5 dark:hover:bg-white/10"
                                    }`}
                            >
                                <Icon className="h-5 w-5" />
                                <span>{label}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="px-2 pb-4">
                    <button className="w-full flex items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/10">
                        <ArrowRightStartOnRectangleIcon className="h-6 w-6" />
                        <span>Logout</span>
                    </button>
                </div>
            </div>
        </aside>
    </>
  );
}
