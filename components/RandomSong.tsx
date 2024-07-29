import React, { useEffect, useState, useCallback, useRef } from "react";
import { Card } from "@/components/ui/card";
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";
import AddToPlayListButton from "@/components/AddToPlayList";
import AddRemoveFavoritesButton from "@/components/AddRemoveFavoritesButton";
import Image from "next/image";
import PlotGenres from "@/components/GenresPlots";
import Spinner from "@/components/Spinner";

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
  artwork: string; // Base64 encoded image
}

const RandomSongCard = () => {
  const [song, setSong] = useState<Song | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const hasFetched = useRef(false); // Ref to track if data has been fetched

  const fetchRandomSong = useCallback(() => {
    setIsLoading(true);
    const token = localStorage.getItem("authToken") ?? "";
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    fetch(`${baseUrl}/lyrics/random-lyrics-metadata`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          if (response.status === 401) {
            window.location.href = "/sign-in";
          } else {
            throw new Error("Network response was not ok");
          }
        }
        return response.json();
      })
      .then((data) => {
        setSong(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error.message);
      });
  }, []);

  useEffect(() => {
    if (!hasFetched.current) {
      fetchRandomSong();
      hasFetched.current = true; // Mark as fetched
    }
  }, [fetchRandomSong]);

  if (isLoading)
    return (
      <div className="text-white">
        <Spinner />
      </div>
    );
  if (error) return <div className="text-white">Error: {error}</div>;
  if (!song) return <div className="text-white">No song found</div>;

  return (
    <div className="mb-12">
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
        <div className="flex flex-col md:flex-row items-stretch gap-4 mt-4 mb-8 p-4 w-full max-w-4xl">
          <Card
            className={`bg-[#141b2c] rounded-lg border-gray-700 text-slate-300 shadow-lg p-6 ${song.artwork ? "grid grid-cols-3 gap-4" : ""} items-center h-84 w-full`}
          >
            <div
              className={`col-span-2 ${song.artwork ? "" : "col-span-3"} flex flex-col justify-between overflow-auto`}
            >
              <h3 className="text-2xl font-bold p-2 break-words">{song.row.artist}</h3>
              <h2 className="text-2xl font-bold p-2 break-words">{song.row.title}</h2>
              <p className="text-xl p-2 mt-2 break-words">
                Album: {song.row.album}, Track: {song.row.tracknumber}, Year: {song.row.year}
              </p>
            </div>
            {song.artwork && (
              <div className="relative w-full md:w-64 h-auto">
                <Image
                  src={`data:image/jpeg;base64,${song.artwork}`}
                  alt="Album Artwork"
                  width={250}
                  height={250}
                  className="rounded-lg"
                />
              </div>
            )}
          </Card>
        </div>

        {/* Display the genre plot */}
        <div className="relative h-full col-span-1 mb-12 w-full max-w-4xl">
          <PlotGenres songPath={song.row.filepath} />
        </div>
        <div className="mb-4">
          <AddRemoveFavoritesButton songPath={song.row.filepath} size="4em" />
        </div>
        <AddToPlayListButton song_full_path={song.row.filepath} size="large" />
        {/* If the song has lyrics, display them */}
        {song.lyrics && song.lyrics !== "No lyrics found for this song." && (
          <div className="mt-4 p-8 w-full max-w-3xl mx-auto">
            <Card className="fixed-height-card bg-[#141b2c] rounded-lg border-gray-700 text-slate-300 shadow-lg p-14 w-full">
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
    </div>
  );
};

export default RandomSongCard;
