import React, { useEffect, useState } from "react";
import SongCard from "./SongCard";

function SearchSong({
  songs,
  setInd,
  ind,
  currentSong,
  topTrack,
  setTopTrack,
  width,
}) {
  const [srchVal, setSrchVal] = useState();
  const [list, setList] = useState([]);
  const handleChange = (e) => {
    setSrchVal(e.target.value);
    if (srchVal) {
      const filtered = songs.filter(
        (song) =>
          song.name.toLowerCase().includes(srchVal.toLowerCase()) ||
          song.artist.toLowerCase().includes(srchVal.toLowerCase())
      );

      setList(filtered);
    }
  };

  useEffect(() => {
    Array.from(songs).forEach((obj, index) => {
      obj.index = index;
    });
  });
  return (
    <div className="search-song">
      <div className="search-song-heading">
        <div className="heading-opts">
          <div
            className={`heading-opt1 ${
              !topTrack ? `heading-active` : `heading-inactive`
            }`}
            onClick={() => setTopTrack(false)}
          >
            For You
          </div>
          <div
            className={`heading-opt2 ${
              topTrack ? `heading-active` : `heading-inactive`
            }`}
            onClick={() => setTopTrack(true)}
          >
            Top Tracks
          </div>
        </div>
        <input
          className="search-box"
          type="text"
          placeholder={
            width > 800
              ? `Search Song, Artist                                                            `
              : "Search Song, Artist"
          }
          onChange={handleChange}
          value={srchVal}
        ></input>
        {songs.length > 1
          ? !srchVal
            ? songs.map((item) => {
                return (
                  <SongCard
                    data={item}
                    key={item.id}
                    setInd={setInd}
                    ind={ind}
                    currentSong={currentSong}
                    topTrack={topTrack}
                  />
                );
              })
            : list.map((item) => {
                return (
                  <SongCard
                    data={item}
                    key={item.id}
                    setInd={setInd}
                    ind={ind}
                    currentSong={currentSong}
                    topTrack={topTrack}
                  />
                );
              })
          : "oops"}
      </div>
    </div>
  );
}

export default SearchSong;
