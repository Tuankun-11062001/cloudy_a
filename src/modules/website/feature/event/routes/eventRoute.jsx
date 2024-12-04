import React from "react";
import { Route, Routes } from "react-router-dom";
import EventPage from "../page/eventPage";
import DetailEvent from "../page/detailEvent";

const EventRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<EventPage />} />
      <Route path="/:id" element={<DetailEvent />} />
    </Routes>
  );
};

export default EventRoute;
