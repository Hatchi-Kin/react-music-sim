"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import ParticleRing from "@/components/ParticuleRing";
import MusicPlayer from "@/components/MusicPlayer";


export default function Home() {
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
      bg-slate-950
      h-full
      w-full
      overflow-hidden
      flex
      flex-col
      "
    >
      <Header>Headers</Header>
      <div className="overflow-hidden flex-grow">
        <ParticleRing />
      </div>
      <div className="flex-grow">
        <MusicPlayer />
      </div>

    </div>
  );
}
