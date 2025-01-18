// pages/api/mongo-test.js
import mongoose from "mongoose";
import { connectionSrt } from "../../lib/db";
import { CourseContent } from "../../lib/model/content";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    if (req.method === "GET") {
        try {
            console.log("Connecting to MongoDB...");
            await mongoose.connect(connectionSrt, {
                serverSelectionTimeoutMS: 5000, // Fail quickly if connection fails
            });
            console.log("Connected to MongoDB.");

            const data = await CourseContent.find(); // Fetch data from the courseNavigation collection
            console.log("Data fetched:", data);

            res.status(200).json({ success: true, data });
        } catch (error) {
            console.error("Error connecting to MongoDB:");
            res.status(500).json({ success: false, message: "Internal server error." });
        }
    } else {
        res.status(405).json({ success: false, message: "Method not allowed." });
    }
}
