import mongoose from "mongoose"

const LessonSchema = new mongoose.Schema({
  courseId: { type: String, required: true },
  weekId: { type: Number, required: true },
  lessonId: { type: Number, required: true },
  title: { type: String, default: "" },
  content: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})

export const Lesson = mongoose.models.Lesson || mongoose.model("Lesson", LessonSchema)