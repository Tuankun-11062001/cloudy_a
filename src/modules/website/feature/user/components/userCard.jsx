import React from "react";
import { appSvg } from "../../../../../data/svg";
import { useNavigate } from "react-router-dom";

const UserCard = ({ data, indx }) => {
  const navigate = useNavigate();

  const detailUser = () => {
    navigate(`/website/user/${data._id}`, {
      state: {
        user: data,
      },
    });
  };
  return (
    <div className="user_card" onClick={detailUser}>
      <span>{indx + 1}</span>
      <p>{data.userName}</p>
      <p>{data.admin ? appSvg.check : appSvg.none}</p>
      <p>{data.userEmail}</p>
      <p>{data.userSocial.length}</p>
    </div>
  );
};

export default UserCard;
