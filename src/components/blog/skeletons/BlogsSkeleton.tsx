const BlogsSkeleton = () => {
  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 border-[3px] border-[#AD46FF] shadow-xl rounded-xl bg-gray-50 animate-pulse">
      <table className="w-full bg-white border border-gray-300 rounded-md overflow-hidden">
        <thead className="bg-gray-100"></thead>
        <tbody>
          {[...Array(5)].map((_, rowIdx) => (
            <tr key={rowIdx}>
              {[...Array(5)].map((_, colIdx) => (
                <td key={colIdx} className="border px-4 py-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
                </td>
              ))}
              <td className="border px-4 py-2 text-center">
                <div className="h-4 w-6 mx-auto bg-gray-200 rounded"></div>
              </td>
              <td className="border px-4 py-2 text-center">
                <div className="h-4 w-6 mx-auto bg-gray-200 rounded"></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BlogsSkeleton;
