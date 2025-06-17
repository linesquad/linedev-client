type DeleteBlogProps = {
  blog: Blog;
  onCancel: () => void;
  onConfirm: (id: number) => void;
};

export default function DeleteBlog({
  blog,
  onCancel,
  onConfirm,
}: DeleteBlogProps) {
  return (
    <div className="bg-white/10 backdrop-blur-md text-white p-6 rounded-xl border border-[#AD46FF] shadow-2xl w-[90%] max-w-lg z-50 relative">
      <h3 className="text-xl font-bold mb-4 cursor-alias">Confirm Delete</h3>
      <p>
        Are you sure you want to delete the blog titled{" "}
        <strong>"{blog.title}"</strong>?
      </p>
      <div className="mt-6 flex cursor-pointer justify-end gap-4">
        <button
          onClick={onCancel}
          className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600  cursor-pointer"
        >
          Cancel
        </button>

        <button
          onClick={() => onConfirm(blog._id)}
          className="px-4 py-2 bg-red-600 rounded hover:bg-red-700  cursor-pointer"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
