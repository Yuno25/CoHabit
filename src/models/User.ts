import mongoose, { Schema, models, model } from "mongoose";

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },
    dob: {
      type: String,
      required: true,
    },

    contact: {
      type: String,
      required: true,
    },

    gender: {
      type: String,
      required: true,
    },

    userType: {
      type: String,
      enum: ["college", "flat"],
    },

    profileCompleted: {
      type: Boolean,
      default: false,
    },

    /* ---------------- PROFILE INFO ---------------- */

    age: {
      type: Number,
    },

    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },

    occupation: {
      type: String,
    },

    college: {
      type: String,
    },

    company: {
      type: String,
    },

    bio: {
      type: String,
    },

    /* ---------------- LOCATION ---------------- */

    city: {
      type: String,
    },

    locality: {
      type: String,
    },

    /* ---------------- HOUSING ---------------- */

    budget: {
      type: Number,
    },

    /* ---------------- LIFESTYLE ---------------- */

    smoking: {
      type: String,
      enum: ["no", "occasionally", "yes"],
    },

    drinking: {
      type: String,
      enum: ["no", "occasionally", "yes"],
    },

    pets: {
      type: String,
      enum: ["no", "yes"],
    },

    sleepSchedule: {
      type: String,
      enum: ["early_bird", "night_owl"],
    },

    cleanliness: {
      type: String,
      enum: ["low", "medium", "high"],
    },
  },
  { timestamps: true },
);

const User = models.User || model("User", UserSchema);

export default User;
