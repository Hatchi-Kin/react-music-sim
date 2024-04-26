import React, { useContext } from "react";
import { PlayListContext } from "../contexts/PlayListContext";
import { MdOutlinePlaylistRemove, MdPlaylistAdd } from "react-icons/md";

interface AddToPlayListButtonProps {
  song_full_path: string;
  size?: "small" | "large";
}

const AddToPlayListButton: React.FC<AddToPlayListButtonProps> = ({
  song_full_path,
  size = "small",
}) => {
  const { playlist, addSong, removeSong } = useContext(PlayListContext);

  const isInPlaylist = playlist.includes(song_full_path);

  const handleClick = () => {
    if (isInPlaylist) {
      removeSong(song_full_path);
    } else {
      addSong(song_full_path);
    }
  };

  const buttonClass =
  size === "small"
    ? "bg-sky-400 hover:bg-green-400 text-indigo-800 font-bold py-0.5 px-1 text-xs rounded"
    : "bg-sky-400 hover:bg-green-400 text-indigo-800 font-bold py-3 px-6 text-base rounded";

    return (
      <button onClick={handleClick} className={buttonClass}>
        {size === "small" ? (
          isInPlaylist ? <MdOutlinePlaylistRemove /> : <MdPlaylistAdd />
        ) : isInPlaylist ? (
          "Remove"
        ) : (
          "Add to playlist"
        )}
      </button>
    );
  };

export default AddToPlayListButton;
