"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Login failed");
      setLoading(false);
      return;
    }

    // ✅ AUTH SUCCESS
    localStorage.setItem("token", data.token);
    window.dispatchEvent(new Event("auth-change"));

    // ✅ GO TO WELCOME (NOT ACCOUNT)
    router.replace("/welcome/back");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blush">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h1 className="text-2xl font-semibold text-center text-pine">
          Login to CoHabit
        </h1>

        {error && <p className="mt-4 text-sm text-wine text-center">{error}</p>}

        <div className="mt-6">
          <label className="block text-sm mb-1">Email</label>
          <input
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div className="mt-4">
          <label className="block text-sm mb-1">Password</label>
          <input
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full bg-pine text-blush py-2 rounded hover:bg-wine transition"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
