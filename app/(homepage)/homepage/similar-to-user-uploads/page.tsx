"use client";

import SimilarToUserUploadsSongs from "@/components/SimilarToUserUploadsSongs";
import Header from "@/components/Header";

export default function SimilarUserUploadsSongs() {
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
        <SimilarToUserUploadsSongs />
      </div>
    </div>
  );
}
