import mongoose from "mongoose"

const courseSchema = new mongoose.Schema(
  {
    title: String,
    rating: Number,
    weekCount: Number,
    courseId: String,
    slug: String,
    imageSrc: String,
    description: String,
    tags: [String],
    price: mongoose.Schema.Types.Mixed,
    createdAt: Date,
    updatedAt: Date,
  },
  {
    collection: "courseName",
    strict: false, 
  },
)

export const Courses = mongoose.models.courseName || mongoose.model("courseName", courseSchema)

