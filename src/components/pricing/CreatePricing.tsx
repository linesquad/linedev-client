import { useCreatePricing } from "../../hooks/pricing/useCreatePricing";
import { useState } from "react";

function CreatePricing() {
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
    createPricing({ title, price, description, features });
  };

  return (
    <div className="container mx-auto px-4 py-10 mt-20">
      <h1 className="text-2xl font-bold mb-6">Create Pricing</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="title" className="mb-1">
            Title
          </label>
          <input
            type="text"
            id="title"
            placeholder="Title"
            name="title"
            className="p-2 border rounded"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="price" className="mb-1">
            Price
          </label>
          <input
            type="number"
            id="price"
            placeholder="Price"
            name="price"
            className="p-2 border rounded"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="description" className="mb-1">
            Description
          </label>
          <input
            type="text"
            id="description"
            placeholder="Description"
            name="description"
            className="p-2 border rounded"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1">Features</label>
          <div className="flex space-x-2 mb-2">
            <input
              type="text"
              value={featureInput}
              onChange={(e) => setFeatureInput(e.target.value)}
              placeholder="Add a feature"
              className="p-2 border rounded flex-1"
            />
            <button
              type="button"
              onClick={handleAddFeature}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Add
            </button>
          </div>
          {features.length > 0 && (
            <ul className="mt-2 border p-2 rounded">
              {features.map((feature, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center py-1"
                >
                  <span>{feature}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveFeature(index)}
                    className="text-red-500"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <button
          type="submit"
          disabled={isPending}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-blue-300"
        >
          {isPending ? "Creating..." : "Create"}
        </button>
      </form>
    </div>
  );
}

export default CreatePricing;
