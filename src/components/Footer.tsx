"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[#2f0808] to-[#2f0808] text-gray-200 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-14">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-wide text-white">
              CoHabit
            </h2>

            <p className="text-gray-300 text-sm leading-relaxed max-w-sm">
              Find compatible roommates and build better shared living
              experiences powered by smart matching.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Explore</h3>

            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="hover:text-pink-300 transition-colors duration-300"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="/signup"
                  className="hover:text-pink-300 transition-colors duration-300"
                >
                  Find Roommates
                </Link>
              </li>

              <li>
                <Link
                  href="/user-type"
                  className="hover:text-pink-300 transition-colors duration-300"
                >
                  List a Property
                </Link>
              </li>

              <li>
                <Link
                  href="/login"
                  className="hover:text-pink-300 transition-colors duration-300"
                >
                  Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Legal</h3>

            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="#"
                  className="hover:text-pink-300 transition-colors duration-300"
                >
                  Terms of Service
                </Link>
              </li>

              <li>
                <Link
                  href="#"
                  className="hover:text-pink-300 transition-colors duration-300"
                >
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link
                  href="#"
                  className="hover:text-pink-300 transition-colors duration-300"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col md:flex-row items-center justify-between text-sm text-gray-400">
          <p>© {new Date().getFullYear()} CoHabit. All rights reserved.</p>

          {/* Socials */}
          <div className="flex gap-6 mt-4 md:mt-0">
            <a
              href="#"
              className="hover:text-white hover:scale-110 transition-all duration-300"
            >
              Twitter
            </a>

            <a
              href="#"
              className="hover:text-white hover:scale-110 transition-all duration-300"
            >
              LinkedIn
            </a>

            <a
              href="#"
              className="hover:text-white hover:scale-110 transition-all duration-300"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
