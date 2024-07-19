import React, { useCallback, useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";

const UserUploadsList = () => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const token = typeof window !== "undefined" ? localStorage.getItem("authToken") ?? "" : "";
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [uploads, setUploads] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);

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
          throw new Error(`Network response was not ok: ${response.statusText}`);
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
        setError(error.message);
        setIsLoading(false);
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
      alert("Please select an MP3 file.");
      return; // File is not an MP3, exit the function
    }

    setSelectedFile(file);
  };

  const uploadFile = (file: File) => {
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
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Upload successful", data);
        setSelectedFile(null);
        setUploadSuccess(true);
        fetchUploads();
        setTimeout(() => setUploadSuccess(false), 5000);
      })
      .catch((error) => {
        console.error("Upload error:", error);
      });
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
      <div className="mb-4 mx-auto sm:mx-12">
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
        <div
          key={index}
          className="flex flex-col sm:flex-row justify-between mb-4 mx-auto sm:mx-12"
        >
          <Card className="flex items-start justify-between bg-[#111827] rounded-lg border-gray-700 text-slate-300 shadow-lg p-4 w-full sm:w-1/2 mr-2 sm:mr-4">
            {upload}
          </Card>
          <Card className="flex justify-center items-center bg-[#111827] rounded-lg border-gray-700 text-slate-300 shadow-lg p-4 w-full sm:w-1/2 ml-2 sm:ml-4 mt-4 sm:mt-0">
            <div className="flex space-x-4 sm:space-x-24">
              <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                extract embeddings
              </Button>
              <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                similar songs
              </Button>
            </div>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default UserUploadsList;
