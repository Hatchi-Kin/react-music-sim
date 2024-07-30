import React, { useCallback, useEffect, useState } from "react";
import { useSimilarSongs } from "../contexts/SimilarSongsContext";
import { useArtist } from "../contexts/ArtistContext";
import AddToPlayListButton from "@/components/AddToPlayList";
import AddRemoveFavoritesButton from "@/components/AddRemoveFavoritesButton";
import Link from "next/link";
import Spinner from "@/components/Spinner";
import { Card } from "@/components/ui/card";

interface UsersFavorites {
  filepath: string;
  artist: string;
  album: string;
  title: string;
}

const ManageMyFavorites = () => {
  const [songs, setSongs] = useState<UsersFavorites[]>([]);
  const [rawResponse, setRawResponse] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refresh, setRefresh] = useState(false);

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
          if (response.status === 401) {
            window.location.href = "/sign-in";
          } else {
            throw new Error(`Network response was not ok: ${response.statusText}`);
          }
        }
        return response.json();
      })
      .then((data) => {
        setRawResponse(data);
        if (Array.isArray(data)) {
          setSongs(data);
        } else {
          throw new Error("Data format is incorrect, expected an array of songs");
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError(error.message);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchMyFavorites();
  }, [fetchMyFavorites, refresh]);

  if (isLoading)
    return (
      <div className="text-white">
        <Spinner />
      </div>
    );
  if (error) return <div className="text-white">Error: {error}</div>;

  return (
    <div className="h-screen overflow-auto pb-32">
      <div className="mt-8 p-7">
        {songs.length > 0 ? (
          songs.map((song, index) => (
            <Card
              key={index}
              className="
                flex
                flex-col
                bg-[#111827] 
                rounded-lg 
                ml-2
                mr-2
                border-gray-700 
                text-slate-300 
                shadow-lg 
                p-4 
                mb-4
                h-36
                max-w-[90%] 
                mx-auto 
                "
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
                    <div className="flex justify-between items-center w-full">
                      <h3 className="text-lg font-bold text-slate-400 overflow-ellipsis overflow-hidden whitespace-nowrap mb-4 max-w-xs">
                        {song.title}
                      </h3>
                    </div>
                    <div className="grid grid-cols-4 gap-4 items-center">
                      <div className="col-span-3">
                        <p className="">{song.artist}</p>
                        <p className="">{song.album}</p>
                      </div>
                      <div className="flex flex-col space-y-1 ml-auto">
                        <div className="w-10 h-10">
                          <AddToPlayListButton song_full_path={song.filepath} size="small" />
                        </div>
                        <div className="w-10 h-10">
                          <AddRemoveFavoritesButton
                            songPath={song.filepath}
                            onRemove={() => setRefresh(!refresh)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
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
