import { useUpdateYourLogo } from "../../../hooks/yourlogo/useUpdateYourLogo";
import { useState } from "react";

function UpdateYourLogo({
  setShowUpdateModal,
  id,
}: {
  setShowUpdateModal: (show: boolean) => void;
  id: string;
}) {
  const [imageBase64, setImageBase64] = useState<string>("");
  const { mutate: updateYourLogo, isPending } = useUpdateYourLogo();

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

    if (!imageBase64) {
      alert("Please select an image");
      return;
    }

    updateYourLogo({ id, name, image: imageBase64 });
    setShowUpdateModal(false);
  };

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
              className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="image" className="block text-sm font-medium mb-1">
              Logo Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full p-2 bg-gray-700 rounded border border-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700"
              required
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
