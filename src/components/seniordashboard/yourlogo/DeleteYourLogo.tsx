import { useDeleteYourLogo } from "../../../hooks/yourlogo/useDeleteYourLogo";
import { FaExclamationTriangle, FaSpinner, FaTimes } from "react-icons/fa";
import Modal from "../../modal/Modal";
import { useState } from "react";

function DeleteYourLogo({ id, setIsOpenDeleteModal }: { id: string, setIsOpenDeleteModal: (isOpen: boolean) => void }) {
  const { mutate: deleteYourLogo, isPending, isError } = useDeleteYourLogo();
  const [isConfirming, setIsConfirming] = useState(false);

  const handleDelete = () => {
    setIsConfirming(true);
    deleteYourLogo(id);
    setIsOpenDeleteModal(false);
  };

  if (isPending && !isConfirming) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
        <div className="bg-gray-800 rounded-lg p-4 flex items-center gap-3">
          <FaSpinner size={20} className="text-white animate-spin" />
          <p className="text-white">Processing...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
        <div className="bg-red-900/80 text-white rounded-lg p-6 max-w-md">
          <div className="flex items-center gap-3 mb-4">
            <FaExclamationTriangle size={24} className="text-red-300" />
            <h3 className="text-xl font-bold">Error</h3>
          </div>
          <p className="mb-4">There was a problem deleting the logo. Please try again.</p>
          <div className="flex justify-end">
            <button
              onClick={() => setIsOpenDeleteModal(false)}
              className="bg-red-700 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors duration-200 cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Modal>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
        <div className="bg-[#0E0C15] text-white rounded-lg w-full max-w-md shadow-2xl transform transition-all duration-300 ease-in-out">
          <div className="flex justify-between items-center p-6 border-b border-gray-700">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <FaExclamationTriangle className="text-yellow-500" />
              Delete Logo
            </h2>
            <button
              onClick={() => setIsOpenDeleteModal(false)}
              className="text-gray-400 hover:text-white transition-colors duration-200 p-1 rounded-full hover:bg-gray-700 cursor-pointer"
              aria-label="Close"
            >
              <FaTimes size={18} />
            </button>
          </div>
          <div className="p-6">
            <div className="mb-6 text-center">
              <div className="bg-red-500/10 p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <FaExclamationTriangle size={36} className="text-red-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">Confirm Deletion</h3>
              <p className="text-gray-300">
                Are you sure you want to delete this logo? This action cannot be undone.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:justify-center">
              <button
                onClick={handleDelete}
                disabled={isConfirming}
                className={`px-5 py-2.5 rounded-md font-medium transition-all duration-200 flex items-center justify-center cursor-pointer ${
                  isConfirming
                    ? "bg-red-800 cursor-not-allowed"
                    : "bg-red-600 hover:bg-red-700"
                }`}
              >
                {isConfirming ? (
                  <>
                    <FaSpinner className="animate-spin mr-2" size={16} />
                    Deleting...
                  </>
                ) : (
                  "Yes, Delete Logo"
                )}
              </button>
              <button
                onClick={() => setIsOpenDeleteModal(false)}
                disabled={isConfirming}
                className="px-5 py-2.5 rounded-md font-medium border border-gray-600 hover:bg-gray-700 transition-all duration-200 cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default DeleteYourLogo;
