import React from "react";
import { Route, Routes } from "react-router-dom";
import SupportPage from "../page/supportPage";
import DetailSupport from "../page/detailSupport";

const SupportRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<SupportPage />} />
      <Route path="/:id" element={<DetailSupport />} />
    </Routes>
  );
};

export default SupportRoute;
