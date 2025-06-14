import { useForm } from "@tanstack/react-form";
import { useCreateBlog } from "../../hooks/useCreateBlog";
import { useGetBloggerPosts } from "../../hooks/useGetBlog";
import { toast } from "react-hot-toast";
import { useGetProfile } from "../../hooks/useGetProfile";
import { useState } from "react";
import "react-quill-new/dist/quill.snow.css";
import ReactQuill from "react-quill-new";
import MainBlogSkeleton from "./skeletons/MainBlogSkeleton";

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
  const [quillHtml, setQuillHtml] = useState("");

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
      if (!profile?.user?.name) return toast.error("User profile not loaded");
      if (!value.title.trim()) return toast.error("Title is required");
      if (!value.content.trim()) return toast.error("Content is required");
      if (!value.image.trim()) return toast.error("Image is required");
      if (!value.category.trim()) return toast.error("Category is required");
      if (!value.tags || value.tags.length === 0)
        return toast.error("At least one tag is required");

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
    return submitAttempted && typeof field === "string" && !field.trim();
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
  const handleRemoveTag = (tag: string) => {
    const currentTags = form.getFieldValue("tags") || [];
    form.setFieldValue(
      "tags",
      currentTags.filter((t: string) => t !== tag)
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

  if (isLoading || proFileLoading) return <MainBlogSkeleton />;
  if (isError || profileError) return <p>Error loading data</p>;

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-6xl mx-auto mt-10 px-4 sm:px-6 py-6 border border-[#AD46FF] rounded-2xl shadow-[0_10px_25px_-10px_rgba(173,70,255,0.5)] bg-[#1f1f2b] duration-300 text-white"
    >
      <div className="flex space-x-4 mb-6 border-b pb-2">
        {["content", "media", "categories"].map((tab) => (
          <button
            type="button"
            key={tab}
            onClick={() => setActiveTab(tab as typeof activeTab)}
            className={`py-2 px-4 rounded-t transition font-medium ${
              activeTab === tab
                ? "border-b-2 border-orange-500 text-orange-400"
                : "text-white hover:text-orange-300"
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
                  className={`w-full border border-white/20 focus:border-orange-400 focus:ring-2 focus:ring-orange-400/40 px-4 py-2 rounded-md bg-white/5 backdrop-blur-sm placeholder-white/70 transition-all duration-200 ${
                    showError("title") ? "border-red-500" : ""
                  }`}
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
                  value={quillHtml}
                  onChange={(html) => {
                    setQuillHtml(html);
                    const plainText = html
                      .replace(/<\/?[^>]+(>|$)/g, "")
                      .trim();
                    field.handleChange(plainText);
                  }}
                  className={`w-full rounded-md bg-white/5 backdrop-blur-sm border border-white/20 transition-all duration-200 focus-within:ring-2 focus-within:ring-orange-400/40 ${
                    showError("content") ? "border-red-500" : ""
                  }`}
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
                className={`w-full border border-white/20 focus:border-orange-400 focus:ring-2 focus:ring-orange-400/40 px-4 py-2 rounded-md bg-white/5 backdrop-blur-sm placeholder-white/70 transition-all duration-200 ${
                  showError("image") ? "border-red-500" : ""
                }`}
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
                    className="max-h-60 rounded-lg shadow-md"
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
                  className={`w-full border border-white/20 focus:border-orange-400 focus:ring-2 focus:ring-orange-400/40 px-4 py-2 rounded-md bg-white/5 backdrop-blur-sm placeholder-white/70 transition-all duration-200 ${
                    showError("category") ? "border-red-500" : ""
                  }`}
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
                      className="inline-flex items-center mr-2 px-2 py-1 bg-gray-700 text-white rounded"
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
              <div className="flex items-center space-x-2 mt-4">
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
          type="submit"
          className="bg-orange-500 cursor-pointer hover:bg-orange-600 text-white text-sm px-6 py-2 rounded-lg shadow-lg transition-all duration-200 hover:shadow-orange-500/30"
        >
          Publish
        </button>
      </div>
    </form>
  );
}
