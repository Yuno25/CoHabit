"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Signup failed");
      setLoading(false);
      return;
    }

    // ✅ AUTH SUCCESS
    localStorage.setItem("token", data.token);
    window.dispatchEvent(new Event("auth-change"));

    // ✅ GO TO WELCOME
    router.replace("/welcome/new");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blush px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white/90 backdrop-blur-md p-8 rounded-xl shadow-lg w-full max-w-md"
      >
        <h1 className="text-2xl font-semibold text-center text-pine">
          Join CoHabit
        </h1>

        {error && <p className="mt-4 text-sm text-wine text-center">{error}</p>}

        <input name="name" required onChange={handleChange} />
        <input name="email" type="email" required onChange={handleChange} />
        <input
          name="password"
          type="password"
          required
          onChange={handleChange}
        />

        <button
          disabled={loading}
          className="mt-6 w-full bg-pine text-blush py-2 rounded-md"
        >
          {loading ? "Creating..." : "Create Account"}
        </button>
      </form>
    </div>
  );
}
