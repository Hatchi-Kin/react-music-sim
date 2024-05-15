import React, { useCallback, useEffect, useState } from "react";
import { useAlbum } from "../contexts/AlbumContext";
import { useArtist } from "../contexts/ArtistContext";
import { useSimilarSongs } from "../contexts/SimilarSongsContext";
import AddToPlayListButton from "@/components/AddToPlayList";
import Link from "next/link";
import Spinner from "@/components/Spinner";
import Header from "@/components/Header";

interface Track {
  tracknumber: number;
  title: string;
  path: string;
}

const TracksForAlbum = () => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { albumName } = useAlbum();
  const { artistName } = useArtist();
  const { setsongPath } = useSimilarSongs();

  const fetchTracklist = useCallback(() => {
    setIsLoading(true);
    const token = localStorage.getItem("authToken") ?? "";
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    fetch(`${baseUrl}/music_library/songs/by_artist_and_album`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        artist: artistName,
        album: albumName,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        setTracks(data); // Set the tracks state with the fetched data
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
        window.location.href = "/sign-in";
      });
  }, [albumName, artistName]);

  useEffect(() => {
    fetchTracklist();
  }, [fetchTracklist]);

  if (isLoading)
    return (
      <div className="text-white">
        <Spinner />
      </div>
    );
  if (error) return <div className="text-white">Error: {error}</div>;

  return (
    <div className="h-screen overflow-auto pb-32">
      {/* eslint-disable-next-line react/no-children-prop */}
      <Header title={`All tracks for "${albumName}" of "${artistName}"`} children={''}></Header>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 mt-8 p-7">
        {tracks.length > 0 ? (
          tracks.map((track, index) => (
            <div
              key={index}
              className="bg-[#111827] rounded-lg ml-2 mr-2 border border-gray-700 text-slate-300 shadow-lg p-4 
                          hover:bg-gradient-to-r from-sky-800 to-sky-600 transition-colors h-28 flex"
            >
              <div className="flex-grow relative">
                <Link href="/homepage/similar-songs">
                  <div className="absolute inset-0" onClick={() => setsongPath(track.path)}>
                    <h3 className="text-lg font-bold text-slate-400">
                      {track.tracknumber}. {track.title}
                    </h3>
                  </div>
                </Link>
              </div>
              <div className="w-8">
                <AddToPlayListButton song_full_path={track.path} size="small" />
              </div>
            </div>
          ))
        ) : (
          <p>No tracks available</p>
        )}
      </div>
    </div>
  );
};

export default TracksForAlbum;
