import { useGetBloggerPosts } from "../../hooks/useGetBlog";

export default function AllBlogs() {
  const { data, isLoading, isError } = useGetBloggerPosts();

  if (isLoading)
    return <p className="text-center mt-10 text-gray-500">Loading...</p>;
  if (isError)
    return (
      <p className="text-center mt-10 text-red-500">Error loading blogs.</p>
    );

  return (
    <div className="max-w-5xl mx-auto mt-12 px-4">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">All Blogs</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                Author
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                Created At
              </th>
            </tr>
          </thead>
          <tbody>
            {data.blogs.map((blog, index) => (
              <tr
                key={blog._id}
                className="border-t border-gray-200 hover:bg-blue-50 transition-colors duration-200"
              >
                <td className="px-6 py-4 text-sm text-gray-700">{index + 1}</td>{" "}
                <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                  {blog.title}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {blog.category}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {blog.content}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {new Date(blog.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
