import mongoose from "mongoose";

// const {username, password} = process.env;
 const username = process.env.username;
 const password = process.env.password;
// export const connectionSrt="mongodb+srv://"+username+":"+password+"@datacliq.iklmc.mongodb.net/CoursesData?retryWrites=true&w=majority&appName=datacliq";

export const connectionSrt="mongodb+srv://anushka:abc1234@datacliq.iklmc.mongodb.net/CoursesData?retryWrites=true&w=majority&appName=datacliq";


export const connectToDatabase = async () => {
  if (mongoose.connection.readyState === 0) {
      console.log("Connecting to database...");
      await mongoose.connect(connectionSrt, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
      });
      console.log("Database connected successfully!");
  } else {
      console.log("Database is already connected.");
  }
};
