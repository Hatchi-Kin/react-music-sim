import React, { useCallback, useEffect, useState } from "react";
import { useSimilarSongs } from "../contexts/SimilarSongsContext";
import { useArtist } from "../contexts/ArtistContext";
import { Card } from "@/components/ui/card";
import AddToPlayListButton from "@/components/AddToPlayList";
import Link from "next/link";

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

  const { songPath } = useSimilarSongs();
  const { artistName } = useArtist();
  const { setsongPath } = useSimilarSongs();

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
  }, [songPath]);

  useEffect(() => {
    fetchSimilarSongs();
  }, [fetchSimilarSongs]);

  if (isLoading) return <div className="text-white">Loading...</div>;
  if (error) return <div className="text-white">Error: {error}</div>;

  return (
    <div>
      <h1 className="text-slate-300 text-4xl mb-6 ml-20 font-bold tracking-wide uppercase bg-gradient-to-r from-sky-800 via-sky-600 to-sky-200 bg-clip-text text-transparent">
        Similar songs of <span className="text-sky-500 font-extrabold">{trackName}</span> by{" "}
        <span className="text-sky-500 font-extrabold">{artistName}</span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 mt-8 p-7">
        {songs.length > 0 ? (
          songs.map((song, index) => (
            <Link href="/homepage/similar-songs" key={index}>
              <Card
                onClick={() => setsongPath(song.path)}
                key={index}
                className="bg-[#111827] rounded-lg ml-2 mr-2 border-gray-700 text-slate-300 shadow-lg p-4 hover:bg-gradient-to-r from-sky-800 to-sky-600 transition-colors h-32"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold text-slate-400">{song.title}</h3>
                  <AddToPlayListButton song_full_path={song.path} size="small" />
                </div>
                <div className="flex justify-between items-center mt-4">
                  <p className="flex-grow ml-6">{song.artist}</p>
                  <p className="flex-grow mr-6">{song.album}</p>
                </div>
              </Card>
            </Link>
          ))
        ) : (
          <p>No similar songs available</p>
        )}
      </div>
    </div>
  );
};

export default SimilarSongs;
