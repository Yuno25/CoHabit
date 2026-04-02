"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

export default function Navbar() {
  const router = useRouter();

  // Dropdown states
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Auth and sidebar state
  const [isAuthed, setIsAuthed] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Logged in user
  const [user, setUser] = useState<{ name?: string } | null>(null);

  /* Close dropdowns when clicking outside */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }

      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* Fetch user using cookie session */
  const fetchUser = async () => {
    try {
      const res = await fetch("/api/user/profile", {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) {
        setUser(null);
        setIsAuthed(false);
        return;
      }

      const data = await res.json();

      if (data.success && data.user) {
        setUser(data.user);
        setIsAuthed(true);
      } else {
        setUser(null);
        setIsAuthed(false);
      }
    } catch {
      setUser(null);
      setIsAuthed(false);
    }
  };

  /* Sync auth on mount and when login/logout happens */
  useEffect(() => {
    fetchUser();

    const handleAuthChange = () => {
      fetchUser();
    };

    window.addEventListener("auth-change", handleAuthChange);

    const esc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSidebarOpen(false);
        setSearchOpen(false);
        setOpen(false);
      }
    };

    document.addEventListener("keydown", esc);

    return () => {
      window.removeEventListener("auth-change", handleAuthChange);
      document.removeEventListener("keydown", esc);
    };
  }, []);

  /* Navigate user type */
  const handleUserType = (type: string) => {
    setOpen(false);
    router.push(`/user-type?type=${type}`);
  };

  /* Navigate search */
  const handleSearch = (mode: "locality" | "college") => {
    setSearchOpen(false);
    router.push(`/search?by=${mode}`);
  };

  /* Logout and clear session */
  const logout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch {}

    window.dispatchEvent(new Event("auth-change"));

    setSidebarOpen(false);
    router.push("/");
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/70 border-b border-white/20 transition-all duration-300">
        <div className="w-full px-6 py-3 flex items-center">
          {/* LEFT */}
          <div className="flex-1 flex items-center">
            <Link
              href="/"
              className="font-semibold text-pine text-lg tracking-wide 
        transition-all duration-300 ease-in-out 
        hover:scale-105 hover:text-rose cursor-pointer"
            >
              CoHabit
            </Link>
          </div>

          {/* CENTER */}
          <div className="hidden md:flex items-center gap-8 text-sm text-pine relative">
            {/* SEARCH */}
            <div ref={searchRef} className="relative">
              <button
                onClick={() => setSearchOpen((v) => !v)}
                className="flex items-center transition-all duration-300 hover:scale-110 hover:text-rose"
                aria-label="Search"
              >
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
                <div className="absolute top-12 left-0 w-56 rounded-2xl backdrop-blur-xl bg-white/80 border border-white/30 shadow-xl overflow-hidden">
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

            {/* LINKS */}
            <Link
              href="/"
              className="flex items-center transition-all duration-300 hover:scale-110 hover:text-rose"
            >
              Home
            </Link>

            <div ref={dropdownRef} className="relative">
              <button
                onClick={() => setOpen((v) => !v)}
                className="flex items-center transition-all duration-300 hover:scale-110 hover:text-rose"
              >
                User Type <span className="text-xs">▾</span>
              </button>

              {open && (
                <div className="absolute top-12 left-0 w-56 rounded-2xl backdrop-blur-xl bg-white/80 border border-white/30 shadow-xl overflow-hidden">
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

            <Link
              href="/terms"
              className="flex items-center transition-all duration-300 hover:scale-110 hover:text-rose"
            >
              Terms
            </Link>
          </div>

          {/* RIGHT */}
          <div className="flex-1 flex justify-end items-center">
            {!isAuthed ? (
              <div className="flex items-center gap-5 text-sm">
                <Link
                  href="/login"
                  className="transition-all duration-300 hover:scale-105 hover:text-rose"
                >
                  Login
                </Link>

                <Link
                  href="/signup"
                  className="bg-red-950 text-white px-4 py-1.5 rounded-md hover:bg-wine transition"
                >
                  Sign up
                </Link>
              </div>
            ) : (
              <button
                onClick={() => setSidebarOpen(true)}
                className="w-10 h-10 rounded-full bg-wine text-blush flex items-center justify-center font-semibold
          transition-all duration-300 ease-in-out
          hover:scale-110 hover:ring-2 hover:ring-rose hover:shadow-lg"
              >
                {getInitial(user?.name)}
              </button>
            )}
          </div>
        </div>
      </nav>

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
              className="fixed top-0 right-0 z-50 h-full w-72 backdrop-blur-lg bg-white/70 border-l border-white/30 p-6 flex flex-col"
            >
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-pine">
                  {user?.name || "Your Name"}
                </h2>
                <p className="text-sm text-pine/70">Welcome back</p>
              </div>

              <nav className="flex-1 space-y-3">
                <SidebarItem
                  label="My Profile"
                  onClick={() => {
                    setSidebarOpen(false);
                    router.push("/profile-setup");
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

function getInitial(name?: string) {
  if (!name) return "U";
  return name.trim().charAt(0).toUpperCase();
}
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
