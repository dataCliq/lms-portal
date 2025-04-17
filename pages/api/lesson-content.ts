import mongoose from "mongoose"
import { connectionSrt } from "../../lib/db"
import type { NextApiRequest, NextApiResponse } from "next"

// Lesson Schema (CoursesData.Lesson)
const LessonSchema = new mongoose.Schema(
  {
    weekId: { type: Number, required: true },
    courseId: { type: String, required: true },
    lessonId: { type: String, required: true },
    slug: { type: String, required: true },
    name: { type: String, required: true },
    content: { type: String, required: true },
    videoUrl: { type: String, default: null },
    attachments: { type: mongoose.Schema.Types.Mixed, default: null },
    createdAt: { type: String },
    updatedAt: { type: String },
  },
  { versionKey: false },
)

// Ensure index for faster lookups and uniqueness
LessonSchema.index({ courseId: 1, weekId: 1, lessonId: 1 }, { unique: true })

const LessonModel = () => mongoose.models.Lesson || mongoose.model("Lesson", LessonSchema, "Lesson")

// Week Schema (CoursesData.Week)
const WeekSchema = new mongoose.Schema(
  {
    weekId: { type: Number, required: true },
    courseId: { type: String, required: true },
    lessonCount: { type: Number, default: 0 },
    slug: { type: String, required: true },
    title: { type: String, default: "" },
    lessonList: [{ title: String, id: String }],
    createdAt: { type: String },
    updatedAt: { type: String },
  },
  { versionKey: false },
)

// Ensure index for faster lookups and uniqueness
WeekSchema.index({ courseId: 1, weekId: 1 }, { unique: true })

