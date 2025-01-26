import mongoose from "mongoose";
import { connectionSrt } from "../../lib/db";
import { Lesson } from "../../lib/model/content";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        try {
            console.log("Connecting to Week MongoDB...");
            await mongoose.connect(connectionSrt, {
                serverSelectionTimeoutMS: 5000, // Fail quickly if connection fails
            });
            console.log("Connected to Week MongoDB.");

            const { id } = req.query;

            if (id) {
                const data = await Lesson.find({ _id: id }); // Fetch specific lesson by ID
                console.log("Data fetched:", data);
                res.status(200).json({ success: true, data });
            } else {
                const data = await Lesson.find(); // Fetch all lessons
                res.status(200).json({ success: true, data });
            }

        } catch (error) {
            console.error("Error connecting to Week MongoDB:");
            res.status(500).json({ success: false, message: "Internal server error." });
        }
    } else {
        res.status(405).json({ success: false, message: "Method not allowed." });
    }
}
