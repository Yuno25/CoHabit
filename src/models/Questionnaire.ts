import mongoose from "mongoose";

const QuestionnaireSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, //ensures one per user
      index: true,
    },

    username: {
      type: String,
    },

    behavior: {
      conflictHandling: { type: Number, default: 0 },
      communication: { type: Number, default: 0 },
      interactionInitiation: { type: Number, default: 0 },
      independence: { type: Number, default: 0 },
      privacyNeed: { type: Number, default: 0 },
    },

    behaviorTolerance: {
      conflictDelay: { type: Number, default: 0 },
      communicationDifference: { type: Number, default: 0 },
      talkativeDifference: { type: Number, default: 0 },
      minimalInteraction: { type: Number, default: 0 },
      spaceDifference: { type: Number, default: 0 },
    },

    cleanliness: {
      personalCleaning: { type: Number, default: 0 },
      sharedCleaning: { type: Number, default: 0 },
      dishes: { type: Number, default: 0 },
      organization: { type: Number, default: 0 },
      choresWithoutReminder: { type: Number, default: 0 },
    },

    cleanlinessTolerance: {
      cleaningLess: { type: Number, default: 0 },
      lessContribution: { type: Number, default: 0 },
      dishesLater: { type: Number, default: 0 },
      disorganized: { type: Number, default: 0 },
      remindersNeeded: { type: Number, default: 0 },
    },

    lifestyle: {
      socialOutings: { type: Number, default: 0 },
      routine: { type: Number, default: 0 },
      workFromHome: { type: Number, default: 0 },
      hobbies: { type: Number, default: 0 },
      quietPreference: { type: Number, default: 0 },
    },

    lifestyleTolerance: {
      frequentOutings: { type: Number, default: 0 },
      irregularRoutine: { type: Number, default: 0 },
      wfh: { type: Number, default: 0 },
      activityDifference: { type: Number, default: 0 },
      homePreference: { type: Number, default: 0 },
    },

    sleep: {
      earlySleep: { type: Number, default: 0 },
      earlyWake: { type: Number, default: 0 },
      noiseSensitive: { type: Number, default: 0 },
      alarms: { type: Number, default: 0 },
      lateNightActivity: { type: Number, default: 0 },
    },

    sleepTolerance: {
      differentSchedule: { type: Number, default: 0 },
      nightNoise: { type: Number, default: 0 },
      loudAlarms: { type: Number, default: 0 },
      nightActivity: { type: Number, default: 0 },
      lightUsage: { type: Number, default: 0 },
    },

    boundaries: {
      guests: { type: Number, default: 0 },
      overnightGuests: { type: Number, default: 0 },
      sharingItems: { type: Number, default: 0 },
      payments: { type: Number, default: 0 },
      spaceUsage: { type: Number, default: 0 },
    },

    boundariesTolerance: {
      frequentGuests: { type: Number, default: 0 },
      overnight: { type: Number, default: 0 },
      sharing: { type: Number, default: 0 },
      latePayments: { type: Number, default: 0 },
    },

    dealBreakers: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true },
);

export default mongoose.models.Questionnaire ||
  mongoose.model("Questionnaire", QuestionnaireSchema);
