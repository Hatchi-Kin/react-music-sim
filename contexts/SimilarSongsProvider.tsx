"use client";

import React, { useState, ReactNode } from "react";
import { SimilarSongsContext } from "./SimilarSongsContext";

interface SimilarSongsProviderProps {
  children: ReactNode;
}

export const SimilarSongsProvider: React.FC<SimilarSongsProviderProps> = ({ children }) => {
  const [songPath, setsongPath] = useState("");

  return (
    <SimilarSongsContext.Provider value={{ songPath, setsongPath }}>
      {children}
    </SimilarSongsContext.Provider>
  );
};
