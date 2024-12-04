import React from "react";
import { Route, Routes } from "react-router-dom";
import UserPage from "../pages/userPage";
import DetailUser from "../pages/detailUser";

const UserRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<UserPage />} />
      <Route path="/:id" element={<DetailUser />} />
    </Routes>
  );
};

export default UserRoute;
