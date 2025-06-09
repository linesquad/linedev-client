import { useYourLogo } from "../../../hooks/yourlogo/useYourLogo";
import { useState } from "react";
import {
  FaPencilAlt,
  FaPlus,
  FaRegFolder,
  FaSearch,
  FaTrash,
} from "react-icons/fa";
import MainSkeleton from "./skeletons/MainSkeleton";
import DeleteYourLogo from "./DeleteYourLogo";

function YourLogoData({
  handleOpenModal,
  setShowUpdateModal,
  setSelectedId,
}: {
  handleOpenModal: () => void;
  setShowUpdateModal: (show: boolean) => void;
  setSelectedId: (id: string) => void;
}) {
  const { data, isLoading, isError, error } = useYourLogo();
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

  if (isLoading) return <MainSkeleton />;

  if (isError)
    return (
      <div className="w-full p-6 bg-red-900/20 border border-red-800 rounded-lg text-red-200">
        <h3 className="text-lg font-semibold mb-2">Error Loading Data</h3>
        <p>{error?.message || "Failed to load logos. Please try again."}</p>
      </div>
    );

  const filteredLogos =
    data.data.filter((logo: { name: string }) =>
      logo.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  return (
    <div className="w-full">
      <div className="bg-[#0E0C15] rounded-lg shadow-xl overflow-hidden border border-gray-800">
        <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-800">
          <div>
            <h2 className="text-2xl font-bold text-white">Your Logos</h2>
            <p className="text-gray-400 mt-1">Manage your brand logos</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search logos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-64 px-4 py-2 pl-10 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <div className="absolute left-3 top-3 text-gray-400">
                <FaSearch size={16} className="text-gray-400" />
              </div>
            </div>

            <button
              onClick={handleOpenModal}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-200 flex items-center cursor-pointer"
            >
              <FaPlus size={13} className="mr-1" />
              <span>Add Logo</span>
            </button>
          </div>
        </div>

        {filteredLogos.length > 0 ? (
          <div className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredLogos.map(
                (logo: { _id: string; name: string; image: string }) => (
                  <div
                    key={logo._id}
                    className="bg-gray-800 hover:bg-gray-750 rounded-lg overflow-hidden border border-gray-700 transition-all duration-200 group"
                  >
                    <div className="p-4 flex flex-col h-full">
                      <div className="flex-grow flex items-center justify-center p-4">
                        <img
                          src={logo.image}
                          alt={logo.name}
                          className="w-full h-32 object-contain rounded-md"
                        />
                      </div>
                      <div className="pt-4 border-t border-gray-700 mt-2">
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="font-medium text-white truncate">
                            {logo.name}
                          </h3>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => {
                                setShowUpdateModal(true);
                                setSelectedId(logo._id);
                              }}
                              className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-gray-700 transition-colors duration-200 cursor-pointer"
                            >
                              <FaPencilAlt size={16} className="text-white" />
                            </button>
                            <button
                              onClick={() => setIsOpenDeleteModal(true)}
                              className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-gray-700 transition-colors duration-200 cursor-pointer"
                            >
                              <FaTrash size={16} className="text-red-500" />
                            </button>
                            {isOpenDeleteModal && (
                              <DeleteYourLogo
                                id={logo._id}
                                setIsOpenDeleteModal={setIsOpenDeleteModal}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 px-4">
            <div className="bg-gray-800/50 p-4 rounded-full mb-4 cursor-pointer">
              <FaRegFolder size={48} className="text-gray-500" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-300">
              {searchTerm ? "No matching logos found" : "No logos found"}
            </h3>
            <p className="text-gray-500 text-center max-w-md mb-6">
              {searchTerm
                ? `No logos matching "${searchTerm}" were found. Try a different search term or clear the search.`
                : "Get started by adding your first logo to enhance your brand presence."}
            </p>
            {searchTerm ? (
              <button
                onClick={() => setSearchTerm("")}
                className="text-blue-500 hover:text-blue-400 transition-colors duration-200 cursor-pointer"
              >
                Clear search
              </button>
            ) : (
              <button
                onClick={handleOpenModal}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-200 flex items-center cursor-pointer"
              >
                <FaPlus size={13} className="mr-1" />
                Create Your First Logo
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default YourLogoData;
