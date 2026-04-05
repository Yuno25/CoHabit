import mongoose from "mongoose";

const numberField = {
  type: Number,
  min: 1,
  max: 5,
  default: 3,
};

const QuestionnaireSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true,
    },

    username: String,

    behavior: {
      conflictHandling: numberField,
      communication: numberField,
      interactionInitiation: numberField,
      independence: numberField,
      privacyNeed: numberField,
    },

    behaviorTolerance: {
      conflictDelay: numberField,
      communicationDifference: numberField,
      talkativeDifference: numberField,
      minimalInteraction: numberField,
      spaceDifference: numberField,
    },

    cleanliness: {
      personalCleaning: numberField,
      sharedCleaning: numberField,
      dishes: numberField,
      organization: numberField,
      choresWithoutReminder: numberField,
    },

    cleanlinessTolerance: {
      cleaningLess: numberField,
      lessContribution: numberField,
      dishesLater: numberField,
      disorganized: numberField,
      remindersNeeded: numberField,
    },

    lifestyle: {
      socialOutings: numberField,
      routine: numberField,
      workFromHome: numberField,
      hobbies: numberField,
      quietPreference: numberField,
    },

    lifestyleTolerance: {
      frequentOutings: numberField,
      irregularRoutine: numberField,
      wfh: numberField,
      activityDifference: numberField,
      homePreference: numberField,
    },

    sleep: {
      earlySleep: numberField,
      earlyWake: numberField,
      noiseSensitive: numberField,
      alarms: numberField,
      lateNightActivity: numberField,
    },

    sleepTolerance: {
      differentSchedule: numberField,
      nightNoise: numberField,
      loudAlarms: numberField,
      nightActivity: numberField,
      lightUsage: numberField,
    },

    boundaries: {
      guests: numberField,
      overnightGuests: numberField,
      sharingItems: numberField,
      payments: numberField,
      spaceUsage: numberField,
    },

    boundariesTolerance: {
      frequentGuests: numberField,
      overnight: numberField,
      sharing: numberField,
      latePayments: numberField,
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
