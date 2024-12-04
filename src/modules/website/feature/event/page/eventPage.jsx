import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import {
  createEventThunk,
  getEventThunk,
} from "../../../../../store/slices/eventSlice";
import { appSvg } from "../../../../../data/svg";
import { useNavigate } from "react-router-dom";

const EventPage = () => {
  const { events } = useSelector((state) => state.event);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getEventThunk());
  }, []);

  const [dataEvent, setDataEvent] = useState({
    bannerCategoryLyrics: "",
    bannerCategorySinger: "",
    bannerCategoryBlog: "",
    listAvatar: [],
    listBannerProfile: [],
  });

  const [avatar, setAvatar] = useState({
    avatar: "",
  });

  const [banner, setBanner] = useState({
    banner: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataEvent((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleChangeAvatar = (e) => {
    setAvatar((prev) => {
      return {
        ...prev,
        avatar: e.target.value,
      };
    });
  };

  const handleChangeBanner = (e) => {
    setBanner((prev) => {
      return {
        ...prev,
        banner: e.target.value,
      };
    });
  };

  const handleAddAvatar = () => {
    setDataEvent((prev) => {
      return {
        ...prev,
        listAvatar: [...prev.listAvatar, avatar],
      };
    });
  };

  const handleAddBanner = () => {
    setDataEvent((prev) => {
      return {
        ...prev,
        listBannerProfile: [...prev.listBannerProfile, banner],
      };
    });
  };

  const handleSubmit = async () => {
    try {
      const resultAction = await dispatch(createEventThunk(dataEvent));

      const result = unwrapResult(resultAction);
      if (result.data.status !== 200) {
        setMessage("Error Save");
      }
      setMessage("Save Success");
    } catch (error) {
      console.error("Submit failed:", error);
    }
  };

  // box create
  const toggleBoxCreate = (e) => {
    const boxCreate = e.target.closest(".event").querySelector(".event_create");
    boxCreate.classList.toggle("active");
  };

  const detailEvent = (data) => {
    navigate(`/website/event/${data._id}`, {
      state: {
        data,
      },
    });
  };

  return (
    <div className="event">
      <div className="event_head">
        <p onClick={toggleBoxCreate}>Create Event</p>
      </div>
      <div className="event_create">
        <div className="create_info">
          {message && <span>{message}</span>}
          <div className="create_g">
            <span>Banner Category Lyrics</span>
            <input
              placeholder="Link Banner Category Lyrics"
              name="bannerCategoryLyrics"
              value={dataEvent.bannerCategoryLyrics}
              onChange={handleChange}
            />
          </div>
          <div className="create_g">
            <span>Banner Category Blog</span>
            <input
              placeholder="Link Banner Catgory Blog"
              name="bannerCategoryBlog"
              value={dataEvent.bannerCategoryBlog}
              onChange={handleChange}
            />
          </div>
          <div className="create_g">
            <span>Banner Category Singer</span>
            <input
              placeholder="Link Banner Catgory Blog"
              name="bannerCategorySinger"
              value={dataEvent.bannerCategorySinger}
              onChange={handleChange}
            />
          </div>
          <div className="create_g">
            <span>List Avatar</span>
            <div className="create_g_form">
              <input
                placeholder="List Avatar"
                value={avatar.avatar}
                onChange={handleChangeAvatar}
              />
              <p onClick={handleAddAvatar}>Adding</p>
            </div>

            <div className="create_g_list">
              {dataEvent.listAvatar.map((item, index) => (
                <span key={index}>
                  <p>{appSvg.close}</p>
                  <img src={item.avatar} />
                </span>
              ))}
            </div>
          </div>
          <div className="create_g">
            <span>List Banner Profile</span>
            <div className="create_g_form">
              <input
                placeholder="Link Banner Profile"
                value={banner.banner}
                onChange={handleChangeBanner}
              />
              <p onClick={handleAddBanner}>Adding</p>
            </div>

            <div className="create_g_list">
              {dataEvent.listBannerProfile.map((item, index) => (
                <span key={index}>
                  <p>{appSvg.close}</p>
                  <img src={item.banner} />
                </span>
              ))}
            </div>
          </div>

          <p onClick={handleSubmit}>Create</p>
        </div>
        <div className="create_view">
          <p>Review Event</p>
          <div className="banner">
            <img src={dataEvent.bannerCategoryLyrics} />
            <img src={dataEvent.bannerCategorySinger} />
            <img src={dataEvent.bannerCategoryBlog} />
          </div>
          <p>List Avatar</p>
          <div className="list_avatar">
            {dataEvent.listAvatar.map((item) => (
              <img src={item.avatar} />
            ))}
          </div>

          <p>List Banner Profile</p>
          <div className="list_banner">
            {dataEvent.listBannerProfile.map((item) => (
              <img src={item.banner} />
            ))}
          </div>
        </div>
      </div>
      <div className="event_list">
        {events.map((item, index) => (
          <p key={index} onClick={() => detailEvent(item)}>
            Event Cloudy Melody
          </p>
        ))}
      </div>
    </div>
  );
};

export default EventPage;
