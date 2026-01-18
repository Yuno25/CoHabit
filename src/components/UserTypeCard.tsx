"use client";

type UserTypeCardProps = {
  title: string;
  subtitle: string;
  value: "renter" | "owner";
};

export default function UserTypeCard({
  title,
  subtitle,
  value,
}: UserTypeCardProps) {
  return (
    <div className="cursor-pointer rounded-xl border border-pine/20 bg-blush p-6 shadow-sm hover:border-pine hover:shadow-md transition">
      <h3 className="text-xl font-semibold text-pine">{title}</h3>
      <p className="mt-2 text-sm text-pine/70">{subtitle}</p>

      <div className="mt-4 inline-block rounded-full bg-pine/10 px-4 py-1 text-sm text-pine">
        {value === "renter" ? "Renter" : "Owner"}
      </div>
    </div>
  );
}
