import mongoose from "mongoose"

const LessonSchema = new mongoose.Schema({
  courseId: { type: String, required: true },
  weekId: { type: Number, required: true },
  lessonId: { type: String, required: true },
  slug: { type: String, required: true },
  title: { type: String, required: true },
  name: { type: String },
  subtitle: { type: String },
  content: { type: String },
  videoUrl: { type: String },
  attachments: { type: mongoose.Schema.Types.Mixed },
  createdAt: { type: String, default: () => new Date().toISOString().split("T")[0] },
  updatedAt: { type: String, default: () => new Date().toISOString().split("T")[0] },
})

// Create compound indexes for uniqueness
LessonSchema.index({ courseId: 1, weekId: 1, lessonId: 1 }, { unique: true })
LessonSchema.index({ courseId: 1, weekId: 1, slug: 1 }, { unique: true })

// Pre-save middleware to ensure title and name are synchronized
LessonSchema.pre("save", function (next) {
  if (this.title && !this.name) {
    this.name = this.title
  } else if (this.name && !this.title) {
    this.title = this.name
  }
  next()
})

export const Lesson = mongoose.models.Lesson || mongoose.model("Lesson", LessonSchema)
