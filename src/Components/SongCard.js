import React, { useEffect } from "react";
import { useRef, useState } from "react";

function SongCard({ data, setInd, currentSong, topTrack }) {
  const imgUrl = process.env.REACT_APP_API_IMG;
  const currentAudio = useRef();

  const [thisSong, setThisSong] = useState(false);

  let m, s, musicTotalLength0;
  if (currentAudio && currentAudio.current) {
    m = Math.floor(currentAudio.current.duration / 60);
    s = Math.floor(currentAudio.current.duration % 60);
    musicTotalLength0 = `${m < 10 ? `0${m}` : m} : ${s < 10 ? `0${s}` : s}`;
  }

  const handleClick = () => {
    setInd(data.index);
  };

  const checkCurrentSong = () => {
    if (currentSong.name === data.name) {
      setThisSong(true);
    } else {
      setThisSong(false);
    }
  };

  useEffect(() => {
    checkCurrentSong();
  }, [currentSong]);

  return (
    <div
      className={`song-card-main${topTrack ? "2" : "1"} ${
        thisSong ? (topTrack ? "song-active2" : "song-active1") : " "
      }`}
      onClick={handleClick}
    >
      <audio src={data.url} ref={currentAudio}></audio>
      <img
        alt="img"
        src={`${imgUrl}/${data.cover}`}
        className="song-card-img"
      />
      <div className="song-card-name-container">
        <div>{data.name}</div>
        <div>{data.artist}</div>
      </div>
      <div className="song-card-time">{musicTotalLength0}</div>
    </div>
  );
}

export default SongCard;
