import React from "react";
import { Link, NavLink } from "react-router-dom";

const WebNavigation = () => {
  return (
    <div className="web_navigation">
      <Link to="/">
        <img src="/logonew.png" />
      </Link>
      <NavLink to="" end>
        Home
      </NavLink>
      <NavLink to="communication" end>
        Communication
      </NavLink>
      <NavLink to="lyrics" end>
        Lyrics
      </NavLink>
      <NavLink to="blog" end>
        Blog
      </NavLink>
      <NavLink to="book" end>
        Book
      </NavLink>
      <NavLink to="shop" end>
        Shop
      </NavLink>
      <NavLink to="profile" end>
        Profile
      </NavLink>
      <NavLink to="support" end>
        Support
      </NavLink>
      <NavLink to="ads" end>
        Ads
      </NavLink>
      <NavLink to="event" end>
        Event
      </NavLink>
      <NavLink to="user" end>
        User
      </NavLink>
    </div>
  );
};

export default WebNavigation;
