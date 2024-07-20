"use client";

import SimilarSongs from "@/components/SimilarSongs";
import Header from "@/components/Header";

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
      <Header>Headers</Header>
      <div>
        <SimilarSongs />
      </div>
    </div>
  );
}
