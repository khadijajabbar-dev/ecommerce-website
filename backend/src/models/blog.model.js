import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    excerpt: {
      type: String,
      trim: true,
      default: "",
    },

    content: {
      type: String,
      required: true,
      trim: true,
    },

    coverImage: {
      type: String,
      trim: true,
      default: "",
    },

    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;