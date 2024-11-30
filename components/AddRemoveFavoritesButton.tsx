import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MdFavorite } from "react-icons/md";
import { GiBrokenHeart } from "react-icons/gi";
import { refreshTokenFromResponse } from "@/utils/authUtils";

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
        refreshTokenFromResponse(response);
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

  const handleAddRemove = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
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
        refreshTokenFromResponse(response);
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
    <Button
      size="sm"
      onClick={handleAddRemove}
      className="text-slate-200 bg-[#111827] hover:bg-[#2b1f37] hover:scale-110 hover:shadow-lg transition-transform duration-200"
    >
      {isFavorite ? (
        <GiBrokenHeart color="grey" size={size} />
      ) : (
        <MdFavorite color="red" size={size} />
      )}
    </Button>
  );
};

export default AddRemoveFavoritesButton;
