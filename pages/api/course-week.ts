import mongoose from "mongoose";
import { connectionSrt } from "../../lib/db";
import { Week } from "../../lib/model/week";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        try {
            console.log("Connecting to Week MongoDB...");
            await mongoose.connect(connectionSrt, {
                serverSelectionTimeoutMS: 5000, // Fail quickly if connection fails
            });

            console.log("Connected to Week MongoDB.");

            const { slug } = req.query; // Retrieve the slug from query parameters

            if (slug) {
                // If slug is provided, filter the data by slug
                const weekData = await Week.findOne({ slug: slug.toString() }); // Assuming 'slug' is a field in your Week schema
                
                if (weekData) {
                    console.log("Data fetched for slug:", slug, weekData);
                    res.status(200).json({ success: true, data: weekData });
                } else {
                    console.log("No data found for slug:", slug);
                    res.status(404).json({ success: false, message: "Week not found." });
                }
            } else {
                // If no slug is provided, fetch all data
                const data = await Week.find();
                console.log("Data fetched:", data);
                res.status(200).json({ success: true, data });
            }
        } catch (error) {
            console.error("Error connecting to Week MongoDB:", error);
            res.status(500).json({ success: false, message: "Internal server error." });
        }
    } else {
        res.status(405).json({ success: false, message: "Method not allowed." });
    }
}
