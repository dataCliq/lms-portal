import mongoose from "mongoose"
import { connectionSrt } from "../../lib/db"
import { Week } from "../../lib/model/week"
import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      console.log("Connecting to Week MongoDB...")
      await mongoose.connect(connectionSrt, {
        serverSelectionTimeoutMS: 5000, // Fail quickly if connection fails
      })

      console.log("Connected to Week MongoDB.")

      const { courseId, slug, weekId } = req.query

      console.log("Received query parameters:", { courseId, slug, weekId })

      let query = {}
      if (courseId) {
        query = { courseId: courseId.toString() }
      }
      console.log("Query:", query)

      if (courseId && slug && weekId) {
        // If all parameters are provided, filter the data by courseId, slug, and weekId
        const weekData = await Week.findOne({
          courseId: courseId.toString(),
          slug: slug.toString(),
          weekId: Number.parseInt(weekId.toString()),
        })

        if (weekData) {
          console.log("Data fetched for courseId, slug, and weekId:", { courseId, slug, weekId }, weekData)
          res.status(200).json({ success: true, data: weekData })
        } else {
          console.log("No data found for courseId, slug, and weekId:", { courseId, slug, weekId })
          res.status(404).json({ success: false, message: "Week not found." })
        }
      } else if (courseId) {
        // If only courseId is provided, fetch all weeks for that course
        const weeksData = await Week.find(query)
        console.log("Data fetched for courseId:", courseId, weeksData)
        console.log("Fetched data:", weeksData)
        res.status(200).json({ success: true, data: weeksData })
      } else {
        // If no parameters are provided, fetch all data
        const data = await Week.find(query)
        console.log("All data fetched:", data)
        console.log("Fetched data:", data)
        res.status(200).json({ success: true, data })
      }
    } catch (error) {
      console.error("Error connecting to Week MongoDB:", error)
      res.status(500).json({ success: false, message: "Internal server error." })
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed." })
  }
}
