import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  deleteAdsThunk,
  editAdsThunk,
} from "../../../../../store/slices/adsSlice";
import { unwrapResult } from "@reduxjs/toolkit";

const DetailAds = () => {
  const { data } = useLocation().state;
  const dispatch = useDispatch();
  const [dataAds, setDataAds] = useState(data);

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataAds((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async () => {
    try {
      const resultAction = await dispatch(editAdsThunk(dataAds));

      const result = unwrapResult(resultAction);
      if (result.data.status !== 200) {
        setMessage("Error Save");
      }
      setMessage("Save Success");
    } catch (error) {
      console.error("Submit failed:", error);
    }
  };

  const handleYes = async () => {
    try {
      const resultAction = await dispatch(deleteAdsThunk(dataAds));

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
    const boxCreate = e.target
      .closest(".detail_ads")
      .querySelector(".ads_create");
    boxCreate.classList.toggle("active");
  };

  const toggleBoxDelete = (e) => {
    const boxCreate = e.target
      .closest(".detail_ads")
      .querySelector(".ads_delete");
    boxCreate.classList.toggle("active");
  };

  return (
    <div className="detail_ads">
      <div className="detail_ads_head">
        <p onClick={toggleBoxCreate}>Edit</p>
        <p onClick={toggleBoxDelete}>Delete</p>
      </div>

      <div className="ads_delete">
        <h4>Are you sure?</h4>
        <div className="g">
          <p onClick={handleYes}>Yes</p>
          <p onClick={toggleBoxDelete}>No</p>
        </div>
        {message && <span>{message}</span>}
      </div>

      <div className="ads_create">
        <div className="create_info">
          {message && <span>{message}</span>}
          <div className="create_g_top">
            <div className="create_g">
              <span>Public</span>
              <select
                name="public"
                onChange={handleChange}
                value={dataAds.public}
              >
                <option>choose</option>
                <option value="true">True</option>
                <option value="false">false</option>
              </select>
            </div>
            <div className="create_g">
              <span>PopUp</span>
              <select
                name="popUp"
                onChange={handleChange}
                value={dataAds.popUp}
              >
                <option>choose</option>
                <option value="true">True</option>
                <option value="false">false</option>
              </select>
            </div>
            <div className="create_g">
              <span>Bottom</span>
              <select
                name="bottom"
                onChange={handleChange}
                value={dataAds.bottom}
              >
                <option>choose</option>
                <option value="true">True</option>
                <option value="false">false</option>
              </select>
            </div>
            <div className="create_g">
              <span>Vertical </span>
              <select
                name="vertical"
                onChange={handleChange}
                value={dataAds.vertical}
              >
                <option>choose</option>
                <option value="true">True</option>
                <option value="false">false</option>
              </select>
            </div>
            <div className="create_g">
              <span>Horizal </span>
              <select
                name="horizal"
                onChange={handleChange}
                value={dataAds.horizal}
              >
                <option>choose</option>
                <option value="true">True</option>
                <option value="false">false</option>
              </select>
            </div>
          </div>
          <div className="create_g">
            <span>Partner Ads</span>
            <input
              placeholder="Partner Ads"
              name="partnerAds"
              value={dataAds.partnerAds}
              onChange={handleChange}
            />
          </div>
          <div className="create_g">
            <span>Image Ads</span>
            <input
              placeholder="Link image Ads"
              name="imageAds"
              value={dataAds.imageAds}
              onChange={handleChange}
            />
          </div>
          <div className="create_g">
            <span>Image Vertical Ads</span>
            <input
              placeholder="Link image vertical Ads"
              name="imageVerticalAds"
              value={dataAds.imageVerticalAds}
              onChange={handleChange}
            />
          </div>
          <div className="create_g">
            <span>Link Ads</span>
            <input
              placeholder="Link Ads"
              name="linkAds"
              value={dataAds.linkAds}
              onChange={handleChange}
            />
          </div>
          <div className="create_g">
            <span>Detail</span>
            <textarea
              placeholder="Detail ads"
              name="detail"
              value={dataAds.detail}
              onChange={handleChange}
            />
          </div>
          <p onClick={handleSubmit}>Save</p>
        </div>
        <div className="create_view">
          <p>Review Ads</p>
          <a href={dataAds.linkAds}>
            <img src={dataAds.imageAds} />
          </a>
          <a href={dataAds.linkAds} className="create_view_vertical">
            <img src={dataAds.imageVerticalAds} />
          </a>
        </div>
      </div>

      <div className="detail_ads_view">
        <p>Review Ads</p>
        <div className="view_g">
          <a href={dataAds.linkAds} target="_blank">
            <img src={dataAds.imageAds} />
          </a>
          <a href={dataAds.linkAds} target="_blank" className="view_g_vertical">
            <img src={dataAds.imageVerticalAds} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default DetailAds;
