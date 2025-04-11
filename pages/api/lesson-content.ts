import mongoose from "mongoose";
import { connectionSrt } from "../../lib/db";
import type { NextApiRequest, NextApiResponse } from "next";

// Lesson Schema (CoursesData.Lesson)
const LessonSchema = new mongoose.Schema(
  {
    weekId: { type: Number, required: true },
    courseId: { type: String, required: true },
    lessonId: { type: String, required: true },
    slug: { type: String, required: true },
    name: { type: String, required: true },
    content: { type: String, required: true },
    videoUrl: { type: String, default: null },
    attachments: { type: mongoose.Schema.Types.Mixed, default: null },
    createdAt: { type: String },
    updatedAt: { type: String },
  },
  { versionKey: false }
);

const LessonModel = () => mongoose.models.Lesson || mongoose.model("Lesson", LessonSchema, "Lesson");

// Week Schema (CoursesData.Week)
const WeekSchema = new mongoose.Schema(
  {
    weekId: { type: Number, required: true },
    courseId: { type: String, required: true },
    lessonCount: { type: Number, default: 0 },
    slug: { type: String, required: true },
    lessonList: [{ title: String, id: String }],
    createdAt: { type: String },
    updatedAt: { type: String },
  },
  { versionKey: false }
);

const WeekModel = () => mongoose.models.Week || mongoose.model("Week", WeekSchema, "Week");

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await mongoose.connect(connectionSrt, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log("Connected to MongoDB.");

    const Lesson = LessonModel();
    const Week = WeekModel();

    if (req.method === "GET") {
      const { courseId, weekId, lessonId } = req.query;
      console.log("Query parameters:", { courseId, weekId, lessonId });

      if (courseId && weekId && lessonId) {
        const data = await Lesson.findOne({
          courseId,
          weekId: Number(weekId),
          lessonId,
        });
        console.log("Data fetched:", data);
        if (data) {
          res.status(200).json({ success: true, data });
        } else {
          res.status(404).json({ success: false, message: "Lesson not found" });
        }
      } else {
        res.status(400).json({ success: false, message: "Missing required parameters" });
      }
    } else if (req.method === "POST") {
      const lessonData = req.body;
      console.log("Received lesson data:", lessonData);

      const lessonDocument = {
        weekId: lessonData.weekId,
        courseId: lessonData.courseId,
        lessonId: lessonData.lessonId,
        slug: lessonData.slug,
        name: lessonData.name,
        content: lessonData.content,
        videoUrl: lessonData.videoUrl || null,
        attachments: lessonData.attachments || null,
        createdAt: lessonData.createdAt || new Date().toISOString().split("T")[0],
        updatedAt: new Date().toISOString().split("T")[0],
      };

      const existingLesson = await Lesson.findOne({
        courseId: lessonData.courseId,
        weekId: lessonData.weekId,
        lessonId: lessonData.lessonId,
      });

      let lessonResult;
      if (existingLesson) {
        lessonResult = await Lesson.findOneAndReplace(
          {
            courseId: lessonData.courseId,
            weekId: lessonData.weekId,
            lessonId: lessonData.lessonId,
          },
          lessonDocument,
          { new: true }
        );
      } else {
        lessonResult = await Lesson.create(lessonDocument);
      }
      console.log("Lesson saved:", lessonResult);

      const weekUpdate = await Week.findOneAndUpdate(
        {
          courseId: lessonData.courseId,
          weekId: lessonData.weekId,
        },
        {
          $addToSet: {
            lessonList: {
              title: lessonData.name,
              id: lessonData.lessonId,
            },
          },
          $inc: { lessonCount: existingLesson ? 0 : 1 },
          updatedAt: new Date().toISOString().split("T")[0],
        },
        { upsert: true, new: true }
      );
      console.log("Week updated:", weekUpdate);

      res.status(200).json({ success: true, data: lessonResult });
    } else if (req.method === "PUT") {
      const lessonData = req.body;
      console.log("Received update data:", lessonData);

      const lessonDocument = {
        weekId: lessonData.weekId,
        courseId: lessonData.courseId,
        lessonId: lessonData.lessonId,
        slug: lessonData.slug,
        name: lessonData.name,
        content: lessonData.content,
        videoUrl: lessonData.videoUrl || null,
        attachments: lessonData.attachments || null,
        createdAt: lessonData.createdAt,
        updatedAt: new Date().toISOString().split("T")[0],
      };

      const updatedLesson = await Lesson.findOneAndReplace(
        {
          courseId: lessonData.courseId,
          weekId: lessonData.weekId,
          lessonId: lessonData.oldLessonId || lessonData.lessonId, // Handle ID change
        },
        lessonDocument,
        { new: true }
      );

      if (!updatedLesson) {
        return res.status(404).json({ success: false, message: "Lesson not found" });
      }
      console.log("Lesson updated:", updatedLesson);

      // Update lessonList in Week if title or id changed
      await Week.findOneAndUpdate(
        {
          courseId: lessonData.courseId,
          weekId: lessonData.weekId,
          "lessonList.id": lessonData.oldLessonId || lessonData.lessonId,
        },
        {
          $set: {
            "lessonList.$.title": lessonData.name,
            "lessonList.$.id": lessonData.lessonId,
            updatedAt: new Date().toISOString().split("T")[0],
          },
        }
      );
      console.log("Week lessonList updated");

      res.status(200).json({ success: true, data: updatedLesson });
    } else if (req.method === "DELETE") {
      const { courseId, weekId, lessonId } = req.query;
      console.log("Delete parameters:", { courseId, weekId, lessonId });

      if (!courseId || !weekId || !lessonId) {
        return res.status(400).json({ success: false, message: "Missing required parameters" });
      }

      const deletedLesson = await Lesson.findOneAndDelete({
        courseId,
        weekId: Number(weekId),
        lessonId,
      });

      if (!deletedLesson) {
        return res.status(404).json({ success: false, message: "Lesson not found" });
      }
      console.log("Lesson deleted:", deletedLesson);

      const weekUpdate = await Week.findOneAndUpdate(
        {
          courseId,
          weekId: Number(weekId),
        },
        {
          $pull: { lessonList: { id: lessonId } },
          $inc: { lessonCount: -1 },
          updatedAt: new Date().toISOString().split("T")[0],
        },
        { new: true }
      );
      console.log("Week updated after deletion:", weekUpdate);

      res.status(200).json({ success: true, message: "Lesson deleted" });
    } else {
      res.status(405).json({ success: false, message: "Method not allowed." });
    }
  } catch (error) {
    console.error("Error in /api/lesson-content:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
}