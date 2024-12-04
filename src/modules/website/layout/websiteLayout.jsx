import React from "react";
import WebNavigation from "../components/navigation/webNavigation";

const WebsiteLayout = ({ children }) => {
  return (
    <div className="web_layout">
      <WebNavigation />
      <div className="web_layout_content">{children}</div>
    </div>
  );
};

export default WebsiteLayout;
