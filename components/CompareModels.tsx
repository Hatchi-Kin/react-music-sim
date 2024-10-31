import React, { useCallback, useEffect, useState } from 'react';
import Spinner from '@/components/Spinner';
import { refreshTokenFromResponse } from '@/utils/authUtils';
import Image from 'next/image';
import { Card } from '@/components/ui/card';

interface ModelComparisonProps {
  filePath: string;
}

const ModelComparison: React.FC<ModelComparisonProps> = ({ filePath }) => {
  const [result, setResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const compareModels = useCallback(() => {
    const token = localStorage.getItem("authToken") ?? "";
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    fetch(`${baseUrl}/elo/compare_models`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        file_path: filePath,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          if (response.status === 401) {
            window.location.href = "/sign-in";
          } else {
            throw new Error(`Network response was not ok: ${response.statusText}`);
          }
        }
        refreshTokenFromResponse(response);
        return response.json();
      })
      .then((data) => {
        setResult(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
        setError(error.message);
      });
  }, [filePath]);

  useEffect(() => {
    if (filePath) {
      compareModels();
    }
  }, [filePath, compareModels]);

  return (
    <div className="h-screen overflow-auto pb-32 flex flex-col items-center">
      {isLoading && <Spinner />}
      {result && (
        <div className="space-y-4 w-full max-w-4xl">
          <Card className="bg-[#111827] rounded-lg p-4 text-slate-300 shadow-lg">
            <h2 className="text-xl font-bold mb-2 text-center">Metadata</h2>
            <p><strong>File Path:</strong> {result.filepath}</p>
            <p><strong>File Size:</strong> {result.filesize} MB</p>
            <p><strong>Title:</strong> {result.title}</p>
            <p><strong>Artist:</strong> {result.artist}</p>
            <p><strong>Album:</strong> {result.album}</p>
            <p><strong>Year:</strong> {result.year}</p>
            <p><strong>Track Number:</strong> {result.tracknumber}</p>
            <p><strong>Genre:</strong> {result.genre}</p>
            {result.artwork && (
              <div className="flex justify-center">
                <Image
                  src={`data:image/jpeg;base64,${result.artwork}`}
                  alt="Artwork"
                  width={300}
                  height={300}
                  className="max-w-[70%]"
                />
              </div>
            )}
          </Card>
          <Card className="bg-[#111827] rounded-lg p-4 text-slate-300 shadow-lg h-48">
            <h2 className="text-xl font-bold mb-2 text-center">Custom Model</h2>
            <p>Prediction Model 1: </p>
            <strong className="text-4xl m-2">{result.prediction_model_1}</strong>
          </Card>
          <Card className="bg-[#111827] rounded-lg p-4 text-slate-300 shadow-lg h-48">
            <h2 className="text-xl font-bold mb-2 text-center">Predictions OpenL3</h2>
            {result.predictions_openl3 && (
              <div className="flex justify-center">
                <Image
                  src={`data:image/jpeg;base64,${result.predictions_openl3}`}
                  alt="Predictions OpenL3"
                  width={300}
                  height={300}
                  className="max-w-[70%]"
                />
              </div>
            )}
          </Card>
        </div>
      )}
      {error && <div className="text-white">Error: {error}</div>}
    </div>
  );
};

export default ModelComparison;