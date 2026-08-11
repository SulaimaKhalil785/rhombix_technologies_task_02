import { useEffect, useState } from "react";

const Icon = ({ children, className = "" }) => <svg className={className} viewBox="0 0 24 24" aria-hidden="true">{children}</svg>;

function PlayerControls({ currentSong, isPlaying, togglePlayPause, playNext, playPrevious, audioRef }) {
  const [volume, setVolume] = useState(0.75);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    const updateProgress = () => setProgress(audio.duration ? (audio.currentTime / audio.duration) * 100 : 0);
    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("ended", playNext);
    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("ended", playNext);
    };
  }, [audioRef, playNext]);

  const handleVolume = (event) => {
    const value = Number(event.target.value);
    setVolume(value);
    audioRef.current.volume = value;
  };

  return (
    <footer className="player-controls">
      <div className="now-playing">
        <img src={currentSong.image} alt="" />
        <div><strong>{currentSong.title}</strong><span>{currentSong.artist}</span></div>
      </div>
      <div className="equalizer" aria-label="Now playing"><i /><i /><i /></div>
      <div className="transport">
        <button onClick={playPrevious} aria-label="Previous song"><Icon><path d="M6 5v14M18 6l-8 6 8 6V6Z" fill="currentColor" /></Icon></button>
        <button className="play-button" onClick={togglePlayPause} aria-label={isPlaying ? "Pause" : "Play"}>
          <Icon>{isPlaying ? <path d="M8 6h3v12H8zM13 6h3v12h-3z" fill="currentColor" /> : <path d="m9 6 9 6-9 6V6Z" fill="currentColor" />}</Icon>
        </button>
        <button onClick={playNext} aria-label="Next song"><Icon><path d="m6 6 8 6-8 6V6ZM18 5v14" fill="currentColor" /></Icon></button>
      </div>
      <div className="volume-control">
        <Icon><path d="M4 9v6h4l5 4V5L8 9H4ZM16 9.5a4 4 0 0 1 0 5M18.5 7a7 7 0 0 1 0 10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></Icon>
        <input aria-label="Volume" type="range" min="0" max="1" step="0.01" value={volume} onChange={handleVolume} />
      </div>
      <button className="queue-button" aria-label="Open queue"><Icon><path d="M4 6h16M4 12h11M4 18h7M18 15v5m-2.5-2.5h5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></Icon></button>
      <div className="track-progress"><span>1:25</span><input aria-label="Song progress" type="range" min="0" max="100" value={progress} onChange={(event) => { const audio = audioRef.current; if (audio.duration) audio.currentTime = (Number(event.target.value) / 100) * audio.duration; }} /><span>{currentSong.duration}</span></div>
    </footer>
  );
}

export default PlayerControls;
