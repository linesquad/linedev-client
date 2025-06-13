const MainBlogSkeleton = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-[#2b2146fa] border-[3px] border-[#AD46FF] rounded-xl shadow-md mt-[80px] animate-pulse">
      <div className="flex space-x-4 mb-6 border-b pb-2">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-6 w-24 bg-gray-400 rounded"></div>
        ))}
      </div>

      {/* Title field */}
      <div className="mb-6">
        <div className="h-4 w-24 bg-gray-400 rounded mb-2" />
        <div className="h-10 w-full bg-gray-300 rounded" />
      </div>

      {/* Content field */}
      <div className="mb-6">
        <div className="h-4 w-24 bg-gray-400 rounded mb-2" />
        <div className="h-48 w-full bg-gray-300 rounded" />
      </div>

      {/* Image input */}

      {/* Tags */}

      {/* Buttons */}
      <div className="flex justify-end space-x-4 mt-8">
        <div className="h-10 w-24 bg-gray-400 rounded" />
        <div className="h-10 w-24 bg-orange-300 rounded" />
      </div>
    </div>
  );
};

export default MainBlogSkeleton;
