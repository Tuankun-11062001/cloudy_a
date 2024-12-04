import React from "react";
import LyricsTab from "../components/lyricsTab";
import {
  LyricsAlbumsContent,
  LyricsCategoryContent,
  LyricsContent,
  LyricsCountryContent,
  LyricsSingerContent,
} from "../components/lyricsContent";

const Lyrics = () => {
  return (
    <div className="lyrics">
      <LyricsTab />
      <div className="lyrics_container">
        <LyricsContent />
        <LyricsCategoryContent />
        <LyricsCountryContent />
        <LyricsAlbumsContent />
        <LyricsSingerContent />
      </div>
    </div>
  );
};

export default Lyrics;
