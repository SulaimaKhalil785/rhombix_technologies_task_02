function PlayerControls({
  currentSong,
  isPlaying,
  togglePlayPause,
  playNext,
  playPrevious,
  audioRef,
}) {
  const handleVolume = (e) => {
    audioRef.current.volume = e.target.value;
  };

  return (
    <div className="player-controls">
      <h2>Now Playing</h2>

      <h3>{currentSong.title}</h3>
      <p>{currentSong.artist}</p>

      <div className="buttons">
        <button onClick={playPrevious}>⏮</button>

        <button onClick={togglePlayPause}>
          {isPlaying ? "⏸ Pause" : "▶ Play"}
        </button>

        <button onClick={playNext}>⏭</button>
      </div>

      <div className="volume">
        <label>Volume</label>

        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          defaultValue="1"
          onChange={handleVolume}
        />
      </div>
    </div>
  );
}

export default PlayerControls;