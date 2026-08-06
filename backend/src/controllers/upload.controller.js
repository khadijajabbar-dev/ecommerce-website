import streamifier from "streamifier";
import cloudinary from "../config/cloudinary.js";

// Converts the in-memory file buffer into a stream and pipes it to Cloudinary
const streamUpload = (buffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "ecommerce/products",
        timeout: 120000 // 120 seconds timeout
      },
      (error, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    );

    uploadStream.on('error', (err) => {
      reject(err);
    });

    streamifier.createReadStream(buffer).pipe(uploadStream);
  });
};

export const uploadImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image file provided",
      });
    }

    const result = await streamUpload(req.file.buffer);

    return res.status(200).json({
      success: true,
      message: "Image uploaded successfully",
      url: result.secure_url,
    });
  } catch (error) {
    next(error);
  }
};

// Upload up to 4 images at once — returns an array of Cloudinary URLs.
// Form-data field name must be "images".
export const uploadImages = async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No image files provided",
      });
    }

    // Upload all files to Cloudinary in parallel
    const results = await Promise.all(
      req.files.map((file) => streamUpload(file.buffer))
    );

    const urls = results.map((r) => r.secure_url);

    return res.status(200).json({
      success: true,
      message: "Images uploaded successfully",
      urls,
    });
  } catch (error) {
    next(error);
  }
};