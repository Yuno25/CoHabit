"use client";

export default function ProgressBar({ step, total }: any) {
  const percent = ((step + 1) / total) * 100;

  return (
    <div className="mb-6">
      <div className="flex justify-between text-xs text-gray-400 mb-2">
        <span>Question {step + 1}</span>
        <span>{total}</span>
      </div>

      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[#bd7880] to-[#ff9aa2] rounded-full transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
