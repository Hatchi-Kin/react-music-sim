import React, { useCallback, useEffect, useState } from "react";
import { useSimilarSongs } from "../contexts/SimilarSongsContext";
import { useArtist } from "../contexts/ArtistContext";
import AddToPlayListButton from "@/components/AddToPlayList";
import AddRemoveFavoritesButton from "@/components/AddRemoveFavoritesButton";
import Link from "next/link";
import Spinner from "@/components/Spinner";

interface Song {
  title: string;
  album: string;
  artist: string;
  path: string;
}

const SimilarSongs = () => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const { songPath, setsongPath } = useSimilarSongs();
  const { artistName, setArtistName } = useArtist();

  const trackName = songPath.split("/").pop()?.replace(".mp3", "") || "";

  const fetchSimilarSongs = useCallback(() => {
    setIsLoading(true);
    const token = localStorage.getItem("authToken") ?? "";
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    fetch(`${baseUrl}/milvus/similar_short_entity`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        path: [songPath],
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
        setIsLoading(false);
        setError(error.message);
      });
  }, [songPath]);

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
      <h1
        className="text-slate-300 text-4xl mb-6 ml-20 font-bold tracking-wide uppercase 
                    bg-gradient-to-r from-sky-800 via-sky-600 to-sky-200 bg-clip-text text-transparent"
      >
        Similar songs of <span className="text-sky-500 font-extrabold">{trackName}</span> by{" "}
        <span className="text-sky-500 font-extrabold">{artistName}</span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 p-7">
        {songs.length > 0 ? (
          songs.map((song, index) => (
            <div
              key={index}
              className="bg-[#111827] rounded-lg ml-2 mr-2 border border-gray-700 text-slate-300 shadow-lg p-4 
                          hover:bg-gradient-to-r from-sky-800 to-sky-600 transition-colors h-48 flex flex-col"
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
                      <h3 className="text-lg font-bold text-slate-400 break-words max-w-xs">
                        {song.title}
                      </h3>
                      <div className="flex space-x-2 mt-4">
                        <AddToPlayListButton song_full_path={song.path} size="medium" />
                        <AddRemoveFavoritesButton songPath={song.path} />
                      </div>
                    </div>
                    <div className="flex flex-col justify-between items-start mt-4">
                      <p className="break-words">{song.artist}</p>
                      <p className="break-words mt-2">{song.album}</p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p>No similar songs available</p>
        )}
      </div>
    </div>
  );
};

export default SimilarSongs;
