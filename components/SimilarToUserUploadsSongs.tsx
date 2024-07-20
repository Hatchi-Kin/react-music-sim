import React, { useEffect, useState, useCallback } from "react";
import Spinner from "@/components/Spinner";
import { useSimilarSongs } from "../contexts/SimilarSongsContext";
import { useArtist } from "../contexts/ArtistContext";
import AddToPlayListButton from "@/components/AddToPlayList";
import AddRemoveFavoritesButton from "@/components/AddRemoveFavoritesButton";
import Link from "next/link";

interface Song {
  title: string;
  album: string;
  artist: string;
  path: string;
}

const SimilarToUserUploadsSongs = () => {
  const [filename, setFilename] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [songs, setSongs] = useState<Song[]>([]);
  const [error, setError] = useState(null);
  const { songPath, setsongPath } = useSimilarSongs();
  const { setArtistName } = useArtist();

  // Parse the query parameters directly from the URL because we are lazy monsters
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const filenameParam = queryParams.get("filename");
    if (filenameParam) {
      setFilename(filenameParam);
    }
  }, []);

  const fetchSimilarSongs = useCallback(() => {
    if (!filename) return; // Ensure filename is not empty

    setIsLoading(true);
    const token = localStorage.getItem("authToken") ?? "";
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    fetch(`${baseUrl}/milvus/similar_short_entity_to_temp`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        filepath: filename, 
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data.entities)) {
          setSongs(data.entities);
        } else {
          throw new Error("Data format is incorrect, expected an array of songs");
        }
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  }, [filename]); 

  // Call fetchSimilarSongs only when filename is set
  useEffect(() => {
    fetchSimilarSongs();
  }, [fetchSimilarSongs]);

  if (isLoading)
    return (
      <div className="text-white">
        <Spinner />
      </div>
    );
  if (error) return <div className="text-white">Error: {error}</div>;

  return (
    <div className="h-screen overflow-auto pb-32">
      <h1 className="text-slate-300 text-4xl mb-6 ml-20 font-bold tracking-wide uppercase bg-gradient-to-r from-sky-800 via-sky-600 to-sky-200 bg-clip-text text-transparent">
        Similar Songs to: <span className="text-sky-500 font-extrabold">{filename}</span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 mt-8 p-7">
        {songs.length > 0 ? (
          songs.map((song, index) => (
            <div
              key={index}
              className="bg-[#111827] rounded-lg ml-2 mr-2 border border-gray-700 text-slate-300 shadow-lg p-4 hover:bg-gradient-to-r from-sky-800 to-sky-600 transition-colors h-32 flex"
            >
              <div className="flex-grow relative">
                <Link href="/homepage/similar-songs">
                  <div
                    className="absolute inset-0"
                    onClick={() => {
                      setsongPath(song.path);
                      setArtistName(song.artist);
                    }}
                  >
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-bold text-slate-400 overflow-ellipsis overflow-hidden whitespace-nowrap max-w-xs">
                        {song.title}
                      </h3>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                      <p className="flex-grow ml-6 overflow-ellipsis overflow-hidden whitespace-nowrap max-w-xs">
                        {song.artist}
                      </p>
                      <p className="flex-grow mr-6 overflow-ellipsis overflow-hidden whitespace-nowrap max-w-xs">
                        {song.album}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="w-8">
                <AddToPlayListButton song_full_path={song.path} size="small" />
                <AddRemoveFavoritesButton songPath={song.path} />
              </div>
            </div>
          ))
        ) : (
          <p>No similar songs found.</p>
        )}
      </div>
    </div>
  );
};

export default SimilarToUserUploadsSongs;