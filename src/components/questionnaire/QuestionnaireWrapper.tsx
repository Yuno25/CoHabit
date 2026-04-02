"use client";

import { useState, useEffect } from "react";
import ProgressBar from "./ProgressBar";
import QuestionSlider from "./QuestionSlider";
import Section from "./Section";
import DealBreaker from "./DealBreaker";
import { AnimatePresence } from "framer-motion";

export default function QuestionnaireWrapper() {
  const [step, setStep] = useState(0);

  const [data, setData] = useState<any>({
    behavior: {},
    cleanliness: {},
    lifestyle: {},
    sleep: {},
    boundaries: {},
    dealBreakers: [],
  });

  const update = (section: string, key: string, value: number) => {
    setData((prev: any) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
  };

  const totalSteps = 6;

  // ✅ PREFILL DATA
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/questionnaire", {
        credentials: "include", // 🔥 FIX
      });

      if (res.status === 401) return;

      const result = await res.json();

      if (result.success && result.data) {
        setData(result.data);
      }
    };

    fetchData();
  }, []);

  // ✅ SUBMIT
  const handleSubmit = async () => {
    const res = await fetch("/api/questionnaire", {
      method: "POST",
      credentials: "include", // 🔥 FIX
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (res.status === 401) {
      alert("Please login first");
      window.location.href = "/login";
      return;
    }

    alert("Saved successfully!");
  };

  return (
    <div className="w-full">
      <ProgressBar step={step} total={totalSteps} />

      <AnimatePresence mode="wait">
        <Section key={step}>
          {/* STEP 1 */}
          {step === 0 && (
            <>
              <h2 className="text-white text-2xl font-semibold mb-6">
                Behavior
              </h2>

              <QuestionSlider
                question="I address conflicts directly"
                value={data.behavior.conflictHandling || 0}
                onChange={(v) => update("behavior", "conflictHandling", v)}
              />

              <QuestionSlider
                question="I communicate openly"
                value={data.behavior.communication || 0}
                onChange={(v) => update("behavior", "communication", v)}
              />
            </>
          )}

          {/* STEP 2 */}
          {step === 1 && (
            <>
              <h2 className="text-white text-2xl font-semibold mb-6">
                Cleanliness
              </h2>

              <QuestionSlider
                question="I clean my personal space regularly"
                value={data.cleanliness.personalCleaning || 0}
                onChange={(v) => update("cleanliness", "personalCleaning", v)}
              />

              <QuestionSlider
                question="I clean shared spaces after use"
                value={data.cleanliness.sharedCleaning || 0}
                onChange={(v) => update("cleanliness", "sharedCleaning", v)}
              />
            </>
          )}

          {/* STEP 3 */}
          {step === 2 && (
            <>
              <h2 className="text-white text-2xl font-semibold mb-6">
                Lifestyle
              </h2>

              <QuestionSlider
                question="I go out socially"
                value={data.lifestyle.socialOutings || 0}
                onChange={(v) => update("lifestyle", "socialOutings", v)}
              />

              <QuestionSlider
                question="I follow a fixed routine"
                value={data.lifestyle.routine || 0}
                onChange={(v) => update("lifestyle", "routine", v)}
              />
            </>
          )}

          {/* STEP 4 */}
          {step === 3 && (
            <>
              <h2 className="text-white text-2xl font-semibold mb-6">Sleep</h2>

              <QuestionSlider
                question="I wake up early"
                value={data.sleep.earlyWake || 0}
                onChange={(v) => update("sleep", "earlyWake", v)}
              />

              <QuestionSlider
                question="Noise disturbs my sleep"
                value={data.sleep.noiseSensitive || 0}
                onChange={(v) => update("sleep", "noiseSensitive", v)}
              />
            </>
          )}

          {/* STEP 5 */}
          {step === 4 && (
            <>
              <h2 className="text-white text-2xl font-semibold mb-6">
                Boundaries
              </h2>

              <QuestionSlider
                question="I invite guests"
                value={data.boundaries.guests || 0}
                onChange={(v) => update("boundaries", "guests", v)}
              />

              <QuestionSlider
                question="I share personal items"
                value={data.boundaries.sharingItems || 0}
                onChange={(v) => update("boundaries", "sharingItems", v)}
              />
            </>
          )}

          {/* STEP 6 */}
          {step === 5 && (
            <>
              <h2 className="text-white text-2xl font-semibold mb-6">
                Deal Breakers
              </h2>

              <DealBreaker
                selected={data.dealBreakers}
                setSelected={(val: any) =>
                  setData({ ...data, dealBreakers: val })
                }
              />
            </>
          )}
        </Section>
      </AnimatePresence>

      <div className="flex justify-between mt-8">
        <button
          onClick={() => setStep((s) => s - 1)}
          disabled={step === 0}
          className="px-5 py-2 bg-white/10 text-white rounded-lg"
        >
          Back
        </button>

        {step < totalSteps - 1 ? (
          <button
            onClick={() => setStep((s) => s + 1)}
            className="px-6 py-2 bg-[#bd7880] text-white rounded-lg"
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-green-600 text-white rounded-lg"
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
}
