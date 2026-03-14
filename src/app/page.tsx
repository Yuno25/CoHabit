"use client";
import Link from "next/link";
import HeroBackground from "@/components/HeroBackground";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7 },
  },
};

const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.25,
    },
  },
};

export default function Home() {
  return (
    <main className="min-h-screen bg-blush text-pine">
      {/* HERO SECTION */}
      <section className="relative w-full min-h-screen flex items-center justify-center text-center overflow-hidden">
        <HeroBackground />
        <div className="absolute inset-0 bg-black/40"></div>

        <motion.div
          className="relative z-10 max-w-3xl px-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.3 }}
        >
          <motion.h1
            variants={fadeUp}
            className="text-4xl md:text-6xl font-bold text-blush leading-tight"
          >
            Live Better.
            <br />
            <span className="text-blush">Choose the Right Roommate</span>
          </motion.h1>

          <motion.p variants={fadeUp} className="mt-6 text-lg text-gray-200">
            CoHabit helps college students and young professionals find
            compatible roommates based on lifestyle, habits, and preferences.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-8 flex justify-center gap-4"
          >
            <button className="px-8 py-3 bg-red-950 hover:bg-red-900 text-white rounded-lg transition">
              Join CoHabit
            </button>

            <button className="px-8 py-3 border border-white text-white rounded-lg hover:bg-white hover:text-black transition">
              Learn More
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-blush/20 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false }}
            className="text-3xl font-semibold text-center mb-12"
          >
            How CoHabit Works
          </motion.h2>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false }}
            className="grid md:grid-cols-3 gap-10"
          >
            <motion.div
              variants={fadeUp}
              whileHover={{ y: -10, scale: 1.05 }}
              className="group relative bg-rose h-40 p-8 rounded-xl cursor-pointer overflow-hidden shadow-md"
            >
              <h3 className="text-xl font-semibold relative z-10">
                1. Create Your Profile
              </h3>

              <p className="absolute left-8 right-8 bottom-6 opacity-0 translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                Tell us about your habits, routine, and preferences.
              </p>
            </motion.div>

            <motion.div
              variants={fadeUp}
              whileHover={{ y: -10, scale: 1.05 }}
              className="group relative bg-rose h-40 p-8 rounded-xl cursor-pointer overflow-hidden shadow-md"
            >
              <h3 className="text-xl font-semibold relative z-10">
                2. Get Matched
              </h3>

              <p className="absolute left-8 right-8 bottom-6 opacity-0 translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                We calculate compatibility with others like you.
              </p>
            </motion.div>

            <motion.div
              variants={fadeUp}
              whileHover={{ y: -10, scale: 1.05 }}
              className="group relative bg-rose h-40 p-8 rounded-xl cursor-pointer overflow-hidden shadow-md"
            >
              <h3 className="text-xl font-semibold relative z-10">
                3. Connect Safely
              </h3>

              <p className="absolute left-8 right-8 bottom-6 opacity-0 translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                Chat only after mutual interest. No spam.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* WHY COHABIT */}
      <section className="bg-blush py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false }}
            className="text-3xl font-semibold mb-12"
          >
            Why CoHabit?
          </motion.h2>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false }}
            className="grid md:grid-cols-3 gap-10"
          >
            <motion.div
              variants={fadeUp}
              whileHover={{ y: -10, scale: 1.05 }}
              className="group relative bg-[#b87477] h-40 p-8 rounded-xl cursor-pointer overflow-hidden shadow-md"
            >
              <h3 className="text-xl font-semibold text-green-950 relative z-10">
                Compatibility First
              </h3>

              <p className="absolute left-8 right-8 bottom-6 text-green-950 opacity-0 translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                No random matches. Only people who fit your lifestyle.
              </p>
            </motion.div>

            <motion.div
              variants={fadeUp}
              whileHover={{ y: -10, scale: 1.05 }}
              className="group relative bg-[#b87477] h-40 p-8 rounded-xl cursor-pointer overflow-hidden shadow-md"
            >
              <h3 className="text-xl font-semibold text-green-950 relative z-10">
                Student Friendly
              </h3>

              <p className="absolute left-8 right-8 bottom-6 text-green-950 opacity-0 translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                Built specifically for college and early career life.
              </p>
            </motion.div>

            <motion.div
              variants={fadeUp}
              whileHover={{ y: -10, scale: 1.05 }}
              className="group relative bg-[#b87477] h-40 p-8 rounded-xl cursor-pointer overflow-hidden shadow-md"
            >
              <h3 className="text-xl font-semibold text-green-950 relative z-10">
                Privacy Focused
              </h3>

              <p className="absolute left-8 right-8 bottom-6 text-green-950 opacity-0 translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                Connect only when both sides agree.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-red-950 text-blush py-16 text-center">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false }}
          className="text-3xl font-semibold"
        >
          Ready to find your perfect co-living match?
        </motion.h2>

        <Link
          href="/signup"
          className="inline-block mt-6 bg-rose text-pine px-8 py-3 rounded-md text-lg hover:bg-blush transition"
        >
          Join CoHabit
        </Link>
      </section>

      <Footer />
    </main>
  );
}
