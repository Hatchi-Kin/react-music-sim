'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from "@/components/Header";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      router.push('/sign-in');
    }
  }, [router]);

  return (
    <div className="
      bg-neutral-900
      h-full
      w-full
      overflow-hidden
      overflow-y-auto
      ">
        <Header>
            Headers
        </Header>
    </div>
  );
}