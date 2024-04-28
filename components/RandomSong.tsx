import React, { useEffect, useState, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";
import AddToPlayListButton from "@/components/AddToPlayList";

// Define the shape of a song object
export interface Song {
  row: {
    artist: string;
    title: string;
    album: string;
    tracknumber: string;
    year: string;
    filepath: string;
  };
  lyrics: string;
}

const RandomSongCard = () => {
  // State variables for the current song, loading status, and any error message
  const [song, setSong] = useState<Song | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch a random song from the API
  const fetchRandomSong = useCallback(() => {
    setIsLoading(true);
    const token = localStorage.getItem("authToken") ?? "";
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    fetch(`${baseUrl}/lyrics/random-lyrics`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setSong(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  }, []);

  // Fetch a random song when the component mounts
  useEffect(() => {
    fetchRandomSong();
  }, [fetchRandomSong]);

  // Show loading or error message if necessary
  if (isLoading) return <div className="text-white">Loading...</div>;
  if (error) return <div className="text-white">Error: {error}</div>;
  if (!song) return <div className="text-white">No song found</div>;

  return (
    <div>
      <div className="flex flex-col items-center mt-20">
        <button
          onClick={fetchRandomSong}
          className="
            mt-5 mb-4 p-4 
            bg-sky-600 hover:bg-sky-800 text-slate-300 
            font-bold text-lg 
            rounded 
            flex justify-center items-center space-x-2"
        >
          <GiPerspectiveDiceSixFacesRandom className="mr-3" size={24} />
          Refresh Song
          <GiPerspectiveDiceSixFacesRandom className="ml-3" size={24} />
        </button>
        {/* Display the current song */}
        <div className="mt-4 p-8 w-full max-w-2xl">
          <Card className="bg-[#141b2c] rounded-lg border-gray-700  text-slate-300 shadow-lg p-14 w-full">
            <h3 className="text-3xl font-bold p-2">
              {song.row.artist} - {song.row.title}
            </h3>
            <p className="text-xl p-2 mt-2">
              Album: {song.row.album}, Track: {song.row.tracknumber}, Year: {song.row.year}
            </p>
          </Card>
        </div>
        <AddToPlayListButton song_full_path={song.row.filepath} size="large" />
      </div>
      {/* If the song has lyrics, display them */}
      {song.lyrics && song.lyrics !== "No lyrics found for this song." && (
        <div className="mt-4 p-8 w-full max-w-3xl mx-auto">
          <Card className="bg-[#141b2c] rounded-lg border-gray-700 text-slate-300 shadow-lg p-14 w-full">
            {song.lyrics.split("\r\n", 1)[0] && (
              <h3 className="text-2xl font-bold p-2">{song.lyrics.split("\r\n", 1)[0]}</h3>
            )}
            {song.lyrics
              .split("\r\n")
              .slice(1)
              .join("\r\n")
              .split("\n")
              .map((line, index) => (
                <p key={index} className="text-xl text-slate-300 p-2 mt-1">
                  {line}
                </p>
              ))}
          </Card>
        </div>
      )}
    </div>
  );
};

export default RandomSongCard;
