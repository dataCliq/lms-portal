import mongoose from "mongoose";

const LessonSchema = new mongoose.Schema(
  {
    weekId: { type: Number, required: true },
    courseId: { type: String, required: true },
    lessonId: { type: String, required: true },
    slug: { type: String, required: true },
    name: { type: String, required: true },
    content: { type: String, required: true },
    videoUrl: { type: String, default: null },
    attachments: { type: mongoose.Schema.Types.Mixed, default: null },
    createdAt: { type: String },
    updatedAt: { type: String },
  },
  { versionKey: false }
);

export const Lesson = mongoose.models.Lesson || mongoose.model("Lesson", LessonSchema, "Lesson");