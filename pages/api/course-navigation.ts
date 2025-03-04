// pages/api/definitions.js
import mongoose from "mongoose";
import { connectionSrt } from "../../lib/db"; // Ensure this path is correct
import { NextApiRequest, NextApiResponse } from "next";

const DefinitionSchema = new mongoose.Schema({
  keyword: { type: String, required: true, unique: true },
  definition: { type: String, required: true },
});

const Definition = mongoose.models.Definition || mongoose.model("Definition", DefinitionSchema);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      console.log("Connecting to MongoDB...");
      await mongoose.connect(connectionSrt, {
        serverSelectionTimeoutMS: 5000,
      });
      console.log("Connected to MongoDB.");

      const { keyword } = req.query;
      console.log("Querying for keyword:", keyword);

      const definition = await Definition.findOne({ keyword: keyword.toLowerCase() });
      console.log("Fetched definition:", definition);

      if (definition) {
        res.status(200).json({ success: true, definition: definition.definition });
      } else {
        res.status(200).json({ success: true, definition: "No definition found" });
      }
    } catch (error) {
      console.error("Error fetching definition:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
}