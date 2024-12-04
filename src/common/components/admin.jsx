import React from "react";
import { appSvg } from "../../data/svg";
import { Link } from "react-router-dom";

const Admin = () => {
  return (
    <div className="admin">
      <div className="admin_plan">
        <Link to="plan">
          {appSvg.plan}
          <h1>My Plan</h1>
          <p>Schedule Feature, Jobs, Project</p>
        </Link>
      </div>
      <div className="admin_web">
        <Link to="website">
          {appSvg.web}
          <h1>My Website</h1>
          <p>Manager Website Cloudy</p>
        </Link>
      </div>
    </div>
  );
};

export default Admin;
