"use client";

interface Props {
  question: string;
  value: number;
  onChange: (value: number) => void;
}

const labels = [
  "Strongly Disagree",
  "Disagree",
  "Neutral",
  "Agree",
  "Strongly Agree",
];

export default function QuestionSlider({
  question,
  value = 3,
  onChange,
}: Props) {
  return (
    <div className="mb-12">
      {/* Question */}
      <p className="text-white text-base mb-3 leading-relaxed">{question}</p>

      {/* Slider Container */}
      <div className="relative">
        {/* Track */}
        <div className="absolute top-1/2 left-0 w-full h-2 -translate-y-1/2 bg-white/10 rounded-full backdrop-blur-md" />

        {/* Active Track */}
        <div
          className="absolute top-1/2 left-0 h-2 -translate-y-1/2 bg-gradient-to-r from-[#bd7880] to-[#ff9aa2] rounded-full transition-all duration-300"
          style={{
            width: `${((value - 1) / 4) * 100}%`,
          }}
        />

        {/* Range Input */}
        <input
          type="range"
          min="1"
          max="5"
          step="1"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="relative w-full appearance-none bg-transparent z-10 cursor-pointer
          
          [&::-webkit-slider-thumb]:appearance-none
          [&::-webkit-slider-thumb]:h-5
          [&::-webkit-slider-thumb]:w-5
          [&::-webkit-slider-thumb]:rounded-full
          [&::-webkit-slider-thumb]:bg-white
          [&::-webkit-slider-thumb]:border
          [&::-webkit-slider-thumb]:border-[#bd7880]
          [&::-webkit-slider-thumb]:shadow-lg
          [&::-webkit-slider-thumb]:transition
          [&::-webkit-slider-thumb]:hover:scale-110

          [&::-moz-range-thumb]:h-5
          [&::-moz-range-thumb]:w-5
          [&::-moz-range-thumb]:rounded-full
          [&::-moz-range-thumb]:bg-white
          [&::-moz-range-thumb]:border
          [&::-moz-range-thumb]:border-[#bd7880]
        "
        />
      </div>

      {/* Labels */}
      <div className="flex justify-between text-xs text-gray-400 mt-4 px-1">
        {labels.map((label, i) => (
          <span
            key={i}
            className={`transition ${
              value === i + 1
                ? "text-[#bd7880] font-semibold scale-105"
                : "opacity-60"
            }`}
          >
            {label}
          </span>
        ))}
      </div>

      {/* Selected Value */}
      <div className="mt-4 text-center">
        <span className="px-4 py-1 text-sm rounded-full bg-[#bd7880]/20 text-[#bd7880] border border-[#bd7880]/30">
          {labels[value - 1]}
        </span>
      </div>
    </div>
  );
}
