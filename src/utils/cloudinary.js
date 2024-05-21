// Import the Cloudinary library and alias its v2 version as 'cloudinary'
import { v2 as cloudinary } from "cloudinary";

// Import the file system module from Node.js to handle file operations
import fs from "fs";

// Configuration: Set up Cloudinary with the credentials from environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Cloudinary cloud name from environment variables
  api_key: process.env.CLOUDINARY_API_KEY, // Cloudinary API key from environment variables
  api_secret: process.env.CLOUDINARY_API_SECRET, // Cloudinary API secret from environment variables
});

// Define an asynchronous function to upload a file to Cloudinary
const uploadOnCloudinary = async (localFilePath) => {
  try {
    // If no file path is provided, return null immediately
    if (!localFilePath) return null;

    // Upload the file to Cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto", // Automatically determine the resource type (e.g., image, video)
    });

    // Log the URL of the uploaded file to the console
    console.log("file has been uploaded", response.url);

    // Return the response from Cloudinary, which contains information about the uploaded file
    return response;
  } catch (error) {
    // If an error occurs during the upload process, delete the local file to clean up
    fs.unlinkSync(localFilePath);

    // Return null to indicate that the upload failed
    return null;
  }
};

export { uploadOnCloudinary };
// Example usage of the function (commented out, since it's not part of the function definition)
// uploadOnCloudinary('/path/to/local/file.jpg').then(response => console.log(response));
