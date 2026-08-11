function PlayIcon() {
  return <span className="cover-play" aria-hidden="true">▶</span>;
}

function Playlist({ songs, currentSong, setCurrentSong, isPlaying }) {
  return (
    <section className="playlist">
      <h2>Playlist</h2>
      {songs.length === 0 ? <p className="empty-state">No songs found.</p> : (
        <ul>
          {songs.map((song) => {
            const active = currentSong.id === song.id;
            return (
              <li key={song.id} className={active ? "active-song" : ""}>
                <button className="song-main" onClick={() => setCurrentSong(song)} aria-label={`Play ${song.title}`}>
                  <span className="song-cover"><img src={song.image} alt="" />{active && isPlaying && <PlayIcon />}</span>
                  <span className="song-text"><strong>{song.title}</strong><small>{song.artist}</small></span>
                </button>
                <span className="song-category">{song.category}</span>
                <span className="song-duration">{song.duration}</span>
                <button className="more-button" aria-label={`More options for ${song.title}`}>⋮</button>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}

export default Playlist;
