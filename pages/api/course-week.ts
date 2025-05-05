import mongoose from "mongoose"
import { connectToDatabase } from "@/lib/db"
import type { NextApiRequest, NextApiResponse } from "next"

// Define the week schema
const weekSchema = new mongoose.Schema({
  courseId: { type: String, required: true },
  weekId: { type: Number, required: true },
  slug: { type: String, required: true },
  title: { type: String, default: "" },
  description: { type: String },
  lessonCount: { type: Number, default: 0 },
  lessonList: { type: Array, default: [] },
  createdAt: { type: String, default: () => new Date().toISOString().split("T")[0] },
  updatedAt: { type: String, default: () => new Date().toISOString().split("T")[0] },
})

// Use the same collection name pattern as your working APIs
let Week
try {
  Week = mongoose.models.Week || mongoose.model("Week", weekSchema, "weeks")
} catch (error) {
  Week = mongoose.model("Week", weekSchema, "weeks")
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    console.log("Connecting to MongoDB for course-week...")
    await connectToDatabase()
    console.log("Connected to database")

    // Handle different HTTP methods
    if (req.method === "GET") {
      // Parse query parameters
      const { courseId, weekId, slug } = req.query

      console.log("Received query parameters:", { courseId, weekId, slug })

      // Build query based on provided parameters
      let query: any = {}

      if (courseId && weekId) {
        query = {
          courseId: courseId.toString(),
          weekId: Number(weekId),
        }
        if (slug) {
          query.slug = slug.toString()
        }

        console.log("Executing week query:", query)
        const week = await Week.findOne(query).lean()

        if (week) {
          console.log("Found week:", week)
          return res.status(200).json({ success: true, data: [week] })
        } else {
          console.log("No week found with query:", query)

          // Try direct collection access
          const db = mongoose.connection.db
          const collections = await db.listCollections().toArray()
          const possibleCollections = ["weeks", "Week", "week"]

          for (const collName of possibleCollections) {
            if (collections.some((c) => c.name === collName)) {
              console.log(`Trying direct query on collection: ${collName}`)
              const directWeek = await db.collection(collName).findOne(query)

              if (directWeek) {
                console.log(`Found week in collection ${collName}:`, directWeek)
                return res.status(200).json({ success: true, data: [directWeek] })
              }
            }
          }

          return res.status(404).json({ success: false, message: "Week not found." })
        }
      } else if (courseId) {
        query.courseId = courseId.toString()
        console.log("Executing weeks query for course:", query)
        const weeks = await Week.find(query).lean()

        if (weeks && weeks.length > 0) {
          console.log(`Found ${weeks.length} weeks`)
          return res.status(200).json({ success: true, data: weeks })
        } else {
          console.log("No weeks found for course:", courseId)

          // Try direct collection access
          const db = mongoose.connection.db
          const collections = await db.listCollections().toArray()
          const possibleCollections = ["weeks", "Week", "week"]

          for (const collName of possibleCollections) {
            if (collections.some((c) => c.name === collName)) {
              console.log(`Trying direct query on collection: ${collName}`)
              const directWeeks = await db.collection(collName).find(query).toArray()

              if (directWeeks && directWeeks.length > 0) {
                console.log(`Found ${directWeeks.length} weeks in collection ${collName}`)
                return res.status(200).json({ success: true, data: directWeeks })
              }
            }
          }

          return res.status(200).json({ success: true, data: [] })
        }
      } else {
        console.log("Fetching all weeks")
        const weeks = await Week.find({}).lean()
        console.log(`Found ${weeks.length} weeks`)
        return res.status(200).json({ success: true, data: weeks })
      }
    } else if (req.method === "POST") {
      const body = req.body
      console.log("Received POST body:", body)

      const { courseId, weekId, slug, title, lessonCount } = body

      if (!courseId || !weekId || !slug) {
        return res.status(400).json({
          success: false,
          message: "Missing required fields: courseId, weekId, and slug are required.",
        })
      }

      // Check if week already exists
      const existingWeek = await Week.findOne({ courseId, weekId: Number(weekId), slug })
      if (existingWeek) {
        return res.status(409).json({
          success: false,
          message: "A week with the same courseId, weekId, and slug already exists.",
        })
      }

      const newWeek = new Week({
        courseId,
        weekId: Number(weekId),
        slug,
        title: title || "",
        lessonCount: lessonCount !== undefined ? Number(lessonCount) : 0,
        createdAt: new Date().toISOString().split("T")[0],
        updatedAt: new Date().toISOString().split("T")[0],
      })

      const result = await newWeek.save()
      console.log("Week created successfully:", result)

      return res.status(201).json({ success: true, data: result })
    } else if (req.method === "PUT") {
      const { courseId, weekId } = req.query

      if (!courseId || !weekId) {
        return res.status(400).json({
          success: false,
          message: "Missing required fields: courseId and weekId are required.",
        })
      }

      const body = req.body
      const updateData: any = {
        updatedAt: new Date().toISOString().split("T")[0],
      }

      // Add fields to update if they exist in the request body
      if (body.slug) updateData.slug = body.slug
      if (body.title !== undefined) updateData.title = body.title
      if (body.lessonCount !== undefined) updateData.lessonCount = Number(body.lessonCount)
      if (body.lessonList) updateData.lessonList = body.lessonList

      const result = await Week.findOneAndUpdate(
        {
          courseId: courseId.toString(),
          weekId: Number(weekId),
        },
        { $set: updateData },
        { new: true },
      ).lean()

      if (!result) {
        return res.status(404).json({ success: false, message: "Week not found." })
      }

      console.log("Updated week:", result)
      return res.status(200).json({ success: true, data: result })
    } else if (req.method === "DELETE") {
      const { courseId, weekId } = req.query

      if (!courseId || !weekId) {
        return res.status(400).json({
          success: false,
          message: "Missing required fields: courseId and weekId are required.",
        })
      }

      const result = await Week.findOneAndDelete({
        courseId: courseId.toString(),
        weekId: Number(weekId),
      }).lean()

      if (!result) {
        return res.status(404).json({ success: false, message: "Week not found." })
      }

      console.log("Week deleted successfully:", result)
      return res.status(200).json({ success: true, data: result })
    } else {
      return res.status(405).json({ success: false, message: "Method not allowed." })
    }
  } catch (error) {
    console.error("Error in course-week API:", error)
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error instanceof Error ? error.message : String(error),
    })
  }
}
