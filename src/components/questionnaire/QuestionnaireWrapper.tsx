"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ProgressBar from "./ProgressBar";
import QuestionSlider from "./QuestionSlider";
import Section from "./Section";
import DealBreaker from "./DealBreaker";
import { AnimatePresence } from "framer-motion";

// FULL QUESTION LIST (mapped to schema)

const questions = [
  // Behavior
  {
    section: "behavior",
    key: "conflictHandling",
    q: "I address conflicts directly",
  },
  { section: "behavior", key: "communication", q: "I communicate openly" },
  {
    section: "behavior",
    key: "interactionInitiation",
    q: "I initiate conversations",
  },
  { section: "behavior", key: "independence", q: "I prefer independence" },
  { section: "behavior", key: "privacyNeed", q: "I need personal space daily" },

  // Behavior Tolerance
  {
    section: "behaviorTolerance",
    key: "conflictDelay",
    q: "I am okay with someone avoiding conflicts",
  },
  {
    section: "behaviorTolerance",
    key: "communicationDifference",
    q: "I am okay with different communication styles",
  },
  {
    section: "behaviorTolerance",
    key: "talkativeDifference",
    q: "I am okay with talkative differences",
  },
  {
    section: "behaviorTolerance",
    key: "minimalInteraction",
    q: "I am okay with minimal interaction",
  },
  {
    section: "behaviorTolerance",
    key: "spaceDifference",
    q: "I am okay with different space needs",
  },

  // Cleanliness
  {
    section: "cleanliness",
    key: "personalCleaning",
    q: "I clean my personal space regularly",
  },
  {
    section: "cleanliness",
    key: "sharedCleaning",
    q: "I clean shared spaces after use",
  },
  { section: "cleanliness", key: "dishes", q: "I wash dishes immediately" },
  {
    section: "cleanliness",
    key: "organization",
    q: "I keep shared areas organized",
  },
  {
    section: "cleanliness",
    key: "choresWithoutReminder",
    q: "I complete chores without reminders",
  },

  // Cleanliness Tolerance
  {
    section: "cleanlinessTolerance",
    key: "cleaningLess",
    q: "I am okay with someone cleaning less",
  },
  {
    section: "cleanlinessTolerance",
    key: "lessContribution",
    q: "I am okay with uneven cleaning contribution",
  },
  {
    section: "cleanlinessTolerance",
    key: "dishesLater",
    q: "I am okay with dishes being left for later",
  },
  {
    section: "cleanlinessTolerance",
    key: "disorganized",
    q: "I am okay with disorganized spaces",
  },
  {
    section: "cleanlinessTolerance",
    key: "remindersNeeded",
    q: "I am okay with someone needing reminders",
  },

  // Lifestyle
  { section: "lifestyle", key: "socialOutings", q: "I go out socially" },
  { section: "lifestyle", key: "routine", q: "I follow a fixed routine" },
  { section: "lifestyle", key: "workFromHome", q: "I work or study from home" },
  {
    section: "lifestyle",
    key: "hobbies",
    q: "I engage in hobbies outside home",
  },
  {
    section: "lifestyle",
    key: "quietPreference",
    q: "I prefer staying at home",
  },

  // Lifestyle Tolerance
  {
    section: "lifestyleTolerance",
    key: "frequentOutings",
    q: "I am okay with frequent outings",
  },
  {
    section: "lifestyleTolerance",
    key: "irregularRoutine",
    q: "I am okay with irregular routines",
  },
  {
    section: "lifestyleTolerance",
    key: "wfh",
    q: "I am okay with a work-from-home roommate",
  },
  {
    section: "lifestyleTolerance",
    key: "activityDifference",
    q: "I am okay with different activity levels",
  },
  {
    section: "lifestyleTolerance",
    key: "homePreference",
    q: "I am okay with someone staying home often",
  },

  // Sleep
  { section: "sleep", key: "earlySleep", q: "I sleep early" },
  { section: "sleep", key: "earlyWake", q: "I wake early" },
  { section: "sleep", key: "noiseSensitive", q: "Noise affects my sleep" },
  { section: "sleep", key: "alarms", q: "I use alarms" },
  {
    section: "sleep",
    key: "lateNightActivity",
    q: "I stay active late at night",
  },

  // Sleep Tolerance
  {
    section: "sleepTolerance",
    key: "differentSchedule",
    q: "I am okay with different sleep schedules",
  },
  {
    section: "sleepTolerance",
    key: "nightNoise",
    q: "I am okay with noise at night",
  },
  {
    section: "sleepTolerance",
    key: "loudAlarms",
    q: "I am okay with loud alarms",
  },
  {
    section: "sleepTolerance",
    key: "nightActivity",
    q: "I am okay with night activity",
  },
  {
    section: "sleepTolerance",
    key: "lightUsage",
    q: "I am okay with light/screens during sleep",
  },

  // Boundaries
  { section: "boundaries", key: "guests", q: "I invite guests" },
  {
    section: "boundaries",
    key: "overnightGuests",
    q: "I host overnight guests",
  },
  { section: "boundaries", key: "sharingItems", q: "I share items" },
  { section: "boundaries", key: "payments", q: "I pay bills on time" },
  {
    section: "boundaries",
    key: "spaceUsage",
    q: "I use shared spaces frequently",
  },

  // Boundaries Tolerance
  {
    section: "boundariesTolerance",
    key: "frequentGuests",
    q: "I am okay with frequent guests",
  },
  {
    section: "boundariesTolerance",
    key: "overnight",
    q: "I am okay with overnight guests",
  },
  {
    section: "boundariesTolerance",
    key: "sharing",
    q: "I am okay sharing items",
  },
  {
    section: "boundariesTolerance",
    key: "latePayments",
    q: "I am okay with late payments",
  },
];

