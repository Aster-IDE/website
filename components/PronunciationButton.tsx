"use client";

import { useState, useRef } from "react";
import { FaVolumeUp, FaPause } from "react-icons/fa";

export default function PronunciationButton() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(
        "https://github.com/Aster-IDE/AsterIDE/raw/master/assets/mp3/asteride.mp3"
      );
      audioRef.current.onended = () => setIsPlaying(false);
    }

    if (isPlaying) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <button
      onClick={togglePlay}
      className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-[#553746]/50 text-muted-foreground transition-all hover:bg-[#553746]/10 hover:text-foreground hover:border-[#553746] active:scale-95"
      aria-label={isPlaying ? "Pause pronunciation" : "Play pronunciation"}
      title="Hear pronunciation"
    >
      {isPlaying ? <FaPause size={12} /> : <FaVolumeUp size={14} />}
    </button>
  );
}
