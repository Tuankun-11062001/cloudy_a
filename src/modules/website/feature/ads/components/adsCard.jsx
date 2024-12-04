import React from "react";
import { useNavigate } from "react-router-dom";

const AdsCard = ({ data }) => {
  const navigate = useNavigate();
  const detailAds = () => {
    navigate(`/website/ads/${data._id}`, {
      state: {
        data: data,
      },
    });
  };
  return (
    <div className="ads_card" onClick={detailAds}>
      <p>Partner: {data.partnerAds}</p>
      <img src={data.imageAds} />
    </div>
  );
};

export default AdsCard;
