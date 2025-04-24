import mongoose from "mongoose"
import { connectionSrt } from "../../lib/db"
import { Week } from "../../lib/model/week"
import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    console.log("Connecting to Week MongoDB...")
    await mongoose.connect(connectionSrt, {
      serverSelectionTimeoutMS: 5000,
    })
    console.log("Connected to Week MongoDB.")

    if (req.method === "GET") {
      const { courseId, slug, weekId } = req.query
      console.log("Received query parameters:", { courseId, slug, weekId })

      let query = {}
      if (courseId) {
        query = { courseId: courseId.toString() }
      }

      if (courseId && weekId) {
        // Fetch a specific week by courseId and weekId (slug optional)
        const weekQuery = {
          courseId: courseId.toString(),
          weekId: Number.parseInt(weekId.toString()),
          ...(slug && { slug: slug.toString() }), // Include slug if provided
        }
        const weekData = await Week.findOne(weekQuery)

        if (weekData) {
          console.log("Data fetched for query:", weekQuery, weekData)
          // FIXED: Return as array for consistency with client expectations
          res.status(200).json({ success: true, data: [weekData] })
        } else {
          console.log("No data found for query:", weekQuery)
          res.status(404).json({ success: false, message: "Week not found." })
        }
      } else if (courseId) {
        // Fetch all weeks for a course
        const weeksData = await Week.find(query)
        console.log("Data fetched for courseId:", courseId, weeksData)
        res.status(200).json({ success: true, data: weeksData })
      } else {
        // Fetch all weeks
        const data = await Week.find(query)
        console.log("All data fetched:", data)
        res.status(200).json({ success: true, data })
      }
    } else if (req.method === "POST") {
      const { courseId, weekId, slug, title, lessonCount } = req.body

      if (!courseId || !weekId || !slug) {
        console.log("Missing required fields:", { courseId, weekId, slug })
        return res
          .status(400)
          .json({ success: false, message: "Missing required fields: courseId, weekId, and slug are required." })
      }

      const existingWeek = await Week.findOne({ courseId, weekId, slug })
      if (existingWeek) {
        console.log("Week already exists:", { courseId, weekId, slug })
        return res
          .status(409)
          .json({ success: false, message: "A week with the same courseId, weekId, and slug already exists." })
      }

      const newWeek = new Week({
        courseId,
        weekId: Number.parseInt(weekId),
        slug,
        title: title || "",
        lessonCount: lessonCount !== undefined ? Number.parseInt(lessonCount) : 0,
      })

      await newWeek.save()
      console.log("Week created successfully:", newWeek)
      res.status(201).json({ success: true, data: newWeek })
    } else if (req.method === "PATCH") {
      const { courseId, weekId, slug, title, lessonCount } = req.body

      if (!courseId || !weekId) {
        console.log("Missing required fields for update:", { courseId, weekId })
        return res
          .status(400)
          .json({ success: false, message: "Missing required fields: courseId and weekId are required." })
      }

      const existingWeek = await Week.findOne({ courseId, weekId: Number.parseInt(weekId) })
      if (!existingWeek) {
        console.log("Week not found for update:", { courseId, weekId })
        return res.status(404).json({ success: false, message: "Week not found." })
      }

      if (slug) existingWeek.slug = slug
      if (title !== undefined) existingWeek.title = title
      if (lessonCount !== undefined) existingWeek.lessonCount = Number.parseInt(lessonCount)

      await existingWeek.save()
      console.log("Week updated successfully:", existingWeek)
      res.status(200).json({ success: true, data: existingWeek })
    } else if (req.method === "DELETE") {
      const { courseId, weekId } = req.query

      if (!courseId || !weekId) {
        console.log("Missing required fields for delete:", { courseId, weekId })
        return res
          .status(400)
          .json({ success: false, message: "Missing required fields: courseId and weekId are required." })
      }

      const deletedWeek = await Week.findOneAndDelete({
        courseId: courseId.toString(),
        weekId: Number.parseInt(weekId.toString()),
      })

      if (!deletedWeek) {
        console.log("Week not found for delete:", { courseId, weekId })
        return res.status(404).json({ success: false, message: "Week not found." })
      }

      console.log("Week deleted successfully:", deletedWeek)
      res.status(200).json({ success: true })
    } else {
      res.status(405).json({ success: false, message: "Method not allowed." })
    }
  } catch (error) {
    console.error("Error in course-week API:", error)
    // FIXED: Add more detailed error information
    res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: error instanceof Error ? error.message : String(error),
    })
  }
}
