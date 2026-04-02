"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ProfileSetup() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    city: "",
    bio: "",
    age: "",
    gender: "",
    locality: "",
    budget: "",
    smoking: "",
    drinking: "",
    pets: "",
    sleepSchedule: "",
    cleanliness: "",
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const saveProfile = async () => {
    const res = await fetch("/api/user/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (data.success) {
      window.dispatchEvent(new Event("auth-change"));
      router.push("/welcome");
    }
  };

  return (
    <div className="min-h-screen bg-blush pt-24 pb-20 px-6">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* PROFILE CARD */}
        <div className="bg-white rounded-2xl shadow p-6 space-y-4">
          <h2 className="text-lg font-semibold text-pine">Profile</h2>

          <input
            name="name"
            placeholder="Your Name"
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          />

          <input
            name="city"
            placeholder="Your City"
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          />

          <textarea
            name="bio"
            placeholder="Tell people a little about yourself"
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          />
        </div>

        {/* LIFESTYLE */}
        <div className="bg-white rounded-2xl shadow p-6 space-y-4">
          <h2 className="text-lg font-semibold text-pine">Lifestyle</h2>

          <select name="smoking" onChange={handleChange} className="input">
            <option>Smoking</option>
            <option>No</option>
            <option>Occasionally</option>
            <option>Yes</option>
          </select>

          <select name="drinking" onChange={handleChange} className="input">
            <option>Drinking</option>
            <option>No</option>
            <option>Occasionally</option>
            <option>Yes</option>
          </select>

          <select name="pets" onChange={handleChange} className="input">
            <option>Pets</option>
            <option>No</option>
            <option>Yes</option>
          </select>

          <select
            name="sleepSchedule"
            onChange={handleChange}
            className="input"
          >
            <option>Sleep Schedule</option>
            <option>Early Bird</option>
            <option>Night Owl</option>
          </select>

          <select name="cleanliness" onChange={handleChange} className="input">
            <option>Cleanliness</option>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>

        {/* HOUSING */}
        <div className="bg-white rounded-2xl shadow p-6 space-y-4">
          <h2 className="text-lg font-semibold text-pine">
            Housing Preferences
          </h2>

          <input
            name="locality"
            placeholder="Preferred Locality"
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          />

          <input
            name="budget"
            placeholder="Monthly Budget"
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          />
        </div>

        {/* SAVE BUTTON */}
        <button
          onClick={saveProfile}
          className="w-full bg-wine text-blush py-3 rounded-xl font-semibold hover:bg-pine transition"
        >
          Save Profile
        </button>
      </div>
    </div>
  );
}
