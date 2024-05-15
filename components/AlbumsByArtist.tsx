"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { useArtist } from "@/contexts/ArtistContext";
import { useAlbum } from "@/contexts/AlbumContext";
import Link from "next/link";
import Spinner from "@/components/Spinner";
import Header from "@/components/Header";

const AlbumsByArtist = () => {
  const [albums, setAlbums] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const { artistName } = useArtist(); // use the hook to get the artistName
  const artistFolder = "MegaSet/" + artistName;

  const { setAlbumName } = useAlbum();

  const fetchAlbums = useCallback(() => {
    setIsLoading(true);
    const token = localStorage.getItem("authToken") ?? "";
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    fetch(`${baseUrl}/music_library/albums`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ artist_folder: artistFolder }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setAlbums(data);
        } else {
          throw new Error("Data format is incorrect, expected an array of strings");
        }
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
        window.location.href = "/sign-in";
      });
  }, [artistFolder]);

  useEffect(() => {
    fetchAlbums();
  }, [fetchAlbums]);

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
      <Header title={`All albums for: ${artistName}`} children={""}></Header>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 mt-8 p-7">
        {albums.length > 0 ? (
          albums.map((album, index) => (
            <Link
              href={`/homepage/tracklist?page=${encodeURIComponent(artistFolder)}/${encodeURIComponent(album)}`}
              key={index}
            >
              <Card
                onClick={() => setAlbumName(album)}
                key={index}
                className="
                bg-[#111827]
                rounded-lg
                ml-2
                mr-2
                border-gray-700
                text-slate-300
                shadow-lg
                p-4
                hover:bg-gradient-to-r
                from-sky-800
                to-sky-600
                transition-colors
                duration-300"
              >
                <h3 className="text-lg ml-6 font-bold p-2 overflow-hidden text-overflow-ellipsis whitespace-nowrap">
                  {album}
                </h3>
                {/*<Image*/}
                {/*    src={album.imageUrl}*/}
                {/*    alt={`Cover for ${album.name}`}*/}
                {/*    width={250}*/}
                {/*    height={250}*/}
                {/*    className="rounded-lg"*/}
                {/*/>*/}
              </Card>
            </Link>
          ))
        ) : (
          <p className="text-slate-300">No albums available</p>
        )}
      </div>
    </div>
  );
};

export default AlbumsByArtist;
