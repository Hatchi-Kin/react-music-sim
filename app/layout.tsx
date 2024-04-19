import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import React from "react";
import Sidebar from "@/components/Sidebar";
import { useRouter } from "next/navigation";



const font = Figtree({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Music Similiarity",
  description: "make your own music similarity playlist",
};

export default function LandingLayout({ children }: { children: React.ReactNode; }) {
  return (
    <html lang="en">
      <body className={font.className}>
        {children}
      </body>
    </html>
  );
}