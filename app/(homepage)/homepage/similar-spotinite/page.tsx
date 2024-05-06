"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import SimilarSpotiniteTracks from "@/components/SpotiniteSimilar";

export default function ListSpotinitePage() {
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
      <Header>Headers</Header>
      <div>
        <h1
          className="
          text-slate-300 
          text-4xl 
          mb-6 
          ml-20 
          font-bold 
          tracking-wide 
          uppercase 
          bg-gradient-to-r 
          from-sky-800 via-sky-500 to-sky-200  
          bg-clip-text 
          text-transparent"
        >
          Try Cyanite{'\''}s api to get similar tracks
        </h1>
      </div>
        <SimilarSpotiniteTracks />

    </div>
  );
}
