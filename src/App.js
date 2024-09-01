import "./App.css";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Account from "./Components/Account";
import SearchSong from "./Components/SearchSong";
import MusicPlayer from "./Components/MusicPlayer";

function App() {
  const apiUrl = process.env.REACT_APP_API;
  const [data, setData] = useState({});
  const [ind, setInd] = useState(0);
  const initial = useRef(true);
  const [currentSong, setCurrentSong] = useState(data[ind] ? data[ind] : null);
  const [topTrack, setTopTrack] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const currentAudio = useRef();

  const getSongsData = async () => {
    try {
      const data = await axios.get(apiUrl);
      setData(data.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSongsData();
  }, []);

  useEffect(() => {
    if (width !== window.innerWidth) setWidth(window.innerWidth);
  }, [width]);

  useEffect(() => {
    setCurrentSong(data[ind] ? data[ind] : null);
    if (currentAudio.current) currentAudio.current.pause();
  }, [data]);

  return (
    <div className={`App${topTrack ? "2" : "1"}`}>
      <Account topTrack={topTrack} />
      {data && currentSong ? (
        <>
          <audio src={currentSong.url} ref={currentAudio}></audio>
          <SearchSong
            songs={data}
            ind={ind}
            setInd={setInd}
            currentSong={currentSong}
            setTopTrack={setTopTrack}
            topTrack={topTrack}
            width={width}
          />
          <MusicPlayer
            song={data}
            ind={ind}
            setInd={setInd}
            currentSong={currentSong}
            setCurrentSong={setCurrentSong}
            initial={initial}
            topTrack={topTrack}
            width={width}
          />
        </>
      ) : (
        "Loading"
      )}
    </div>
  );
}

export default App;
