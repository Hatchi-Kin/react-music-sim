import React, { useState, useEffect } from 'react';

interface AddRemoveFavoritesButtonProps {
  songPath: string;
}

const AddRemoveFavoritesButton: React.FC<AddRemoveFavoritesButtonProps> = ({ songPath }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken') ?? '';
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  
    fetch(`${baseUrl}/favorites/`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        // Create a new array that only contains the filepath properties
        const favoritePaths = data.map((song: any) => song.filepath);
        // Check if the songPath prop is in the favoritePaths array
        const isSongInFavorites = favoritePaths.includes(songPath);
        setIsFavorite(isSongInFavorites);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [songPath]);

  const handleAddRemove = () => {
    const token = localStorage.getItem('authToken') ?? '';
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    console.log(`Attempting to ${isFavorite ? 'remove' : 'add'} ${songPath}`);
  
    fetch(`${baseUrl}/favorites/${isFavorite ? 'delete' : 'add'}`, {
      method: isFavorite ? 'DELETE' : 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ file_path: songPath }),
    })
    .then((response) => {
      if (response.status === 401) {
        // If the response is Unauthorized, redirect to the login page
        window.location.href = "/sign-in";
        return;
      }
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log(`Successfully ${isFavorite ? 'removed' : 'added'} ${songPath}`);
      // Only update the isFavorite state if the operation was successful
      setIsFavorite(!isFavorite);
    })
    .catch((error) => {
      console.error(`Failed to ${isFavorite ? 'remove' : 'add'} ${songPath}:`, error);
    });
  };

  return (
    <button onClick={handleAddRemove} className='border-2'>
      {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
    </button>
  );
};

export default AddRemoveFavoritesButton;