import mongoose from "mongoose"
import { connectToDatabase } from "@/lib/db"
import type { NextApiRequest, NextApiResponse } from "next"

// Define the lesson schema
const lessonSchema = new mongoose.Schema({
  courseId: { type: String, required: true },
  weekId: { type: Number, required: true },
  lessonId: { type: String, required: true },
  slug: { type: String, required: true },
  title: { type: String },
  name: { type: String },
  subtitle: { type: String },
  content: { type: String, default: "" },
  videoUrl: { type: String },
  attachments: { type: Array },
  createdAt: { type: String, default: () => new Date().toISOString().split("T")[0] },
  updatedAt: { type: String, default: () => new Date().toISOString().split("T")[0] },
})

// Use the same collection name pattern as your working APIs
let Lesson
try {
  // Try different collection names that might contain lessons
  Lesson = mongoose.models.Lesson || mongoose.model("Lesson", lessonSchema, "Lesson")
} catch (error) {
  try {
    Lesson = mongoose.model("Lesson", lessonSchema, "lessons")
  } catch (error) {
    Lesson = mongoose.model("LessonContent", lessonSchema, "Lesson")
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    console.log("Connecting to MongoDB for lesson-content...")
    await connectToDatabase()
    console.log("Connected to database")

    if (req.method === "GET") {
      // Parse query parameters
      const { courseId, weekId, lessonId, slug } = req.query

      console.log("Query parameters:", { courseId, weekId, lessonId, slug })

      // Build query based on provided parameters
      let query: any = {}

      if (lessonId) {
        query.lessonId = lessonId.toString()
      } else if (courseId && weekId) {
        query = {
          courseId: courseId.toString(),
          weekId: Number(weekId),
        }
      } else if (courseId) {
        query.courseId = courseId.toString()
      }

      if (slug) {
        query.slug = slug.toString()
      }

      console.log("Executing lesson query:", query)

      // Try direct collection access first
      const db = mongoose.connection.db
      let lessons = []

      // Try different collection names that might contain lessons
      const collections = await db.listCollections().toArray()
      const collectionNames = collections.map((c) => c.name)
      console.log("Available collections:", collectionNames)

      const possibleCollections = ["Lesson", "lessons", "lesson"]

      for (const collName of possibleCollections) {
        if (collectionNames.includes(collName)) {
          console.log(`Trying direct query on collection: ${collName}`)
          try {
            const directLessons = await db.collection(collName).find(query).toArray()

            if (directLessons && directLessons.length > 0) {
              console.log(`Found ${directLessons.length} lessons in collection ${collName}`)
              lessons = directLessons
              break
            }
          } catch (directError) {
            console.error(`Error querying collection ${collName}:`, directError)
          }
        }
      }

      // If no lessons found, try with the model
      if (lessons.length === 0) {
        console.log("No lessons found with direct access, trying with model")
        try {
          const modelLessons = await Lesson.find(query).lean()
          if (modelLessons && modelLessons.length > 0) {
            console.log("Found lessons with model:", modelLessons)
            lessons = modelLessons
          }
        } catch (modelError) {
          console.error("Error finding lessons with model:", modelError)
        }
      }

      // If still no lessons found, try to find the actual collection name
      if (lessons.length === 0) {
        console.log("Still no lessons found, trying to find the actual collection name")

        // Look for collections that might contain our data
        for (const collName of collectionNames) {
          if (collName.toLowerCase().includes("lesson") || collName.toLowerCase().includes("course")) {
            console.log(`Trying collection: ${collName}`)
            try {
              const sampleDocs = await db.collection(collName).find({}).limit(5).toArray()
              console.log(`Sample docs from ${collName}:`, sampleDocs)

              // If this collection has documents with courseId and weekId fields, try our query
              if (
                sampleDocs.length > 0 &&
                (sampleDocs[0].courseId !== undefined || sampleDocs[0].weekId !== undefined)
              ) {
                const directLessons = await db.collection(collName).find(query).toArray()

                if (directLessons && directLessons.length > 0) {
                  console.log(`Found ${directLessons.length} lessons in collection ${collName}`)
                  lessons = directLessons
                  break
                }
              }
            } catch (error) {
              console.error(`Error exploring collection ${collName}:`, error)
            }
          }
        }
      }

      return res.status(200).json({ success: true, data: lessons })
    } else if (req.method === "POST") {
      const body = req.body
      console.log("Received POST body:", body)

      if (!body.courseId || !body.weekId || !body.lessonId || !body.slug || !body.title) {
        return res.status(400).json({
          success: false,
          message: "courseId, weekId, lessonId, slug, and title are required.",
        })
      }

      const lessonData = {
        courseId: body.courseId,
        weekId: Number(body.weekId),
        lessonId: body.lessonId,
        slug: body.slug,
        title: body.title,
        name: body.name || body.title,
        subtitle: body.subtitle || "",
        content: body.content || "",
        videoUrl: body.videoUrl || null,
        attachments: body.attachments || [],
        createdAt: body.createdAt || new Date().toISOString().split("T")[0],
        updatedAt: body.updatedAt || new Date().toISOString().split("T")[0],
      }

      // Check if lesson already exists
      const existingLesson = await Lesson.findOne({
        courseId: body.courseId,
        weekId: Number(body.weekId),
        lessonId: body.lessonId,
      }).lean()

      if (existingLesson) {
        return res.status(409).json({
          success: false,
          message: "Lesson with this courseId, weekId, and lessonId already exists.",
        })
      }

      const lesson = new Lesson(lessonData)
      const result = await lesson.save()
      console.log("Created lesson:", result)

      return res.status(201).json({ success: true, data: result })
    } else if (req.method === "PUT") {
      const { courseId, weekId, lessonId } = req.query

      if (!courseId || !weekId || !lessonId) {
        return res.status(400).json({
          success: false,
          message: "Missing required fields: courseId, weekId, and lessonId are required.",
        })
      }

      const body = req.body
      const updateData: any = {
        updatedAt: new Date().toISOString().split("T")[0],
      }

      // Add fields to update if they exist in the request body
      if (body.title) updateData.title = body.title
      if (body.name) updateData.name = body.name
      if (body.content !== undefined) updateData.content = body.content
      if (body.videoUrl !== undefined) updateData.videoUrl = body.videoUrl
      if (body.attachments) updateData.attachments = body.attachments

      const result = await Lesson.findOneAndUpdate(
        {
          courseId: courseId.toString(),
          weekId: Number(weekId),
          lessonId: lessonId.toString(),
        },
        { $set: updateData },
        { new: true },
      ).lean()

      if (!result) {
        return res.status(404).json({ success: false, message: "Lesson not found." })
      }

      console.log("Updated lesson:", result)
      return res.status(200).json({ success: true, data: result })
    } else if (req.method === "DELETE") {
      const { courseId, weekId, lessonId } = req.query

      if (!courseId || !weekId || !lessonId) {
        return res.status(400).json({
          success: false,
          message: "Missing required fields: courseId, weekId, and lessonId are required.",
        })
      }

      const result = await Lesson.findOneAndDelete({
        courseId: courseId.toString(),
        weekId: Number(weekId),
        lessonId: lessonId.toString(),
      }).lean()

      if (!result) {
        return res.status(404).json({ success: false, message: "Lesson not found." })
      }

      console.log("Lesson deleted successfully:", result)
      return res.status(200).json({ success: true, data: result })
    } else {
      return res.status(405).json({ success: false, message: "Method not allowed." })
    }
  } catch (error) {
    console.error("Error in lesson-content API:", error)
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error instanceof Error ? error.message : String(error),
    })
  }
}
