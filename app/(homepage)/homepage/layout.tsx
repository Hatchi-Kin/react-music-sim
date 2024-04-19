import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import React from "react";
import Sidebar from "@/components/Sidebar";

const font = Figtree({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Music Similiarity",
  description: "make your own music similarity playlist",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Sidebar>
            {children}
        </Sidebar>
      </body>
    </html>
  );
}

