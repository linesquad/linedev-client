


import { useForm } from "@tanstack/react-form";
import { toast } from "react-hot-toast";
import { useUpdateBlog } from "../../hooks/useUpdateBlog";
import { useState } from "react";

interface UpdateProps {
  selectedBlog: any;
  setIsModalOpen: (open: boolean) => void;
}

interface FormValues {
  title: string;
  content: string;
  image: string;
  category: string;
  tags: string[];
  isFeatured: boolean;
}

export default function Update({ selectedBlog, setIsModalOpen }: UpdateProps) {
  const { mutate, isPending } = useUpdateBlog();
  const [tagInput, setTagInput] = useState("");
  const form = useForm<FormValues>({
    defaultValues: {
      title: selectedBlog?.title || "",
      content: selectedBlog?.content || "",
      image: selectedBlog?.image || "",
      category: selectedBlog?.category || "",
      tags: selectedBlog?.tags || [],
      isFeatured: selectedBlog?.isFeatured || false,
    },
    onSubmit: async ({ value }) => {
      mutate({
        blogId: selectedBlog._id,
        title: value.title,
        content: value.content,
        author: selectedBlog.author,
        tags: value.tags,
        image: value.image,
        category: value.category,
        isFeatured: value.isFeatured,
      });

      setIsModalOpen(false);
      toast.success("Blog updated successfully");
    },
  });
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
    <div className="space-y-4 text-sm">
      <h2 className="text-lg font-semibold">Update Blog Post</h2>
      <form onSubmit={(e) => form.handleSubmit(e)} className="space-y-4">
        <form.Field name="title">
          {(field) => (
            <div>
              <label>Title</label>
              <input
                type="text"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                className="w-full border px-3 py-2 rounded"
              />
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
                className="w-full border px-3 py-2 rounded"
              />
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
                className="w-full border px-3 py-2 rounded"
              />
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
                className="w-full border px-3 py-2 rounded"
              />
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
