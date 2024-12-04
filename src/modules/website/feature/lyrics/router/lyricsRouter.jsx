import React from "react";
import { Route, Routes } from "react-router-dom";
import Lyrics from "../pages/lyrics";
import LyricsDetail from "../pages/lyricsDetail";

const LyricsRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Lyrics />} />
      <Route path="/:id" element={<LyricsDetail />} />
    </Routes>
  );
};

export default LyricsRouter;
