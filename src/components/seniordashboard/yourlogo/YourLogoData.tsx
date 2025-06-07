import { useYourLogo } from '../../../hooks/yourlogo/useYourLogo'

function YourLogoData({ handleOpenModal }: { handleOpenModal: () => void }) {
  const { data, isLoading, isError, error } = useYourLogo();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error?.message}</div>;

  return (
    <div className="w-full max-w-md">
      <h2 className="text-xl font-semibold mb-4">Your Logos</h2>
      <button 
        onClick={handleOpenModal}
        className="bg-blue-600 hover:bg-blue-700 text-white rounded-full w-8 h-8 flex items-center justify-center transition duration-300"
      >
        <span className="text-xl font-bold">+</span>
      </button>
      {data.data.length > 0 ? (
        <div className="bg-gray-800 rounded-lg shadow-lg p-4 grid gap-3 mt-4">
          {data.data.map((logo: { id: string; name: string; image: string }, index: number) => (
            <div key={index} className="flex items-center gap-3 p-3 bg-gray-700 rounded-md hover:bg-gray-600 transition duration-300">
              <img src={logo.image} alt={logo.name} className="w-10 h-10 rounded-full" />
              <span className="font-medium">{logo.name}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 mt-4 bg-gray-800 rounded-lg">
          <p className="text-gray-400">No logos found. Create your first logo above.</p>
        </div>
      )}
    </div>
  )
}

export default YourLogoData;
