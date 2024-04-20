import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import React from "react";

const font = Figtree({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Music Similiarity",
  description: "Browse music by similarity",
};

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>{children}</body>
    </html>
  );
}
