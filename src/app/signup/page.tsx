"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Signup() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    dob: "",
    contact: "",
    gender: "",
    remember: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;
    setError("");

    setForm({
      ...form,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !form.name ||
      !form.email ||
      !form.password ||
      !form.confirmPassword ||
      !form.dob ||
      !form.contact ||
      !form.gender
    ) {
      setError("All fields are required");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      // ✅ Signup
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Signup failed");
        return;
      }

      // AUTO LOGIN AFTER SIGNUP
      await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      });

      // Trigger navbar update
      window.dispatchEvent(new Event("auth-change"));

      // Redirect
      router.push("/");
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-16 h-screen w-screen flex overflow-hidden bg-blush">
      {/* LEFT SIDE */}
      <div className="hidden lg:flex w-[50vw] h-full relative">
        <img
          src="/hero/roommate-2.png"
          alt="CoHabit"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-br from-pine/80 to-black/60" />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-10">
          <h1 className="text-5xl font-bold">CoHabit</h1>
          <p className="mt-4 text-lg opacity-90">
            Find your perfect space <br />
            Live better, together.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex-1 h-full flex items-center justify-center relative">
        {/* DIVIDER */}
        <div className="hidden lg:block absolute left-0 top-0 h-full w-[1px] bg-white/30" />

        {/* FORM CONTAINER */}
        <div className="w-full max-w-md h-[90vh] flex flex-col backdrop-blur-xl bg-white/70 border border-white/30 rounded-2xl shadow-2xl">
          {/* SCROLLABLE CONTENT */}
          <div className="flex-1 overflow-y-auto p-6 space-y-5">
            {/* Heading */}
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-pine">
                Create Account
              </h2>
              <p className="text-sm text-pine/70">
                Start your co-living journey
              </p>
            </div>

            {/* SOCIAL LOGIN */}
            <div className="space-y-3">
              <button className="w-full flex items-center justify-center gap-3 border border-white/40 bg-white/60 rounded-lg py-2 transition-all duration-300 hover:scale-[1.02] hover:bg-white hover:shadow-md">
                Continue with Google
              </button>

              <button className="w-full flex items-center justify-center gap-3 border border-white/40 bg-white/60 rounded-lg py-2 transition-all duration-300 hover:scale-[1.02] hover:bg-white hover:shadow-md">
                Continue with Instagram
              </button>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3 text-xs text-pine/50">
              <div className="flex-1 h-px bg-white/40" />
              OR
              <div className="flex-1 h-px bg-white/40" />
            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Name"
                name="name"
                value={form.name}
                onChange={handleChange}
              />
              <Input
                label="Email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
              />
              <Input
                label="Contact"
                name="contact"
                value={form.contact}
                onChange={handleChange}
              />
              <Input
                label="Date of Birth"
                name="dob"
                type="date"
                value={form.dob}
                onChange={handleChange}
              />

              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                className="w-full border border-white/40 bg-white/60 rounded-lg px-3 py-2 focus:ring-2 focus:ring-rose"
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>

              <PasswordInput
                label="Password"
                name="password"
                value={form.password}
                show={showPassword}
                toggle={() => setShowPassword(!showPassword)}
                onChange={handleChange}
              />

              <PasswordInput
                label="Confirm Password"
                name="confirmPassword"
                value={form.confirmPassword}
                show={showPassword}
                toggle={() => setShowPassword(!showPassword)}
                onChange={handleChange}
              />

              {error && (
                <p className="text-sm text-red-600 bg-red-50 border rounded-md px-3 py-2">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="w-full bg-pine text-blush py-2 rounded-lg hover:bg-wine transition"
              >
                {loading ? "Creating..." : "Create Account"}
              </button>
            </form>

            {/* FOOTER (FIXED) */}
            <p className="text-sm text-center text-pine/70">
              Already have an account?{" "}
              <Link href="/login" className="hover:text-rose transition">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Input */
function Input({ label, ...props }: any) {
  return (
    <div>
      <label className="block text-sm text-pine mb-1">{label}</label>
      <input
        {...props}
        className="w-full border border-white/40 bg-white/60 rounded-lg px-3 py-2 focus:ring-2 focus:ring-rose"
      />
    </div>
  );
}

/* Password */
function PasswordInput({ label, show, toggle, ...props }: any) {
  return (
    <div>
      <label className="block text-sm text-pine mb-1">{label}</label>
      <div className="relative">
        <input
          {...props}
          type={show ? "text" : "password"}
          className="w-full border border-white/40 bg-white/60 rounded-lg px-3 py-2 pr-10 focus:ring-2 focus:ring-rose"
        />
        <button
          type="button"
          onClick={toggle}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-pine/60"
        >
          👁
        </button>
      </div>
    </div>
  );
}
