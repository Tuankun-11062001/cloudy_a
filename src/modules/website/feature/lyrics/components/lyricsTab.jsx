import React from "react";

const LyricsTab = () => {
  const handleTab = (e) => {
    const tabs = e.target.parentElement.querySelectorAll("p");
    const contents = e.target
      .closest(".lyrics")
      .querySelectorAll(".tab_content");

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
    <div className="lyrics_tabs">
      <p onClick={handleTab} className="active" data-tab="lyrics">
        Lyrics
      </p>
      <p onClick={handleTab} data-tab="category">
        Category
      </p>
      <p onClick={handleTab} data-tab="country">
        Country
      </p>
      <p onClick={handleTab} data-tab="albums">
        Albums
      </p>
      <p onClick={handleTab} data-tab="singer">
        Singer
      </p>
    </div>
  );
};

export default LyricsTab;
