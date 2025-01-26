import mongoose from "mongoose";
import { connectionSrt } from "../../lib/db";
import { Courses } from "../../lib/model/course";

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            console.log("Connecting to MongoDB...");
            await mongoose.connect(connectionSrt, {
                serverSelectionTimeoutMS: 5000, // Fail quickly if connection fails
            });
            console.log("Connected to MongoDB.");

            const data = await Courses.find();
            console.log("Data fetched:", data);

            res.status(200).json({ success: true, data });
        } catch (error) {
            console.error("Error connecting to MongoDB:", error.message);
            res.status(500).json({ success: false, message: "Internal server error." });
        }
    } else {
        res.status(405).json({ success: false, message: "Method not allowed." });
    }
}
