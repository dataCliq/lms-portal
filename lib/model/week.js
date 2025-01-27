import mongoose from "mongoose"

const lessonSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    id: { type: String, required: true },
  },
  { _id: false },
)

const weekSchema = new mongoose.Schema(
  {
    weekId: { type: Number, required: true },
    courseId: { type: String, required: true },
    lessonCount: { type: Number, required: true },
    slug: { type: String, required: true },
    lessonList: [lessonSchema], // Array of lesson objects
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    collection: "Week", // Explicitly set the collection name
    strict: false, // Allow undefined fields
  },
)

export const Week = mongoose.models.Week || mongoose.model("Week", weekSchema)

