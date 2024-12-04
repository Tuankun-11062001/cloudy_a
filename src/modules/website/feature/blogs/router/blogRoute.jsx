import React from "react";
import { Route, Routes } from "react-router-dom";
import BlogPage from "../page/blogPage";
import BlogDetail from "../page/blogDetail";

const BlogRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<BlogPage />} />
      <Route path="/:id" element={<BlogDetail />} />
    </Routes>
  );
};

export default BlogRoute;
