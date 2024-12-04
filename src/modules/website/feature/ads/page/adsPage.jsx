import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createAdsThunk,
  getAdsThunk,
} from "../../../../../store/slices/adsSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import AdsCard from "../components/adsCard";

const AdsPage = () => {
  const { ads } = useSelector((state) => state.ads);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAdsThunk());
  }, []);

  const [dataAds, setDataAds] = useState({
    partnerAds: "",
    detail: "",
    imageAds: "",
    imageVerticalAds: "",
    linkAds: "",
  });

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
      const resultAction = await dispatch(createAdsThunk(dataAds));

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
    const boxCreate = e.target.closest(".ads").querySelector(".ads_create");
    boxCreate.classList.toggle("active");
  };

  return (
    <div className="ads">
      <div className="ads_head">
        <p onClick={toggleBoxCreate}>Create Ads</p>
      </div>
      <div className="ads_create">
        <div className="create_info">
          {message && <span>{message}</span>}
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
          <p onClick={handleSubmit}>Create</p>
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
      <div className="ads_list">
        {ads.map((item) => (
          <AdsCard data={item} key={item._id} />
        ))}
      </div>
    </div>
  );
};

export default AdsPage;
