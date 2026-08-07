import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, Button, Card, Input } from "../../../shared/components";
import { blogSchema } from "../schemas/blogSchema";
import blogService from "../services/blog.service";
import uploadService from "../services/upload.service";

// If `initialData` (an existing post) is passed, the form runs in EDIT mode:
// it pre-fills every field and calls updateBlog instead of createBlog.
const BlogForm = ({ onSaved, onCancel, initialData }) => {
  const isEditMode = Boolean(initialData);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [imagePreview, setImagePreview] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imageError, setImageError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: initialData?.title || "",
      excerpt: initialData?.excerpt || "",
      content: initialData?.content || "",
      coverImage: initialData?.coverImage || "",
      isPublished: initialData?.isPublished ?? true,
    },
  });

  const coverImage = useWatch({ control, name: "coverImage" });

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageError("");
    setImagePreview(URL.createObjectURL(file));
    setUploadingImage(true);

    try {
      const result = await uploadService.uploadImage(file);
      setValue("coverImage", result.url, { shouldValidate: true });
    } catch (err) {
      setImageError(err.message || "Failed to upload image");
      setImagePreview("");
      setValue("coverImage", "");
    } finally {
      setUploadingImage(false);
    }
  };

  const onSubmit = async (data) => {
    setError("");
    setLoading(true);

    try {
      const result = isEditMode
        ? await blogService.updateBlog(initialData._id, data)
        : await blogService.createBlog(data);

      if (!isEditMode) {
        reset();
        setImagePreview("");
      }

      onSaved(result.blog);
    } catch (err) {
      setError(err.message || `Failed to ${isEditMode ? "update" : "publish"} post`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-5">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-bold text-primary">{isEditMode ? "Edit post" : "New post"}</p>
          <h3 className="text-2xl font-extrabold text-[#17233f]">
            {isEditMode ? "Edit Blog Post" : "Write Blog Post"}
          </h3>
        </div>
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <Alert variant="error">{error}</Alert>

        <Input
          id="title"
          label="Post Title"
          placeholder="e.g. 5 tips for a smoother checkout"
          error={errors.title?.message}
          {...register("title")}
        />

        <Input
          as="textarea"
          id="excerpt"
          label="Short Excerpt"
          rows={2}
          placeholder="A one or two line teaser shown on the blog list..."
          error={errors.excerpt?.message}
          {...register("excerpt")}
        />

        <Input
          as="textarea"
          id="content"
          label="Post Content"
          rows={10}
          placeholder="Write your full post here..."
          error={errors.content?.message}
          {...register("content")}
        />

        {/* ===== Cover Image Upload ===== */}
        <div>
          <label htmlFor="coverImageFile" className="mb-2 block text-sm font-semibold text-[#17233f]">
            Cover Image
          </label>

          <input
            id="coverImageFile"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full text-sm text-body file:mr-4 file:rounded-xl file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-bold file:text-white hover:file:bg-primary"
          />

          <input type="hidden" {...register("coverImage")} />

          {uploadingImage && (
            <p className="mt-2 text-sm font-semibold text-primary">Uploading image...</p>
          )}

          {imageError && <p className="mt-2 text-xs font-medium text-red-600">{imageError}</p>}
          {errors.coverImage && !imageError && (
            <p className="mt-2 text-xs font-medium text-red-600">{errors.coverImage.message}</p>
          )}

          {imagePreview && (
            <img
              src={imagePreview}
              alt="Cover preview"
              className="mt-3 h-32 w-56 rounded-xl border border-border-main object-cover"
            />
          )}

          {!imagePreview && coverImage && (
            <img
              src={coverImage}
              alt="Cover preview"
              className="mt-3 h-32 w-56 rounded-xl border border-border-main object-cover"
            />
          )}
        </div>

        <label className="flex items-center gap-2 text-sm font-semibold text-[#17233f]">
          <input type="checkbox" className="h-4 w-4 rounded border-slate-300" {...register("isPublished")} />
          Published (visible on the public blog)
        </label>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button type="submit" disabled={loading || uploadingImage} size="lg" fullWidth className="flex-1">
            {loading
              ? isEditMode
                ? "Saving..."
                : "Publishing..."
              : uploadingImage
              ? "Waiting for image..."
              : isEditMode
              ? "Save Changes"
              : "Publish Post"}
          </Button>
          <Button type="button" onClick={onCancel} disabled={loading} variant="secondary" size="lg">
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default BlogForm;
