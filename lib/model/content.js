import mongoose from "mongoose"

const lessonSchema = new mongoose.Schema(
  {
    weekId: Number,
    courseId: String,
    lessonId: String,
    slug: String,
    name: String,
    content: String,
    videoUrl: String,
    attachments: String,
    createdAt: String,
    updatedAt: String,
  },
  {
    collection: "Lesson",
    strict: false,
  },
)

export const Lesson = mongoose.models.Lesson || mongoose.model("Lesson", lessonSchema)

