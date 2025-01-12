import mongoose from "mongoose";
import { connectionSrt } from "../../lib/db";
import { Course } from "../../lib/model/course";

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            // Connect to MongoDB
            await mongoose.connect(connectionSrt, { useNewUrlParser: true, useUnifiedTopology: true });
            const data = await Course.find(); // Query data
            console.log(data);

            // Return JSON response
            res.status(200).json({ success: true, data });
        } catch (error) {
            console.error("Error fetching data:", error.message);
            res.status(500).json({ success: false, message: "Internal server error." });
        }
    } else {
        res.status(405).json({ success: false, message: "Method not allowed." });
    }
}
