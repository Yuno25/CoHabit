"use client";

import { useEffect, useState } from "react";

function getLabel(match: number) {
  if (match >= 85) return "Perfect Match 🎯";
  if (match >= 70) return "Great Match ✨";
  if (match >= 50) return "Decent Match 👍";
  return "Low Match";
}

export default function FindRoommate() {
  const [matches, setMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const res = await fetch("/api/match", { credentials: "include" });
        if (!res.ok) throw new Error("Failed to fetch matches");
        const data = await res.json();
        console.log("API RESPONSE:", data);
        setMatches(data.matches || []);
      } catch (err: any) {
        console.error(err);
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchMatches();
  }, []);

  /* ── UI STATES ── */

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        className="find-root"
      >
        <p
          style={{
            color: "rgba(255,255,255,0.5)",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          Finding your matches...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        className="find-root"
      >
        <p style={{ color: "#fca5a5", fontFamily: "'DM Sans', sans-serif" }}>
          {error}
        </p>
      </div>
    );
  }

  const user = matches[current] ?? null;

  const handleSkip = () => {
    if (current < matches.length - 1) setCurrent((c) => c + 1);
  };

  const handleLike = () => {
    if (current < matches.length - 1) setCurrent((c) => c + 1);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');

        .find-root {
          min-height: 100vh;
          padding: 96px 24px 80px;
          background: linear-gradient(to bottom right, #56010b, #560202, #bf7880);
          font-family: 'DM Sans', sans-serif;
        }

        .find-inner {
          max-width: 1100px;
          margin: 0 auto;
        }

        .find-header {
          margin-bottom: 32px;
        }

        .find-header h1 {
          font-family: 'DM Serif Display', serif;
          font-size: 2.4rem;
          color: #fff;
          margin: 0 0 4px;
          letter-spacing: -0.5px;
        }

        .find-header p {
          color: rgba(255,255,255,0.7);
          font-size: 0.95rem;
          font-weight: 300;
          margin: 0;
        }

        /* ── EMPTY STATE ── */
        .empty-state {
          text-align: center;
          margin-top: 80px;
        }

        .empty-state p {
          color: rgba(255,255,255,0.5);
          font-size: 1rem;
        }

        /* ── LAYOUT ── */
        .find-layout {
          display: grid;
          grid-template-columns: 380px 1fr;
          gap: 32px;
          align-items: start;
        }

        @media (max-width: 768px) {
          .find-layout { grid-template-columns: 1fr; }
          .find-header h1 { font-size: 1.8rem; }
        }

        /* ── SWIPE STACK ── */
        .swipe-stack {
          position: relative;
          width: 340px;
          height: 520px;
          margin-bottom: 24px;
        }

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
          bottom: 0; left: 0; right: 0;
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
          font-size: 0.8rem;
          color: rgba(255,255,255,0.4);
        }

        .swipe-location::before { content: '📍 '; }

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
          background: rgba(255,255,255,0.5);
          border-radius: 2px;
          transition: width 0.5s ease;
        }

        .match-pct {
          font-size: 0.8rem;
          font-weight: 600;
          color: rgba(255,255,255,0.6);
          min-width: 36px;
          text-align: right;
        }

        /* SWIPE ACTIONS */
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
        .action-btn.like  { background: rgba(100,0,20,0.7); }
        .action-btn.like:hover { background: rgba(120,0,25,0.9); }

        .counter-hint {
          font-size: 0.75rem;
          color: rgba(255,255,255,0.2);
          text-align: center;
          margin-top: 12px;
          font-style: italic;
        }

        /* ── RIGHT PANEL ── */
        .right-panel {
          display: flex;
          flex-direction: column;
          gap: 16px;
          padding-top: 8px;
        }

        .match-label-big {
          font-family: 'DM Serif Display', serif;
          font-size: 3rem;
          color: #fff;
          line-height: 1;
          margin: 0;
        }

        .match-sublabel {
          font-size: 0.85rem;
          color: rgba(255,255,255,0.5);
          margin: 4px 0 0;
        }

        .detail-card {
          background: rgba(60,0,10,0.55);
          border-radius: 20px;
          padding: 20px 24px;
        }

        .detail-card-title {
          font-family: 'DM Serif Display', serif;
          font-size: 1rem;
          color: #fff;
          margin: 0 0 14px;
        }

        .detail-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }

        .detail-item {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .detail-key {
          font-size: 0.68rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: rgba(255,255,255,0.3);
        }

        .detail-val {
          font-size: 0.85rem;
          color: rgba(255,255,255,0.8);
          font-weight: 500;
        }

        .view-btn {
          width: 100%;
          background: #4d0011;
          color: #fff;
          border: none;
          border-radius: 14px;
          padding: 13px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .view-btn:hover {
          background: #6a0018;
          transform: translateY(-1px);
        }

        /* MATCH LIST PILLS */
        .match-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .match-pill {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 16px;
          background: rgba(60,0,10,0.4);
          border-radius: 12px;
          cursor: pointer;
          transition: background 0.2s;
          border: none;
          width: 100%;
          text-align: left;
        }

        .match-pill:hover { background: rgba(60,0,10,0.7); }
        .match-pill.active { background: rgba(80,0,15,0.8); }

        .match-pill-name {
          font-size: 0.875rem;
          color: #fff;
          font-weight: 500;
          font-family: 'DM Sans', sans-serif;
        }

        .match-pill-pct {
          font-size: 0.8rem;
          font-weight: 600;
          color: rgba(255,255,255,0.55);
          font-family: 'DM Sans', sans-serif;
        }
      `}</style>

      <div className="find-root">
        <div className="find-inner">
          {/* HEADER */}
          <div className="find-header">
            <h1>Find Your Roommate</h1>
            <p>Matched based on your compatibility questionnaire</p>
          </div>

          {/* EMPTY */}
          {matches.length === 0 ? (
            <div className="empty-state">
              <p>No matches found 😕</p>
              <p style={{ fontSize: "0.85rem", marginTop: "8px" }}>
                Complete your questionnaire or wait for more users.
              </p>
            </div>
          ) : (
            <div className="find-layout">
              {/* LEFT — SWIPE CARD */}
              <div>
                <div className="swipe-stack">
                  <div className="swipe-card">
                    {/* Image / Avatar */}
                    <div className="swipe-card-image">
                      <div className="swipe-card-avatar">
                        <span className="swipe-card-avatar-letter">
                          {user?.name?.[0] || "?"}
                        </span>
                      </div>
                      <div className="swipe-card-gradient" />
                    </div>

                    {/* Body */}
                    <div className="swipe-card-body">
                      <div className="swipe-name-row">
                        <h2 className="swipe-name">{user?.name || "User"}</h2>
                        <span className="swipe-age-gender">
                          {user?.age || "--"} · {user?.gender || "--"}
                        </span>
                      </div>

                      {(user?.city || user?.locality) && (
                        <p className="swipe-location">
                          {[user?.locality, user?.city]
                            .filter(Boolean)
                            .join(", ")}
                        </p>
                      )}

                      {user?.bio && <p className="swipe-bio">{user.bio}</p>}

                      <div className="swipe-tags">
                        {user?.smoking && (
                          <span className="swipe-tag">🚬 {user.smoking}</span>
                        )}
                        {user?.drinking && (
                          <span className="swipe-tag">🍷 {user.drinking}</span>
                        )}
                        {user?.pets && (
                          <span className="swipe-tag">🐾 {user.pets}</span>
                        )}
                        {user?.sleepSchedule && (
                          <span className="swipe-tag">
                            🌙 {user.sleepSchedule}
                          </span>
                        )}
                        {user?.cleanliness && (
                          <span className="swipe-tag">
                            ✨ {user.cleanliness}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Match bar */}
                    <div className="match-bar">
                      <span className="match-bar-label">Match</span>
                      <div className="match-bar-track">
                        <div
                          className="match-bar-fill"
                          style={{ width: `${user?.match ?? 0}%` }}
                        />
                      </div>
                      <span className="match-pct">{user?.match ?? 0}%</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="swipe-actions">
                  <button
                    className="action-btn text-white"
                    onClick={handleSkip}
                    title="Skip"
                  >
                    ✕
                  </button>
                  <button className="action-btn" title="Super like">
                    ⭐
                  </button>
                  <button
                    className="action-btn like"
                    onClick={handleLike}
                    title="Like"
                  >
                    ✓
                  </button>
                </div>

                <p className="counter-hint">
                  {current + 1} of {matches.length} matches
                </p>
              </div>

              {/* RIGHT PANEL */}
              <div className="right-panel">
                {/* Big match % */}
                <div>
                  <p className="match-label-big">{user?.match ?? 0}%</p>
                  <p className="match-sublabel">{getLabel(user?.match ?? 0)}</p>
                </div>

                {/* Lifestyle details */}
                <div className="detail-card">
                  <p className="detail-card-title">Lifestyle Details</p>
                  <div className="detail-grid">
                    <div className="detail-item">
                      <span className="detail-key">Smoking</span>
                      <span className="detail-val">{user?.smoking || "—"}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-key">Drinking</span>
                      <span className="detail-val">
                        {user?.drinking || "—"}
                      </span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-key">Pets</span>
                      <span className="detail-val">{user?.pets || "—"}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-key">Sleep</span>
                      <span className="detail-val">
                        {user?.sleepSchedule || "—"}
                      </span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-key">Cleanliness</span>
                      <span className="detail-val">
                        {user?.cleanliness || "—"}
                      </span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-key">Location</span>
                      <span className="detail-val">
                        {[user?.locality, user?.city]
                          .filter(Boolean)
                          .join(", ") || "—"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* View profile button */}
                <button className="view-btn">View Full Profile</button>

                {/* All matches list */}
                <div className="detail-card">
                  <p className="detail-card-title">All Matches</p>
                  <div className="match-list">
                    {matches.map((m, i) => (
                      <button
                        key={i}
                        className={`match-pill ${i === current ? "active" : ""}`}
                        onClick={() => setCurrent(i)}
                      >
                        <span className="match-pill-name">{m.name}</span>
                        <span className="match-pill-pct">{m.match}%</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
