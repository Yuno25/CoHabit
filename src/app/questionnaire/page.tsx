"use client";

import QuestionnaireWrapper from "@/components/questionnaire/QuestionnaireWrapper";

export default function Page() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 🌄 BACKGROUND */}
      <div className="absolute inset-0 bg-[url('/hero.jpg')] bg-cover bg-center"></div>

      {/* 🌑 OVERLAY */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

      {/* 🌟 CONTENT */}
      <div className="relative z-10 w-full max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between gap-12">
        {/* 📝 LEFT CONTENT */}
        <div className="max-w-xl text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-blush leading-tight">
            Let’s Understand You
          </h1>

          <p className="text-gray-300 mt-4 text-lg">
            We match you based on habits, lifestyle, and preferences. Your
            perfect roommate starts here.
          </p>
        </div>

        {/* 📦 RIGHT FORM */}
        <div className="w-full max-w-md">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
            <QuestionnaireWrapper />
          </div>
        </div>
      </div>
    </div>
  );
}
