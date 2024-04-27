import React, { useEffect, useState, useContext } from "react";
import { PlayListContext } from "../contexts/PlayListContext";
import AddToPlayListButton from "../components/AddToPlayList";
import { Card } from "@/components/ui/card";
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";
import { FaPlay, FaPause } from "react-icons/fa";

const MusicPlayer = () => {
  const [songUrl, setSongUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const { playlist } = useContext(PlayListContext);

  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [shouldFetchSong, setShouldFetchSong] = useState(true);

  const fetchSong = async (song: string) => {
    const token = localStorage.getItem("authToken") ?? "";
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const response = await fetch(`${baseUrl}/minio/stream-song/`, {
      method: "POST",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        file_path: song,
      }),
    });

    if (response.ok) {
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setSongUrl(url);
    }
  };

  useEffect(() => {
    if (playlist.length > 0 && shouldFetchSong) {
      fetchSong(playlist[currentSongIndex]).then(() => {
        if (audioRef.current) {
          audioRef.current.play(); // Play the song after it has been fetched
          setIsPlaying(true); // Update isPlaying state
        }
        setShouldFetchSong(false); // Reset the flag after fetching the song
      });
    }
  }, [playlist, currentSongIndex, shouldFetchSong]);

  const handleSongEnd = () => {
    if (currentSongIndex < playlist.length - 1) {
      setCurrentSongIndex(currentSongIndex + 1);
    } else {
      setCurrentSongIndex(0);
    }
    setShouldFetchSong(true); // Set the flag to fetch a new song
  };

  const togglePlay = async () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        await audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handlePrevSong = () => {
    if (currentSongIndex > 0) {
      setCurrentSongIndex(currentSongIndex - 1);
      setShouldFetchSong(true); // Set the flag to fetch a new song
    }
  };

  const handleNextSong = () => {
    if (audioRef.current) {
      audioRef.current.pause(); // Pause the current song
    }
    if (currentSongIndex < playlist.length - 1) {
      setCurrentSongIndex(currentSongIndex + 1);
    } else {
      setCurrentSongIndex(0);
    }
    setShouldFetchSong(true); // Set the flag to fetch a new song
  };

  return (
    <div className="m-2 flex flex-col items-center justify-center text-slate-200 bg-gradient-to-r from-slate-800 to-slate-900 p-3 rounded shadow-md">
      <div className="flex items-center mb-4">
        <button
          onClick={handlePrevSong}
          className="mr-2 text-slate-300 cursor-pointer"
          style={{ opacity: currentSongIndex === 0 ? 0.5 : 1 }}
        >
          <BiSkipPrevious size={24} />
        </button>
        <button
          onClick={togglePlay}
          className="mr-6 text-slate-300 cursor-pointer"
          disabled={playlist.length === 0} // Disable the button if the playlist is empty
        >
          {isPlaying ? <FaPause size={24} /> : <FaPlay size={24} />}
        </button>
        <button
          onClick={handleNextSong}
          className="mr-2 text-slate-300 cursor-pointer"
          style={{ opacity: currentSongIndex === playlist.length - 1 ? 0.5 : 1 }}
        >
          <BiSkipNext size={24} />
        </button>
        {songUrl && <audio ref={audioRef} src={songUrl} onEnded={handleSongEnd} />}
      </div>
      <div className="w-full p-1 max-w-md mx-auto overflow-hidden md:max-w-2xl">
        {playlist.length > 0 ? (
          playlist.map((song, index) => {
            const songName = song.split("/").pop()?.replace(".mp3", "") || "";
            return (
              <Card
                key={index}
                onClick={() => {
                  setCurrentSongIndex(index);
                  setShouldFetchSong(true); // Set the flag to fetch a new song
                  if (audioRef.current) {
                    audioRef.current.pause(); // Pause the current song
                    setIsPlaying(false); // Update isPlaying state
                  }
                }}
                className={`
              bg-[#111827] 
              rounded-lg 
              ml-2
              mr-2
              border-gray-700 
              text-slate-300 
              shadow-lg 
              p-2
              hover:bg-gradient-to-r 
              from-sky-800 
              to-sky-600 
              transition-colors 
              ${index === currentSongIndex ? "bg-sky-800" : ""}
              duration-100`}
              >
                <div className="p-4 flex flex-col h-16 justify-between">
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-semibold overflow-ellipsis overflow-hidden whitespace-nowrap flex-grow">
                      <div className="prose text-xs text-slate-300">{songName}</div>
                    </div>
                    <div className="ml-2 flex-shrink-0">
                      <AddToPlayListButton song_full_path={song} size="small" />
                    </div>
                  </div>
                </div>
              </Card>
            );
          })
        ) : (
          <div className="text-slate-300 p-4">No songs in the playlist. Please add some songs.</div>
        )}
      </div>
    </div>
  );
};

export default MusicPlayer;
