import React from "react";
import { Route, Routes } from "react-router-dom";
import Communication from "../pages/communication";

const CommunicationRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Communication />} />
    </Routes>
  );
};

export default CommunicationRouter;
