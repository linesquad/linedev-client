import { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { IoSearchSharp } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import { MdDelete } from "react-icons/md";
import { MdOutlineSystemUpdateAlt } from "react-icons/md";
import type {
  ColumnDef,
  Row,
  HeaderGroup,
  Header,
  Cell,
} from "@tanstack/react-table";
import { useGetBloggerPosts } from "../../hooks/useGetBlog";
import { useDeleteBlogUser } from "../../hooks/useDeleteBlog";
import Update from "./Update";

type Blog = {
  _id: number;
  title: string;
  category: string;
  author?: {
    name: string;
  };
  createdAt: string;
};

export default function AllBlogs() {
  const { data, isLoading, isError } = useGetBloggerPosts();
  const { mutate } = useDeleteBlogUser();
  const [search, setSearch] = useState("");

  const handleDeletePost = (postId: number) => {
    mutate(postId);
  };

  const tableData = useMemo<Blog[]>(() => {
    const blogs = data?.blogs ?? [];
    if (!search.trim()) return blogs;
    return blogs.filter((blog: { title: string }) =>
      blog.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [data, search]);

  const columns = useMemo<ColumnDef<Blog>[]>(
    () => [
      {
        header: "ID",
        cell: (info) => info.row.index + 1,
      },
      {
        header: "Title",
        accessorKey: "title",
        cell: (info) => {
          const title = info.getValue() as string;
          return title.length > 15 ? `${title.slice(0, 15)}...` : title;
        },
      },
      {
        header: "Category",
        accessorKey: "category",
        cell: (info) => {
          const category = info.getValue() as string;
          return category.length > 15
            ? `${category.slice(0, 15)}...`
            : category;
        },
      },
      {
        header: "Content",
        accessorKey: "content",
        cell: (info) => {
          const content = info.getValue() as string;
          return content?.length > 15 ? `${content.slice(0, 15)}...` : content;
        },
      },
      {
        header: "Created At",
        cell: (info) =>
          new Date(info.row.original.createdAt).toLocaleDateString(),
      },
    ],
    []
  );

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="max-w-4xl mx-auto mt-10 p-6 border-[3px] border-[#AD46FF] shadow-xl rounded-xl"
    >
      <h2 className="text-2xl font-bold mb-4 text-[#f7f7f7]">All Blog Posts</h2>

      <div className="relative w-full mb-4">
        <IoSearchSharp className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by title..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 text-[#f7f7f7] bg-transparent rounded-md focus:outline-none focus:ring-2"
        />
      </div>
      <table className="w-full     bg-gray-100  ">
        <thead className="bg-gray-100  rounded-xl">
          {table.getHeaderGroups().map((headerGroup: HeaderGroup<Blog>) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header: Header<Blog, unknown>) => (
                <th
                  key={header.id}
                  className="border px-4 py-2 text-sm text-left text-gray-700"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
              <th className="border px-4 py-2 text-sm text-center text-red-500">
                Delete
              </th>
              <th className="border px-4 py-2 text-sm text-center text-red-500">
                update
              </th>
            </tr>
          ))}
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={columns.length + 1} className="p-4 text-center">
                Loading...
              </td>
            </tr>
          ) : isError ? (
            <tr>
              <td
                colSpan={columns.length + 1}
                className="text-center text-red-500 p-4"
              >
                Error loading blogs.
              </td>
            </tr>
          ) : (
            <AnimatePresence>
              {table.getRowModel().rows.length > 0 ? (
                table.getRowModel().rows.map((row: Row<Blog>, index) => (
                  <motion.tr
                    key={row.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    className="hover:bg-gray-50  transition-colors"
                  >
                    {row.getVisibleCells().map((cell: Cell<Blog, unknown>) => (
                      <td
                        key={cell.id}
                        className="border px-4 py-2 text-sm text-gray-700"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                    <td className="border px-4 py-2 text-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeletePost(row.original._id);
                        }}
                        className="text-red-500 hover:text-red-700 transition-colors"
                        title="Delete Post"
                      >
                        <MdDelete size={20} />
                      </button>
                    </td>
                    <td className="border px-4 py-2 text-center">
                      <button
                        onClick={() => {
                          setSelectedBlog(row.original);
                          setIsModalOpen(true);
                        }}
                        className="text-[#c7a900] cursor-pointer transition-colors"
                        title="Delete Post"
                      >
                        <MdOutlineSystemUpdateAlt size={20} />
                      </button>
                    </td>
                    {isModalOpen && selectedBlog && (
                      <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="fixed top-10 left-1/2 transform -translate-x-1/2 z-50 bg-white shadow-xl p-6 rounded-lg w-[90%] max-w-md"
                      >
                        <Update
                          selectedBlog={selectedBlog}
                          setIsModalOpen={setIsModalOpen}
                        />
                      </motion.div>
                    )}
                  </motion.tr>
                ))
              ) : (
                <motion.tr
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <td
                    colSpan={columns.length + 1}
                    className="text-center p-4 text-gray-500"
                  >
                    No blog posts found.
                  </td>
                </motion.tr>
              )}
            </AnimatePresence>
          )}
        </tbody>
      </table>
    </motion.div>
  );
}
