"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AccountPage() {
  const router = useRouter();

  // TEMP mock data (later comes from DB)
  const [user, setUser] = useState({
    name: "Your Name",
    city: "Your City",
    bio: "Tell people a little about yourself",
    userType: null as null | "renter" | "seeker" | "lister",
  });

  const [editing, setEditing] = useState(false);

  return (
    <div className="min-h-screen px-4 pt-24 flex justify-center">
      <div className="w-full max-w-3xl space-y-8">
        {/* PROFILE CARD */}
        <section className="backdrop-blur-md bg-white/70 border border-white/30 rounded-2xl p-6 shadow-lg">
          <div className="flex items-start justify-between gap-4">
            <div>
              {!editing ? (
                <>
                  <h1 className="text-2xl font-semibold text-pine">
                    {user.name}
                  </h1>
                  <p className="text-sm text-pine/70">{user.city}</p>
                </>
              ) : (
                <div className="space-y-2">
                  <input
                    value={user.name}
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                    className="w-full px-3 py-2 border rounded"
                    placeholder="Full name"
                  />
                  <input
                    value={user.city}
                    onChange={(e) => setUser({ ...user, city: e.target.value })}
                    className="w-full px-3 py-2 border rounded"
                    placeholder="City"
                  />
                </div>
              )}
            </div>

            {!editing ? (
              <button
                onClick={() => setEditing(true)}
                className="text-sm underline text-pine/80 hover:opacity-80"
              >
                Edit Profile
              </button>
            ) : (
              <div className="flex gap-3 text-sm">
                <button
                  onClick={() => setEditing(false)}
                  className="hover:opacity-80"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setEditing(false);
                    // later: save to DB
                  }}
                  className="font-medium hover:opacity-80"
                >
                  Save
                </button>
              </div>
            )}
          </div>

          {!editing ? (
            <p className="mt-4 text-sm text-pine/80">{user.bio}</p>
          ) : (
            <textarea
              value={user.bio}
              onChange={(e) => setUser({ ...user, bio: e.target.value })}
              className="mt-4 w-full px-3 py-2 border rounded"
              placeholder="Short bio"
            />
          )}
        </section>

        {/* PHOTOS (appears only in edit mode, same UI language) */}
        {editing && (
          <section className="backdrop-blur-md bg-white/70 border border-white/30 rounded-xl p-5">
            <h3 className="text-sm font-medium text-pine mb-2">Photos</h3>
            <div className="h-32 border rounded flex items-center justify-center text-sm text-pine/60">
              Upload photos (coming next)
            </div>
          </section>
        )}

        {/* ACTIONS (unchanged, only disabled while editing) */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-pine">
            What do you want to do?
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <ActionCard
              label="Find a place"
              icon="🏠"
              disabled={editing}
              onClick={() => router.push("/user-type?type=renter")}
            />
            <ActionCard
              label="Find a roommate"
              icon="👥"
              disabled={editing}
              onClick={() => router.push("/user-type?type=seeker")}
            />
            <ActionCard
              label="List my place"
              icon="🏡"
              disabled={editing}
              onClick={() => router.push("/user-type?type=lister")}
            />
          </div>
        </section>

        {/* SETTINGS */}
        <section className="backdrop-blur-md bg-white/70 border border-white/30 rounded-xl p-4">
          <button
            onClick={() => router.push("/logout")}
            className="text-sm text-pine hover:opacity-80"
          >
            Log out
          </button>
        </section>
      </div>
    </div>
  );
}

function ActionCard({
  icon,
  label,
  onClick,
  disabled,
}: {
  icon: string;
  label: string;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        backdrop-blur-md bg-white/70
        border border-white/30
        rounded-xl p-5
        flex flex-col items-center gap-2
        transition
        ${disabled ? "opacity-50 cursor-not-allowed" : "hover:shadow-lg"}
      `}
    >
      <span className="text-2xl">{icon}</span>
      <span className="text-sm font-medium text-pine">{label}</span>
    </button>
  );
}
