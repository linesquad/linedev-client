import { useState } from "react";
import { usePricing } from "../../../hooks/pricing/usePricing";
import CreatePricing from "./CreatePricing";
import UpdatePricing from "./UpdatePricing";
import DeletePricing from "./DeletePricing";

function PricingData() {
  const { data, isLoading, isError, error } = usePricing();
  const [id, setId] = useState<string>("");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  if (isLoading)
    return (
      <div className="w-full p-6 bg-gray-800/20 border border-gray-800 rounded-lg text-gray-400 text-center">
        <div className="animate-pulse flex justify-center">
          <div className="h-8 w-8 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"></div>
        </div>
        <p className="mt-2">Loading pricing plans...</p>
      </div>
    );

  if (isError)
    return (
      <div className="w-full p-6 bg-red-900/20 border border-red-800 rounded-lg text-red-200">
        <h3 className="text-lg font-semibold mb-2">Error Loading Data</h3>
        <p>
          {error?.message || "Failed to load pricing data. Please try again."}
        </p>
      </div>
    );

  return (
    <div className="w-full">
      <div className="bg-[#0E0C15] rounded-lg shadow-xl overflow-hidden border border-gray-800">
        <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-800">
          <div>
            <h2 className="text-2xl font-bold text-white">Pricing Plans</h2>
            <p className="text-gray-400 mt-1">Manage your subscription plans</p>
          </div>
          <button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-md hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-medium flex items-center justify-center cursor-pointer"
          >
            {showCreateForm ? "Cancel" : "Add New Plan"}
          </button>
        </div>

        {showCreateForm && (
          <div className="border-b border-gray-800 bg-gray-900/50 p-6">
            <CreatePricing setShowCreateForm={setShowCreateForm} />
          </div>
        )}

        <div className="p-6">
          {data?.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <svg
                className="w-16 h-16 mx-auto text-gray-600 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              <h3 className="text-xl font-medium mb-1">No Pricing Plans Yet</h3>
              <p>Create your first pricing plan to get started</p>
              {!showCreateForm && (
                <button
                  onClick={() => setShowCreateForm(true)}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all duration-200"
                >
                  Create Plan
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.map((item: any) => (
                <div
                  key={item._id}
                  className="bg-gray-800/60 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-700 group hover:scale-[1.02] hover:border-blue-500/40"
                >
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white flex justify-between items-start">
                    <div>
                      <span className="inline-block px-2 py-1 bg-white/20 rounded text-xs font-medium mb-2">
                        {item.title || "Plan"}
                      </span>
                      <h3 className="text-3xl font-bold">${item.price}</h3>
                      <p className="text-gray-100 mt-2 font-medium">
                        {item.description}
                      </p>
                    </div>
                    <div className="opacity-70 hover:opacity-100 transition-opacity">
                      <DeletePricing id={item._id} />
                    </div>
                  </div>

                  <div className="p-6">
                    <h4 className="text-lg font-semibold mb-4 text-white">
                      Features
                    </h4>
                    <ul className="space-y-3">
                      {item.features?.length ? (
                        item.features.map((feature: string, index: number) => (
                          <li key={index} className="flex items-start">
                            <svg
                              className="h-5 w-5 text-green-500 mr-2 flex-shrink-0"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            <span className="text-gray-300">{feature}</span>
                          </li>
                        ))
                      ) : (
                        <li className="text-gray-500 italic">
                          No features listed
                        </li>
                      )}
                    </ul>

                    <div className="mt-6 pt-4 border-t border-gray-700 text-xs text-gray-400">
                      <p>
                        Created: {new Date(item.createdAt).toLocaleDateString()}
                      </p>
                      <p>
                        Updated: {new Date(item.updatedAt).toLocaleDateString()}
                      </p>
                    </div>

                    <button
                      className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-200 w-full cursor-pointer"
                      onClick={() => {
                        setId(item._id);
                        setShowUpdateForm(true);
                      }}
                    >
                      Update
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {showUpdateForm && id && (
        <div className="mt-6 bg-[#0E0C15] rounded-lg shadow-xl overflow-hidden border border-gray-800 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-white">Update Plan</h2>
            <button
              onClick={() => {
                setShowUpdateForm(false);
                setId("");
              }}
              className="text-gray-400 hover:text-white"
            >
              Cancel
            </button>
          </div>
        <UpdatePricing id={id} setShowUpdateForm={setShowUpdateForm} />
        </div>
      )}
    </div>
  );
}

export default PricingData;
