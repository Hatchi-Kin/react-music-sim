import React, { useContext } from "react";
import { PlayListContext } from "../contexts/PlayListContext";

interface AddToPlayListButtonProps {
  song_full_path: string;
}

const AddToPlayListButton: React.FC<AddToPlayListButtonProps> = ({ song_full_path }) => {
  const { playlist, addSong, removeSong } = useContext(PlayListContext);

  const isInPlaylist = playlist.includes(song_full_path);

  const handleClick = () => {
    if (isInPlaylist) {
      removeSong(song_full_path);
    } else {
      addSong(song_full_path);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="bg-sky-400 hover:bg-green-400 text-indigo-800 font-bold py-1 px-2 text-xs rounded"
    >
      {isInPlaylist ? "Remove" : "Add to playlist"}
    </button>
  );
};

export default AddToPlayListButton;
