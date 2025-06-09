import { useState } from "react";
import { usePricing } from "../../../hooks/pricing/usePricing";
import CreatePricing from "./CreatePricing";
import UpdatePricing from "./UpdatePricing";
import DeletePricing from "./DeletePricing";

function PricingData() {
  const { data, isLoading, isError, error } = usePricing();
  const [id, setId] = useState<string>("");

  if (isLoading)
    return (
      <div className="w-full p-6 bg-gray-800/20 border border-gray-800 rounded-lg text-gray-400 text-center">
        Loading...
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
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((item: any) => (
              <div
                key={item._id}
                className="bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-700"
              >
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white flex justify-between items-center">
                  <div>
                    <h3 className="text-2xl font-bold">${item.price}</h3>
                    <p className="text-gray-100 mt-2 font-medium">
                      {item.description}
                    </p>
                  </div>
                  <div>
                    <DeletePricing id={item._id} />
                  </div>
                </div>

                <div className="p-6">
                  <h4 className="text-lg font-semibold mb-4 text-white">
                    Features
                  </h4>
                  <ul className="space-y-3">
                    {item.features.map((feature: string, index: number) => (
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
                    ))}
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
                    className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-200 w-full"
                    onClick={() => setId(item._id)}
                  >
                    Update
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <CreatePricing />
      <UpdatePricing id={id} />
    </div>
  );
}

export default PricingData;
