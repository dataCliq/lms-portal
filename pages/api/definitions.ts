import mongoose from "mongoose"
import { connectionSrt } from "../../lib/db" // Ensure this path is correct
import type { NextApiRequest, NextApiResponse } from "next"

// Update the schema to match your actual collection structure
const DefinitionSchema = new mongoose.Schema({
  keyword: { type: String, required: true, unique: true },
  definition: { type: String, required: true },
})

// Important: Change the model name to match your actual collection name
// If your collection is "CoursesData.Definition", use:
const Definition = mongoose.models.Definition || mongoose.model("Definition", DefinitionSchema, "Definition")

const connectToDatabase = async () => {
  if (mongoose.connection.readyState >= 1) {
    console.log("Already connected to MongoDB")
    return
  }

  try {
    await mongoose.connect(connectionSrt)
    console.log("Connected to MongoDB")
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error)
    throw error
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      await connectToDatabase()

      const { keyword } = req.query

      if (!keyword || typeof keyword !== "string") {
        return res.status(400).json({ definition: "Keyword parameter is required" })
      }

      console.log("Querying for keyword:", keyword)

      // Log the available collections to debug
      const collections = await mongoose.connection.db.listCollections().toArray()
      console.log(
        "Available collections:",
        collections.map((c) => c.name),
      )

      // Try case-insensitive search
      const definition = await Definition.findOne({
        keyword: { $regex: new RegExp(`^${keyword}$`, "i") },
      })

      console.log("Fetched definition:", definition)

      if (definition) {
        res.status(200).json({ definition: definition.definition })
      } else {
        // Try direct query to verify collection structure
        const db = mongoose.connection.db
        const result = await db.collection("Definition").findOne({
          keyword: { $regex: new RegExp(`^${keyword}$`, "i") },
        })

        console.log("Direct query result:", result)

        if (result) {
          res.status(200).json({ definition: result.definition })
        } else {
          res.status(200).json({ definition: "No definition found" })
        }
      }
    } catch (error) {
      console.error("Error fetching definition:", error)
      res.status(500).json({ definition: "Error fetching definition" })
    }
  } else {
    res.status(405).json({ message: "Method not allowed" })
  }
}
