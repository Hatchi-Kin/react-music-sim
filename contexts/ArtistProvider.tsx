"use client";

import React, { useState, ReactNode } from "react";
import { ArtistContext } from "./ArtistContext";

interface ArtistProviderProps {
  children: ReactNode;
}

export const ArtistProvider: React.FC<ArtistProviderProps> = ({ children }) => {
  const [artistName, setArtistName] = useState("");

  return (
    <ArtistContext.Provider value={{ artistName, setArtistName }}>
      {children}
    </ArtistContext.Provider>
  );
};
