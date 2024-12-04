import React from "react";
import { Route, Routes } from "react-router-dom";
import AdsPage from "../page/adsPage";
import DetailAds from "../page/detailAds";

const AdsRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<AdsPage />} />
      <Route path="/:id" element={<DetailAds />} />
    </Routes>
  );
};

export default AdsRoute;
