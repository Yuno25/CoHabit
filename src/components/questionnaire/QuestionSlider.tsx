"use client";

interface Props {
  question: string;
  value: number;
  onChange: (value: number) => void;
}

export default function QuestionSlider({ question, value, onChange }: Props) {
  return (
    <div className="mb-8">
      <p className="text-white text-lg mb-3">{question}</p>

      <input
        type="range"
        min="0"
        max="5"
        step="1"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-[#bd7880] cursor-pointer"
      />

      <div className="flex justify-between text-sm text-gray-400 mt-1">
        <span>0</span>
        <span>5</span>
      </div>

      <p className="text-center text-[#bd7880] mt-2 font-semibold">{value}</p>
    </div>
  );
}
