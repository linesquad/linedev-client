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
    <div className="flex items-center justify-center gap-[100px] p-2">
      <div className="h-[150px] text-[#fff] flex flex-col  justify-center border-[3px] border-[#AD46FF]   w-[180px] rounded-lg shadow-md">
        <h1 className="text-lg font-semibold text-center mb-2">Profile</h1>
        <div className="flex items-center  justify-around ">
          <IoBagSharp className="text-gray-500 text-2xl" />
          <div>
            <h1 className="text-[18px] font-semibold text-[#fff]">
              {profile?.user?.name}
            </h1>
            <h1 className="text-[#ccc] font-semibold text-[15px]">
              {profile?.user?.role}
            </h1>
          </div>
        </div>
      </div>

      <div className="h-[150px] text-[#fff] flex flex-col justify-center items-center border-[3px] border-[#AD46FF]  w-[180px] rounded-lg shadow-md">
        <h1 className="text-lg font-semibold mb-2">All Blogs</h1>
        {blogsLoading ? (
          <p>Loading...</p>
        ) : blogsError ? (
          <p>Error loading blogs</p>
        ) : (
          <p>{blogsData?.blogs?.length ?? 0}</p>
        )}
      </div>
    </div>
  );
}
