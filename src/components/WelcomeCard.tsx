"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function WelcomeCard({
  message,
  delay = 1200,
}: {
  message: string;
  delay?: number;
}) {
  const router = useRouter();

  useEffect(() => {
    const t = setTimeout(() => {
      router.replace("/"); // ✅ ALWAYS HOME
    }, delay);

    return () => clearTimeout(t);
  }, [router, delay]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="backdrop-blur-md bg-white/70 border border-white/30 rounded-2xl shadow-lg p-8 text-center">
        <h1 className="text-2xl font-semibold text-pine">{message}</h1>
        <p className="text-sm text-pine/70 mt-2">
          Getting things ready for you…
        </p>
      </div>
    </div>
  );
}
