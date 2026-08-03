import { useState, useRef, useEffect } from "react";
import Header from "./components/Header";
import SearchBar from "./components/Searchbar";
import CategoryFilter from "./components/CategoryFilter";
import Playlist from "./components/Playlist";
import PlayerControls from "./components/PlayerControl";
import songsData from "./data/song";
import "./styles/styles.css";

function App() {
  const [songs] = useState(songsData);
  const [currentSong, setCurrentSong] = useState(songsData[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");

  const audioRef = useRef(new Audio(songsData[0].src));

  useEffect(() => {
    audioRef.current.src = currentSong.src;

    if (isPlaying) {
      audioRef.current.play();
    }
  }, [currentSong]);

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const playNext = () => {
    const currentIndex = songs.findIndex(
      (song) => song.id === currentSong.id
    );

    const nextIndex = (currentIndex + 1) % songs.length;
    setCurrentSong(songs[nextIndex]);
    setIsPlaying(true);
  };

  const playPrevious = () => {
    const currentIndex = songs.findIndex(
      (song) => song.id === currentSong.id
    );

    const previousIndex =
      (currentIndex - 1 + songs.length) % songs.length;

    setCurrentSong(songs[previousIndex]);
    setIsPlaying(true);
  };

  const filteredSongs = songs.filter((song) => {
    const matchSearch =
      song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchTerm.toLowerCase());

    const matchCategory =
      category === "All" || song.category === category;

    return matchSearch && matchCategory;
  });

  return (
    <div className="container">
      <Header />

      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <CategoryFilter
        category={category}
        setCategory={setCategory}
      />

      <Playlist
        songs={filteredSongs}
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
      />

      <PlayerControls
        currentSong={currentSong}
        isPlaying={isPlaying}
        togglePlayPause={togglePlayPause}
        playNext={playNext}
        playPrevious={playPrevious}
        audioRef={audioRef}
      />
    </div>
  );
}

export default App;