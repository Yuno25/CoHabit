"use client";

import { motion } from "framer-motion";

type Props = {
  title: string;
  subtitle: string;
  value: "renter" | "seeker" | "lister";
  selected: string | null;
  onSelect: (v: any) => void;
};

export default function UserTypeCard({
  title,
  subtitle,
  value,
  selected,
  onSelect,
}: Props) {
  const isActive = selected === value;

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect(value)}
      className={`cursor-pointer rounded-2xl border p-6 text-left transition
        ${
          isActive
            ? "border-purple-500 bg-purple-500/10 shadow-purple-500/20 shadow-xl"
            : "border-white/10 bg-white/5 hover:border-purple-400/50"
        }
      `}
    >
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-zinc-400 text-sm">{subtitle}</p>

      {isActive && (
        <div className="mt-4 text-purple-400 text-sm font-medium">
          Selected ✓
        </div>
      )}
    </motion.div>
  );
}
