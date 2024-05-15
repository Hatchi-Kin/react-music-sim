"use client";

import Header from "@/components/Header";
import SimilarSongs from "@/components/SimilarSongs";

export default function ListTracks() {
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
        <SimilarSongs />
      </div>
    </div>
  );
}
