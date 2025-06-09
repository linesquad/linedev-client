import { useCreateYourLogo } from "../../../hooks/yourlogo/useCreateYourLogo";
import { useState } from "react";
import Modal from "../../modal/Modal";

function CreateYourLogo({
  handleCloseModal,
  showModal,
}: {
  handleCloseModal: () => void;
  showModal: boolean;
}) {
  const { mutate: createYourLogo } = useCreateYourLogo();
  const [imageBase64, setImageBase64] = useState<string>("");

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

  const handleCreateYourLogo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const name = formData.get("name") as string;

    createYourLogo({ name, image: imageBase64 });
    handleCloseModal();
  };

  if (!showModal) return null;

  return (
    <Modal>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="bg-[#0E0C15] text-white rounded-lg w-full max-w-xl shadow-2xl">
          <div className="flex justify-between items-center p-6 border-b border-gray-700">
            <h2 className="text-xl font-semibold">Create New Logo</h2>
            <button
              onClick={handleCloseModal}
              className="text-gray-400 hover:text-white transition-colors duration-200"
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

          <form onSubmit={handleCreateYourLogo} className="p-6">
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
                    id="name"
                    name="name"
                    placeholder="Enter logo name"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="image"
                    className="block text-sm font-medium mb-2 text-gray-300"
                  >
                    Logo Image
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      id="image"
                      name="image"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700 transition-all duration-200"
                      required
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
                        alt="Preview"
                        className="w-40 h-40 object-contain rounded-md"
                      />
                    </div>
                    <p className="text-sm text-green-400 mt-2">
                      Image selected
                    </p>
                  </div>
                ) : (
                  <div className="text-center border-2 border-dashed border-gray-600 rounded-lg p-6 w-full h-40 flex flex-col items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="48"
                      height="48"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-gray-500 mb-2"
                    >
                      <rect
                        x="3"
                        y="3"
                        width="18"
                        height="18"
                        rx="2"
                        ry="2"
                      ></rect>
                      <circle cx="8.5" cy="8.5" r="1.5"></circle>
                      <polyline points="21 15 16 10 5 21"></polyline>
                    </svg>
                    <p className="text-gray-500 text-sm">
                      Logo preview will appear here
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                type="button"
                onClick={handleCloseModal}
                className="px-5 py-2.5 mr-3 bg-transparent hover:bg-gray-700 text-white font-medium rounded-md border border-gray-600 transition-all duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md shadow-lg hover:shadow-blue-500/20 transition-all duration-200 flex items-center"
              >
                <span>Create Logo</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
}

export default CreateYourLogo;
