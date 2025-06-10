import { useCreatePricing } from "../../../hooks/pricing/useCreatePricing";
import { useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";

interface CreatePricingProps {
  setShowCreateForm: (show: boolean) => void;
}

function CreatePricing({ setShowCreateForm }: CreatePricingProps) {
  const { mutate: createPricing, isPending } = useCreatePricing();
  const [features, setFeatures] = useState<string[]>([]);
  const [featureInput, setFeatureInput] = useState("");

  const handleAddFeature = () => {
    if (featureInput.trim()) {
      setFeatures([...features, featureInput.trim()]);
      setFeatureInput("");
    }
  };

  const handleRemoveFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const title = formData.get("title") as string;
    const priceString = formData.get("price") as string;
    const price = parseFloat(priceString);
    const description = formData.get("description") as string;
    createPricing(
      { title, price, description, features },
    );
    setShowCreateForm(false);
  };

  return (
    <div className="bg-gray-900/30 rounded-lg p-6 border border-gray-800">
      <h2 className="text-xl font-bold mb-6 text-white border-b border-gray-800 pb-2">
        Create New Pricing Plan
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="flex flex-col">
          <label
            htmlFor="title"
            className="mb-1 text-sm font-medium text-gray-300"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            placeholder="e.g. Basic, Premium, Enterprise"
            name="title"
            className="p-2.5 bg-gray-800 border border-gray-700 text-white rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="price"
            className="mb-1 text-sm font-medium text-gray-300"
          >
            Price
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500">$</span>
            </div>
            <input
              type="number"
              id="price"
              placeholder="99.99"
              name="price"
              className="pl-7 p-2.5 bg-gray-800 border border-gray-700 text-white rounded-md shadow-sm w-full focus:ring-blue-500 focus:border-blue-500"
              min="0"
              step="0.01"
              required
            />
          </div>
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="description"
            className="mb-1 text-sm font-medium text-gray-300"
          >
            Description
          </label>
          <input
            type="text"
            id="description"
            placeholder="Brief description of this plan"
            name="description"
            className="p-2.5 bg-gray-800 border border-gray-700 text-white rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium text-gray-300">
            Features
          </label>
          <div className="flex space-x-2 mb-3">
            <input
              type="text"
              value={featureInput}
              onChange={(e) => setFeatureInput(e.target.value)}
              placeholder="Add a feature"
              className="p-2.5 bg-gray-800 border border-gray-700 text-white rounded-md shadow-sm flex-1 focus:ring-blue-500 focus:border-blue-500"
              onKeyPress={(e) =>
                e.key === "Enter" && (e.preventDefault(), handleAddFeature())
              }
            />
            <button
              type="button"
              onClick={handleAddFeature}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-150"
            >
              <FaPlus />
            </button>
          </div>
          {features.length > 0 && (
            <div className="bg-gray-800/50 rounded-md p-3 border border-gray-700">
              <p className="text-xs text-gray-400 mb-2">
                Features included in this plan:
              </p>
              <div className="flex flex-wrap gap-2">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center bg-gray-800 border border-gray-700 rounded-full pl-3 pr-2 py-1 text-sm group hover:border-gray-600 transition-colors duration-150"
                  >
                    <span className="mr-1 text-gray-300">{feature}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveFeature(index)}
                      className="text-gray-400 hover:text-red-500 transition-colors duration-150 p-1 rounded-full"
                    >
                      <FaTrash size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2.5 px-4 rounded-md hover:from-blue-600 hover:to-purple-700 disabled:from-blue-400 disabled:to-purple-400 transition-colors duration-200 mt-4 font-medium cursor-pointer"
        >
          {isPending ? "Creating..." : "Create Plan"}
        </button>
      </form>
    </div>
  );
}

export default CreatePricing;
