import { Schema, model } from "mongoose";

const taskSchema = Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    dateEnd: {
      type: Date,
      default: Date.now(),
    },
    status: {
      type: Boolean,
      default: false,
      required: true,
    },
    priority: {
      type: String,
      required: true,
      enum: ["Alta", "Media", "Baja"],
    },
    project: {
      type: Schema.Types.ObjectId,
      ref: "Project",
    },
  },
  {
    timestamps: true,
  }
);

const Task = model("Task", taskSchema);
export default Task;
