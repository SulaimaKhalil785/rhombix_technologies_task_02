function Playlist({ songs, currentSong, setCurrentSong }) {
  if (songs.length === 0) {
    return (
      <div className="playlist">
        <h2>Playlist</h2>
        <p>No songs found.</p>
      </div>
    );
  }

  return (
    <div className="playlist">
      <h2>Playlist</h2>

      <ul>
        {songs.map((song) => (
          <li
            key={song.id}
            className={currentSong.id === song.id ? "active-song" : ""}
            onClick={() => setCurrentSong(song)}
          >
            <div>
              <h3>{song.title}</h3>
              <p>{song.artist}</p>
            </div>

            <span>{song.category}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Playlist;