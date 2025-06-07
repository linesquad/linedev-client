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

    if (!imageBase64) {
      alert("Please select an image");
      return;
    }

    createYourLogo({ name, image: imageBase64 });
    handleCloseModal();
  };

  if (!showModal) return null;

  return (
    <Modal>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
        <div className="flex flex-col justify-center items-center gap-8 p-8 bg-[#0E0C15] text-white rounded-lg w-full max-w-md mx-auto">  
          <div className="w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Create New Logo</h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-white transition duration-300"
                >
                ✕
              </button>
            </div>
               
            <form
              onSubmit={handleCreateYourLogo}
              className="bg-gray-800 rounded-lg shadow-lg p-6 mb-8"
            >
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-1"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter logo name"
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="image"
                    className="block text-sm font-medium mb-1"
                  >
                    Image
                  </label>
                  <input
                    type="file"
                    id="image"
                    name="image"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                {imageBase64 && (
                  <div className="mt-2">
                    <p className="text-sm text-green-400">Image selected</p>
                    <img
                      src={imageBase64}
                      alt="Preview"
                      className="mt-2 w-32 h-32 object-cover rounded-md"
                    />
                  </div>
                )}
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-300 ease-in-out"
                >
                  Create Your Logo
                </button>
              </div>
            </form>
     
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default CreateYourLogo;
