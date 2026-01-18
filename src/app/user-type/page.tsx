import UserTypeCard from "@/components/UserTypeCard";

export default function UserTypePage() {
  return (
    <main className="min-h-screen bg-blush text-pine flex items-center justify-center">
      <section className="max-w-6xl w-full px-6 py-20">
        <h1 className="text-3xl font-bold text-center">
          Choose how you want to use CoHabit
        </h1>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <UserTypeCard
            title="Looking for a Place"
            subtitle="Find rooms & compatible roommates"
            value="renter"
          />

          <UserTypeCard
            title="Have a Place"
            subtitle="List your room and find the right match"
            value="owner"
          />
        </div>
      </section>
    </main>
  );
}
