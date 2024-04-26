"use client";

import React, { useState, ReactNode } from "react";
import { PlayListContext } from "./PlayListContext";

interface PlayListProviderProps {
  children: ReactNode;
}

export const PlayListProvider: React.FC<PlayListProviderProps> = ({ children }) => {
  const [playlist, setPlaylist] = useState<string[]>([]);

  const addSong = (song: string) => {
    setPlaylist((prevPlaylist) => {
      if (prevPlaylist.length >= 6) {
        return [...prevPlaylist.slice(1), song]; // Remove the first song and add the new one
      } else {
        return [...prevPlaylist, song]; // Add the new song
      }
    });
  };

  const removeSong = (song: string) => {
    setPlaylist((prevPlaylist) => prevPlaylist.filter((s) => s !== song));
  };

  return (
    <PlayListContext.Provider value={{ playlist, addSong, removeSong }}>
      {children}
    </PlayListContext.Provider>
  );
};