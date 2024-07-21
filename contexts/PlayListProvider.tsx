"use client";

import React, { useState, ReactNode } from "react";
import { PlayListContext } from "./PlayListContext";

interface PlayListProviderProps {
  children: ReactNode;
}

export const PlayListProvider: React.FC<PlayListProviderProps> = ({ children }) => {
  const [playlist, setPlaylist] = useState<string[]>([]);
  const [currentSongIndex, setCurrentSongIndex] = useState<number | null>(null); 

  const addSong = (song: string) => {
    setPlaylist((prevPlaylist) => {
      if (prevPlaylist.length >= 8) {
        return [...prevPlaylist.slice(1), song]; 
      } else {
        return [...prevPlaylist, song]; 
      }
    });
  };

  const removeSong = (song: string) => {
    setPlaylist((prevPlaylist) => {
      const songIndexToRemove = prevPlaylist.indexOf(song);
      const updatedPlaylist = prevPlaylist.filter((s) => s !== song);

      if (currentSongIndex !== null && songIndexToRemove < currentSongIndex) {
        setCurrentSongIndex((prevIndex) => (prevIndex === null ? null : prevIndex - 1));
      }

      return updatedPlaylist;
    });
  };

  return (
    <PlayListContext.Provider value={{ playlist, addSong, removeSong, currentSongIndex, setCurrentSongIndex }}>
      {children}
    </PlayListContext.Provider>
  );
};