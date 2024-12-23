import React, { useCallback, useState } from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/Spinner";
import { refreshTokenFromResponse } from "@/utils/authUtils";

interface SimilarTrack {
  "Track Name": string;
  Artist: string;
  Album: string;
  URI: string;
  "Cover Image": string;
}

const SimilarSpotiniteTracks = () => {
  const [tracks, setTracks] = useState<SimilarTrack[]>([]);
  const [isLoading, setIsLoading] = useState(false); // Initialize to false
  const [error, setError] = useState<string | null>(null);
  const [trackName, setTrackName] = useState("");
  const [artistName, setArtistName] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const fetchSimilarTracks = useCallback(() => {
    setIsLoading(true);
    setHasSearched(true);
    const token = localStorage.getItem("authToken") ?? "";
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    fetch(`${baseUrl}/spotinite/similar_tracks`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: trackName,
        artist: artistName,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          if (response.status === 401) {
            window.location.href = "/sign-in"; // Redirect to sign-in if token is expired or invalid
          } else if (response.status === 400) {
            // Check if the status is 400
            return response.json().then((data) => {
              if (data.detail === "list index out of range") {
                // Check if the detail is "list index out of range"
                return Promise.reject(
                  "No matches found, please make sure the artist and name are correct."
                );
              } else {
                return Promise.reject(`Network response was not ok: ${response.statusText}`);
              }
            });
          } else {
            return Promise.reject(`Network response was not ok: ${response.statusText}`);
          }
        } else {
          refreshTokenFromResponse(response);
          return response.json();
        }
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setTracks(data);
        } else if (Array.isArray(data) && data.length === 0) {
          setError("No tracks found");
        } else {
          setError("Data format is incorrect, expected an array of tracks");
        }
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error.message);
      });
  }, [trackName, artistName]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    fetchSimilarTracks();
  };

  if (isLoading)
    return (
      <div className="text-white">
        <Spinner />
      </div>
    );
  if (error) return <div className="text-white">Error: {error}</div>;

  return (
    <div className="text-white">
      <p className="text-slate-300 mt-12 mb-2 text-center">
        Enter the artist name and track name to find similar tracks. Click &apos;Search&apos; to get recommendations.
      </p>
      <Card
        className="
          bg-[#111827] 
          rounded-lg 
          mt-4 mb-12 
          border-gray-700 
          text-slate-300 
          shadow-lg 
          p-8
          w-full
          md:w-3/4 
          lg:w-1/2
          mx-auto"
      >
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <label className="block mb-4">
            <span className="text-slate-300">Artist Name:</span>
            <input
              type="text"
              value={artistName}
              onChange={(e) => setArtistName(e.target.value)}
              className="w-full mt-1 p-2 rounded-md bg-gray-800 text-white"
            />
          </label>
          <label className="block">
            <span className="text-slate-300">Track Name:</span>
            <input
              type="text"
              value={trackName}
              onChange={(e) => setTrackName(e.target.value)}
              className="w-full mt-1 p-2 rounded-md bg-gray-800 text-white"
            />
          </label>
          <div className="text-center">
            <div className="text-center mt-8">
              <Button
                type="submit"
                className="py-2 px-4 bg-sky-600 text-white rounded-md hover:bg-sky-700 inline-block"
              >
                Search
              </Button>
            </div>
          </div>
        </form>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-8 p-7">
        {tracks.length > 0
          ? tracks.map((track, index) => (
              <Card
                key={index}
                className="
                  flex
                  flex-col
                  md:flex-row
                  items-center
                  bg-[#111827] 
                  rounded-lg 
                  border-gray-700 
                  text-slate-300 
                  shadow-lg 
                  p-4"
              >
                <Image
                  src={track["Cover Image"]}
                  alt={track["Track Name"]}
                  width={250}
                  height={250}
                  className="max-w-full h-auto"
                />
                <div className="mt-4 md:mt-0 md:ml-4 overflow-auto">
                  <h3 className="mb-2 font-semibold">{track["Track Name"]}</h3>
                  <p className="mb-2">{track.Artist}</p>
                  <p className="mb-2">{track.Album}</p>
                </div>
              </Card>
            ))
          : hasSearched && (
              <p className="text-slate-300">
                No similar tracks available, please make sure the track name and artist name are
                correct.
              </p>
            )}
      </div>
    </div>
  );
};

export default SimilarSpotiniteTracks;
