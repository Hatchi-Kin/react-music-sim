import { createContext, useContext } from "react";

interface ArtistContextProps {
  artistName: string;
  setArtistName: (name: string) => void;
}

// Create the context with default values
export const ArtistContext = createContext<ArtistContextProps | undefined>(undefined);

// Create a custom hook for accessing the context
export function useArtist() {
  const context = useContext(ArtistContext);
  if (!context) {
    throw new Error("useArtist must be used within an ArtistProvider");
  }
  return context;
}
