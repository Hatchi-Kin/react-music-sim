"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import MusicSimImage from "@/components/MusicSimImage";
import ParticleRing from "@/components/ParticuleRing";

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
      overflow-y-auto
      "
    >
      <Header>Headers</Header>
      <ParticleRing />
    </div>
  );
}
