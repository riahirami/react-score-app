import React, { useEffect, useRef } from 'react';

interface PlayWinAudioProps {
  audioSrc: string;
  shouldPlayAudio: boolean;
}
const PlayWinAudio = ({ audioSrc, shouldPlayAudio }: PlayWinAudioProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audioElement = audioRef.current;
    // console.log('audioElement', audioElement);
    if (audioElement) {
      //   if (shouldPlayAudio) {
      audioElement.play();
    }
    //   } else {
    //     audioElement.pause();
    //   }
    // }

    return () => {
      if (audioElement) {
        audioElement.pause();
      }
    };
  }, [shouldPlayAudio]);

  return shouldPlayAudio ? (
    <audio autoPlay ref={audioRef}>
      <source src={audioSrc} />
    </audio>
  ) : null;
};

export default PlayWinAudio;
