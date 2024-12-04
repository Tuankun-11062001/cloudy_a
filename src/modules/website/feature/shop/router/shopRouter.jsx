import React from "react";
import { Route, Routes } from "react-router-dom";
import Shop from "../pages/shop";
import ShopDetail from "../pages/shopDetail";

const ShopRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Shop />} />
      <Route path="/:id" element={<ShopDetail />} />
    </Routes>
  );
};

export default ShopRouter;
