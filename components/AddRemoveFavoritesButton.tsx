import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MdFavorite } from "react-icons/md";
import { GiBrokenHeart } from "react-icons/gi";

interface AddRemoveFavoritesButtonProps {
  songPath: string;
  onRemove?: () => void;
  size?: string;
}

const AddRemoveFavoritesButton: React.FC<AddRemoveFavoritesButtonProps> = ({
  songPath,
  onRemove,
  size = "1em",
}) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
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
        const favoritePaths = data.map((song: any) => song.filepath);
        const isSongInFavorites = favoritePaths.includes(songPath);
        setIsFavorite(isSongInFavorites);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [songPath]);

  const handleAddRemove = () => {
    const token = localStorage.getItem("authToken") ?? "";
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    console.log(`Attempting to ${isFavorite ? "remove" : "add"} ${songPath}`);

    fetch(`${baseUrl}/favorites/${isFavorite ? "delete" : "add"}`, {
      method: isFavorite ? "DELETE" : "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ file_path: songPath }),
    })
      .then((response) => {
        if (response.status === 401) {
          window.location.href = "/sign-in";
          return;
        }
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(`Successfully ${isFavorite ? "removed" : "added"} ${songPath}`);
        if (isFavorite && onRemove) {
          onRemove();
        }
        setIsFavorite(!isFavorite);
      })
      .catch((error) => {
        console.error(`Failed to ${isFavorite ? "remove" : "add"} ${songPath}:`, error);
      });
  };

  return (
    <Button size="lg" onClick={handleAddRemove} className=" border border-gray-700 hover:bg-white ">
      {isFavorite ? (
        <GiBrokenHeart color="red" size={25} />
      ) : (
        <MdFavorite color="red" size={25}  />
      )}
    </Button>
  );
};

export default AddRemoveFavoritesButton;
