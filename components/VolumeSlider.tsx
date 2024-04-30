import React, { useState, useEffect, useRef } from 'react';

interface AudioPlayerProps {
  src: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({  }) => {
  const [volume, setVolume] = useState(50);
  const [muteVolume, setMuteVolume] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
      audioRef.current.muted = muteVolume;
    }
  }, [volume, muteVolume]);

  return (
    <div>
      <audio src={"f"} ref={audioRef} controls />
      <div className="volume-controls">
        <button onClick={() => setMuteVolume(!muteVolume)}>
          {muteVolume ? 'Unmute' : 'Mute'}
        </button>
        <input
          type="range"
          min={0}
          max={100}
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
        />
      </div>
    </div>
  );
};

export default AudioPlayer;