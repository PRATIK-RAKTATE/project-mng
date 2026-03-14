import mongoose from "mongoose";

const slotSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    startTime: {
      type: String,
      required: true
    },
    endTime: {
      type: String,
      required: true
    },
    activeDays: {
      type: [Number],
      default: [0, 1, 2, 3, 4, 5, 6]
    },
    order: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

export default mongoose.model("Slot", slotSchema);