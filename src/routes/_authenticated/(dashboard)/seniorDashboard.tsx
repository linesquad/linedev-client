import { createFileRoute, redirect } from "@tanstack/react-router";
import { useYourLogo } from "../../../hooks/yourlogo/useYourLogo";
import { useCreateYourLogo } from "../../../hooks/yourlogo/useCreateYourLogo";
import { useState } from "react";

export const Route = createFileRoute(
  "/_authenticated/(dashboard)/seniorDashboard"
)({
  component: SeniorDashboard,
  loader: async ({ context }) => {
    const role = await context.getUserRole().catch(() => null);
    if (role !== "senior") {
      throw redirect({ to: `/${role}Dashboard` });
    }
  },
});

function SeniorDashboard() {
  const { data, isLoading, isError } = useYourLogo();
  const { mutate: createYourLogo } = useCreateYourLogo();
  const [imageBase64, setImageBase64] = useState<string>("");
  
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;
  if (!data) return <div>No data</div>;
  console.log(data);

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
  };

  return (
    <div className="flex flex-col justify-center items-center gap-8 min-h-screen p-8 bg-[#0E0C15] text-white">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Senior Dashboard</h1>
        <form onSubmit={handleCreateYourLogo} className="bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Create New Logo</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
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
              <label htmlFor="image" className="block text-sm font-medium mb-1">Image</label>
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
                <img src={imageBase64} alt="Preview" className="mt-2 w-32 h-32 object-cover rounded-md" />
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
      
      <div className="w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Your Logos</h2>
        {data.data.length > 0 ? (
          <div className="bg-gray-800 rounded-lg shadow-lg p-4 grid gap-3">
            {data.data.map((logo: { id: string; name: string; image: string }, index: number) => (
              <div key={index} className="flex items-center p-3 bg-gray-700 rounded-md hover:bg-gray-600 transition duration-300">
                <img src={logo.image} alt={logo.name} className="w-10 h-10 rounded-full" />
                <span className="font-medium">{logo.name}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 bg-gray-800 rounded-lg">
            <p className="text-gray-400">No logos found. Create your first logo above.</p>
          </div>
        )}
      </div>
    </div>
  );
}
