"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import ArtistList from "@/components/AllArtists";



export default function ListArtistPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      router.push("/sign-in");
    }
  }, [router]);

  return (
    <div
      className="
          bg-neutral-900
          h-full
          w-full
          overflow-hidden
          overflow-y-auto
          "
    >
      {/* eslint-disable-next-line react/no-children-prop */}
      <Header title="All Artists in MegaSet" children={undefined} >
      </Header>
      <ArtistList />
    </div>
  );
}
