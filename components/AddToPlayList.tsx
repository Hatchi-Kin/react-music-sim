import React, { useContext, useMemo } from "react";
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

  const isInPlaylist = useMemo(() => playlist.includes(song_full_path), [playlist, song_full_path]);

  const handleClick = () => {
    if (isInPlaylist) {
      removeSong(song_full_path);
    } else {
      addSong(song_full_path);
    }
  };

  const buttonClass = isInPlaylist
    ? `bg-[#b38e4e] hover:bg-[#a67641] text-slate-300 font-bold ${size === "small" ? "py-0.5 px-1 text-xs" : "py-3 px-6 text-base"} rounded`
    : `bg-[#46994f] hover:bg-[#287331] text-slate-300 font-bold ${size === "small" ? "py-0.5 px-1 text-xs" : "py-3 px-6 text-base"} rounded`;

  return (
    <button onClick={handleClick} className={buttonClass}>
      {size === "small" ? (
        isInPlaylist ? (
          <MdOutlinePlaylistRemove />
        ) : (
          <MdPlaylistAdd />
        )
      ) : isInPlaylist ? (
        "Remove"
      ) : (
        "Add to playlist"
      )}
    </button>
  );
};

export default AddToPlayListButton;
