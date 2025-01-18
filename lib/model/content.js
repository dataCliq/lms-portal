'use client'

import mongoose from "mongoose";

const CourseContentSchema = new mongoose.Schema({
    // Define your schema based on the structure of the `courseNavigation` collection
    title: { type: String, required: true },
    timeEstimate: { type: String },
    content: {
        type: {
            $code: { type: String },    // The code content as a string
            $scope: { type: Object }    // You can leave this empty or specify variables if necessary
        }
    },
    // Add other fields as needed
}, { collection: "courseContent" }); // Explicitly specify the collection name

export const CourseContent = mongoose.models.courseContent || mongoose.model("courseContent", CourseContentSchema);
