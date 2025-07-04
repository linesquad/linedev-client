function ProjectSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 min-h-screen pt-30 pb-30 px-4 sm:px-6 lg:px-8 bg-[#0E0C15]">
      <div className="h-full w-full text-[#ffffff]">
        <div className="min-h-[128px] bg-cover bg-center animate-pulse bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6">
            <div className="flex flex-col mb-6">
              {/* Date skeleton */}
              <div className="h-6 bg-white bg-opacity-20 rounded mb-2 animate-pulse w-48"></div>
              {/* Greeting skeleton */}
              <div className="h-8 bg-white bg-opacity-20 rounded animate-pulse w-64"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="h-full w-full">
        {/* Title skeleton */}
        <div className="h-8 bg-white bg-opacity-20 rounded animate-pulse w-48 mb-6"></div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mt-6">
          <div className="p-6">
            <div className="flex justify-end items-center mb-6">
              {/* Button skeleton */}
              <div className="h-10 bg-gray-200 rounded-md animate-pulse w-32"></div>
            </div>
            <div className="flex flex-wrap gap-4">
              {/* Show 6 skeleton cards while loading */}
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="w-60 bg-white rounded-xl shadow border border-gray-200 p-4 mb-6"
                >
                  <div className="flex flex-col items-center">
                    {/* Image skeleton */}
                    <div className="w-full h-20 bg-gray-200 rounded-md mb-4 animate-pulse flex items-center justify-center">
                      <div className="w-12 h-12 bg-gray-300 rounded-full animate-pulse"></div>
                    </div>

                    {/* Title skeleton */}
                    <div className="text-center w-full">
                      <div className="h-6 bg-gray-200 rounded mb-2 animate-pulse"></div>

                      {/* Description skeleton */}
                      <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectSkeleton;
