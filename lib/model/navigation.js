'use client'

import mongoose from "mongoose";

const CourseNavigationSchema = new mongoose.Schema({
    // Define your schema based on the structure of the `courseNavigation` collection
    title: { type: String, required: true },
    description: { type: String }
    // Add other fields as needed
}, { collection: "courseNavigation" }); // Explicitly specify the collection name

export const CourseNavigation = mongoose.models.courseNavigation || mongoose.model("courseNavigation", CourseNavigationSchema);
