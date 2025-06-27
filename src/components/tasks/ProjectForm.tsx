import { IoCloseSharp } from "react-icons/io5";
import { useCreateProject } from "../../hooks/useTasks";
import { useForm } from "@tanstack/react-form";
import toast from "react-hot-toast";
import { useState } from "react";

function ProjectForm({ onClose }: { onClose: () => void }) {
  const { createProject, isPending, isError } = useCreateProject();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
      backgroundImageUrl: "",
      startDate: "",
      dueDate: "",
    },
    onSubmit: async ({ value }) => {
      let imageUrl = value.backgroundImageUrl;

      if (selectedFile) {
        try {
          const uploadedUrl = await uploadFileToCloudinary(selectedFile);
          imageUrl = uploadedUrl;
          form.setFieldValue("backgroundImageUrl", uploadedUrl);
        } catch (error) {
          toast.error("Failed to upload image. Please try again.");
          return;
        }
      }

      createProject(
        {
          _id: "",
          ...value,
          backgroundImageUrl: imageUrl,
          startDate: value.startDate
            ? new Date(value.startDate).toISOString()
            : "",
          dueDate: value.dueDate ? new Date(value.dueDate).toISOString() : "",
        },
        {
          onSuccess: () => {
            onClose();
            toast.success("Project created successfully");
          },
          onError: () => {
            toast.error("Error creating project");
          },
        }
      );
    },
  });

  if (isPending) {
    return <div className="text-red-500">Creating project...</div>;
  }

  if (isError) {
    return <div className="text-red-500">Error creating project</div>;
  }

  const validateFile = (file: File) => {
    // Check file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
      toast.error("File size must be less than 5MB");
      return false;
    }

    // Check file type
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
      "image/gif",
    ];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Please select a valid image file (JPEG, PNG, WebP, or GIF)");
      return false;
    }

    return true;
  };

  const uploadFileToCloudinary = async (file: File): Promise<string> => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "linedevproject");
    data.append("cloud_name", "dokjd5xyn");

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/dokjd5xyn/image/upload`,
      {
        method: "POST",
        body: data,
      }
    );

    if (!response.ok) {
      throw new Error(
        `Upload failed: ${response.status} ${response.statusText}`
      );
    }

    const uploadedImageFile: { url: string; error: { message: string } } =
      await response.json();

    if (uploadedImageFile.error) {
      throw new Error(uploadedImageFile.error.message || "Upload failed");
    }

    return uploadedImageFile.url;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      if (!file) {
        toast.error("Please select a file");
        return;
      }

      console.log(file);

      if (!validateFile(file)) {
        return;
      }

      setSelectedFile(file);

      toast.success(
        "File selected! It will be uploaded when you submit the form."
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-[#0E0C15] bg-opacity-40 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Modal */}
      <div className="w-full sm:w-[600px] relative z-10 bg-white rounded-lg shadow-lg p-8 flex flex-col items-center max-h-[90vh] overflow-y-auto mx-4">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl font-bold cursor-pointer"
          onClick={onClose}
          aria-label="Close"
        >
          <IoCloseSharp className="text-2xl text-gray-500 hover:text-red-500 cursor-pointer" />
        </button>
        <h1 className="text-2xl font-bold mb-4">Create Project</h1>
        <form
          className="flex flex-col items-center justify-center gap-3 w-full max-w-[500px]"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <form.Field
            name="title"
            validators={{
              onChange: ({ value }) =>
                !value.trim() ? "Title is required" : undefined,
            }}
          >
            {(field) => (
              <div className="w-full flex flex-col justify-center gap-1">
                <input
                  type="text"
                  placeholder="Project Title"
                  className={`border rounded px-3 py-2 w-full focus:outline-none ${!field.state.meta.isValid ? "border-red-500" : ""}`}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                />
                {!field.state.meta.isValid && (
                  <span className="text-red-500 text-xs">
                    {field.state.meta.errors.join(", ")}
                  </span>
                )}
              </div>
            )}
          </form.Field>
          <form.Field
            name="description"
            validators={{
              onChange: ({ value }) =>
                !value.trim() ? "Description is required" : undefined,
            }}
          >
            {(field) => (
              <div className="w-full">
                <input
                  type="text"
                  placeholder="Project Description"
                  className={`border rounded px-3 py-2 w-full focus:outline-none ${!field.state.meta.isValid ? "border-red-500" : ""}`}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                />
                {!field.state.meta.isValid && (
                  <span className="text-red-500 text-xs">
                    {field.state.meta.errors.join(", ")}
                  </span>
                )}
              </div>
            )}
          </form.Field>
          <form.Field
            name="backgroundImageUrl"
            validators={{
              onChange: ({ value }) =>
                !value.trim() ? "Background image URL is required" : undefined,
            }}
          >
            {(field) => (
              <div className="w-full">
                <input
                  type="file"
                  placeholder="Project background image URL"
                  className={`border rounded px-3 py-2 w-full focus:outline-none ${!field.state.meta.isValid ? "border-red-500" : ""}`}
                  onChange={(e) => {
                    field.handleChange(e.target.value);
                    handleFileChange(e);
                  }}
                  onBlur={field.handleBlur}
                />

                {selectedFile && (
                  <div className="text-green-600 text-xs mt-1">
                    ✓ File selected: {selectedFile.name}
                  </div>
                )}
                {!field.state.meta.isValid && (
                  <span className="text-red-500 text-xs">
                    {field.state.meta.errors.join(", ")}
                  </span>
                )}
              </div>
            )}
          </form.Field>
          <form.Field
            name="startDate"
            validators={{
              onChange: ({ value }) =>
                !value ? "Start date is required" : undefined,
            }}
          >
            {(field) => (
              <div className="w-full">
                <input
                  type="date"
                  placeholder="Project start date"
                  className={`border rounded px-3 py-2 w-full focus:outline-none ${!field.state.meta.isValid ? "border-red-500" : ""}`}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                />
                {!field.state.meta.isValid && (
                  <span className="text-red-500 text-xs">
                    {field.state.meta.errors.join(", ")}
                  </span>
                )}
              </div>
            )}
          </form.Field>
          <form.Field
            name="dueDate"
            validators={{
              onChange: ({ value }) =>
                !value ? "Due date is required" : undefined,
            }}
          >
            {(field) => (
              <div className="w-full">
                <input
                  type="date"
                  placeholder="Project due date"
                  className={`border rounded px-3 py-2 w-full focus:outline-none ${!field.state.meta.isValid ? "border-red-500" : ""}`}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                />
                {!field.state.meta.isValid && (
                  <span className="text-red-500 text-xs">
                    {field.state.meta.errors.join(", ")}
                  </span>
                )}
              </div>
            )}
          </form.Field>
          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer"
          >
            Create Project
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProjectForm;
