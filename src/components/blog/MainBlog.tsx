import { useForm } from "@tanstack/react-form";
import { useCreateBlog } from "../../hooks/useCreateBlog";
import { useGetBloggerPosts } from "../../hooks/useGetBlog";
import { toast } from "react-hot-toast";
import { useGetProfile } from "../../hooks/useGetProfile";
import { useState } from "react";
import "react-quill-new/dist/quill.snow.css";
import ReactQuill from "react-quill-new";

type FormValues = {
  title: string;
  content: string;
  image: string;
  category: string;
  tags: string[];
  isFeatured: boolean;
};

export default function MainBlog() {
  const [activeTab, setActiveTab] = useState<
    "content" | "media" | "categories"
  >("content");
  const [tagInput, setTagInput] = useState("");
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [imagePreview, setImagePreview] = useState("");

  const {
    data: profile,
    isLoading: proFileLoading,
    isError: profileError,
  } = useGetProfile();
  const { mutate } = useCreateBlog();
  const { isLoading, isError } = useGetBloggerPosts();

  const form = useForm<FormValues>({
    defaultValues: {
      title: "",
      content: "",
      image: "",
      category: "",
      tags: [],
      isFeatured: false,
    },
    onSubmit: async ({ value }) => {
      setSubmitAttempted(true);

      if (!profile?.user?.name) {
        toast.error("User profile not loaded");
        return;
      }
      if (!value.title.trim()) return toast.error("Title is required");
      if (!value.content.trim()) return toast.error("Content is required");
      if (!value.image.trim()) return toast.error("Image is required");
      if (!value.category.trim()) return toast.error("Category is required");

      try {
        await mutate({ ...value, author: profile.user.id });
        toast.success("Blog post published successfully!");
        form.reset();
        setTagInput("");
        setImagePreview("");
        setSubmitAttempted(false);
      } catch {
        toast.error("Failed to publish blog post");
      }
    },
  });

  const showError = (fieldName: keyof FormValues) => {
    const field = form.getFieldValue(fieldName);
    return submitAttempted && !field?.trim();
  };

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      const currentTags = form.getFieldValue("tags");
      if (!currentTags.includes(tagInput.trim())) {
        form.setFieldValue("tags", [...currentTags, tagInput.trim()]);
      }
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    const currentTags = form.getFieldValue("tags");
    form.setFieldValue(
      "tags",
      currentTags.filter((tag) => tag !== tagToRemove)
    );
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        form.setFieldValue("image", base64);
        setImagePreview(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    form.handleSubmit();
  };

  if (isLoading || proFileLoading) return <p>Loading...</p>;
  if (isError || profileError) return <p>Error loading data</p>;

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto p-6 bg-[#2b2146fa] text-[#fff] border-[3px] border-[#AD46FF] rounded-xl shadow-md mt-[80px]"
    >
      <div className="flex space-x-4 mb-6 border-b pb-2">
        {["content", "media", "categories"].map((tab) => (
          <button
            type="button"
            key={tab}
            onClick={() => setActiveTab(tab as typeof activeTab)}
            className={`py-2 px-4 rounded-t ${
              activeTab === tab
                ? "border-b-2 border-orange-500 text-orange-600 font-semibold"
                : "text-white"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {activeTab === "content" && (
        <div className="space-y-4">
          <form.Field name="title">
            {(field) => (
              <div>
                <label className="block font-medium mb-1">Title*</label>
                <input
                  type="text"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className={`w-full border px-3 py-2 rounded ${showError("title") ? "border-red-500" : ""}`}
                  placeholder="Enter blog title"
                />
                {showError("title") && (
                  <p className="text-red-500 text-sm mt-1">Title is required</p>
                )}
              </div>
            )}
          </form.Field>
          <form.Field name="content">
            {(field) => (
              <div>
                <label className="block font-medium mb-1">Content*</label>
                <ReactQuill
                  theme="snow"
                  value={field.state.value}
                  onChange={field.handleChange}
                  className={`w-full rounded-md ${showError("content") ? "border border-red-500" : "border border-white"}`}
                  placeholder="Write your blog content..."
                />
                {showError("content") && (
                  <p className="text-red-500 text-sm mt-1">
                    Content is required
                  </p>
                )}
              </div>
            )}
          </form.Field>
        </div>
      )}

      {activeTab === "media" && (
        <form.Field name="image">
          {(field) => (
            <div className="space-y-4">
              <label className="block font-medium mb-1">
                Image URL or Upload*
              </label>
              <input
                type="text"
                value={field.state.value}
                onChange={(e) => {
                  field.handleChange(e.target.value);
                  setImagePreview(e.target.value);
                }}
                className={`w-full border px-3 py-2 rounded ${showError("image") ? "border-red-500" : ""}`}
                placeholder="https://example.com/image.jpg"
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="block mt-2"
              />
              {showError("image") && (
                <p className="text-red-500 text-sm mt-1">Image is required</p>
              )}
              {imagePreview && (
                <div className="mt-2">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="max-h-60 rounded"
                  />
                </div>
              )}
            </div>
          )}
        </form.Field>
      )}

      {activeTab === "categories" && (
        <div className="space-y-4">
          <form.Field name="category">
            {(field) => (
              <div>
                <label className="block font-medium mb-1">Category*</label>
                <input
                  type="text"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className={`w-full border px-3 py-2 rounded ${showError("category") ? "border-red-500" : ""}`}
                  placeholder="Enter category"
                />
                {showError("category") && (
                  <p className="text-red-500 text-sm mt-1">
                    Category is required
                  </p>
                )}
              </div>
            )}
          </form.Field>

          <div>
            <label className="block font-medium mb-1">Tags</label>
            <input
              type="text"
              className="w-full border px-3 py-2 rounded"
              placeholder="Type tag and press Enter"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleAddTag}
            />
            <div className="flex flex-wrap mt-2 gap-2">
              {form.getFieldValue("tags").map((tag, idx) => (
                <span
                  key={idx}
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
          </div>

          <form.Field name="isFeatured">
            {(field) => (
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={field.state.value}
                  onChange={(e) => field.handleChange(e.target.checked)}
                  className="w-4 h-4"
                  id="featured"
                />
                <label htmlFor="featured" className="text-sm">
                  Featured Post?
                </label>
              </div>
            )}
          </form.Field>
        </div>
      )}

      <div className="flex justify-end space-x-4 mt-8">
        <button
          type="button"
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm px-4 py-2 rounded"
          onClick={() => {
            form.reset();
            setTagInput("");
            setImagePreview("");
            setSubmitAttempted(false);
          }}
        >
          Save Draft
        </button>
        <button
          type="submit"
          className="bg-orange-500 hover:bg-orange-600 text-white text-sm px-4 py-2 rounded"
        >
          Publish
        </button>
      </div>
    </form>
  );
}
