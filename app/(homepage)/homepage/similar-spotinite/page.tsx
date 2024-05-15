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
      <Header title={"Try Cyanite's api to get similar tracks"}>Headers</Header>

        <SimilarSpotiniteTracks />

    </div>
  );
}
