import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

// Load environment variables from .env file
dotenv.config({
  path: "./env",
});

// Connect to the database and start the server
connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log("server is running on port", process.env.PORT || 8000);
    });
  })
  .catch((error) => {
    console.log("Mongo db connection failed:", error);
  });
