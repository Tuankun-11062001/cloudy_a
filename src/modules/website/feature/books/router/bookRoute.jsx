import React from "react";
import { Route, Routes } from "react-router-dom";
import BookPage from "../pages/book";
import BookDetail from "../pages/bookDetail";
import ChaperDetail from "../pages/chapterDetail";

const BookRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<BookPage />} />
      <Route path="/:id" element={<BookDetail />} />
      <Route path="/chapter/:id" element={<ChaperDetail />} />
    </Routes>
  );
};

export default BookRoute;
