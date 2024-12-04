import React from "react";
import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import Home from "./home";
import WebsiteRouter from "../modules/website/router/websiteRouter";
import PlanRouter from "../modules/plan/router/planRouter";
import ProtectedRoute from "./projectRouter";

const MainRouter = () => {
  return (
    <HashRouter>
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
    </HashRouter>
  );
};

export default MainRouter;
