import { useGetBloggerPosts } from "../../hooks/useGetBlog";
import { useGetProfile } from "../../hooks/useGetProfile";
import { IoBagSharp } from "react-icons/io5";

export default function Profile() {
  const { data: profile } = useGetProfile();

  const {
    data: blogsData,
    isLoading: blogsLoading,
    isError: blogsError,
  } = useGetBloggerPosts();

  return (
    <div className="flex flex-col md:flex-row justify-center gap-8 p-6 max-w-5xl mx-auto">
      {/* Profile Card */}
      <div className="bg-[#1f1f2b] border border-[#AD46FF] rounded-2xl shadow-xl p-6 w-full max-w-[280px] transition-transform hover:scale-[1.02]">
        <h1 className="text-lg font-semibold text-white mb-4 text-center">
          Profile
        </h1>
        <div className="flex items-center gap-4">
          <div className="bg-[#2b2b39] p-3 rounded-full">
            <IoBagSharp className="text-[#AD46FF] text-2xl" />
          </div>
          <div>
            <p className="text-white text-md font-medium">
              {profile?.user?.name}
            </p>
            <p className="text-gray-400 text-sm capitalize">
              {profile?.user?.role}
            </p>
          </div>
        </div>
      </div>

      {/* Blogs Count Card */}
      <div className="bg-[#1f1f2b] border border-[#AD46FF] rounded-2xl shadow-xl p-6 w-full max-w-[280px] flex flex-col items-center justify-center transition-transform hover:scale-[1.02]">
        <h1 className="text-lg font-semibold text-white mb-4">All Blogs</h1>
        {blogsLoading ? (
          <p className="text-gray-400">Loading...</p>
        ) : blogsError ? (
          <p className="text-red-400">Error loading blogs</p>
        ) : (
          <p className="text-white text-2xl font-bold">
            {blogsData?.blogs?.length ?? 0}
          </p>
        )}
      </div>
    </div>
  );
}
