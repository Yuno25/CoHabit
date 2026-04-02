"use client";

const options = [
  "Smoking",
  "Alcohol",
  "Frequent guests",
  "Overnight guests",
  "Sharing items",
  "Poor hygiene",
  "Different sleep schedule",
  "Noise at night",
  "WFH frequently",
  "Unequal chores",
  "Late payments",
  "Food preference conflict",
  "Space domination",
  "No privacy",
];

export default function DealBreaker({ selected, setSelected }: any) {
  const toggle = (item: string) => {
    if (selected.includes(item)) {
      setSelected(selected.filter((i: string) => i !== item));
    } else {
      setSelected([...selected, item]);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-3">
      {options.map((item) => (
        <div
          key={item}
          onClick={() => toggle(item)}
          className={`p-3 rounded-xl cursor-pointer border text-sm
          ${
            selected.includes(item)
              ? "bg-[#bd7880] text-white border-[#bd7880]"
              : "bg-white/10 text-gray-300 border-white/20"
          }`}
        >
          {item}
        </div>
      ))}
    </div>
  );
}
