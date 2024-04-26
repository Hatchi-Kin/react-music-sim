import { createContext } from "react";

interface PlayListContextProps {
  playlist: string[];
  addSong: (song: string) => void;
  removeSong: (song: string) => void;
}

export const PlayListContext = createContext<PlayListContextProps>({
  playlist: [],
  addSong: (song: string) => {},
  removeSong: (song: string) => {},
});