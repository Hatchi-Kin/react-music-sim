import React from 'react';
import Image from 'next/image';

interface ImageProps {
  className?: string;
}

const MusicSimImage: React.FC<ImageProps> = ({ className }) => {
  return (
    <div className={`flex justify-center items-center ${className}`}>
      <Image 
        src="/react-music-sim.jpeg" 
        alt="Music Sim" 
        width={700} 
        height={700} 
      />
    </div>
  );
};

export default MusicSimImage;