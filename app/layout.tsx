import "./globals.css";
import React from "react";
import { ArtistProvider } from "../contexts/ArtistProvider";
import { AlbumProvider } from "../contexts/AlbumProvider";
import { SimilarSongsProvider } from "../contexts/SimilarSongsProvider";
import { PlayListProvider } from "../contexts/PlayListProvider";

interface Metadata {
  title: string;
  description: string;
}

export const metadata: Metadata = {
  title: "Music Similiarity",
  description: "Browse music by similarity",
};

export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ArtistProvider>
          <AlbumProvider>
            <SimilarSongsProvider>
              <PlayListProvider>{children}</PlayListProvider>
            </SimilarSongsProvider>
          </AlbumProvider>
        </ArtistProvider>
      </body>
    </html>
  );
}
