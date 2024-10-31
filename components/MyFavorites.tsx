import React, { useCallback, useEffect, useState } from "react";
import { useSimilarSongs } from "../contexts/SimilarSongsContext";
import { useArtist } from "../contexts/ArtistContext";
import AddToPlayListButton from "@/components/AddToPlayList";
import AddRemoveFavoritesButton from "@/components/AddRemoveFavoritesButton";
import Link from "next/link";
import Spinner from "@/components/Spinner";
import { Card } from "@/components/ui/card";
import { refreshTokenFromResponse } from "@/utils/authUtils";
import CompareModelButton from '@/components/CompareModelsButton';

interface UsersFavorites {
  filepath: string;
  artist: string;
  album: string;
  title: string;
}

const ManageMyFavorites = () => {
  const [songs, setSongs] = useState<UsersFavorites[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { songPath, setsongPath } = useSimilarSongs();
  const { artistName, setArtistName } = useArtist();

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
          if (response.status === 401) {
            window.location.href = "/sign-in";
          } else {
            throw new Error(`Network response was not ok: ${response.statusText}`);
          }
        }
        refreshTokenFromResponse(response);
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setSongs(data);
        } else {
          throw new Error("Data format is incorrect, expected an array of songs");
        }
      })
      .catch((error) => {
        console.error(error);
        setError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchMyFavorites();
  }, [fetchMyFavorites]);

  if (isLoading) return <div className="text-white"><Spinner /></div>;
  if (error) return <div className="text-white">Error: {error}</div>;

  return (
    <div className="h-screen overflow-auto pb-32">
      <div className="mt-8 p-7">
        {songs.length > 0 ? (
          songs.map((song, index) => (
            <Card key={index} className="flex flex-col bg-[#111827] rounded-lg m-2 border-gray-700 text-slate-300 shadow-lg p-4 mb-4 max-w-[90%] mx-auto h-auto">
              <Link href="/homepage/similar-songs">
                <div
                  onClick={() => {
                    setsongPath(song.filepath);
                    setArtistName(song.artist);
                  }}
                  className="cursor-pointer"
                >
                  <h3 className="text-lg font-bold text-slate-400 overflow-ellipsis overflow-hidden whitespace-nowrap mb-2">
                    {song.title}
                  </h3>
                  <div className="grid grid-cols-4 gap-4 items-center">
                    <div className="col-span-3">
                      <p className="truncate">{song.artist}</p>
                      <p className="truncate">{song.album}</p>
                    </div>
                    <div className="flex flex-col items-end space-y-1">
                      <div className="flex flex-col space-y-1">
                        <AddToPlayListButton song_full_path={song.filepath} size="small" />
                        <AddRemoveFavoritesButton songPath={song.filepath} onRemove={() => fetchMyFavorites()} />
                      </div>
                      <CompareModelButton filePath={song.filepath} label="Compare models !" />
                    </div>
                  </div>
                </div>
              </Link>
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