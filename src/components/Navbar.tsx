"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

export default function Navbar() {
  const router = useRouter();

  // User Type dropdown
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Search dropdown
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Auth + sidebar
  const [isAuthed, setIsAuthed] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const user = { name: "Your Name" };

  /* ---------- Outside Click Handling ---------- */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      )
        setOpen(false);
      if (searchRef.current && !searchRef.current.contains(e.target as Node))
        setSearchOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* ---------- Auth Sync ---------- */
  useEffect(() => {
    const syncAuth = () => {
      setIsAuthed(!!localStorage.getItem("token"));
    };

    syncAuth();
    window.addEventListener("auth-change", syncAuth);
    window.addEventListener("storage", syncAuth);

    const esc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSidebarOpen(false);
        setSearchOpen(false);
        setOpen(false);
      }
    };
    document.addEventListener("keydown", esc);

    return () => {
      window.removeEventListener("auth-change", syncAuth);
      window.removeEventListener("storage", syncAuth);
      document.removeEventListener("keydown", esc);
    };
  }, []);

  const handleUserType = (type: string) => {
    setOpen(false);
    router.push(`/user-type?type=${type}`);
  };

  const handleSearch = (mode: "locality" | "college") => {
    setSearchOpen(false);
    router.push(`/search?by=${mode}`);
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("auth-change"));
    setSidebarOpen(false);
    router.push("/");
  };

  return (
    <>
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/60 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          {/* LOGO */}
          <Link href="/" className="font-semibold text-pine">
            CoHabit
          </Link>

          {/* CENTER */}
          <div className="hidden md:flex items-center gap-6 text-sm text-pine relative">
            {/* SEARCH ICON */}
            <div ref={searchRef} className="relative">
              <button
                onClick={() => setSearchOpen((v) => !v)}
                className="hover:opacity-80 flex items-center"
                aria-label="Search"
              >
                {/* Outlined magnifying glass */}
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </button>

              {searchOpen && (
                <div
                  className="
                    absolute top-10 left-0
                    w-52 rounded-xl
                    backdrop-blur-lg bg-white/70
                    border border-white/30
                    shadow-lg
                    overflow-hidden
                  "
                >
                  <SearchItem
                    title="Search by Locality"
                    subtitle="Area, city or neighborhood"
                    onClick={() => handleSearch("locality")}
                  />
                  <SearchItem
                    title="Search by College"
                    subtitle="University or institution"
                    onClick={() => handleSearch("college")}
                  />
                </div>
              )}
            </div>

            <Link href="/" className="hover:opacity-80">
              Home
            </Link>

            {/* USER TYPE DROPDOWN (UNCHANGED) */}
            <div ref={dropdownRef} className="relative">
              <button
                onClick={() => setOpen((v) => !v)}
                className="hover:opacity-80 flex items-center gap-1"
              >
                User Type <span className="text-xs">▾</span>
              </button>

              {open && (
                <div
                  className="
                    absolute top-10 left-0
                    w-56 rounded-xl
                    backdrop-blur-lg bg-white/70
                    border border-white/30
                    shadow-lg
                    overflow-hidden
                  "
                >
                  <DropdownItem
                    title="Looking for a place"
                    subtitle="Find rooms & compatible roommates"
                    onClick={() => handleUserType("renter")}
                  />
                  <DropdownItem
                    title="Looking for a roommate"
                    subtitle="Join someone with a place"
                    onClick={() => handleUserType("seeker")}
                  />
                  <DropdownItem
                    title="Have a place"
                    subtitle="List your place & find roommates"
                    onClick={() => handleUserType("lister")}
                  />
                </div>
              )}
            </div>

            <Link href="/terms" className="hover:opacity-80">
              Terms
            </Link>
          </div>

          {/* RIGHT */}
          {!isAuthed ? (
            <div className="flex items-center gap-4 text-sm">
              <Link href="/login" className="hover:opacity-80">
                Login
              </Link>
              <Link
                href="/signup"
                className="bg-pine text-blush px-4 py-1.5 rounded-md hover:bg-wine transition"
              >
                Sign up
              </Link>
            </div>
          ) : (
            <button
              onClick={() => setSidebarOpen(true)}
              className="w-10 h-10 rounded-full bg-pine text-blush flex items-center justify-center font-semibold"
            >
              {getInitials(user.name)}
            </button>
          )}
        </div>
      </nav>

      {/* SIDEBAR */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-black/30 z-40"
            />

            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 30 }}
              className="
                fixed top-0 right-0 z-50
                h-full w-72
                backdrop-blur-lg bg-white/70
                border-l border-white/30
                p-6
                flex flex-col
              "
            >
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-pine">{user.name}</h2>
                <p className="text-sm text-pine/70">Welcome back</p>
              </div>

              <nav className="flex-1 space-y-3">
                <SidebarItem
                  label="Edit Profile"
                  onClick={() => {
                    setSidebarOpen(false);
                    router.push("/account");
                  }}
                />
                <SidebarItem
                  label="Search History"
                  onClick={() => {
                    setSidebarOpen(false);
                    router.push("/search-history");
                  }}
                />
              </nav>

              <button
                onClick={logout}
                className="text-sm text-pine hover:opacity-80"
              >
                Logout
              </button>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

/* ---------- EXISTING COMPONENTS (UNCHANGED) ---------- */

function DropdownItem({
  title,
  subtitle,
  onClick,
}: {
  title: string;
  subtitle: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left px-4 py-3 hover:bg-white/40 transition"
    >
      <p className="text-sm font-medium text-pine">{title}</p>
      <p className="text-xs text-pine/70">{subtitle}</p>
    </button>
  );
}

function SearchItem({
  title,
  subtitle,
  onClick,
}: {
  title: string;
  subtitle: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left px-4 py-3 hover:bg-white/40 transition"
    >
      <p className="text-sm font-medium text-pine">{title}</p>
      <p className="text-xs text-pine/70">{subtitle}</p>
    </button>
  );
}

function SidebarItem({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left px-3 py-2 rounded hover:bg-white/40 transition text-sm text-pine"
    >
      {label}
    </button>
  );
}

function getInitials(name?: string) {
  if (!name) return "U";
  const parts = name.split(" ");
  return parts.length > 1 ? parts[0][0] + parts[1][0] : parts[0][0];
}
