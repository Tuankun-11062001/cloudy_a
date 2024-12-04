import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./home";
import WebsiteRouter from "../modules/website/router/websiteRouter";
import PlanRouter from "../modules/plan/router/planRouter";
import ProtectedRoute from "./projectRouter";

const MainRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/website/*"
          element={
            <ProtectedRoute>
              <WebsiteRouter />
            </ProtectedRoute>
          }
        />
        <Route
          path="/plan/*"
          element={
            <ProtectedRoute>
              <PlanRouter />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default MainRouter;
