import mongoose from "mongoose";

const courseModel=new mongoose.Schema({
    name: String
})

export const Course= mongoose.models.test1 || mongoose.model('test1',courseModel)
