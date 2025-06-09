import { useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import type { ColumnDef } from "@tanstack/react-table";
import { MdDelete } from "react-icons/md";
import { useGetBloggerPosts } from "../../hooks/useGetBlog";

type Blog = {
  _id: string;
  title: string;
  category: string;
  author?: {
    name: string;
  };
  createdAt: string;
};

export default function AllBlogs() {
  const { data, isLoading, isError } = useGetBloggerPosts();

  const tableData = useMemo<Blog[]>(() => data?.blogs ?? [], [data]);

  const columns = useMemo<ColumnDef<Blog>[]>(
    () => [
      {
        header: "ID",
        cell: (info) => info.row.index + 1,
      },
      {
        header: "Title",
        accessorKey: "title",
      },
      {
        header: "Category",
        accessorKey: "category",
      },
      {
        header: "Author",
        cell: (info) => info.row.original.author?.name || "No Author",
      },
      {
        header: "Created At",
        cell: (info) =>
          new Date(info.row.original.createdAt).toLocaleDateString(),
      },
      {
        header: "Delete",
        cell: () => (
          <button className="text-red-600 hover:text-red-800">
            <MdDelete />
          </button>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

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
        <table className="min-w-full border bg-white border-gray-300 rounded-lg overflow-hidden">
          <thead className="bg-blue-600 text-white">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="border-t border-gray-200 hover:bg-blue-50 transition-colors duration-200"
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-6 py-4 text-sm text-gray-700">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
