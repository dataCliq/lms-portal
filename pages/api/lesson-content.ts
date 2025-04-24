import type { NextApiRequest, NextApiResponse } from "next"
import { connectToDatabase, disconnectFromDatabase } from "../../lib/db"
import { Lesson } from "../../lib/model/lesson"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Connect to database
    const connected = await connectToDatabase()
    if (!connected) {
      return res.status(500).json({ success: false, message: "Failed to connect to database" })
    }

    const count = await Lesson.countDocuments()
    console.log("Number of documents in Lesson:", count)

    if (req.method === "GET") {
      const { courseId, weekId, lessonId, slug } = req.query
      if (!courseId) {
        return res.status(400).json({ success: false, message: "courseId is required" })
      }

      const query: any = { courseId: courseId.toString() }
      if (weekId) query.weekId = Number.parseInt(weekId.toString())
      if (lessonId) query.lessonId = lessonId.toString()
      if (slug) query.slug = slug.toString()

      console.log("Executing query:", query)
      const lessons = await Lesson.find(query).lean()

      // Transform the data to ensure consistent field names
      const transformedLessons = lessons.map((lesson) => ({
        ...lesson,
        title: lesson.title || lesson.name, // Ensure title is always available
        name: lesson.name || lesson.title, // Ensure name is always available
      }))

      console.log("Fetched lessons:", transformedLessons)
      res.setHeader("Cache-Control", "no-store")
      res.status(200).json({ success: true, data: transformedLessons })
    } else if (req.method === "POST") {
      const body = req.body
      console.log("Received POST body:", body)

      // Validate required fields
      if (!body.courseId || !body.weekId || !body.lessonId || !body.slug || !(body.title || body.name)) {
        return res.status(400).json({
          success: false,
          message: "courseId, weekId, lessonId, slug, and title/name are required.",
        })
      }

      // Check for existing lesson
      const existingLesson = await Lesson.findOne({
        courseId: body.courseId,
        weekId: Number(body.weekId),
        $or: [{ lessonId: body.lessonId }, { slug: body.slug }],
      }).lean()

      if (existingLesson) {
        return res.status(409).json({
          success: false,
          message: "A lesson with the same courseId, weekId, and lessonId or slug already exists.",
        })
      }

      // Create new lesson with both title and name fields
      const lesson = new Lesson({
        courseId: body.courseId,
        weekId: Number(body.weekId),
        lessonId: body.lessonId,
        slug: body.slug,
        title: body.title || body.name,
        name: body.name || body.title,
        subtitle: body.subtitle || "",
        content: body.content || "",
        videoUrl: body.videoUrl || null,
        attachments: body.attachments || null,
        createdAt: body.createdAt || new Date().toISOString().split("T")[0],
        updatedAt: body.updatedAt || new Date().toISOString().split("T")[0],
      })

      const result = await lesson.save()
      console.log("Created lesson:", result)
      res.status(201).json({ success: true, data: result })
    } else if (req.method === "PATCH") {
      const { courseId, weekId, lessonId } = req.query
      if (!courseId || !weekId || !lessonId) {
        return res.status(400).json({
          success: false,
          message: "courseId, weekId, and lessonId are required.",
        })
      }

      const body = req.body
      const updateData: any = {
        updatedAt: new Date().toISOString().split("T")[0],
      }

      // Handle title/name synchronization
      if (body.title) {
        updateData.title = body.title
        updateData.name = body.title
      } else if (body.name) {
        updateData.name = body.name
        updateData.title = body.name
      }

      // Add other fields if they exist
      if (body.slug) updateData.slug = body.slug
      if (body.subtitle) updateData.subtitle = body.subtitle
      if (body.content) updateData.content = body.content
      if (body.videoUrl) updateData.videoUrl = body.videoUrl
      if (body.attachments) updateData.attachments = body.attachments

      // Check for slug uniqueness if updating slug
      if (updateData.slug) {
        const existingLesson = await Lesson.findOne({
          courseId: courseId.toString(),
          weekId: Number.parseInt(weekId.toString()),
          slug: updateData.slug,
          lessonId: { $ne: lessonId.toString() },
        }).lean()

        if (existingLesson) {
          return res.status(409).json({
            success: false,
            message: "A lesson with the same courseId, weekId, and slug already exists.",
          })
        }
      }

      const result = await Lesson.findOneAndUpdate(
        {
          courseId: courseId.toString(),
          weekId: Number.parseInt(weekId.toString()),
          lessonId: lessonId.toString(),
        },
        { $set: updateData },
        { new: true, runValidators: true },
      ).lean()

      if (!result) {
        return res.status(404).json({ success: false, message: "Lesson not found." })
      }

      console.log("Updated lesson:", result)
      res.status(200).json({ success: true, data: result })
    } else if (req.method === "DELETE") {
      const { courseId, weekId, lessonId } = req.query
      if (!courseId || !weekId || !lessonId) {
        return res.status(400).json({
          success: false,
          message: "courseId, weekId, and lessonId are required.",
        })
      }

      const result = await Lesson.findOneAndDelete({
        courseId: courseId.toString(),
        weekId: Number.parseInt(weekId.toString()),
        lessonId: lessonId.toString(),
      }).lean()

      if (!result) {
        return res.status(404).json({ success: false, message: "Lesson not found." })
      }

      console.log("Deleted lesson:", { courseId, weekId, lessonId })
      res.status(200).json({ success: true, data: result })
    } else {
      res.status(405).json({ success: false, message: "Method not allowed." })
    }
  } catch (error) {
    console.error("Error in /api/lesson-content:", error)
    res.status(500).json({
      success: false,
      message: error.message || "Internal server error.",
      stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
    })
  } finally {
    // Always disconnect from database after request is complete
    await disconnectFromDatabase()
  }
}
