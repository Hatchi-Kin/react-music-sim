import type { Metadata } from "next";
import React from "react";
import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "Music Similiarity",
  description: "make your own music similarity playlist",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Sidebar>{children}</Sidebar>
    </>
  );
}
