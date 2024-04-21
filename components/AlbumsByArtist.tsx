import React, { useCallback, useEffect, useState } from "react";
import { Card } from "@/components/ui/card";

const getArtistNameFromUrl = () => {
  if (typeof window !== "undefined") {
    const url = new URL(window.location.href);
    const artistName = url.searchParams.get("page");
    return artistName ? decodeURIComponent(artistName) : "";
  }
  return "";
};

const AlbumsByArtist = () => {
  const [albums, setAlbums] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const artistName = getArtistNameFromUrl();
  const artistFolder = "MegaSet/" + artistName;

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

  if (isLoading) return <div className="text-white">Loading...</div>;
  if (error) return <div className="text-white">Error: {error}</div>;

  return (
    <div>
      <h1
        className="
          text-slate-300 
          text-4xl 
          mb-6 
          ml-20 
          font-bold 
          tracking-wide 
          uppercase 
          bg-gradient-to-r 
          from-sky-800 via-sky-500 to-sky-200  
          bg-clip-text 
          text-transparent"
      >
        All albums for {artistFolder.replace("MegaSet/", "")}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 mt-8 p-7">
        {albums.length > 0 ? (
          albums.map((album, index) => (
            <Card
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
            </Card>
          ))
        ) : (
          <p>No albums available</p>
        )}
      </div>
    </div>
  );
};

export default AlbumsByArtist;
