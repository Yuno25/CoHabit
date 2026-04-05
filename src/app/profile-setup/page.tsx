"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProfileSetup() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [savedUser, setSavedUser] = useState<any>(null);
  const router = useRouter();

  const [mode, setMode] = useState<"edit" | "preview">("edit");

  const [form, setForm] = useState({
    name: "",
    city: "",
    bio: "",
    age: "",
    gender: "",
    locality: "",
    smoking: "",
    drinking: "",
    pets: "",
    sleepSchedule: "",
    cleanliness: "",
    profileImage: "",
  });

  useEffect(() => {
    fetch("/api/user/profile")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.user) {
          setSavedUser(data.user);
          setForm((prev) => ({
            ...prev,
            name: data.user.name || "",
            city: data.user.city || "",
            age: data.user.age || "",
            gender: data.user.gender || "",
            bio: data.user.bio || "",
            locality: data.user.locality || "",
            smoking: data.user.smoking || "",
            drinking: data.user.drinking || "",
            pets: data.user.pets || "",
            sleepSchedule: data.user.sleepSchedule || "",
            cleanliness: data.user.cleanliness || "",
          }));
        }
      });
  }, []);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImage = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setForm({ ...form, profileImage: url });
    }
  };

  const saveProfile = async () => {
    try {
      setLoading(true);
      setSuccess("");
      setError("");

      const res = await fetch("/api/user/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        setSuccess("Profile saved successfully!");
        setSavedUser(data.user);
        window.dispatchEvent(new Event("auth-change"));
        setMode("preview");
      } else {
        setError(data.message || "Something went wrong");
      }
    } catch (err) {
      setError("Server error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');

        .profile-root {
          min-height: 100vh;
          padding: 96px 24px 80px;
          background: linear-gradient(to bottom right, #56010b, #560202, #bf7880);
          font-family: 'DM Sans', sans-serif;
        }

        .profile-inner {
          max-width: 1100px;
          margin: 0 auto;
        }

        .profile-header {
          margin-bottom: 32px;
        }

        .profile-header h1 {
          font-family: 'DM Serif Display', serif;
          font-size: 2.4rem;
          color: #fff;
          margin: 0 0 4px;
          letter-spacing: -0.5px;
        }

        .profile-header p {
          color: rgba(255,255,255,0.7);
          font-size: 0.95rem;
          font-weight: 300;
          margin: 0;
        }

        /* TOGGLE */
        .toggle-bar {
          display: flex;
          gap: 0;
          background: rgba(0,0,0,0.2);
          border-radius: 14px;
          padding: 4px;
          width: fit-content;
          margin-bottom: 32px;
        }

        .toggle-btn {
          padding: 8px 24px;
          border-radius: 10px;
          border: none;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.875rem;
          font-weight: 500;
          transition: all 0.2s ease;
          background: transparent;
          color: rgba(255,255,255,0.6);
        }

        .toggle-btn.active {
          background: #fff;
          color: #3a0008;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        }

        /* AVATAR */
        .avatar-wrap {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-bottom: 32px;
        }

        .avatar-ring {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: rgba(0,0,0,0.25);
          border: 2px dashed rgba(255,255,255,0.3);
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
          flex-shrink: 0;
        }

        .avatar-ring:hover {
          border-color: rgba(255,255,255,0.6);
          background: rgba(0,0,0,0.35);
        }

        .avatar-ring img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .avatar-initial {
          font-family: 'DM Serif Display', serif;
          font-size: 1.8rem;
          color: rgba(255,255,255,0.8);
        }

        .avatar-hint {
          color: rgba(255,255,255,0.5);
          font-size: 0.8rem;
        }

        .avatar-hint strong {
          display: block;
          color: #fff;
          font-size: 0.9rem;
          margin-bottom: 2px;
        }

        /* GRID */
        .edit-grid {
          display: grid;
          grid-template-columns: 1fr 340px;
          gap: 20px;
        }

        @media (max-width: 768px) {
          .edit-grid { grid-template-columns: 1fr; }
          .profile-header h1 { font-size: 1.8rem; }
        }

        .left-col { display: flex; flex-direction: column; gap: 16px; }
        .right-col { display: flex; flex-direction: column; gap: 16px; }

        /* CARDS — solid dark, matching original site boxes */
        .card {
          background: rgba(60,0,10,0.55);
          border-radius: 20px;
          padding: 24px;
        }

        .card-title {
          font-family: 'DM Serif Display', serif;
          font-size: 1.05rem;
          color: #fff;
          margin: 0 0 16px;
        }

        .input-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }

        .field-input, .field-select, .field-textarea {
          width: 100%;
          background: rgba(0,0,0,0.2);
          border: none;
          border-radius: 12px;
          padding: 11px 14px;
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.875rem;
          outline: none;
          transition: background 0.2s;
          box-sizing: border-box;
          appearance: none;
          -webkit-appearance: none;
        }

        .field-input::placeholder { color: rgba(255,255,255,0.3); }

        .field-input:focus, .field-select:focus, .field-textarea:focus {
          background: rgba(0,0,0,0.3);
        }

        .field-textarea {
          resize: vertical;
          min-height: 100px;
        }

        .field-select option {
          background: #3a0008;
          color: #fff;
        }

        .select-wrap {
          position: relative;
          margin-top: 10px;
        }

        .select-wrap::after {
          content: '▾';
          position: absolute;
          right: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: rgba(255,255,255,0.4);
          pointer-events: none;
          font-size: 0.8rem;
        }

        .lifestyle-label {
          font-size: 0.72rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: rgba(255,255,255,0.4);
          margin: 14px 0 4px;
        }

        /* SAVE BUTTON */
        .save-btn {
          width: 100%;
          background: #4d0011;
          color: #fff;
          border: none;
          border-radius: 14px;
          padding: 14px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.95rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .save-btn:hover:not(:disabled) {
          background: #6a0018;
          transform: translateY(-1px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.3);
        }

        .save-btn:disabled { opacity: 0.5; cursor: not-allowed; }

        .refine-btn {
          font-size: 0.78rem;
          background: rgba(0,0,0,0.2);
          border: none;
          color: rgba(255,255,255,0.7);
          padding: 6px 14px;
          border-radius: 8px;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          transition: all 0.2s;
        }

        .refine-btn:hover {
          background: rgba(0,0,0,0.35);
          color: #fff;
        }

        .card-title-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .alert {
          border-radius: 12px;
          padding: 12px 16px;
          font-size: 0.85rem;
        }

        .alert-success { background: rgba(34,197,94,0.15); color: #86efac; }
        .alert-error { background: rgba(239,68,68,0.15); color: #fca5a5; }

        /* ===================== */
        /* SWIPE CARD PREVIEW    */
        /* ===================== */

        .preview-scene {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 20px 0 40px;
        }

        .preview-scene-label {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: rgba(255,255,255,0.35);
          margin-bottom: 32px;
        }

        .swipe-stack {
          position: relative;
          width: 340px;
          height: 520px;
          margin-bottom: 32px;
        }

        /* Ghost cards behind — solid dark, no glass */
        .swipe-stack::before {
          content: '';
          position: absolute;
          bottom: -16px;
          left: 50%;
          transform: translateX(-50%) rotate(-4deg);
          width: 320px;
          height: 500px;
          background: rgba(40,0,8,0.6);
          border-radius: 28px;
          z-index: 0;
        }

        .swipe-stack::after {
          content: '';
          position: absolute;
          bottom: -8px;
          left: 50%;
          transform: translateX(-50%) rotate(-2deg);
          width: 330px;
          height: 510px;
          background: rgba(50,0,10,0.65);
          border-radius: 28px;
          z-index: 1;
        }

        /* Main swipe card — solid dark box like the site cards */
        .swipe-card {
          position: absolute;
          inset: 0;
          z-index: 2;
          border-radius: 28px;
          overflow: hidden;
          background: rgba(60,0,10,0.85);
          box-shadow: 0 24px 48px rgba(0,0,0,0.5);
          display: flex;
          flex-direction: column;
        }

        .swipe-card-image {
          height: 220px;
          background: rgba(40,0,8,0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          flex-shrink: 0;
        }

        .swipe-card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .swipe-card-avatar {
          width: 90px;
          height: 90px;
          border-radius: 50%;
          background: rgba(0,0,0,0.3);
          border: 3px solid rgba(255,255,255,0.15);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .swipe-card-avatar-letter {
          font-family: 'DM Serif Display', serif;
          font-size: 2.5rem;
          color: rgba(255,255,255,0.7);
        }

        .swipe-card-gradient {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 60px;
          background: linear-gradient(to top, rgba(60,0,10,0.85), transparent);
        }

        .swipe-card-body {
          padding: 20px 22px;
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .swipe-name-row {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
        }

        .swipe-name {
          font-family: 'DM Serif Display', serif;
          font-size: 1.6rem;
          color: #fff;
          margin: 0;
          line-height: 1.1;
        }

        .swipe-age-gender {
          font-size: 0.85rem;
          color: rgba(255,255,255,0.45);
          font-weight: 300;
        }

        .swipe-location {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 0.8rem;
          color: rgba(255,255,255,0.4);
        }

        .swipe-location::before {
          content: '📍';
          font-size: 0.75rem;
        }

        .swipe-bio {
          font-size: 0.83rem;
          color: rgba(255,255,255,0.55);
          line-height: 1.5;
          font-weight: 300;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .swipe-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: auto;
        }

        .swipe-tag {
          padding: 4px 12px;
          background: rgba(0,0,0,0.25);
          border-radius: 20px;
          font-size: 0.72rem;
          color: rgba(255,255,255,0.65);
          font-weight: 500;
          letter-spacing: 0.3px;
        }

        /* MATCH BAR */
        .match-bar {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 22px 16px;
        }

        .match-bar-label {
          font-size: 0.72rem;
          color: rgba(255,255,255,0.3);
          text-transform: uppercase;
          letter-spacing: 1px;
          white-space: nowrap;
        }

        .match-bar-track {
          flex: 1;
          height: 3px;
          background: rgba(255,255,255,0.1);
          border-radius: 2px;
          overflow: hidden;
        }

        .match-bar-fill {
          height: 100%;
          width: 0%;
          background: rgba(255,255,255,0.4);
          border-radius: 2px;
        }

        .match-pct {
          font-size: 0.8rem;
          font-weight: 600;
          color: rgba(255,255,255,0.4);
          min-width: 32px;
          text-align: right;
        }

        /* ACTION BUTTONS */
        .swipe-actions {
          display: flex;
          justify-content: center;
          gap: 20px;
          margin-top: 8px;
        }

        .action-btn {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          border: none;
          background: rgba(40,0,8,0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.4rem;
          cursor: pointer;
          transition: all 0.2s;
        }

        .action-btn:hover { transform: scale(1.1); background: rgba(60,0,15,0.9); }
        .action-btn.like { background: rgba(100,0,20,0.7); }
        .action-btn.like:hover { background: rgba(120,0,25,0.9); }

        .preview-hint {
          font-size: 0.75rem;
          color: rgba(255,255,255,0.2);
          text-align: center;
          margin-top: 16px;
          font-style: italic;
        }
      `}</style>

      <div className="profile-root">
        <div className="profile-inner">
          {/* HEADER */}
          <div className="profile-header">
            <h1>Your Profile</h1>
            <p>How others will see you on the platform</p>
          </div>

          {/* AVATAR ROW */}
          <div className="avatar-wrap">
            <label style={{ cursor: "pointer" }}>
              <div className="avatar-ring">
                {form.profileImage ? (
                  <img src={form.profileImage} alt="avatar" />
                ) : (
                  <span className="avatar-initial">
                    {form.name?.[0] || "?"}
                  </span>
                )}
              </div>
              <input type="file" hidden onChange={handleImage} />
            </label>
            <div className="avatar-hint">
              <strong>{form.name || "Your Name"}</strong>
              Click to upload photo
            </div>
          </div>

          {/* TOGGLE */}
          <div className="toggle-bar">
            <button
              className={`toggle-btn ${mode === "edit" ? "active" : ""}`}
              onClick={() => setMode("edit")}
            >
              Edit Profile
            </button>
            <button
              className={`toggle-btn ${mode === "preview" ? "active" : ""}`}
              onClick={() => setMode("preview")}
            >
              Preview Card
            </button>
          </div>

          {/* EDIT MODE */}
          {mode === "edit" ? (
            <div className="edit-grid">
              {/* LEFT */}
              <div className="left-col">
                {/* Basic Details */}
                <div className="card">
                  <p className="card-title">Basic Details</p>
                  <div className="input-row">
                    <input
                      className="field-input"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Full name"
                    />
                    <input
                      className="field-input"
                      name="city"
                      value={form.city}
                      onChange={handleChange}
                      placeholder="City"
                    />
                    <input
                      className="field-input"
                      name="age"
                      value={form.age}
                      onChange={handleChange}
                      placeholder="Age"
                    />
                    <input
                      className="field-input"
                      name="gender"
                      value={form.gender}
                      onChange={handleChange}
                      placeholder="Gender"
                    />
                  </div>
                </div>

                {/* About */}
                <div className="card">
                  <div className="card-title-row">
                    <p className="card-title" style={{ margin: 0 }}>
                      About You
                    </p>
                    <button
                      className="refine-btn"
                      onClick={() => router.push("/questionnaire")}
                    >
                      Refine Compatibility →
                    </button>
                  </div>
                  <textarea
                    className="field-textarea field-input"
                    name="bio"
                    value={form.bio}
                    onChange={handleChange}
                    placeholder="Tell people about yourself..."
                  />
                </div>

                {/* Housing */}
                <div className="card">
                  <p className="card-title">Housing Preferences</p>
                  <input
                    className="field-input"
                    name="locality"
                    value={form.locality}
                    onChange={handleChange}
                    placeholder="Preferred locality"
                  />
                </div>
              </div>

              {/* RIGHT */}
              <div className="right-col">
                <div className="card">
                  <p className="card-title">Lifestyle</p>

                  <p className="lifestyle-label">Smoking</p>
                  <div className="select-wrap">
                    <select
                      className="field-select field-input"
                      name="smoking"
                      value={form.smoking}
                      onChange={handleChange}
                    >
                      <option value="">Select</option>
                      {["No", "Occasionally", "Yes"].map((o) => (
                        <option key={o}>{o}</option>
                      ))}
                    </select>
                  </div>

                  <p className="lifestyle-label">Drinking</p>
                  <div className="select-wrap">
                    <select
                      className="field-select field-input"
                      name="drinking"
                      value={form.drinking}
                      onChange={handleChange}
                    >
                      <option value="">Select</option>
                      {["No", "Occasionally", "Yes"].map((o) => (
                        <option key={o}>{o}</option>
                      ))}
                    </select>
                  </div>

                  <p className="lifestyle-label">Pets</p>
                  <div className="select-wrap">
                    <select
                      className="field-select field-input"
                      name="pets"
                      value={form.pets}
                      onChange={handleChange}
                    >
                      <option value="">Select</option>
                      {["No", "Occasionally", "Yes"].map((o) => (
                        <option key={o}>{o}</option>
                      ))}
                    </select>
                  </div>

                  <p className="lifestyle-label">Sleep Schedule</p>
                  <div className="select-wrap">
                    <select
                      className="field-select field-input"
                      name="sleepSchedule"
                      value={form.sleepSchedule}
                      onChange={handleChange}
                    >
                      <option value="">Select</option>
                      {["Early Bird", "Night Owl"].map((o) => (
                        <option key={o}>{o}</option>
                      ))}
                    </select>
                  </div>

                  <p className="lifestyle-label">Cleanliness</p>
                  <div className="select-wrap">
                    <select
                      className="field-select field-input"
                      name="cleanliness"
                      value={form.cleanliness}
                      onChange={handleChange}
                    >
                      <option value="">Select</option>
                      {["Low", "Medium", "High"].map((o) => (
                        <option key={o}>{o}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {success && (
                  <div className="alert alert-success">{success}</div>
                )}
                {error && <div className="alert alert-error">{error}</div>}

                <button
                  className="save-btn"
                  onClick={saveProfile}
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Save & Preview →"}
                </button>
              </div>
            </div>
          ) : (
            /* PREVIEW MODE — SWIPE CARD */
            <div className="preview-scene">
              <p className="preview-scene-label">How you appear to others</p>

              <div className="swipe-stack">
                <div className="swipe-card">
                  {/* Image / Avatar area */}
                  <div className="swipe-card-image">
                    {form.profileImage ? (
                      <img src={form.profileImage} alt={form.name} />
                    ) : (
                      <div className="swipe-card-avatar">
                        <span className="swipe-card-avatar-letter">
                          {form.name?.[0] || "?"}
                        </span>
                      </div>
                    )}
                    <div className="swipe-card-gradient" />
                  </div>

                  {/* Card body */}
                  <div className="swipe-card-body">
                    <div className="swipe-name-row">
                      <h2 className="swipe-name">{form.name || "Your Name"}</h2>
                      <span className="swipe-age-gender">
                        {form.age || "--"} · {form.gender || "--"}
                      </span>
                    </div>

                    {(form.city || form.locality) && (
                      <p className="swipe-location">
                        {[form.locality, form.city].filter(Boolean).join(", ")}
                      </p>
                    )}

                    {form.bio && <p className="swipe-bio">{form.bio}</p>}

                    <div className="swipe-tags">
                      {form.smoking && (
                        <span className="swipe-tag">🚬 {form.smoking}</span>
                      )}
                      {form.drinking && (
                        <span className="swipe-tag">🍷 {form.drinking}</span>
                      )}
                      {form.pets && (
                        <span className="swipe-tag">🐾 {form.pets}</span>
                      )}
                      {form.sleepSchedule && (
                        <span className="swipe-tag">
                          🌙 {form.sleepSchedule}
                        </span>
                      )}
                      {form.cleanliness && (
                        <span className="swipe-tag">✨ {form.cleanliness}</span>
                      )}
                    </div>
                  </div>

                  {/* Match bar */}
                  <div className="match-bar">
                    <span className="match-bar-label">Match</span>
                    <div className="match-bar-track">
                      <div className="match-bar-fill" />
                    </div>
                    <span className="match-pct">--%</span>
                  </div>
                </div>
              </div>

              {/* Swipe action buttons */}
              <div className="swipe-actions">
                <button className="action-btn skip" title="Skip">
                  ✕
                </button>
                <button className="action-btn" title="Super like">
                  ⭐
                </button>
                <button className="action-btn like" title="Like">
                  ♥
                </button>
              </div>

              <p className="preview-hint">
                This is how your card appears when others browse roommates
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
