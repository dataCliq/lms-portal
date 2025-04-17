import mongoose from "mongoose"

const WeekSchema = new mongoose.Schema({
  courseId: { type: String, required: true },
  weekId: { type: Number, required: true },
  slug: { type: String, required: true },
  lessonCount: { type: Number, default: 0 },
  lessonList: [{ title: String, id: String }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})

export const Week = mongoose.models.Week || mongoose.model("Week", WeekSchema)