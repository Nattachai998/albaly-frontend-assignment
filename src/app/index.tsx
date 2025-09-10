"use client";

import { useState } from "react";
import Sidebar from "../components/ui/Sidebar";
import Topbar from "../components/ui/Topbar";

export default function MyApp({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex h-screen w-full overflow-hidden">
        <Sidebar 
            open={open} 
            onClose={() => setOpen(false)} 
        />
        <div className="flex flex-1 flex-col">
            <Topbar onMenuClick={() => setOpen(true)} />
            <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
        </div>
    </div>
  );
}
