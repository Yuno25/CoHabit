"use client";

export default function ProgressBar({ step, total }: any) {
  const percent = ((step + 1) / total) * 100;

  return (
    <div className="w-full h-2 bg-white/10 rounded-full mb-6">
      <div
        className="h-full bg-[#bd7880] rounded-full transition-all duration-500"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}
