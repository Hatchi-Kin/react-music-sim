import React, { useEffect, useState, useCallback } from "react";
import { Card } from "@/components/ui/card";

export interface Song {
  artist: string;
  title: string;
  album: string;
  tracknumber: string;
  year: string;
}

const RandomSongCard = () => {
  const [song, setSong] = useState<Song | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRandomSong = useCallback(() => {
    setIsLoading(true);
    fetch("https://api.music-sim.fr/music_library/random", {
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
        setSong(data.row); // Assuming the data contains a 'row' object with the song details
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchRandomSong();
  }, [fetchRandomSong]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!song) return <div>No song found</div>;

  return (
    <div className="flex flex-col items-center mt-20">
      <button
        onClick={fetchRandomSong}
        className="mt-5 mb-4 p-4 bg-sky-600 hover:bg-sky-800 text-white font-bold text-lg rounded"
      >
        Refresh Song
      </button>
      <div className="mt-4 p-8 w-full max-w-2xl">
        <Card className="bg-[#141b2c] rounded-lg border-none text-white shadow-lg p-14 w-full">
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
