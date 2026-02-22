"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ProfileSetupPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    bio: "",
    college: "",
    locality: "",
  });

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const res = await fetch("/api/user/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (data.success) {
      router.push("/");
    } else {
      alert("Failed to update profile");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-blush text-pine">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md space-y-4 w-80"
      >
        <h1 className="text-xl font-semibold text-center">
          Complete Your Profile
        </h1>

        <input
          type="text"
          name="bio"
          placeholder="Bio"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          type="text"
          name="college"
          placeholder="College"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          type="text"
          name="locality"
          placeholder="Locality"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <button type="submit" className="w-full bg-pine text-white p-2 rounded">
          Save Profile
        </button>
      </form>
    </main>
  );
}
