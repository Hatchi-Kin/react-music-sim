import { createContext, useContext } from "react";

interface AlbumContextProps {
  albumName: string;
  setAlbumName: (name: string) => void;
}

// Create the context with default values
export const AlbumContext = createContext<AlbumContextProps | undefined>(undefined);

// Create a custom hook for accessing the context
export function useAlbum() {
  const context = useContext(AlbumContext);
  if (!context) {
    throw new Error("useAlbum must be used within an AlbumProvider");
  }
  return context;
}
