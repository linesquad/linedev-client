const MainSkeleton = () => {
  return (
    <div className="w-full">
      <div className="bg-[#0E0C15] rounded-lg shadow-xl overflow-hidden border border-gray-800">
        <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-800">
          <div>
            <div className="h-8 w-40 bg-gray-800 rounded-md animate-pulse"></div>
            <div className="h-4 w-56 bg-gray-800 rounded-md animate-pulse mt-2"></div>
          </div>

          <div className="flex items-center gap-3">
            <div className="h-10 w-64 bg-gray-800 rounded-md animate-pulse"></div>
            <div className="h-10 w-28 bg-gray-800 rounded-md animate-pulse"></div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {[...Array(6)].map((_, index) => (
              <div 
                key={index}
                className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 transition-all duration-200"
              >
                <div className="p-4 flex flex-col h-full">
                  <div className="flex-grow flex items-center justify-center p-4">
                    <div className="w-full h-32 bg-gray-700 rounded-md animate-pulse"></div>
                  </div>
                  <div className="pt-4 border-t border-gray-700 mt-2">
                    <div className="flex items-center justify-between">
                      <div className="h-5 w-24 bg-gray-700 rounded-md animate-pulse"></div>
                      <div className="h-6 w-6 bg-gray-700 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainSkeleton;
