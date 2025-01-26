import mongoose from "mongoose"

const weekSchema = new mongoose.Schema(
  {
    weekId: Number,
    courseId: String,
    lessonCount: Number,
    slug: String,
    lessonList: [String],
    createdAt: Date,
    updatedAt: Date,
  },
  {
    collection: "Week", // Explicitly set the collection name
    strict: false, // This allows for fields in the database that are not defined in the schema
  },
)

export const Week = mongoose.models.Week || mongoose.model("Week", weekSchema)

