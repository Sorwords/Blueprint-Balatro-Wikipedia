import { useState, useRef, useEffect } from 'react';

const tracks = [
  { name: 'Main Theme', file: '/music/Main Theme.mp3' },
  { name: 'Shop Theme', file: '/music/Shop Theme.mp3' },
  { name: 'Arcana Theme', file: '/music/Arcana Theme.mp3' },
  { name: 'Celestial Theme', file: '/music/Celestial Theme.mp3' },
  { name: 'Boss Theme', file: '/music/Boss Theme.mp3' },
];

export default function MusicPlayer() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.play().catch(() => setIsPlaying(false));
    } else {
      audio.pause();
    }
  }, [isPlaying, currentTrack]);

  const togglePlay = () => {
    if (!isPlaying && audioRef.current) {
      audioRef.current.src = tracks[currentTrack].file;
      audioRef.current.load();
    }
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    const next = (currentTrack + 1) % tracks.length;
    setCurrentTrack(next);
    if (isPlaying && audioRef.current) {
      audioRef.current.src = tracks[next].file;
      audioRef.current.load();
      audioRef.current.play().catch(() => setIsPlaying(false));
    }
  };

  const prevTrack = () => {
    const prev = (currentTrack - 1 + tracks.length) % tracks.length;
    setCurrentTrack(prev);
    if (isPlaying && audioRef.current) {
      audioRef.current.src = tracks[prev].file;
      audioRef.current.load();
      audioRef.current.play().catch(() => setIsPlaying(false));
    }
  };

  const handleEnded = () => {
    nextTrack();
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setProgress(audioRef.current.currentTime / (audioRef.current.duration || 1));
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    audio.currentTime = x * audio.duration;
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={tracks[currentTrack].file}
        onEnded={handleEnded}
        onTimeUpdate={handleTimeUpdate}
        onError={() => setIsPlaying(false)}
        preload="auto"
      />
      <div className={`music-player ${isOpen ? 'open' : ''}`}>
        <button className="music-toggle" onClick={() => setIsOpen(!isOpen)} title="Music Player">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18V5l12-2v13" />
            <circle cx="6" cy="18" r="3" />
            <circle cx="18" cy="16" r="3" />
          </svg>
        </button>
        <div className="music-player-body">
          <div className="music-track-name">{tracks[currentTrack].name}</div>
          <div className="music-progress" onClick={handleSeek}>
            <div className="music-progress-fill" style={{ width: `${progress * 100}%` }} />
          </div>
          <div className="music-controls">
            <button className="music-btn" onClick={prevTrack} title="Previous">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/></svg>
            </button>
            <button className="music-btn music-play-btn" onClick={togglePlay} title={isPlaying ? 'Pause' : 'Play'}>
              {isPlaying ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M6 4h4v16H6zM14 4h4v16h-4z"/></svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
              )}
            </button>
            <button className="music-btn" onClick={nextTrack} title="Next">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/></svg>
            </button>
            <div className="music-volume">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0014 8.5v7a4.49 4.49 0 002.5-3.5z"/>
              </svg>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="music-volume-slider"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
