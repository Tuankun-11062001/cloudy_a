import React from "react";

const ShopTab = () => {
  const handleTab = (e) => {
    const tabs = e.target.parentElement.querySelectorAll("p");
    const contents = e.target.closest(".shop").querySelectorAll(".tab_content");

    tabs.forEach((element) => {
      element.classList.remove("active");
    });

    let tabData = e.target.dataset.tab;
    contents.forEach((content) => {
      content.classList.remove("active");

      if (tabData == content.dataset.content) {
        return content.classList.add("active");
      }
    });

    e.target.classList.add("active");
  };

  return (
    <div className="shop_tabs">
      <p onClick={handleTab} className="active" data-tab="shop">
        Shop
      </p>
      <p onClick={handleTab} data-tab="category">
        Category
      </p>
      <p onClick={handleTab} data-tab="partner">
        Partner
      </p>
    </div>
  );
};

export default ShopTab;
