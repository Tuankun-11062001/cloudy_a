import React from "react";
import { Route, Routes } from "react-router-dom";
import ProfilePage from "../page/profilePage";
import DetailProfile from "../page/detailProfile";

const ProfileRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<ProfilePage />} />
      <Route path="/:id" element={<DetailProfile />} />
    </Routes>
  );
};

export default ProfileRoute;
