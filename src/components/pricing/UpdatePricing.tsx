import { useUpdatePricing } from "../../hooks/pricing/useUpdatePricing";
import { usePricing } from "../../hooks/pricing/usePricing";
import { useState, useEffect } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";

function UpdatePricing({ id }: { id: string }) {
  const { mutate: updatePricing, isPending } = useUpdatePricing();
  const { data } = usePricing();
  const pricingItem = data?.find((item: any) => item._id === id);
  const [features, setFeatures] = useState<string[]>([]);
  const [featureInput, setFeatureInput] = useState("");

  useEffect(() => {
    if (pricingItem?.features) {
      setFeatures(pricingItem.features);
    }
  }, [pricingItem]);

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
    updatePricing({ _id: id, title, price, description, features });
  };

  if (!id) return null;

  return (
    <div>
      <h2 className="text-xl font-bold mb-6 text-gray-800 border-b pb-2">
        Update Pricing Plan
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="flex flex-col">
          <label
            htmlFor="title"
            className="mb-1 text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            placeholder="e.g. Basic, Premium, Enterprise"
            name="title"
            className="p-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            defaultValue={pricingItem?.title}
            required
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="price"
            className="mb-1 text-sm font-medium text-gray-700"
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
              className="pl-7 p-2.5 border border-gray-300 rounded-md shadow-sm w-full focus:ring-indigo-500 focus:border-indigo-500"
              defaultValue={pricingItem?.price}
              min="0"
              step="0.01"
              required
            />
          </div>
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="description"
            className="mb-1 text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <input
            type="text"
            id="description"
            placeholder="Brief description of this plan"
            name="description"
            className="p-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            defaultValue={pricingItem?.description}
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium text-gray-700">
            Features
          </label>
          <div className="flex space-x-2 mb-3">
            <input
              type="text"
              value={featureInput}
              onChange={(e) => setFeatureInput(e.target.value)}
              placeholder="Add a feature"
              className="p-2.5 border border-gray-300 rounded-md shadow-sm flex-1 focus:ring-indigo-500 focus:border-indigo-500"
              onKeyPress={(e) =>
                e.key === "Enter" && (e.preventDefault(), handleAddFeature())
              }
            />
            <button
              type="button"
              onClick={handleAddFeature}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors duration-150"
            >
              <FaPlus />
            </button>
          </div>

          {features.length > 0 && (
            <div className="bg-gray-50 rounded-md p-3 border border-gray-200">
              <p className="text-xs text-gray-500 mb-2">
                Features included in this plan:
              </p>
              <div className="flex flex-wrap gap-2">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center bg-white border border-gray-200 rounded-full pl-3 pr-2 py-1 text-sm group hover:border-gray-300 transition-colors duration-150"
                  >
                    <span className="mr-1">{feature}</span>
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
          className="w-full bg-indigo-600 text-white py-2.5 px-4 rounded-md hover:bg-indigo-700 disabled:bg-indigo-300 transition-colors duration-200 mt-4 font-medium"
        >
          {isPending ? "Updating..." : "Update Plan"}
        </button>
      </form>
    </div>
  );
}

export default UpdatePricing;
