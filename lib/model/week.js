import mongoose from "mongoose"

const weekSchema = new mongoose.Schema({
  courseId: { type: String, required: true },
  weekId: { type: Number, required: true },
  slug: { type: String, required: true },
  title: { type: String },
  description: { type: String },
  lessonCount: { type: Number, default: 0 },
  lessonList: {
    type: [
      {
        id: String,
        title: String,
      },
    ],
    default: [],
  },
  createdAt: { type: String, default: () => new Date().toISOString().split("T")[0] },
  updatedAt: { type: String, default: () => new Date().toISOString().split("T")[0] },
})

export const Week = mongoose.models.Week || mongoose.model("Week", weekSchema)
