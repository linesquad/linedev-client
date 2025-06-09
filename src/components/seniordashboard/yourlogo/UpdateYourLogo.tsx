import { useUpdateYourLogo } from "../../../hooks/yourlogo/useUpdateYourLogo";
import { useState } from "react";
import { useYourLogo } from "../../../hooks/yourlogo/useYourLogo";
import Modal from "../../modal/Modal";

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

  const currentLogo = data?.data?.find(
    (logo: { _id: string }) => logo._id === id
  );

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
    <Modal>    
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#0E0C15] text-white rounded-lg w-full max-w-xl shadow-2xl">
        <div className="flex justify-between items-center p-6 border-b border-gray-700">
          <h2 className="text-xl font-semibold">Update Logo</h2>
          <button
            onClick={() => setShowUpdateModal(false)}
            className="text-gray-400 hover:text-white transition-colors duration-200 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <form onSubmit={handleUpdateYourLogo} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4 md:col-span-1">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-2 text-gray-300"
                >
                  Logo Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  defaultValue={currentLogo.name}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              <div>
                <label
                  htmlFor="image"
                  className="block text-sm font-medium mb-2 text-gray-300"
                >
                  Logo Image (leave empty to keep current)
                </label>
                <div className="relative">
                  <input
                    type="file"
                    id="image"
                    name="image"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700 transition-all duration-200 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            <div className="md:col-span-1 flex items-center justify-center">
              {imageBase64 ? (
                <div className="text-center">
                  <div className="bg-gray-800 p-2 rounded-lg inline-block">
                    <img
                      src={imageBase64}
                      alt="New logo preview"
                      className="w-40 h-40 object-contain rounded-md"
                    />
                  </div>
                  <p className="text-sm text-green-400 mt-2">
                    New image selected
                  </p>
                </div>
              ) : (
                <div className="text-center">
                  <div className="bg-gray-800 p-2 rounded-lg inline-block">
                    <img
                      src={currentLogo.image}
                      alt="Current logo"
                      className="w-40 h-40 object-contain rounded-md"
                    />
                  </div>
                  <p className="text-sm text-gray-300 mt-2">Current Image</p>
                </div>
              )}
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <button
              type="button"
              onClick={() => setShowUpdateModal(false)}
              className="px-5 py-2.5 mr-3 bg-transparent hover:bg-gray-700 text-white font-medium rounded-md border border-gray-600 transition-all duration-200 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md shadow-lg hover:shadow-blue-500/20 transition-all duration-200 flex items-center disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
            >
              {isPending ? "Updating..." : "Update Logo"}
            </button>
          </div>
        </form>
      </div>
    </div>
    </Modal>
  );
}

export default UpdateYourLogo;
