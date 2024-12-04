import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { appSvg } from "../../../../../data/svg";
import { useDispatch } from "react-redux";
import { editUserThunk } from "../../../../../store/slices/userSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import axios from "axios";
import { userApi } from "../../../../../api/userApi";

const DetailUser = () => {
  const { user } = useLocation().state;
  const dispatch = useDispatch();
  const [dataUser, setDataUser] = useState(user);
  const [message, setMessage] = useState("");

  const [dataSocial, setDataSocial] = useState({
    social: "",
    linkSocial: "",
  });

  const [changePassword, setChangePassword] = useState({
    newPassword: "",
    reNewPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataUser((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleChangeSocial = (e) => {
    const { name, value } = e.target;
    setDataSocial((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleAddingSocial = () => {
    setDataUser((prev) => {
      return {
        ...prev,
        userSocial: [...prev.userSocial, dataSocial],
      };
    });
  };

  const handleDeleteSocial = (index) => {
    const newSocial = dataUser.userSocial.filter((_, indx) => indx !== index);
    setDataUser((prev) => {
      return {
        ...prev,
        userSocial: newSocial,
      };
    });
  };

  const handleSubmit = async () => {
    try {
      const resultAction = await dispatch(editUserThunk(dataUser));

      const result = unwrapResult(resultAction);
      if (result.data.status !== 201) {
        setMessage("Error Save");
      }
      setMessage("Save Success");
    } catch (error) {
      console.error("Submit failed:", error);
    }
  };

  // re password

  const handleChangePassword = (e) => {
    const { name, value } = e.target;
    setMessage("");
    setChangePassword((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmitChangePasswrod = async () => {
    // check math pass
    if (changePassword.newPassword !== changePassword.reNewPassword) {
      return setMessage("Password Not Match");
    }

    const localId = localStorage.getItem("_CM_id");

    const payload = {
      ...dataUser,
      newPassword: changePassword.newPassword,
      idChanger: localId,
    };

    const res = await userApi.changePassword(payload);
    if (res.status !== 200) {
      return;
    }
    setMessage(res.data.message);
  };

  const handleSubmitDelete = async () => {
    const localId = localStorage.getItem("_CM_id");
    const payload = {
      idChanger: localId,
      _id: dataUser._id,
    };

    const res = await userApi.deleteUser(payload);

    if (res.status !== 200) {
      return;
    }
    setMessage(res.data.message);
  };

  // box create
  const openBoxCreate = (e) => {
    const boxCreate = e.target
      .closest(".detail_user")
      .querySelector(".detail_user_create");
    boxCreate.classList.toggle("active");
  };

  const openChangePassword = (e) => {
    const boxChange = e.target
      .closest(".detail_user")
      .querySelector(".detail_user_change_password");
    boxChange.classList.toggle("active");
  };

  const openDelete = (e) => {
    const boxChange = e.target
      .closest(".detail_user")
      .querySelector(".detail_user_delete");
    boxChange.classList.toggle("active");
  };

  return (
    <div className="detail_user">
      <div className="detail_user_head">
        <p onClick={openBoxCreate}>Edit User</p>
        <p onClick={openChangePassword}>Change Password</p>
        <p onClick={openDelete}>Delete User</p>
      </div>

      <div className="detail_user_create">
        <div className="detail_user_create_left">
          <span>{message}</span>
          <div className="create_g">
            <span>Avatar</span>
            <input
              placeholder="avatar"
              name="avatar"
              value={dataUser.avatar}
              onChange={handleChange}
            />
          </div>
          <div className="create_g">
            <span>Banner</span>
            <input
              placeholder="banner"
              name="banner"
              value={dataUser.banner}
              onChange={handleChange}
            />
          </div>
          <div className="create_g">
            <span>UserName</span>
            <input
              placeholder="userName"
              name="userName"
              value={dataUser.userName}
              onChange={handleChange}
            />
          </div>
          <div className="create_g">
            <span>UserEmail</span>
            <input
              placeholder="userEmail"
              name="userEmail"
              value={dataUser.userEmail}
              onChange={handleChange}
            />
          </div>

          <div className="create_g">
            <span>User Detail</span>
            <input
              placeholder="userDetail"
              name="userDetail"
              value={dataUser.userDetail}
              onChange={handleChange}
            />
          </div>
          <div className="create_g">
            <div className="create_g_head">
              <span>Social</span>
            </div>
            <div className="create_g_social">
              <div className="create_head">
                <select
                  name="social"
                  value={dataSocial.social}
                  onChange={handleChangeSocial}
                >
                  <option value="">Choose</option>
                  <option value="youtube">Youtube</option>
                  <option value="instagram">Instagram</option>
                  <option value="facebook">Facebook</option>
                  <option value="tiktok">Tiktok</option>
                  <option value="twitter">Twitter</option>
                </select>
                <input
                  placeholder="link Social"
                  name="linkSocial"
                  value={dataSocial.linkSocial}
                  onChange={handleChangeSocial}
                />
              </div>
              <p onClick={handleAddingSocial}>Adding</p>
            </div>
            <div className="create_g_list">
              {dataUser.userSocial.map((item, index) => (
                <p key={index}>
                  <span onClick={() => handleDeleteSocial(index)}>
                    {appSvg.close}
                  </span>
                  {item.social}
                </p>
              ))}
            </div>
          </div>
          <p onClick={handleSubmit}>Save</p>
        </div>
        <div className="detail_user_create_view">
          <img src={dataUser.banner} className="banner" />
          <div className="view_user">
            <div className="info">
              <img
                src={
                  dataUser.avatar ||
                  "https://i.pinimg.com/564x/f6/3e/2f/f63e2fa676d8bd34ed21cc48f449dffd.jpg"
                }
              />
              <h3>{dataUser.userName}</h3>
              <p>{dataUser.userEmail}</p>
            </div>
            <div className="social">
              {dataUser.userSocial.map((item, index) => (
                <a href={item.linkSocial} key={item._id || index}>
                  {appSvg[item.social]}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="detail_user_change_password">
        <div className="change_g">
          <span>New Password</span>
          <input
            placeholder="New Password"
            type="password"
            name="newPassword"
            value={changePassword.newPassword}
            onChange={handleChangePassword}
          />
        </div>
        <div className="change_g">
          <span>Re-New Password</span>
          <input
            placeholder="Re-New Password"
            type="password"
            name="reNewPassword"
            value={changePassword.reNewPassword}
            onChange={handleChangePassword}
          />
        </div>
        <span>{message}</span>
        <p onClick={handleSubmitChangePasswrod}>Change</p>
      </div>

      <div className="detail_user_delete">
        <h4>Are you sure to delete this User</h4>
        <div className="g">
          <p onClick={handleSubmitDelete}>Yes</p>
          <p onClick={openDelete}>No</p>
        </div>
        <p>{message}</p>
      </div>

      <div className="detail_user_create_view">
        <img src={dataUser.banner} className="banner" />
        <div className="view_user">
          <div className="info">
            <img src={dataUser.avatar} />
            <h3>{dataUser.userName}</h3>
            <p>{dataUser.userEmail}</p>
          </div>
          <div className="social">
            {dataUser.userSocial.map((item, index) => (
              <a href={item.linkSocial} key={item._id || index}>
                {appSvg[item.social]}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailUser;
