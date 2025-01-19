import mongoose from "mongoose";

const CourseContentSchema = new mongoose.Schema({
  courseId: { type: String, required: true },
  lessonId: { type: String, required: true },
  title: { type: String, required: true },
  timeEstimate: { type: String, required: true },
  content: { type: String, required: true },
}, { collection: "courseContent" });

export const CourseContent = mongoose.models.courseContent || mongoose.model("courseContent", CourseContentSchema);

