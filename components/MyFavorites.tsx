import React, { useCallback, useEffect, useState } from "react";
import { useSimilarSongs } from "../contexts/SimilarSongsContext";
import { useArtist } from "../contexts/ArtistContext";
import AddToPlayListButton from "@/components/AddToPlayList";
import Link from "next/link";
import Spinner from "@/components/Spinner";
import { Card } from "@/components/ui/card";

interface FavoritesFromAPI {
  album_folder: string;
  id: number;
  filesize: number;
  artist: string;
  year: number;
  genre: string;
  filename: string;
  filepath: string;
  artist_folder: string;
  title: string;
  album: string;
  tracknumber: number;
  top_5_genres: string;
}

interface UsersFavorites {
  filepath: string;
  artist: string;
  album: string;
  title: string;
}

const ManageMyFavorites = () => {
  const [songs, setSongs] = useState<UsersFavorites[]>([]);
  const [rawResponse, setRawResponse] = useState<any>(null); // New state variable for raw response
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const { songPath, setsongPath } = useSimilarSongs();
  const { artistName, setArtistName } = useArtist();

  const trackName = songPath.split("/").pop()?.replace(".mp3", "") || "";

  const fetchMyFavorites = useCallback(() => {
    setIsLoading(true);
    const token = localStorage.getItem("authToken") ?? "";
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    fetch(`${baseUrl}/favorites/`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        setRawResponse(data); // Save the raw response data
        if (Array.isArray(data)) {
          setSongs(data);
        } else {
          throw new Error("Data format is incorrect, expected an array of songs");
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error); // Log any errors
        setError(error.message);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchMyFavorites();
  }, [fetchMyFavorites]);

  if (isLoading)
    return (
      <div className="text-white">
        <Spinner />
      </div>
    );
  if (error) return <div className="text-white">Error: {error}</div>;

  return (
    <div className="h-screen overflow-auto pb-32">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 mt-8 p-7">
        {songs.length > 0 ? (
          songs.map((song, index) => (
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
              <div className="flex-grow relative">
                <Link href="/homepage/similar-songs">
                  <div
                    className=""
                    onClick={() => {
                      setsongPath(song.filepath);
                      setArtistName(song.artist);
                    }}
                  >
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-bold text-slate-400 overflow-ellipsis overflow-hidden whitespace-nowrap max-w-xs">
                        {song.title}
                      </h3>
                      <div className="w-8"></div>
                    </div>
                    <div className="flex flex-col items-center">
                      <p className="">{song.artist}</p>
                      <p className="">{song.album}</p>
                    </div>
                  </div>
                </Link>
              </div>
              <AddToPlayListButton song_full_path={song.filepath} size="small" />
            </Card>
          ))
        ) : (
          <p className="text-slate-300">No Favorites found</p>
        )}
      </div>
    </div>
  );
};

export default ManageMyFavorites;
