import React, { useContext, useMemo } from "react";
import { PlayListContext } from "@/contexts/PlayListContext";
import { MdOutlinePlaylistRemove, MdPlaylistAdd } from "react-icons/md";
import { Button } from "@/components/ui/button"; // Assuming this is the correct import for the ShadCN button

interface AddToPlayListButtonProps {
  song_full_path: string;
  size?: "small" | "medium" | "large";
}

const AddToPlayListButton: React.FC<AddToPlayListButtonProps> = ({
  song_full_path,
  size = "small",
}) => {
  const { playlist, addSong, removeSong } = useContext(PlayListContext);

  const isInPlaylist = useMemo(
    () => playlist.includes(song_full_path),
    [playlist, song_full_path]
  );

  const handleClick = () => {
    if (isInPlaylist) {
      removeSong(song_full_path);
    } else {
      addSong(song_full_path);
    }
  };

  const buttonText = isInPlaylist ? "Remove" : "Add to playlist";
  const buttonIcon = isInPlaylist ? (
    <MdOutlinePlaylistRemove />
  ) : (
    <MdPlaylistAdd />
  );

  return (
    <Button size="lg" onClick={handleClick} className={'bg-black border border-gray-700 hover:bg-emerald-600'}>
      {buttonText}
    </Button>
  );
};

export default AddToPlayListButton;