const QUESTIONS_PER_PAGE = 5;

export default function QuestionnaireWrapper() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [data, setData] = useState<any>({
    behavior: {},
    behaviorTolerance: {},
    cleanliness: {},
    cleanlinessTolerance: {},
    lifestyle: {},
    lifestyleTolerance: {},
    sleep: {},
    sleepTolerance: {},
    boundaries: {},
    boundariesTolerance: {},
    dealBreakers: [],
  });

  const totalSteps = Math.ceil(questions.length / QUESTIONS_PER_PAGE) + 1;

  //  PREFILL (SAFE)
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/questionnaire", {
        credentials: "include",
      });

      if (res.status === 401) return;

      const result = await res.json();

      if (result.success && result.data) {
        setData((prev: any) => ({
          ...prev,
          ...result.data,
        }));
      }
    };

    fetchData();
  }, []);

  const update = (section: string, key: string, value: number) => {
    setData((prev: any) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
  };

  const start = step * QUESTIONS_PER_PAGE;
  const currentQuestions = questions.slice(start, start + QUESTIONS_PER_PAGE);

  const handleNext = () => {
    setStep((prev) => prev + 1);

    const container = document.querySelector(".form-scroll");

    if (container) {
      container.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };
  const handleBack = () => {
    setStep((prev) => {
      const newStep = Math.max(0, prev - 1);

      setTimeout(() => {
        const container = document.querySelector(".form-scroll");
        if (container) {
          container.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }
      }, 0);

      return newStep;
    });
  };
  const handleSubmit = async () => {
    const res = await fetch("/api/questionnaire", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.status === 401) {
      alert("Login required");
      return;
    }

    router.push("/find-roommate");
  };

  return (
    <div className="w-full px-2 md:px-0">
      <ProgressBar step={step} total={totalSteps} />

      <AnimatePresence mode="wait" initial={false}>
        <Section key={`step-${step}`}>
          <div className="form-scroll max-h-[65vh] overflow-y-auto pr-2 smooth-scroll">
            {step < totalSteps - 1 ? (
              <>
                <p className="text-xs text-gray-400 mb-6 uppercase tracking-wider">
                  {questions[start]?.section}
                </p>
                {currentQuestions.map((q, index) => (
                  <QuestionSlider
                    key={index}
                    question={q.q}
                    value={data?.[q.section]?.[q.key] || 3}
                    onChange={(v: number) => update(q.section, q.key, v)}
                  />
                ))}
              </>
            ) : (
              <>
                <h2 className="text-white text-xl mb-4">Deal Breakers</h2>

                <DealBreaker
                  selected={data.dealBreakers}
                  setSelected={(val: any) =>
                    setData({ ...data, dealBreakers: val })
                  }
                />
              </>
            )}
          </div>
        </Section>
      </AnimatePresence>

      <div className="flex justify-between mt-8">
        <button
          onClick={handleBack}
          disabled={step === 0}
          className="px-4 py-2 bg-white/10 text-white rounded-lg"
        >
          Back
        </button>

        {step < totalSteps - 1 ? (
          <button
            onClick={handleNext}
            className="px-6 py-2 bg-[#bd7880] rounded-lg"
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-red-950 text-white rounded-lg hover:bg-red-900 transition"
          >
            Finish
          </button>
        )}
      </div>
    </div>
  );
}
