import React, { useCallback, useState } from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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
  const [error, setError] = useState(null);
  const [trackName, setTrackName] = useState("");
  const [artistName, setArtistName] = useState("");

  const fetchSimilarTracks = useCallback(() => {
    setIsLoading(true);
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
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setTracks(data);
        } else {
          throw new Error("Data format is incorrect, expected an array of tracks");
        }
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        if (error.message === '{"detail": "Invalid credentials"}') {
          window.location.href = "/sign-in";
        } else {
          setError(error.message);
        }
      });
  }, [trackName, artistName]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    fetchSimilarTracks();
  };

  if (isLoading) return <div className="text-white">Loading...</div>;
  if (error) return <div className="text-white">Error: {error}</div>;

  return (
    <div className="text-white">
      <Card
        className="
    bg-[#111827] 
    rounded-lg 
    mt-20 mb-12
    border-gray-700 
    text-slate-300 
    shadow-lg 
    p-8
    w-1/2
    mx-auto"
      >
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <label className="block mb-4">
            <span className="text-slate-300">Track Name:</span>
            <input
              type="text"
              value={trackName}
              onChange={(e) => setTrackName(e.target.value)}
              className="w-full mt-1 p-2 rounded-md bg-gray-800 text-white"
            />
          </label>
          <label className="block">
            <span className="text-slate-300">Artist Name:</span>
            <input
              type="text"
              value={artistName}
              onChange={(e) => setArtistName(e.target.value)}
              className="w-full mt-1 p-2 rounded-md bg-gray-800 text-white"
            />
          </label>
          <div className="text-center">
            <div className="text-center mt-8">
              <Button
                type="submit"
                className=" py-2 px-4 bg-sky-600 text-white rounded-md hover:bg-sky-700 inline-block"
              >
                Search
              </Button>
            </div>
          </div>
        </form>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 mt-8 p-7">
        {tracks.length > 0 ? (
          tracks.map((track, index) => (
            <Card
              key={index}
              className="
                flex
                items-center
                justify-center
                bg-[#111827] 
                rounded-lg 
                ml-2
                mr-2
                border-gray-700 
                text-slate-300 
                shadow-lg 
                p-4 "
            >
              <Image
                src={track["Cover Image"]}
                alt={track["Track Name"]}
                width={250} // replace with your desired width
                height={250}
                className="max-w-full h-auto"
              />
              <div className="overflow-auto">
                <h3 className="mb-4 ml-4 font-semibold">{track["Track Name"]}</h3>
                <p className="mb-4 ml-4"> {track.Artist}</p>
                <p className="mb-4 ml-4">{track.Album}</p>
              </div>
            </Card>
          ))
        ) : (
          <p className="text-slate-300">No similar tracks available</p>
        )}
      </div>
    </div>
  );
};

export default SimilarSpotiniteTracks;
