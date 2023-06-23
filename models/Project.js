import { Schema, model } from "mongoose";

const projectSchema = Schema(
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
    client: {
      type: String,
      trim: true,
      required: true,
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    collaborators: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Project = model("Project", projectSchema);
export default Project;
