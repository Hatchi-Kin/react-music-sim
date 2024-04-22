"use client";

import React, { useState, ReactNode } from "react";
import { AlbumContext } from "./AlbumContext";

interface AlbumProviderProps {
  children: ReactNode;
}

export const AlbumProvider: React.FC<AlbumProviderProps> = ({ children }) => {
  const [albumName, setAlbumName] = useState("");

  return (
    <AlbumContext.Provider value={{ albumName, setAlbumName }}>{children}</AlbumContext.Provider>
  );
};