const WeekModel = () => mongoose.models.Week || mongoose.model("Week", WeekSchema, "Week")

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let connection = null
  try {
    connection = await mongoose.connect(connectionSrt, {
      serverSelectionTimeoutMS: 5000,
    })
    console.log("Connected to MongoDB.")

    const Lesson = LessonModel()
    const Week = WeekModel()

    if (req.method === "GET") {
      const { courseId, weekId, lessonId, type } = req.query
      console.log("Query parameters:", { courseId, weekId, lessonId, type })

      if (type === "all" && courseId) {
        // Fetch all lessons for the course
        const lessons = await Lesson.find({ courseId }).sort({ weekId: 1 }).exec()
        console.log("Lessons fetched:", lessons)
        return res.status(200).json({ success: true, data: lessons })
      } else if (courseId && lessonId) {
        // Fetch a specific lesson by courseId and lessonId (weekId optional)
        const query: any = { courseId, lessonId }
        if (weekId) {
          query.weekId = Number(weekId)
        }
        const data = await Lesson.findOne(query)
        console.log("Data fetched:", data)
        if (data) {
          res.status(200).json({ success: true, data })
        } else {
          res.status(404).json({ success: false, message: "Lesson not found" })
        }
      } else {
        res.status(400).json({ success: false, message: "Missing required parameters" })
      }
    } else if (req.method === "POST") {
      const lessonData = req.body
      console.log("Received lesson data:", lessonData)

      // Validate required fields
      if (
        !lessonData.courseId ||
        !lessonData.weekId ||
        !lessonData.lessonId ||
        !lessonData.slug ||
        !lessonData.name ||
        !lessonData.content
      ) {
        return res.status(400).json({ success: false, message: "Missing required fields" })
      }

      // Check if the week exists
      const weekExists = await Week.findOne({
        courseId: lessonData.courseId,
        weekId: Number(lessonData.weekId),
      })

      if (!weekExists) {
        return res.status(404).json({
          success: false,
          message: `Week ${lessonData.weekId} not found for course ${lessonData.courseId}`,
        })
      }

      // Check if lesson already exists
      const existingLesson = await Lesson.findOne({
        courseId: lessonData.courseId,
        weekId: Number(lessonData.weekId),
        lessonId: lessonData.lessonId,
      })

      if (existingLesson) {
        return res.status(409).json({
          success: false,
          message: `Lesson with ID ${lessonData.lessonId} already exists in week ${lessonData.weekId}`,
        })
      }

      const lessonDocument = {
        weekId: Number(lessonData.weekId),
        courseId: lessonData.courseId,
        lessonId: lessonData.lessonId,
        slug: lessonData.slug,
        name: lessonData.name,
        content: lessonData.content,
        videoUrl: lessonData.videoUrl || null,
        attachments: lessonData.attachments || null,
        createdAt: lessonData.createdAt || new Date().toISOString().split("T")[0],
        updatedAt: new Date().toISOString().split("T")[0],
      }

      // Create the lesson
      const lessonResult = await Lesson.create(lessonDocument)
      console.log("Lesson saved:", lessonResult)

      // Update the week with the new lesson
      const weekUpdate = await Week.findOneAndUpdate(
        {
          courseId: lessonData.courseId,
          weekId: Number(lessonData.weekId),
        },
        {
          $addToSet: {
            lessonList: {
              title: lessonData.name,
              id: lessonData.lessonId,
            },
          },
          $inc: { lessonCount: 1 },
          $set: {
            updatedAt: new Date().toISOString().split("T")[0],
          },
        },
        { new: true },
      )
      console.log("Week updated:", weekUpdate)

      res.status(200).json({ success: true, data: lessonResult })
    } else if (req.method === "PUT") {
      const lessonData = req.body
      console.log("Received update data:", lessonData)

      // Validate required fields
      if (
        !lessonData.courseId ||
        !lessonData.weekId ||
        !lessonData.lessonId ||
        !lessonData.slug ||
        !lessonData.name ||
        !lessonData.content
      ) {
        return res.status(400).json({ success: false, message: "Missing required fields" })
      }

      // Check if the week exists
      const weekExists = await Week.findOne({
        courseId: lessonData.courseId,
        weekId: Number(lessonData.weekId),
      })

      if (!weekExists) {
        return res.status(404).json({
          success: false,
          message: `Week ${lessonData.weekId} not found for course ${lessonData.courseId}`,
        })
      }

      const oldLessonId = lessonData.oldLessonId || lessonData.lessonId
      const isIdChanged = oldLessonId !== lessonData.lessonId

      // Find the existing lesson
      const existingLesson = await Lesson.findOne({
        courseId: lessonData.courseId,
        weekId: Number(lessonData.weekId),
        lessonId: oldLessonId,
      })

      if (!existingLesson) {
        return res.status(404).json({
          success: false,
          message: `Lesson with ID ${oldLessonId} not found in week ${lessonData.weekId}`,
        })
      }

      // If changing lessonId, check if the new ID already exists
      if (isIdChanged) {
        const newIdExists = await Lesson.findOne({
          courseId: lessonData.courseId,
          weekId: Number(lessonData.weekId),
          lessonId: lessonData.lessonId,
        })

        if (newIdExists) {
          return res.status(409).json({
            success: false,
            message: `Lesson with ID ${lessonData.lessonId} already exists in week ${lessonData.weekId}`,
          })
        }
      }

      const lessonDocument = {
        weekId: Number(lessonData.weekId),
        courseId: lessonData.courseId,
        lessonId: lessonData.lessonId,
        slug: lessonData.slug,
        name: lessonData.name,
        content: lessonData.content,
        videoUrl: lessonData.videoUrl || null,
        attachments: lessonData.attachments || null,
        createdAt: existingLesson.createdAt || new Date().toISOString().split("T")[0],
        updatedAt: new Date().toISOString().split("T")[0],
      }

      // Update or replace the lesson
      let updatedLesson
      if (isIdChanged) {
        // If ID changed, delete old and create new
        await Lesson.deleteOne({
          courseId: lessonData.courseId,
          weekId: Number(lessonData.weekId),
          lessonId: oldLessonId,
        })
        updatedLesson = await Lesson.create(lessonDocument)
      } else {
        // Otherwise update existing
        updatedLesson = await Lesson.findOneAndUpdate(
          {
            courseId: lessonData.courseId,
            weekId: Number(lessonData.weekId),
            lessonId: lessonData.lessonId,
          },
          lessonDocument,
          { new: true },
        )
      }

      console.log("Lesson updated:", updatedLesson)

      // Update the week's lessonList
      if (isIdChanged) {
        // Remove old entry and add new one
        await Week.updateOne(
          {
            courseId: lessonData.courseId,
            weekId: Number(lessonData.weekId),
          },
          {
            $pull: { lessonList: { id: oldLessonId } },
            $set: { updatedAt: new Date().toISOString().split("T")[0] },
          },
        )

        await Week.updateOne(
          {
            courseId: lessonData.courseId,
            weekId: Number(lessonData.weekId),
          },
          {
            $addToSet: {
              lessonList: {
                title: lessonData.name,
                id: lessonData.lessonId,
              },
            },
            $set: { updatedAt: new Date().toISOString().split("T")[0] },
          },
        )
      } else {
        // Just update the title
        await Week.updateOne(
          {
            courseId: lessonData.courseId,
            weekId: Number(lessonData.weekId),
            "lessonList.id": lessonData.lessonId,
          },
          {
            $set: {
              "lessonList.$.title": lessonData.name,
              updatedAt: new Date().toISOString().split("T")[0],
            },
          },
        )
      }

      res.status(200).json({ success: true, data: updatedLesson })
    } else if (req.method === "DELETE") {
      const { courseId, weekId, lessonId } = req.query
      console.log("Delete parameters:", { courseId, weekId, lessonId })

      if (!courseId || !weekId || !lessonId) {
        return res.status(400).json({ success: false, message: "Missing required parameters" })
      }

      const deletedLesson = await Lesson.findOneAndDelete({
        courseId,
        weekId: Number(weekId),
        lessonId,
      })

      if (!deletedLesson) {
        return res.status(404).json({ success: false, message: "Lesson not found" })
      }
      console.log("Lesson deleted:", deletedLesson)

      const weekUpdate = await Week.findOneAndUpdate(
        {
          courseId,
          weekId: Number(weekId),
        },
        {
          $pull: { lessonList: { id: lessonId } },
          $inc: { lessonCount: -1 },
          $set: { updatedAt: new Date().toISOString().split("T")[0] },
        },
        { new: true },
      )
      console.log("Week updated after deletion:", weekUpdate)

      res.status(200).json({ success: true, message: "Lesson deleted" })
    } else {
      res.status(405).json({ success: false, message: "Method not allowed." })
    }
  } catch (error) {
    console.error("Error in /api/lesson-content:", error)
    res.status(500).json({ success: false, message: "Internal server error." })
  } finally {
    if (connection && mongoose.connection.readyState === 1) {
      await mongoose.connection.close()
      console.log("Disconnected from MongoDB.")
    }
  }
}