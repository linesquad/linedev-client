import { useUpdateYourLogo } from "../../../hooks/yourlogo/useUpdateYourLogo";
import { useState } from "react";
import { useYourLogo } from "../../../hooks/yourlogo/useYourLogo";

function UpdateYourLogo({
  setShowUpdateModal,
  id,
}: {
  setShowUpdateModal: (show: boolean) => void;
  id: string;
}) {
  const [imageBase64, setImageBase64] = useState<string>("");
  const { mutate: updateYourLogo, isPending } = useUpdateYourLogo();
  const { data } = useYourLogo();
  
  const currentLogo = data?.data?.find((logo: { _id: string }) => logo._id === id);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImageBase64(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateYourLogo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const name = formData.get("name") as string;
    
    const imageToUse = imageBase64 || currentLogo.image;
    const nameToUse = name ? name : currentLogo.name;

    updateYourLogo({ id, name: nameToUse, image: imageToUse });
    setShowUpdateModal(false);
  };

  if (!currentLogo) return <div>Loading logo data...</div>;
  if (isPending) return <div>Updating...</div>;
  
  return (
    <div className="fixed inset-0 bg-black/20 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg w-96 max-w-full">
        <h1 className="text-xl font-semibold mb-4">Update Your Logo</h1>
        <form onSubmit={handleUpdateYourLogo} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Logo Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              defaultValue={currentLogo.name}
              className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="image" className="block text-sm font-medium mb-1">
              Logo Image (leave empty to keep current)
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full p-2 bg-gray-700 rounded border border-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700"
            />
          </div>
          <div className="mt-2">
            <p className="text-sm mb-1">Current Image:</p>
            <img 
              src={currentLogo.image} 
              alt="Current logo" 
              className="w-20 h-20 object-contain"
            />
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={() => setShowUpdateModal(false)}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded disabled:opacity-50"
            >
              {isPending ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateYourLogo;
