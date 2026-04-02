"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
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
            <button className="px-8 py-3 bg-wine hover:bg-rose text-blush rounded-lg transition">
              Join CoHabit
            </button>
            <Link href="/questionnaire">
              <button className="px-6 py-3 border border-white/30 text-white rounded-xl backdrop-blur-md hover:bg-white/10 transition">
                Let’s Know You More
              </button>
            </Link>
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
            {/* CARD */}
            <motion.div
              variants={fadeUp}
              whileHover={{ y: -8, scale: 1.05 }}
              className="group cursor-pointer"
            >
              <div
                className="bg-rose px-6 py-4 rounded-xl 
shadow-[0_10px_25px_rgba(0,0,0,0.15)] 
transition-all duration-300 
group-hover:bg-rose 
group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.25)] 
group-hover:-translate-y-2"
              >
                <h3 className="text-xl font-semibold text-black text-center">
                  1. Create Your Profile
                </h3>

                <p className="text-sm text-black text-center mt-3 opacity-0 max-h-0 overflow-hidden transition-all duration-300 group-hover:opacity-100 group-hover:max-h-32">
                  Tell us about your habits, routine, and preferences.
                </p>
              </div>
            </motion.div>

            {/* CARD */}
            <motion.div
              variants={fadeUp}
              whileHover={{ y: -8, scale: 1.05 }}
              className="group cursor-pointer"
            >
              <div className="bg-rose px-6 py-4 rounded-xl shadow-[0_10px_25px_rgba(0,0,0,0.15)] transition-all duration-300 group-hover:bg-rose group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.25)] group-hover:-translate-y-2">
                <h3 className="text-xl font-semibold text-black text-center">
                  2. Get Matched
                </h3>

                <p className="text-sm text-black text-center mt-3 opacity-0 max-h-0 overflow-hidden transition-all duration-300 group-hover:opacity-100 group-hover:max-h-32">
                  Our algorithm finds people with compatible lifestyles.
                </p>
              </div>
            </motion.div>

            {/* CARD */}
            <motion.div
              variants={fadeUp}
              whileHover={{ y: -8, scale: 1.05 }}
              className="group cursor-pointer"
            >
              <div className="bg-rose px-6 py-4 rounded-xl shadow-[0_10px_25px_rgba(0,0,0,0.15)] transition-all duration-300 group-hover:bg-rose group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.25)] group-hover:-translate-y-2">
                <h3 className="text-xl font-semibold text-black text-center">
                  3. Connect Safely
                </h3>

                <p className="text-sm text-black text-center mt-3 opacity-0 max-h-0 overflow-hidden transition-all duration-300 group-hover:opacity-100 group-hover:max-h-32">
                  Chat only when both users show interest.
                </p>
              </div>
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
            {[
              {
                title: "Compatibility First",
                desc: "No random matches. Only people who fit your lifestyle.",
              },
              {
                title: "Student Friendly",
                desc: "Built for students and young professionals.",
              },
              {
                title: "Privacy Focused",
                desc: "Connect only when both sides agree.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                whileHover={{ y: -8, scale: 1.05 }}
                className="group cursor-pointer"
              >
                <div className="bg-rose px-6 py-4 rounded-xl shadow-[0_10px_25px_rgba(0,0,0,0.15)] transition-all duration-300 group-hover:bg-rose group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.25)] group-hover:-translate-y-2">
                  <h3 className="text-xl font-semibold text-black text-center">
                    {item.title}
                  </h3>

                  <p className="text-sm text-black text-center mt-3 opacity-0 max-h-0 overflow-hidden transition-all duration-300 group-hover:opacity-100 group-hover:max-h-32">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-gradient-to-b from-[#3d0606] to-[#350707] text-blush py-16 text-center">
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
