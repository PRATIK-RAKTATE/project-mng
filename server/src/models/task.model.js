import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      index: true
    },
    description: {
      type: String,
      default: ""
    },
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
      index: true
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high", "urgent"],
      default: "medium"
    },
    startDate: {
      type: String,
      required: true,
      index: true
    },
    endDate: {
      type: String,
      default: null
    },
    status: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending",
      index: true
    },
    slotId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Slot",
      default: null
    },
    completedAt: {
      type: Date,
      default: null
    },
    movedFromDate: {
      type: String,
      default: null
    },
    order: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

taskSchema.index({ title: "text", description: "text" });

export default mongoose.model("Task", taskSchema);