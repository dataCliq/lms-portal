// pages/api/mongo-test.js
import mongoose from "mongoose";
import { connectionSrt } from "../../lib/db";
import { Lesson } from "../../lib/model/content";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
      const { weekId } = req.query;
  
      try {
        await mongoose.connect(connectionSrt, { serverSelectionTimeoutMS: 5000 });
  
        // Filter lessons by weekId if provided
        const query = weekId ? { weekId: Number(weekId) } : {};
        const data = await Lesson.find(query);
  
        res.status(200).json({ success: true, data });
      } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error." });
      }
    } else {
      res.status(405).json({ success: false, message: "Method not allowed." });
    }
  }
  