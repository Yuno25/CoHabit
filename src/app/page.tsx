import Link from "next/link";
import HeroBackground from "@/components/HeroBackground";

export default function Home() {
  return (
    <main className="min-h-screen bg-blush text-pine">
      {/* HERO SECTION (ONLY THIS PART MODIFIED) */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <HeroBackground />

        {/* Foreground content – ALWAYS visible */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Live better. <br />
            Choose the right roommate.
          </h1>

          <p className="mt-6 text-lg text-pine/80 max-w-2xl mx-auto">
            CoHabit helps college students and young professionals find
            compatible roommates and flatmates based on lifestyle, habits, and
            preferences.
          </p>

          <div className="mt-10 flex justify-center gap-4">
            {/* buttons unchanged */}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS (UNCHANGED) */}
      <section className="bg-rose/20 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold text-center">
            How CoHabit Works
          </h2>

          <div className="mt-12 grid md:grid-cols-3 gap-8">
            <div className="bg-blush p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold">1. Create Your Profile</h3>
              <p className="mt-3 text-pine/80">
                Tell us about your habits, routine, and preferences.
              </p>
            </div>

            <div className="bg-blush p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold">2. Get Matched</h3>
              <p className="mt-3 text-pine/80">
                We calculate compatibility with others like you.
              </p>
            </div>

            <div className="bg-blush p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold">3. Connect Safely</h3>
              <p className="mt-3 text-pine/80">
                Chat only after mutual interest. No spam.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHY COHABIT (UNCHANGED) */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold">Why CoHabit?</h2>

          <div className="mt-10 grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold text-lg">Compatibility First</h3>
              <p className="mt-2 text-pine/80">
                No random matches. Only people who fit your lifestyle.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg">Student-Friendly</h3>
              <p className="mt-2 text-pine/80">
                Built specifically for college and early career life.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg">Privacy Focused</h3>
              <p className="mt-2 text-pine/80">
                Connect only when both sides agree.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA (UNCHANGED) */}
      <section className="bg-pine text-blush py-16 text-center">
        <h2 className="text-3xl font-semibold">
          Ready to find your perfect co-living match?
        </h2>

        <Link
          href="/signup"
          className="inline-block mt-6 bg-rose text-pine px-8 py-3 rounded-md text-lg hover:bg-blush transition"
        >
          Join CoHabit
        </Link>
      </section>
    </main>
  );
}
