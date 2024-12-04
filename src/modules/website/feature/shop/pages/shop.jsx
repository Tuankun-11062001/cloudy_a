import React from "react";

import {
  ShopCategoryContent,
  ShopContent,
  ShopPartnerContent,
} from "../components/shopContent";
import ShopTab from "../components/shopTab";

const Shop = () => {
  return (
    <div className="shop">
      <ShopTab />
      <div className="shop_container">
        <ShopContent />
        <ShopCategoryContent />
        <ShopPartnerContent />
      </div>
    </div>
  );
};

export default Shop;
