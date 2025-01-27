import mongoose from "mongoose";
import { connectionSrt } from "../../lib/db";
import { Week } from "../../lib/model/week";
import { NextApiRequest, NextApiResponse } from "next";


export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    if (req.method === "GET") {
        try {
            console.log("Connecting to Week MongoDB...");
            await mongoose.connect(connectionSrt, {
                serverSelectionTimeoutMS: 5000, // Fail quickly if connection fails
            });
            
            console.log("Connected to Week MongoDB.");

            const data = await Week.find(); // Fetch data from the courseNavigation collection
            console.log("Data fetched:", data);

            res.status(200).json({ success: true, data });
        } catch (error) {
            console.error("Error connecting to Week MongoDB:");
            res.status(500).json({ success: false, message: "Internal server error." });
        }
    } else {
        res.status(405).json({ success: false, message: "Method not allowed." });
    }
}
