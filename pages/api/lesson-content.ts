import mongoose from "mongoose"
import { connectionSrt } from "../../lib/db"
import { Lesson } from "../../lib/model/content"
import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      console.log("Connecting to MongoDB...")
      await mongoose.connect(connectionSrt, {
        serverSelectionTimeoutMS: 5000,
      })
      console.log("Connected to MongoDB.")

      const { courseId, weekId, lessonId } = req.query

      console.log("Query parameters:", { courseId, weekId, lessonId })

      if (courseId && weekId && lessonId) {
        const data = await Lesson.findOne({
          courseId,
          weekId: Number(weekId),
          lessonId,
        })
        console.log("Data fetched:", data)
        if (data) {
          res.status(200).json({ success: true, data })
        } else {
          res.status(404).json({ success: false, message: "Lesson not found" })
        }
      } else {
        res.status(400).json({ success: false, message: "Missing required parameters" })
      }
    } catch (error) {
      console.error("Error connecting to MongoDB:", error)
      res.status(500).json({ success: false, message: "Internal server error." })
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed." })
  }
}

