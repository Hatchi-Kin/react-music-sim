import { createContext, Dispatch, SetStateAction } from "react";

interface PlayListContextProps {
  playlist: string[];
  addSong: (song: string) => void;
  removeSong: (song: string) => void;
  currentSongIndex: number | null;
  setCurrentSongIndex: Dispatch<SetStateAction<number | null>>;
}

export const PlayListContext = createContext<PlayListContextProps>({
  playlist: [],
  addSong: () => {},
  removeSong: () => {},
  currentSongIndex: null,
  setCurrentSongIndex: () => {},
});