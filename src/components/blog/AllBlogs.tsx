import { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { IoSearchSharp } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import { MdDelete, MdOutlineSystemUpdateAlt } from "react-icons/md";
import type { ColumnDef } from "@tanstack/react-table";
import { useDeleteBlogUser } from "../../hooks/useDeleteBlog";
import Update from "./UpdateBlog";
import { usePaginatedBlogs } from "../../hooks/usePaginatedBlogs";
import TableFooter from "./TableFooter";
import BlogsSkeleton from "./skeletons/BlogsSkeleton";
import { useNavigate } from "@tanstack/react-router";
type Blog = {
  _id: number;
  title: string;
  category: string;
  content: string;
  author?: {
    name: string;
  };
  createdAt: string;
};

function DeleteBlog({
  blog,
  onCancel,
  onConfirm,
}: {
  blog: Blog;
  onCancel: () => void;
  onConfirm: (id: number) => void;
}) {
  return (
    <div className="bg-[#1f1f2b] text-white p-6 rounded-xl border border-[#AD46FF] shadow-2xl w-[90%] max-w-lg">
      <h3 className="text-xl font-bold mb-4">Confirm Delete</h3>
      <p>
        Are you sure you want to delete the blog titled{" "}
        <strong>"{blog.title}"</strong>?
      </p>
      <div className="mt-6 flex justify-end gap-4">
        <button
          onClick={onCancel}
          className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 transition"
        >
          Cancel
        </button>
        <button
          onClick={() => onConfirm(blog._id)}
          className="px-4 py-2 bg-red-600 rounded hover:bg-red-700 transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default function AllBlogs() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const {
    data: pagination,
    isLoading,
    isError,
  } = usePaginatedBlogs(currentPage);
  const { mutate } = useDeleteBlogUser();

  const tableData = useMemo<Blog[]>(() => {
    const blogs = pagination?.blogs ?? [];
    if (!search.trim()) return blogs;
    return blogs.filter((blog: { title: string }) =>
      blog.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [pagination, search]);
  const navigate = useNavigate();

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

  // Delete modal state
  const [isModalDelete, setIsModalDelete] = useState(false);
  const [selectedDeleteBlog, setSelectedDeleteBlog] = useState<Blog | null>(
    null
  );

  const openDeleteModal = (blog: Blog) => {
    setSelectedDeleteBlog(blog);
    setIsModalDelete(true);
  };

  const closeDeleteModal = () => {
    setSelectedDeleteBlog(null);
    setIsModalDelete(false);
  };

  const confirmDelete = (id: number) => {
    mutate(id, {
      onSuccess: () => {
        closeDeleteModal();
      },
    });
  };

  return (
    <>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="max-w-6xl mx-auto mt-10 px-4 sm:px-6 py-6 border border-[#AD46FF] bg-[#1f1f2b] text-white shadow-2xl rounded-2xl"
      >
        <h2 className="text-2xl font-bold mb-6 text-white">All Blog Posts</h2>

        <div className="relative w-full mb-6">
          <IoSearchSharp className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title..."
            className="w-full bg-[#2c2c3a] text-white pl-10 pr-4 py-2 rounded-md border border-gray-600 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#AD46FF] transition"
          />
        </div>

        <div className="overflow-x-auto rounded-xl border border-gray-700">
          <table className="w-full text-sm text-left border-collapse bg-[#2a2a38]">
            <thead className="bg-[#34344a] text-gray-300 uppercase text-xs tracking-wider">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-4 py-3 border-b border-gray-700"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  ))}
                  <th className="px-4 py-3 text-center border-b border-gray-700 text-red-400">
                    Delete
                  </th>
                  <th className="px-4 py-3 text-center border-b border-gray-700 text-yellow-400">
                    Update
                  </th>
                </tr>
              ))}
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={columns.length + 2} className="p-6 text-center">
                    <BlogsSkeleton />
                  </td>
                </tr>
              ) : isError ? (
                <tr>
                  <td
                    colSpan={columns.length + 2}
                    className="text-center text-red-500 p-6"
                  >
                    Error loading blogs.
                  </td>
                </tr>
              ) : (
                <AnimatePresence>
                  {table.getRowModel().rows.length > 0 ? (
                    table.getRowModel().rows.map((row, index) => (
                      <motion.tr
                        key={row.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2, delay: index * 0.05 }}
                        className="hover:bg-[#34344a] transition"
                        onClick={() =>
                          navigate({ to: `/blog/${row.original._id}` })
                        }
                      >
                        {row.getVisibleCells().map((cell) => (
                          <td
                            key={cell.id}
                            className="px-4 py-3 border-t border-gray-700 text-gray-100"
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </td>
                        ))}
                        <td className="px-4 py-3 text-center border-t border-gray-700">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              openDeleteModal(row.original);
                            }}
                            className="p-2 rounded-full cursor-pointer bg-red-500/10 hover:bg-red-600/20 text-red-400 hover:text-red-500 transition"
                          >
                            <MdDelete size={18} />
                          </button>
                        </td>
                        <td className="px-4 py-3 text-center border-t border-gray-700">
                          <button
                            onClick={() => {
                              setSelectedBlog(row.original);
                              setIsModalOpen(true);
                            }}
                            className="p-2 cursor-pointer rounded-full bg-yellow-500/10 hover:bg-yellow-600/20 text-yellow-400 hover:text-yellow-500 transition"
                          >
                            <MdOutlineSystemUpdateAlt size={18} />
                          </button>
                        </td>
                      </motion.tr>
                    ))
                  ) : (
                    <motion.tr
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <td
                        colSpan={columns.length + 2}
                        className="text-center p-6 text-gray-400"
                      >
                        No blog posts found.
                      </td>
                    </motion.tr>
                  )}
                </AnimatePresence>
              )}
            </tbody>
          </table>
        </div>

        {pagination && (
          <div className="mt-6">
            <TableFooter
              currentPage={pagination.page}
              total={pagination.total}
              postsLength={tableData.length}
              limit={Math.ceil(pagination.total / pagination.totalPages)}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </motion.div>

      <AnimatePresence>
        {isModalOpen && selectedBlog && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-14 left-1/2 transform -translate-x-1/2 z-50"
          >
            <Update
              selectedBlog={selectedBlog}
              setIsModalOpen={setIsModalOpen}
            />
          </motion.div>
        )}

        {isModalDelete && selectedDeleteBlog && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-[#25252586] bg-opacity-70 z-60 flex items-center justify-center"
          >
            <DeleteBlog
              blog={selectedDeleteBlog}
              onCancel={closeDeleteModal}
              onConfirm={confirmDelete}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
