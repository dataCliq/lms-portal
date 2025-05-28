import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema({
  courseId: { type: String, required: true },
  weekId: { type: Number, required: true },
  lessonId: { type: String, required: true },
  slug: { type: String, required: true },
  title: { type: String }, // Added to match API
  name: { type: String },  // Retained for compatibility with database
  subtitle: { type: String },
  content: { type: String },
  videoUrl: { type: String },
  attachments: [{ url: String, name: String, type: String }],
  interviewQuestions: {
    type: [
      {
        question: String,
        answer: String,
      },
    ],
    default: [],
  },
  resources: {
    type: [
      {
        title: String,
        url: String,
        type: {
          type: String,
          enum: ["link", "pdf", "video"],
          default: "link",
        },
      },
    ],
    default: [],
  },
  createdAt: {
    type: String,
    default: () => new Date().toISOString().split("T")[0],
  },
  updatedAt: {
    type: String,
    default: () => new Date().toISOString().split("T")[0],
  },
});

export const Lesson = mongoose.models.Lesson || mongoose.model("Lesson", lessonSchema);