import mongoose from "mongoose";

export const Url = mongoose.model(
  "Url",
  new mongoose.Schema({
    long: {
      type: String,
      required: true
    },
    short: {
      type: String,
      required: true
    },
    code: {
      type: String,
      required: true,
      unique: true
    }
  })
);
