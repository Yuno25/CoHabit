"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import QuestionnaireWrapper from "@/components/questionnaire/QuestionnaireWrapper";

export default function Page() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const text = "Let’s Understand You".split(" ");

  useEffect(() => {
    const checkUser = async () => {
      try {
        // ✅ Check login
        const res = await fetch("/api/user/profile", {
          credentials: "include",
        });

        if (!res.ok) {
          router.push("/login");
          return;
        }

        const profile = await res.json();

        // ✅ BONUS UX: if questionnaire already filled → skip
        if (profile?.questionnaireFilled) {
          router.push("/find-roommate");
          return;
        }

        setLoading(false);
      } catch {
        router.push("/login");
      }
    };

    checkUser();
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-white">
        Loading your experience...
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center px-6">
      {/* BACKGROUND */}
      <div className="absolute inset-0">
        <img
          src="/hero/hero.jpeg"
          alt="bg"
          className="w-full h-full object-cover"
        />
      </div>

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />

      {/* MAIN */}
      <div className="relative z-10 w-full max-w-7xl flex flex-col md:flex-row items-center justify-between gap-16">
        {/* LEFT */}
        <div className="max-w-xl text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-blush leading-tight flex flex-wrap gap-3">
            {text.map((word, i) => (
              <span
                key={i}
                className="transition duration-300 hover:text-[#bd7880] hover:scale-110 cursor-default"
              >
                {word}
              </span>
            ))}
          </h1>

          <p className="text-gray-300 mt-6 text-lg leading-relaxed">
            We match you based on habits, lifestyle, and preferences. Your
            perfect roommate starts here.
          </p>
        </div>

        {/* RIGHT */}
        <div className="w-full max-w-lg h-[75vh] flex flex-col">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] flex flex-col h-full">
            <div className="p-6 border-b border-white/10">
              <p className="text-xs text-gray-400 uppercase tracking-wider">
                Questionnaire
              </p>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4 form-scroll scrollbar-thin scrollbar-thumb-[#bd7880]/40">
              <QuestionnaireWrapper />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
