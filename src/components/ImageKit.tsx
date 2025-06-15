import {
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
  upload,
} from "@imagekit/react";
import { Image } from "@imagekit/react";
import { useRef, useState } from "react";

export const ImageKitDisplay = () => {
  return (
    <Image
      urlEndpoint="https://ik.imagekit.io/cm4yjrvzz"
      src="/wall3.jpg"
      width={500}
      height={500}
      alt="Picture of the author"
    />
  );
};

const UploadExample = ({setImageURL}: {setImageURL: (url: string) => void}) => {
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const abortController = new AbortController();

  const authenticator = async () => {
    try {
      const response = await fetch("/auth/imagekit");
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Request failed with status ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      const { signature, expire, token, publicKey } = data;
      return { signature, expire, token, publicKey };
    } catch (error) {
      console.error("Authentication error:", error);
      throw new Error("Authentication request failed");
    }
  };

  const handleUpload = async () => {
    const fileInput = fileInputRef.current;
    if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
      alert("Please select a file to upload");
      return;
    }

    setIsUploading(true);
    const file = fileInput.files[0];

    let authParams;
    try {
      authParams = await authenticator();
    } catch (authError) {
      console.error("Failed to authenticate for upload:", authError);
      setIsUploading(false);
      return;
    }
    const { signature, expire, token, publicKey } = authParams;

    try {
      const uploadResponse = await upload({
        expire,
        token,
        signature,
        publicKey,
        file,
        fileName: file.name, 
        onProgress: (event) => {
          setProgress((event.loaded / event.total) * 100);
        },
        abortSignal: abortController.signal,
      });
      
      if (uploadResponse && uploadResponse.url) {
        setImageURL(uploadResponse.url);
      }
    } catch (error) {
      if (error instanceof ImageKitAbortError) {
        console.error("Upload aborted:", error.reason);
      } else if (error instanceof ImageKitInvalidRequestError) {
        console.error("Invalid request:", error.message);
      } else if (error instanceof ImageKitUploadNetworkError) {
        console.error("Network error:", error.message);
      } else if (error instanceof ImageKitServerError) {
        console.error("Server error:", error.message);
      } else {
        console.error("Upload error:", error);
      }
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <label className="relative cursor-pointer bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded-md transition-colors duration-200 flex-grow">
          <span className="text-sm">{fileInputRef.current?.files?.[0]?.name || "Choose image"}</span>
          <input 
            type="file" 
            ref={fileInputRef} 
            accept="image/*" 
            className="hidden" 
          />
        </label>
        <button 
          type="button" 
          onClick={handleUpload}
          disabled={isUploading}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isUploading ? "Uploading..." : "Upload"}
        </button>
      </div>
      
      {progress > 0 && progress < 100 && (
        <div className="w-full bg-gray-700 rounded-full h-1.5 overflow-hidden">
          <div 
            className="bg-blue-500 h-1.5 rounded-full transition-all duration-300 ease-in-out" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default UploadExample;