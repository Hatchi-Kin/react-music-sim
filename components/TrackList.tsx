import React, { useCallback, useEffect, useState } from "react";
import { useAlbum } from "../contexts/AlbumContext";
import { useArtist } from "../contexts/ArtistContext";
import { useSimilarSongs } from "../contexts/SimilarSongsContext";
import { Card } from "@/components/ui/card";
import AddToPlayListButton from "@/components/AddToPlayList";
import Link from "next/link";

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

  if (isLoading) return <div className="text-white">Loading...</div>;
  if (error) return <div className="text-white">Error: {error}</div>;

  return (
    <div>
      <h1 className="text-slate-300 text-4xl mb-6 ml-20 font-bold tracking-wide uppercase bg-gradient-to-r from-sky-800 via-sky-600 to-sky-200 bg-clip-text text-transparent">
        All tracks for <span className="text-sky-500 font-extrabold">{albumName}</span> of{" "}
        <span className="text-sky-500 font-extrabold">{artistName}</span>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 mt-8 p-7">
        {tracks.length > 0 ? (
          tracks.map((track, index) => (
            <Link href="/homepage/similar-songs" key={index}>
              <Card
                onClick={() => setsongPath(track.path)}
                key={index}
                className="bg-[#111827] rounded-lg ml-2 mr-2 border-gray-700 text-slate-300 shadow-lg p-4 hover:bg-gradient-to-r from-sky-800 to-sky-600 transition-colors h-28"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold text-slate-400">
                    {track.tracknumber}. {track.title}
                  </h3>
                  <AddToPlayListButton song_full_path={track.path} size="small" />
                </div>
              </Card>
            </Link>
          ))
        ) : (
          <p>No tracks available</p>
        )}
      </div>
    </div>
  );
};

export default TracksForAlbum;
