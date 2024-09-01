import React, { useState, useEffect, useRef } from "react";

function MusicPlayer({
  song,
  ind,
  setInd,
  currentSong,
  setCurrentSong,
  initial,
  topTrack,
}) {
  const imgUrl = process.env.REACT_APP_API_IMG;
  const currentAudio = useRef();

  const [audioProgress, setAudioProgress] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [musicTotalLength, setMusicTotalLength] = useState("03 : 17");
  const [musicCurrentLength, setMusicCurrentLength] = useState("00 : 00");

  const handleAudioPlay = () => {
    try {
      if (currentAudio.current.paused) {
        currentAudio.current.play();
        initial.current = false;
        setPlaying(true);
      } else {
        currentAudio.current.pause();
        setPlaying(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleAudioOnlyPlay = () => {
    try {
      currentAudio.current.play();
      initial.current = false;
      setPlaying(true);
    } catch (error) {
      console.log(error);
    }
  };
  const handleAudioOnlyPause = () => {
    try {
      currentAudio.current.pause();
      setPlaying(false);
    } catch (error) {}
  };
  const handleNextSong = () => {
    if (ind >= song.length - 1) {
      setInd(0);
      setCurrentSong(song[ind]);
      setTimeout(handleAudioOnlyPlay, 200);
    } else {
      setInd(ind + 1);
      setCurrentSong(song[ind]);
      setTimeout(handleAudioOnlyPlay, 200);
    }
  };

  const handlePrevSong = () => {
    if (ind >= 1) {
      setInd(ind - 1);
      setCurrentSong(song[ind]);
      setTimeout(handleAudioOnlyPlay, 200);
    } else {
      setInd(song.length - 1);
      setCurrentSong(song[ind]);
      setTimeout(handleAudioOnlyPlay, 200);
    }
  };

  const handleSeeker = (e) => {
    setAudioProgress(e.target.value);
    currentAudio.current.currentTime =
      (e.target.value * currentAudio.current.duration) / 100;
  };

  const handleAudioUpdate = () => {
    let m = Math.floor(currentAudio.current.duration / 60);
    let s = Math.floor(currentAudio.current.duration % 60);
    let musicTotalLength0 = `${m < 10 ? `0${m}` : m} : ${s < 10 ? `0${s}` : s}`;
    setMusicTotalLength(musicTotalLength0);

    let m1 = Math.floor(currentAudio.current.currentTime / 60);
    let s1 = Math.floor(currentAudio.current.currentTime % 60);
    let musicCurrentLength0 = `${m1 < 10 ? `0${m1}` : m1} : ${
      s1 < 10 ? `0${s1}` : s1
    }`;
    setMusicCurrentLength(musicCurrentLength0);

    const progess = parseInt(
      (currentAudio.current.currentTime / currentAudio.current.duration) * 100
    );
    setAudioProgress(isNaN(progess) ? 0 : progess);
  };

  useEffect(() => {
    setCurrentSong(song[ind]);
  });

  useEffect(() => {
    setInd(ind);

    setCurrentSong(song[ind]);
  }, [ind, currentSong, ind]);

  useEffect(() => {
    if (currentSong && !initial.current) {
      setTimeout(handleAudioOnlyPlay, 200);
    } else {
      handleAudioOnlyPause();
    }
  }, [ind]);

  return currentSong ? (
    <div className={`music-player music-player${topTrack ? "2" : "1"}`}>
      <audio
        src={currentSong.url}
        ref={currentAudio}
        onEnded={handleNextSong}
        onTimeUpdate={handleAudioUpdate}
      ></audio>
      <div className="music-player-song-name">{currentSong.name}</div>
      <div className="music-player-artist-name">{currentSong.artist}</div>
      <div className="music-player-artist-img">
        <img
          alt="img"
          src={`${imgUrl}/${currentSong.cover}`}
          className="music-player-img"
        />
      </div>
      <div className="seeker">
        <input
          type="range"
          name="seekerbar"
          className="seekerbar"
          value={audioProgress}
          onChange={handleSeeker}
        />
      </div>
      <div className="seeker-time">
        <span>{musicCurrentLength}</span>
        <span>{musicTotalLength}</span>
      </div>
      <div className="controls">
        <span className="dots">
          <i className="fa-solid fa-ellipsis"></i>
        </span>
        <span className="rew">
          <i className="fa-solid fa-backward" onClick={handlePrevSong}></i>
        </span>
        <span className="play-pause">
          {!playing ? (
            <i
              className="fa-solid fa-circle-play"
              onClick={handleAudioPlay}
            ></i>
          ) : (
            <i className="fa-solid fa-pause" onClick={handleAudioPlay}></i>
          )}
        </span>
        <span className="next">
          <i className="fa-solid fa-forward" onClick={handleNextSong}></i>
        </span>
        <span className="vol">
          <i className="fa-solid fa-volume-high"></i>
        </span>
      </div>
    </div>
  ) : (
    "Loading"
  );
}

export default MusicPlayer;
