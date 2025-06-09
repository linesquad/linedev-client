import { usePricing } from "../../hooks/pricing/usePricing";
import CreatePricing from "./CreatePricing";

function PricingData() {
  const { data, isLoading, isError, error } = usePricing();

  if (isLoading)
    return <div className="text-center py-20 text-gray-500">Loading...</div>;

  if (isError)
    return (
      <div className="text-center py-20 text-red-500">
        Error: {error.message}
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-10 mt-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.map((item: any) => (
          <div
            key={item._id}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
              <h3 className="text-2xl font-bold">${item.price}</h3>
              <p className="text-gray-100 mt-2 font-medium">
                {item.description}
              </p>
            </div>

            <div className="p-6">
              <h4 className="text-lg font-semibold mb-4 text-gray-800">
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
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 pt-4 border-t border-gray-200 text-xs text-gray-500">
                <p>Created: {new Date(item.createdAt).toLocaleDateString()}</p>
                <p>Updated: {new Date(item.updatedAt).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <CreatePricing />
    </div>
  );
}

export default PricingData;
