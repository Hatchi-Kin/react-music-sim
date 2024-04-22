import { createContext, useContext } from "react";

interface SimilarSongsContextProps {
  songPath: string;
  setsongPath: (name: string) => void;
}

// Create the context with default values
export const SimilarSongsContext = createContext<SimilarSongsContextProps | undefined>(undefined);

// Create a custom hook for accessing the context
export function useSimilarSongs() {
  const context = useContext(SimilarSongsContext);
  if (!context) {
    throw new Error("useSimilarSongs must be used within an SimilarSongsProvider");
  }
  return context;
}
