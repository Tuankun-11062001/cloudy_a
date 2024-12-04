import React from "react";

const BlogTabs = () => {
  const handleTab = (e) => {
    const tabs = e.target.parentElement.querySelectorAll("p");
    const contents = e.target
      .closest(".blogs")
      .querySelectorAll(".tab_content");

    tabs.forEach((element) => {
      element.classList.remove("active");
    });

    console.log("content", contents);

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
    <div className="blogs_tabs">
      <p onClick={handleTab} className="active" data-tab="lyrics">
        blogs
      </p>
      <p onClick={handleTab} data-tab="category">
        Category
      </p>
    </div>
  );
};

export default BlogTabs;
