"use client";

import Header from "@/components/Header";
import AlbumsByArtist from "@/components/AlbumsByArtist";

export default function ArtistAlbumsPage() {
  return (
    <div
      className="
        bg-slate-950
        h-full
        w-full
        overflow-hidden
        flex
        flex-col
      "
    >
      <div>
        <AlbumsByArtist />
      </div>
    </div>
  );
}
