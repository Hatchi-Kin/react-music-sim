import React, { useCallback, useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";

type ExtractingState = {
  [key: string]: "loading" | "success" | null;
};

const UserUploadsList = () => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const token = typeof window !== "undefined" ? localStorage.getItem("authToken") ?? "" : "";
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [uploads, setUploads] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [notification, setNotification] = useState({ message: "", type: "" });
  const [extracting, setExtracting] = useState<ExtractingState>({});

  const fetchUploads = useCallback(() => {
    setIsLoading(true);

    fetch(`${baseUrl}/uploaded/`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          if (response.status === 401) {
            window.location.href = "/sign-in";
          } else {
            throw new Error(`Network response was not ok: ${response.statusText}`);
          }
        }
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          const filenames = data.map((item) => item.filename);
          setUploads(filenames);
        } else {
          throw new Error("Data format is incorrect, expected an array of objects");
        }
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error.message);
      });
  }, [token, baseUrl]);

  useEffect(() => {
    fetchUploads();
  }, [fetchUploads]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (!file) {
      return; // No file selected
    }

    if (file.type !== "audio/mpeg") {
      showNotification("Please select an MP3 file.", "error");
      return; // File is not an MP3, exit the function
    }

    setSelectedFile(file);
  };

  const uploadFile = (file: File) => {
    setIsLoading(true); // Start loading state
    const formData = new FormData();
    formData.append("file", file);

    fetch(`${baseUrl}/minio/upload-temp`, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          if (response.status === 401) {
            window.location.href = "/sign-in"; // Redirect to sign-in if token is expired or invalid
          } else {
            throw new Error("Network response was not ok");
          }
        }
        return response.json();
      })
      .then((data) => {
        console.log("Upload successful", data);
        setSelectedFile(null); // Clear selected file
        setUploadSuccess(true); // Indicate upload success
        fetchUploads(); // Refresh uploads list
        setTimeout(() => setUploadSuccess(false), 5000); // Reset success state after 5 seconds
      })
      .catch((error) => {
        setIsLoading(false); // Stop loading state
        setError(error.message); // Set error message
      });
  };

  // function to call api to fetch embeddings endpoint POST openl3/embeddings/
  async function handleExtractEmbeddings(filePath: string) {
    try {
      setExtracting((prev) => ({ ...prev, [filePath]: "loading" }));
      const response = await fetch(`${baseUrl}/openl3/embeddings/?file_path=${filePath}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          window.location.href = "/sign-in"; // Redirect to sign-in if token is expired or invalid
        } else {
          throw new Error("Failed to extract embeddings");
        }
      }

      setExtracting((prev) => ({ ...prev, [filePath]: "success" }));
      setTimeout(() => setExtracting((prev) => ({ ...prev, [filePath]: null })), 3000); // Hide success message after 3 seconds
    } catch (error) {
      console.error("Error extracting embeddings:", error);
      setExtracting((prev) => ({ ...prev, [filePath]: null }));
    }
  }

  async function handleDeleteFile(filePath: string) {
    try {
      const response = await fetch(`${baseUrl}/minio/delete-temp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ file_path: filePath }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          window.location.href = "/sign-in";
          return;
        }
        throw new Error("Failed to delete the file");
      }
      setUploads(uploads.filter((file) => file !== filePath));

      showNotification("File deleted successfully");
    } catch (error) {
      console.error("Error deleting file:", error);
      showNotification("Error deleting file", "error");
    }
  }

  const showNotification = (message: string, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification({ message: "", type: "" }); // Hide notification after 3 seconds
    }, 3000);
  };

  const checkEmbeddingsExtracted = async (filename: string) => {
    try {
      const response = await fetch(
        `${baseUrl}/minio/emb_extracted/${encodeURIComponent(filename)}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 401) {
        window.location.href = "/sign-in";
        return false;
      }
      const data = await response.json();
      return data.extracted;
    } catch (error) {
      console.error("Failed to check embeddings status:", error);
      return false; // Assume not extracted on error to prevent incorrect redirection
    }
  };

  const redirectToSimilarSongs = async (filename: string) => {
    const extracted = await checkEmbeddingsExtracted(filename);
    if (extracted) {
      const encodedFilename = encodeURIComponent(filename);
      window.location.href = `/homepage/similar-to-user-uploads?filename=${encodedFilename}`;
    } else {
      // Show notification that embeddings need to be extracted first
      showNotification("Please extract embeddings first.", "error");
    }
  };

  if (isLoading)
    return (
      <div className="text-white">
        <Spinner />
      </div>
    );
  if (error) return <div className="text-white">Error: {error}</div>;

  return (
    <div className="h-screen overflow-auto pb-32 mt-16">
      <div className="mb-12 mx-auto sm:mx-12">
        <input
          type="file"
          accept=".mp3"
          onChange={handleFileChange}
          className="w-full sm:w-3/4 p-4 text-lg rounded-lg border-2 border-gray-700 text-white bg-[#111827]"
        />
        {selectedFile && (
          <Button
            onClick={() => uploadFile(selectedFile)}
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4 w-full sm:w-auto"
          >
            Upload File
          </Button>
        )}
      </div>

      {uploads.map((upload, index) => (
        <div key={index} className="mb-4 mx-6">
          <Card className="bg-[#111827] rounded-lg border-gray-700 text-slate-300 shadow-lg p-4">
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <div className="sm:w-1/2">{upload}</div>
              <div className="flex flex-col sm:flex-row space-x-0 sm:space-x-4 mt-4 sm:mt-0">
                {extracting[upload] === "loading" && <Spinner size="tiny" />}
                {extracting[upload] === "success" && <div>Embeddings extracted successfully</div>}
                {extracting[upload] !== "loading" && (
                  <Button
                    onClick={() => handleExtractEmbeddings(upload)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2 sm:mb-0"
                  >
                    Extract Embeddings
                  </Button>
                )}
                <Button
                  onClick={() => redirectToSimilarSongs(upload)} // Updated onClick handler
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2 sm:mb-0"
                >
                  Similar Songs
                </Button>
                <Button
                  onClick={() => handleDeleteFile(upload)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Delete
                </Button>
              </div>
            </div>
          </Card>
        </div>
      ))}

      {/* Notification */}
      {notification.message && (
        <div className={`notification ${notification.type} text-slate-300`}>
          <div className="w-3/4 sm:w-1/2 lg:w-1/4 mx-auto">{notification.message}</div>
        </div>
      )}
    </div>
  );
};

export default UserUploadsList;
