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

      const file = fileInput.files[0];

      let authParams;
      try {
          authParams = await authenticator();
      } catch (authError) {
          console.error("Failed to authenticate for upload:", authError);
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
          console.log("Upload response:", uploadResponse);
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
      }
  };

  return (
      <div className="imagekit-upload-container">
          <div className="upload-section">
              <input type="file" ref={fileInputRef} accept="image/*" />
              <button type="button" onClick={handleUpload}>
                  Upload file
              </button>
              <br />
              Upload progress: <progress value={progress} max={100}></progress>
          </div>
          
          {/* {uploadedImageUrl && (
              <div className="image-preview">
                  <h3>Uploaded Image:</h3>
                  <Image
                      urlEndpoint="https://ik.imagekit.io/cm4yjrvzz"
                      src={uploadedImageUrl}
                      width={300}
                      height={300}
                      alt="Uploaded image"
                  />
              </div>
          )} */}
      </div>
  );
};

export default UploadExample;