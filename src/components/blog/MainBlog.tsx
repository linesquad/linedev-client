import { useState } from "react";
import { useCreateBlog } from "../../hooks/useCreateBlog";
import { useGetBloggerPosts } from "../../hooks/useGetBlog";
import { toast } from "react-hot-toast";
import { useGetProfile } from "../../hooks/useGetProfile";

export default function MainBlog() {
  const [activeTab, setActiveTab] = useState<
    "content" | "media" | "categories"
  >("content");

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "",
    image: "",
    category: "",
    tags: [] as string[],
    isFeatured: false,
  });

  const [tagInput, setTagInput] = useState("");

  const { mutate } = useCreateBlog();
  const { data, isLoading, isError } = useGetBloggerPosts();
  console.log(data);
  const {
    data: profile,
    isLoading: proFileLoading,
    isError: profileError,
  } = useGetProfile();
  console.log(profile?.user?.id);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      if (!formData.tags.includes(tagInput.trim())) {
        setFormData((prev) => ({
          ...prev,
          tags: [...prev.tags, tagInput.trim()],
        }));
      }
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const { title, content, image, category, tags, isFeatured } = formData;
    const authorId = profile?.user?.id;

    console.log("Submitting with values:");
    console.log("title:", title);
    console.log("content:", content);
    console.log("image:", image);
    console.log("category:", category);
    console.log("authorId:", authorId);

    if (!title || !content || !image || !category || !authorId) {
      toast.error("Fill all the fields!");
      return;
    }

    mutate({
      title,
      content,
      tags,
      image,
      category,
      isFeatured,
      author: authorId,
    });

    e.currentTarget.reset();
    setFormData({
      title: "",
      content: "",
      author: "",
      image: "",
      category: "",
      tags: [],
      isFeatured: false,
    });
    setTagInput("");
  };

  if (isLoading || proFileLoading) return <p>loading</p>;
  if (isError || profileError) return <p>error</p>;

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto p-6 bg-white border rounded-xl shadow-md mt-10"
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
                : "text-gray-500"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {activeTab === "content" && (
        <div className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Title</label>
            <input
              name="title"
              type="text"
              required
              className="w-full border px-3 py-2 rounded"
              placeholder="Enter blog title"
              value={formData.title}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Content</label>
            <textarea
              name="content"
              rows={6}
              required
              className="w-full border px-3 py-2 rounded"
              placeholder="Write your blog content..."
              value={formData.content}
              onChange={handleChange}
            />
          </div>
        </div>
      )}

      {activeTab === "media" && (
        <div className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Image URL</label>
            <input
              name="image"
              type="text"
              className="w-full border px-3 py-2 rounded"
              placeholder="https://example.com/image.jpg"
              value={formData.image}
              onChange={handleChange}
            />
          </div>
        </div>
      )}

      {activeTab === "categories" && (
        <div className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Category</label>
            <input
              name="category"
              type="text"
              className="w-full border px-3 py-2 rounded"
              placeholder="Enter category"
              value={formData.category}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Tags</label>
            <input
              name="tag"
              type="text"
              className="w-full border px-3 py-2 rounded"
              placeholder="Type tag and press Enter"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleAddTag}
            />
            <div className="flex flex-wrap mt-2 gap-2">
              {formData.tags.map((tag, idx) => (
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

          <div className="flex items-center space-x-2">
            <input
              name="isFeatured"
              type="checkbox"
              id="featured"
              className="w-4 h-4"
              checked={formData.isFeatured}
              onChange={handleChange}
            />
            <label htmlFor="featured" className="text-sm">
              Featured Post?
            </label>
          </div>
        </div>
      )}

      <div className="flex justify-end space-x-4 mt-8">
        <button
          type="button"
          className="bg-gray-200 hover:bg-gray-300 text-sm px-4 py-2 rounded"
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
