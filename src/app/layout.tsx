import "../styles/globals.css";
import { ReactNode } from "react";
import MyApp from ".";

export const metadata = {
  title: "Business Insights",
  description: "Albaly Frontend Challenge",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="h-screen bg-gray-50 text-gray-900 dark:bg-neutral-950 dark:text-neutral-100">
        <MyApp>
          {children}
        </MyApp>
      </body>
    </html>
  );
}
