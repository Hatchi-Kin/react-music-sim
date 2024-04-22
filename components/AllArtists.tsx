import React, { useCallback, useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Link from "next/link";
import { useArtist } from "../contexts/ArtistContext"; // adjust the path according to your project structure

const ArtistList = () => {
  // State variables for artists, loading status, error message, and current page
  const [artists, setArtists] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const itemsPerPage = 33;

  const { setArtistName } = useArtist(); // hook to get the setArtistName function

  // Function to fetch artists from the API
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
          throw new Error(`Network response was not ok: ${response.statusText}`);
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
        setError(error.message);
        setIsLoading(false);
        window.location.href = "/sign-in";
      });
  }, []);

  // Fetch artists when the component mounts
  useEffect(() => {
    fetchArtist();
  }, [fetchArtist]);

  // Function to handle clicking the "Next" button
  const handleNextPage = () => {
    setPage((prevPage) => {
      const nextPage = prevPage + 1;
      if (nextPage > Math.ceil(artists.length / itemsPerPage)) {
        return 1;
      }
      return nextPage;
    });
  };

  // Function to handle clicking the "Prev" button
  const handlePrevPage = () => {
    setPage((prevPage) => {
      const newPrevPage = prevPage - 1;
      if (newPrevPage < 1) {
        return Math.ceil(artists.length / itemsPerPage);
      }
      return newPrevPage;
    });
  };

  // Show loading or error message if necessary
  if (isLoading) return <div className="text-white">Loading...</div>;
  if (error) return <div className="text-white">Error: {error}</div>;

  // Calculate which artists to display on the current page
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const artistsToDisplay = artists.slice(startIndex, endIndex);

  // Render the component
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
        All Artists in MegaSet
      </h1>
      {/* Navigation buttons */}
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
      {/* Artist cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-5 p-7">
        {artistsToDisplay.length > 0 ? (
          artistsToDisplay.map((artist, index) => (
            // Include the artist's name as a URL parameter
            <Link href={`/homepage/albumsByArtist?page=${encodeURIComponent(artist)}`} key={index}>
              <Card
                onClick={() => setArtistName(artist)} // set the artist name when the card is clicked
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
                  {artist}
                </h3>
              </Card>
            </Link>
          ))
        ) : (
          <p>No artists available</p>
        )}
      </div>
      {/* Navigation buttons */}
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
