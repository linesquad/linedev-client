import { useForm } from "@tanstack/react-form";
import { toast } from "react-hot-toast";
import { useUpdateBlog } from "../../hooks/useUpdateBlog";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

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

const cleanHtml = (html: string) => {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
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

      const plainText = cleanHtml(value.content);

      if (!value.title.trim()) return;
      if (!plainText.trim()) return;
      if (!value.image.trim()) return;
      if (!value.category.trim()) return;
      if (!value.tags || value.tags.length === 0) return;

      const noChange =
        value.title === blogData.title &&
        value.content === blogData.content &&
        value.image === blogData.image &&
        value.category === blogData.category &&
        JSON.stringify(value.tags) === JSON.stringify(blogData.tags) &&
        value.isFeatured === blogData.isFeatured;

      if (noChange) {
        toast.error("No changes detected. Please modify at least one field.");
        return;
      }

      mutate({
        blogId: blogData._id,
        title: value.title,
        content: plainText, 
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
    <div className="bg-[#1f1f2b] text-white p-6 rounded-xl border border-[#AD46FF] shadow-2xl w-[90%] max-w-2xl max-h-[90vh] overflow-y-auto">
      <h2 className="text-xl font-bold mb-6">Update Blog Post</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="space-y-6"
      >
       
        <form.Field name="title">
          {(field) => (
            <div>
              <label className="block mb-1 font-medium">Title</label>
              <input
                type="text"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                className={`w-full bg-[#2b2b3c] text-white border px-4 py-2 rounded outline-none ${
                  showError("title") ? "border-red-500" : "border-gray-500"
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
              <label className="block mb-1 font-medium">Content</label>
              <ReactQuill
                value={field.state.value}
                onChange={(val) => field.handleChange(val)}
                className=" bg-white/5 backdrop-blur-sm border border-white/20 rounded"
                theme="snow"
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
              <label className="block mb-1 font-medium">Image URL</label>
              <input
                type="text"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                className={`w-full bg-[#2b2b3c] text-white border px-4 py-2 rounded outline-none ${
                  showError("image") ? "border-red-500" : "border-gray-500"
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
              <label className="block mb-1 font-medium">Category</label>
              <input
                type="text"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                className={`w-full bg-[#2b2b3c] text-white border px-4 py-2 rounded outline-none ${
                  showError("category") ? "border-red-500" : "border-gray-500"
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
          <label className="block mb-1 font-medium">Tags</label>
          <input
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleAddTag}
            className="w-full bg-[#2b2b3c] text-white border border-gray-500 px-4 py-2 rounded outline-none"
            placeholder="Type tag and press Enter"
          />
          <form.Field name="tags">
            {(field) => (
              <div className="flex flex-wrap gap-2 mt-2">
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
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={field.state.value}
                onChange={(e) => field.handleChange(e.target.checked)}
              />
              <label className="font-medium">Featured</label>
            </div>
          )}
        </form.Field>

     
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => setIsModalOpen(false)}
            className="px-4 py-2 bg-gray-500 rounded text-white hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isPending}
            className="px-4 py-2 bg-purple-600 rounded text-white hover:bg-purple-700"
          >
            {isPending ? "Updating..." : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
}
