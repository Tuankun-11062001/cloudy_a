import React from "react";
import { Route, Routes } from "react-router-dom";
import Plan from "../page/plan";

const PlanRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Plan />} />
    </Routes>
  );
};

export default PlanRouter;
