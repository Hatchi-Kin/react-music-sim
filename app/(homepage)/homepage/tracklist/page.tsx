"use client";

import Header from "@/components/Header";
import TrackList from "@/components/TrackList";

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
        <TrackList />
      </div>
    </div>
  );
}
