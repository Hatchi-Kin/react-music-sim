import React, { useCallback, useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Link from "next/link";
import { useArtist } from "@/contexts/ArtistContext";
import Spinner from "@/components/Spinner";

const ArtistList = () => {
  const [artists, setArtists] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(33);

  const { setArtistName } = useArtist();

  const fetchArtist = useCallback(() => {
    setIsLoading(true);
    const token = localStorage.getItem("authToken") ?? "";
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    fetch(`${baseUrl}/music_library/artists`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
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
        if (Array.isArray(data)) {
          const cleanedData = data.map((artist: string) => artist.replace("MegaSet/", ""));
          setArtists(cleanedData);
        } else {
          throw new Error("Data format is incorrect, expected an array of strings");
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
        setError(error.message);
      });
  }, []);

  useEffect(() => {
    fetchArtist();
  }, [fetchArtist]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(10);
      } else {
        setItemsPerPage(33);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNextPage = () => {
    setPage((prevPage) => {
      const nextPage = prevPage + 1;
      if (nextPage > Math.ceil(artists.length / itemsPerPage)) {
        return 1;
      }
      return nextPage;
    });
  };

  const handlePrevPage = () => {
    setPage((prevPage) => {
      const newPrevPage = prevPage - 1;
      if (newPrevPage < 1) {
        return Math.ceil(artists.length / itemsPerPage);
      }
      return newPrevPage;
    });
  };

  if (isLoading)
    return (
      <div className="text-white">
        <Spinner />
      </div>
    );
  if (error) return <div className="text-white">Error: {error}</div>;

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const artistsToDisplay = artists.slice(startIndex, endIndex);

  return (
    <div>
      <div className="flex justify-center space-x-4 mt-6 mb-4">
        <Button
          onClick={handlePrevPage}
          className="bg-sky-700 hover:bg-sky-600 text-white font-bold py-4 px-8 rounded flex items-center"
        >
          <FaArrowLeft className="mr-2" /> Prev
        </Button>
        <Button
          onClick={handleNextPage}
          className="bg-sky-700 hover:bg-sky-600 text-white font-bold py-4 px-8 rounded flex items-center"
        >
          Next <FaArrowRight className="ml-2" />
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-5 p-7">
        {artistsToDisplay.length > 0 ? (
          artistsToDisplay.map((artist, index) => (
            <Link href={`/homepage/albumsByArtist?page=${encodeURIComponent(artist)}`} key={index}>
              <Card
                onClick={() => setArtistName(artist)}
                className="
                  bg-[#111827] 
                  rounded-lg 
                  mx-2
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
                <h3 className="text-lg font-bold p-2 truncate">{artist}</h3>
              </Card>
            </Link>
          ))
        ) : (
          <p>No artists available</p>
        )}
      </div>
      <div className="flex justify-center space-x-4 mt-4 mb-12">
        <Button
          onClick={handlePrevPage}
          className="bg-sky-700 hover:bg-sky-600 text-white font-bold py-4 px-8 rounded flex items-center"
        >
          <FaArrowLeft className="mr-2" /> Prev
        </Button>
        <Button
          onClick={handleNextPage}
          className="bg-sky-700 hover:bg-sky-600 text-white font-bold py-4 px-8 rounded flex items-center"
        >
          Next <FaArrowRight className="ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default ArtistList;
