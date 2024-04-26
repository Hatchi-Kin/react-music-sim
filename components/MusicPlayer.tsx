import React, { useEffect, useState, useContext } from "react";
import { PlayListContext } from "../contexts/PlayListContext";
import AddToPlayListButton from "../components/AddToPlayList";

const MusicPlayer = () => {
  const [songUrl, setSongUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const { playlist } = useContext(PlayListContext);

  const [currentSongIndex, setCurrentSongIndex] = useState(0);

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
      // Convert the ReadableStream to a Blob
      const blob = await response.blob();
      // Create an object URL for the Blob
      const url = URL.createObjectURL(blob);
      setSongUrl(url);
    }
  };

  useEffect(() => {
    if (playlist.length > 0) {
      fetchSong(playlist[currentSongIndex]);
    }
  }, [playlist, currentSongIndex]);

  const handleSongEnd = () => {
    if (currentSongIndex < playlist.length - 1) {
      setCurrentSongIndex(currentSongIndex + 1);
    } else {
      setCurrentSongIndex(0);
    }
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="m-4 flex flex-col items-center justify-center text-slate-200 bg-gradient-to-r from-slate-800 to-slate-900 p-5 rounded shadow-md">
      <div className="w-full max-w-md mx-auto bg-slate-800 rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        {playlist.map((song, index) => {
          const songName = song.split("/").pop()?.replace(".mp3", "") || "";
          return (
            <div
              key={index}
              onClick={() => setCurrentSongIndex(index)}
              className={`flex flex-col p-2 mb-2 hover:bg-sky-800 hover:text-white rounded ${index === currentSongIndex ? "bg-sky-800 text-white" : ""}`}
            >
              <div className="p-4">
                <div className="uppercase tracking-wide text-sm font-semibold">
                  <div className="prose prose-sm text-slate-300">{songName}</div>
                </div>
                <AddToPlayListButton song_full_path={song} />
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex items-center mt-4">
        <button
          onClick={togglePlay}
          className="mr-6 bg-blue-500 hover:bg-blue-700 text-slate-300 font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
        >
          {isPlaying ? "Pause" : "Play"}
        </button>
        {songUrl && <audio ref={audioRef} src={songUrl} onEnded={handleSongEnd} />}
      </div>
    </div>
  );
};

export default MusicPlayer;
