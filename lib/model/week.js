import mongoose from "mongoose"

const WeekSchema = new mongoose.Schema({
  courseId: { type: String, required: true },
  weekId: { type: Number, required: true },
  slug: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String },
  lessonCount: { type: Number, default: 0 },
  lessonList: { type: Array, default: [] },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

// Create a compound index for courseId and weekId
WeekSchema.index({ courseId: 1, weekId: 1 }, { unique: true })
// Create a compound index for courseId and slug
WeekSchema.index({ courseId: 1, slug: 1 }, { unique: true })

export const Week = mongoose.models.Week || mongoose.model("Week", WeekSchema)
