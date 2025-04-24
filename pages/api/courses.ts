import mongoose from "mongoose";
import { connectionSrt } from "../../lib/db";
import type { NextApiRequest, NextApiResponse } from "next";

const courseSchema = new mongoose.Schema({
  courseId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  rating: { type: Number, default: 0 },
  weekCount: { type: Number, default: 0 },
  slug: { type: String, required: true },
  imageSrc: { type: String, default: "" },
  description: { type: String, default: "" },
  tags: { type: [String], default: [] },
  price: { type: Number, default: null },
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, required: true },
});

const Course = mongoose.models.Course || mongoose.model("Course", courseSchema, "courseName");

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    console.log("Connecting to Courses MongoDB...");
    await mongoose.connect(connectionSrt, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log("Connected to database:", mongoose.connection.db.databaseName);

    // Debug: Count documents
    const count = await Course.countDocuments();
    console.log("Number of documents in Course:", count);

    if (req.method === "GET") {
      const { courseId } = req.query;
      let query = courseId ? { courseId: courseId.toString() } : {};
      console.log("Executing query:", query);
      const courses = await Course.find(query).lean();
      console.log("Fetched courses:", courses);
      res.status(200).json({ success: true, data: courses });
    } else if (req.method === "POST") {
      const body = req.body;
      console.log("Received POST body:", body);
      if (!body.courseId || !body.title || !body.slug) {
        return res.status(400).json({ success: false, message: "courseId, title, and slug are required." });
      }
      const courseData = {
        courseId: body.courseId,
        title: body.title,
        rating: body.rating ?? 0,
        weekCount: body.weekCount ?? 0,
        slug: body.slug,
        imageSrc: body.imageSrc ?? "",
        description: body.description ?? "",
        tags: body.tags ?? [],
        price: body.price ?? null,
        createdAt: body.createdAt ? new Date(body.createdAt) : new Date(),
        updatedAt: body.updatedAt ? new Date(body.updatedAt) : new Date(),
      };
      const existingCourse = await Course.findOne({ courseId: body.courseId }).lean();
      if (existingCourse) {
        return res.status(409).json({ success: false, message: "Course with this courseId already exists." });
      }
      const course = new Course(courseData);
      const result = await course.save();
      console.log("Created course:", result);
      res.status(201).json({ success: true, data: result });
    } else if (req.method === "PUT") {
      const { courseId } = req.query;
      if (!courseId) {
        return res.status(400).json({ success: false, message: "courseId is required." });
      }
      const body = req.body;
      const updateData = {
        title: body.title,
        slug: body.slug,
        description: body.description ?? "",
        imageSrc: body.imageSrc,
        tags: body.tags,
        rating: body.rating,
        weekCount: body.weekCount,
        price: body.price,
        updatedAt: body.updatedAt ? new Date(body.updatedAt) : new Date(),
      };
      Object.keys(updateData).forEach((key) => updateData[key] === undefined && delete updateData[key]);
      const result = await Course.findOneAndUpdate(
        { courseId: courseId.toString() },
        { $set: updateData },
        { new: true }
      ).lean();
      if (!result) {
        return res.status(404).json({ success: false, message: "Course not found." });
      }
      console.log("Updated course:", result);
      res.status(200).json({ success: true, data: result });
    } else if (req.method === "DELETE") {
      const { courseId } = req.query;
      if (!courseId) {
        return res.status(400).json({ success: false, message: "courseId is required." });
      }
      const result = await Course.findOneAndDelete({ courseId: courseId.toString() }).lean();
      if (!result) {
        return res.status(404).json({ success: false, message: "Course not found." });
      }
      console.log("Deleted course:", courseId);
      res.status(200).json({ success: true });
    } else {
      res.status(405).json({ success: false, message: "Method not allowed." });
    }
  } catch (error) {
    console.error("Error in /api/courses:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  } finally {
    if (mongoose.connection.readyState === 1) {
      await mongoose.connection.close();
      console.log("Disconnected from Courses MongoDB.");
    }
  }
}