// pages/api/definitions.js
import mongoose from "mongoose";
import connectToDatabase from "../../lib/db"

const DefinitionSchema = new mongoose.Schema({
  keyword: { type: String, required: true, unique: true },
  definition: { type: String, required: true },
});

const Definition = mongoose.models.Definition || mongoose.model("Definition", DefinitionSchema);

export default async function handler(req, res) {
  await connectToDatabase();

  if (req.method === "GET") {
    const { keyword } = req.query;
    try {
      const definition = await Definition.findOne({ keyword: keyword.toLowerCase() });
      console.log(definition)
      res.status(200).json({ definition: definition?.definition || "No definition found" });
    } catch (error) {
      console.error("Definition fetch error:", error);
      res.status(500).json({ definition: "Error fetching definition" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}