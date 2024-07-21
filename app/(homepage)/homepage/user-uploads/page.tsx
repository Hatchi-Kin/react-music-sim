"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import UserUploadsList from "@/components/UserUploads";

export default function MyPlaylist() {
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
      <Header title={'Manage your Uploads'}>Headers</Header>
      <UserUploadsList />
    </div>
  );
}