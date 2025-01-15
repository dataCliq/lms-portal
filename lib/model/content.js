import mongoose from "mongoose";

const contentModel = new mongoose.Schema({
    navigationId: String, // The ID of the navigation item this content belongs to
    title: String,        // Title of the content
    body: String,         // HTML or Markdown body for the content
});

export const Content = mongoose.models.content || mongoose.model('content', contentModel);
