import mongoose from "mongoose";


// const {username, password} = process.env;
 const username = process.env.username;
 const password = process.env.password;
// export const connectionSrt="mongodb+srv://"+username+":"+password+"@datacliq.iklmc.mongodb.net/CoursesData?retryWrites=true&w=majority&appName=datacliq";

export const connectionSrt="mongodb+srv://anushka:abc1234@datacliq.iklmc.mongodb.net/CoursesData?retryWrites=true&w=majority&appName=datacliq";

export const connectToDatabase = async () => {
  try {
    if (mongoose.connection.readyState >= 1) {
      console.log("Already connected to MongoDB")
      return true
    }

    console.log("Connecting to MongoDB...")
    await mongoose.connect(connectionSrt, {
      serverSelectionTimeoutMS: 5000,
    })
    console.log("Connected to MongoDB successfully")
    return true
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error)
    return false
  }
}

export const disconnectFromDatabase = async () => {
  try {
    if (mongoose.connection.readyState === 0) {
      console.log("Already disconnected from MongoDB")
      return
    }

    await mongoose.connection.close()
    console.log("Disconnected from MongoDB")
  } catch (error) {
    console.error("Error disconnecting from MongoDB:", error)
  }
}
