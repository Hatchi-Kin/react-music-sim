import React, { useEffect, useState, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";

// Define the shape of a song object
export interface Song {
  artist: string;
  title: string;
  album: string;
  tracknumber: string;
  year: string;
}

const RandomSongCard = () => {
  // State variables for the current song, loading status, and any error message
  const [song, setSong] = useState<Song | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch a random song from the API
  const fetchRandomSong = useCallback(() => {
    setIsLoading(true);
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    fetch(`${baseUrl}/music_library/random`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setSong(data.row);
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
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!song) return <div>No song found</div>;

  // Render the component
  return (
    <div className="flex flex-col items-center mt-20">
      {/* Button to fetch a new random song */}
      <button
        onClick={fetchRandomSong}
        className="mt-5 mb-4 p-4 bg-sky-600 hover:bg-sky-800 text-white font-bold text-lg rounded flex justify-center items-center space-x-2"
      >
        <GiPerspectiveDiceSixFacesRandom className="mr-3" size={24} />
        Refresh Song
        <GiPerspectiveDiceSixFacesRandom className="ml-3" size={24} />
      </button>
      {/* Display the current song */}
      <div className="mt-4 p-8 w-full max-w-2xl">
        <Card className="bg-[#141b2c] rounded-lg border-gray-700  text-white shadow-lg p-14 w-full">
          <h3 className="text-3xl font-bold p-2">
            {song.artist} - {song.title}
          </h3>
          <p className="text-xl p-2 mt-2">
            Album: {song.album}, Track: {song.tracknumber}, Year: {song.year}
          </p>
        </Card>
      </div>
    </div>
  );
};

export default RandomSongCard;
