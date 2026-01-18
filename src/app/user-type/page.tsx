"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

type UserType = "renter" | "seeker" | "lister";

export default function UserTypePage() {
  const [selected, setSelected] = useState<UserType | null>(null);
  const router = useRouter();

  const handleContinue = () => {
    if (!selected) return;
    router.push(`/profile-setup/${selected}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-zinc-900 to-black px-6">
      <div className="max-w-5xl w-full text-center">
        <h1 className="text-3xl md:text-4xl font-semibold text-white mb-3">
          What are you looking for?
        </h1>
        <p className="text-zinc-400 mb-10">
          Choose the option that best describes you
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <UserTypeCard
            title="Looking for a Place"
            subtitle="Find rooms & compatible roommates"
            value="renter"
            selected={selected}
            onSelect={setSelected}
          />
          <UserTypeCard
            title="Looking for a Roommate"
            subtitle="Join someone with a place"
            value="seeker"
            selected={selected}
            onSelect={setSelected}
          />
          <UserTypeCard
            title="Have a Place"
            subtitle="List your place & find roommates"
            value="lister"
            selected={selected}
            onSelect={setSelected}
          />
        </div>

        {selected && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-10"
          >
            <button
              onClick={handleContinue}
              className="px-8 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 transition text-white font-medium shadow-lg"
            >
              Continue →
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
