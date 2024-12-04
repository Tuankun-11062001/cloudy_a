import React, { useEffect, useState } from "react";
import { appSvg } from "../../../../../data/svg";
import { useDispatch, useSelector } from "react-redux";
import UserCard from "../components/userCard";
import {
  createUserThunk,
  getUserThunk,
} from "../../../../../store/slices/userSlice";

const UserPage = () => {
  const { users } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [message, setMessage] = useState("");

  useEffect(() => {
    dispatch(getUserThunk());
  }, []);

  const [dataUser, setDataUser] = useState({
    avatar: "",
    banner: "",
    userName: "",
    userEmail: "",
    userPassword: "",
    rePassword: "",
    userDetail: "",
    userSocial: [],
  });

  const [dataSocial, setDataSocial] = useState({
    social: "",
    linkSocial: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMessage("");
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

  const handleAddingSocial = (e) => {
    const { name, value } = e.target;
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

  const handleSubmit = () => {
    if (dataUser.userPassword !== dataUser.rePassword) {
      setMessage("Password incorrect");
      return;
    }
    dispatch(createUserThunk(dataUser));
  };

  // box create
  const openBoxCreate = (e) => {
    const boxCreate = e.target
      .closest(".user_page")
      .querySelector(".user_page_create");
    boxCreate.classList.toggle("active");
  };

  return (
    <div className="user_page">
      <div className="user_page_head">
        <p onClick={openBoxCreate}>Create user</p>
      </div>
      <div className="user_page_create">
        <div className="user_page_create_left">
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
            <span>UserPassword</span>
            <input
              placeholder="userPassword"
              name="userPassword"
              value={dataUser.userPassword}
              onChange={handleChange}
              type="password"
            />
          </div>
          <div className="create_g">
            <span>Re-Password</span>
            <input
              placeholder="re-password"
              name="rePassword"
              value={dataUser.rePassword}
              onChange={handleChange}
              type="password"
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
          <span>{message}</span>
          <p onClick={handleSubmit}>Create</p>
        </div>
        <div className="user_page_create_view">
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

      <div className="user_page_list">
        <div className="user_page_list_head">
          <span>No.</span>
          <p>UserName</p>
          <p>Admin</p>
          <p>UserEmail</p>
          <p>userSocial</p>
        </div>

        <div className="list">
          {users.map((user, indx) => (
            <UserCard data={user} key={user._id} indx={indx} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserPage;
