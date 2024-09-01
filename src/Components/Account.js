import React from "react";
import SpotifyLogo from "../Spotify_Logo.png";
import UserImg from "../user_img.jpeg";

function Account({ topTrack }) {
  return (
    <>
      <div className={`navbar navbar${topTrack ? "2" : "1"}`}>
        <div className="main-logo">
          <span>
            <img src={SpotifyLogo} className="main-logo" alt="Spotify Logo" />
          </span>
        </div>
        <div className="main-acc">
          <img src={UserImg} className="acc-img" alt="User profile" />
        </div>
      </div>
    </>
  );
}

export default Account;
