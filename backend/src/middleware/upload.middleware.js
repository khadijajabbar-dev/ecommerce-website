import multer from "multer";

// Store the file in memory (as a Buffer) instead of saving it to disk.
// We then stream that buffer directly to Cloudinary.
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // Increased to 10MB
    timeout: 120000 // 120 seconds
  },
});

export default upload;