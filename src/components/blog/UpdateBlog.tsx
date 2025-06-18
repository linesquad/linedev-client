import { useForm } from "@tanstack/react-form";
import { toast } from "react-hot-toast";
import { useUpdateBlog } from "../../hooks/useUpdateBlog";
import { useState } from "react";

interface UpdateProps {
  selectedBlog: any;
  setIsModalOpen: (open: boolean) => void;
}
type FormValues = {
  title: string;
  content: string;
  image: string;
  category: string;
  tags: string[];
  isFeatured: boolean;
};

export default function UpdateBlog({
  selectedBlog,
  setIsModalOpen,
}: UpdateProps) {
  const { mutate, isPending } = useUpdateBlog();
  const [tagInput, setTagInput] = useState("");
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const blogData = selectedBlog?.data || {};

  const form = useForm({
    defaultValues: {
      title: blogData.title || "",
      content: blogData.content || "",
      image: blogData.image || "",
      category: blogData.category || "",
      tags: blogData.tags || [],
      isFeatured: blogData.isFeatured || false,
    },
    onSubmit: async ({ value }) => {
      setSubmitAttempted(true);

      if (!value.title.trim()) return;
      if (!value.content.trim()) return;
      if (!value.image.trim()) return;
      if (!value.category.trim()) return;
      if (!value.tags || value.tags.length === 0) return;

      mutate({
        blogId: blogData._id,
        title: value.title,
        content: value.content,
        author: blogData.author,
        tags: value.tags,
        image: value.image,
        category: value.category,
        isFeatured: value.isFeatured,
      });

      setIsModalOpen(false);
      toast.success("Blog updated successfully");
    },
  });

  const showError = <K extends keyof FormValues>(fieldName: K): boolean => {
    const value = form.getFieldValue(fieldName);
    return (
      submitAttempted &&
      (typeof value === "string"
        ? !value.trim()
        : Array.isArray(value)
          ? value.length === 0
          : false)
    );
  };

  const handleRemoveTag = (tag: string) => {
    const currentTags = form.getFieldValue("tags") || [];
    form.setFieldValue(
      "tags",
      currentTags.filter((t: string) => t !== tag)
    );
  };

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      const currentTags = form.getFieldValue("tags") || [];
      if (!currentTags.includes(tagInput.trim())) {
        form.setFieldValue("tags", [...currentTags, tagInput.trim()]);
      }
      setTagInput("");
    }
  };

  return (
    <div className="bg-[#1f1f2b] text-white p-6 rounded-xl border border-[#AD46FF] shadow-2xl w-[90%] max-w-lg">
      <h2 className="text-lg font-semibold">Update Blog Post</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="space-y-4"
      >
        <form.Field name="title">
          {(field) => (
            <div>
              <label>Title</label>
              <input
                type="text"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                className={`w-full border px-3 py-2 rounded ${
                  showError("title") ? "border-red-500" : ""
                }`}
              />
              {showError("title") && (
                <p className="text-red-500 text-xs mt-1">Title is required</p>
              )}
            </div>
          )}
        </form.Field>

        <form.Field name="content">
          {(field) => (
            <div>
              <label>Content</label>
              <textarea
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                className={`w-full border px-3 py-2 rounded ${
                  showError("content") ? "border-red-500" : ""
                }`}
              />
              {showError("content") && (
                <p className="text-red-500 text-xs mt-1">Content is required</p>
              )}
            </div>
          )}
        </form.Field>

        <form.Field name="image">
          {(field) => (
            <div>
              <label>Image URL</label>
              <input
                type="text"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                className={`w-full border px-3 py-2 rounded ${
                  showError("image") ? "border-red-500" : ""
                }`}
              />
              {showError("image") && (
                <p className="text-red-500 text-xs mt-1">Image is required</p>
              )}
            </div>
          )}
        </form.Field>

        <form.Field name="category">
          {(field) => (
            <div>
              <label>Category</label>
              <input
                type="text"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                className={`w-full border px-3 py-2 rounded ${
                  showError("category") ? "border-red-500" : ""
                }`}
              />
              {showError("category") && (
                <p className="text-red-500 text-xs mt-1">
                  Category is required
                </p>
              )}
            </div>
          )}
        </form.Field>

        <div>
          <label className="block font-medium mb-1">Tags</label>
          <input
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleAddTag}
            className="w-full border px-3 py-2 rounded"
            placeholder="Type tag and press Enter"
          />
          <form.Field name="tags">
            {(field) => (
              <div className="flex flex-wrap mt-2 gap-2">
                {field.state.value?.map((tag: string) => (
                  <span
                    key={tag}
                    className="bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-sm flex items-center"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-1 text-orange-500 hover:text-orange-700"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </form.Field>
          {showError("tags") && (
            <p className="text-red-500 text-xs mt-1">
              At least one tag is required
            </p>
          )}
        </div>

        <form.Field name="isFeatured">
          {(field) => (
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={field.state.value}
                onChange={(e) => field.handleChange(e.target.checked)}
              />
              <label>Featured</label>
            </div>
          )}
        </form.Field>

        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={() => setIsModalOpen(false)}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isPending}
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            {isPending ? "Updating..." : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
}
