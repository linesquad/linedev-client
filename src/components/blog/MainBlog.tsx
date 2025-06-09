import { useForm, Controller } from "react-hook-form";
import { useCreateBlog } from "../../hooks/useCreateBlog";
import { useGetBloggerPosts } from "../../hooks/useGetBlog";
import { toast } from "react-hot-toast";
import { useGetProfile } from "../../hooks/useGetProfile";
import { useState } from "react";

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

  const {
    data: profile,
    isLoading: proFileLoading,
    isError: profileError,
  } = useGetProfile();

  const { mutate } = useCreateBlog();
  const { data, isLoading, isError } = useGetBloggerPosts();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      title: "",
      content: "",
      image: "",
      category: "",
      tags: [],
      isFeatured: false,
    },
  });

  const tags = watch("tags");

 
  const [tagInput, setTagInput] = useState("");

  const onSubmit = (data: FormValues) => {
    if (!profile?.user?.id) {
      toast.error("User profile not loaded");
      return;
    }

    if (!data.title || !data.content || !data.image || !data.category) {
      toast.error("Fill all the fields!");
      return;
    }

    mutate({
      title: data.title,
      content: data.content,
      tags: data.tags,
      image: data.image,
      category: data.category,
      isFeatured: data.isFeatured,
      author: profile.user.id,
    });

    reset();
    setTagInput("");
  };

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setValue("tags", [...tags, tagInput.trim()]);
      }
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setValue(
      "tags",
      tags.filter((tag) => tag !== tagToRemove)
    );
  };

  if (isLoading || proFileLoading) return <p>loading</p>;
  if (isError || profileError) return <p>error</p>;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
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
              {...register("title", { required: "Title is required" })}
              type="text"
              className="w-full border px-3 py-2 rounded"
              placeholder="Enter blog title"
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>
          <div>
            <label className="block font-medium mb-1">Content</label>
            <textarea
              {...register("content", { required: "Content is required" })}
              rows={6}
              className="w-full border px-3 py-2 rounded"
              placeholder="Write your blog content..."
            />
            {errors.content && (
              <p className="text-red-500 text-sm">{errors.content.message}</p>
            )}
          </div>
        </div>
      )}

      {activeTab === "media" && (
        <div className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Image URL</label>
            <input
              {...register("image", { required: "Image URL is required" })}
              type="text"
              className="w-full border px-3 py-2 rounded"
              placeholder="https://example.com/image.jpg"
            />
            {errors.image && (
              <p className="text-red-500 text-sm">{errors.image.message}</p>
            )}
          </div>
        </div>
      )}

      {activeTab === "categories" && (
        <div className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Category</label>
            <input
              {...register("category", { required: "Category is required" })}
              type="text"
              className="w-full border px-3 py-2 rounded"
              placeholder="Enter category"
            />
            {errors.category && (
              <p className="text-red-500 text-sm">{errors.category.message}</p>
            )}
          </div>

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
              {tags.map((tag, idx) => (
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
            <Controller
              control={control}
              name="isFeatured"
              render={({ field }) => (
                <>
                  <input
                    type="checkbox"
                    id="featured"
                    className="w-4 h-4"
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                  />
                  <label htmlFor="featured" className="text-sm">
                    Featured Post?
                  </label>
                </>
              )}
            />
          </div>
        </div>
      )}

      <div className="flex justify-end space-x-4 mt-8">
        <button
          type="button"
          className="bg-gray-200 hover:bg-gray-300 text-sm px-4 py-2 rounded"
          onClick={() => {
            reset();
            setTagInput("");
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
