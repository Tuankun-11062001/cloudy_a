import React, { useEffect, useState } from "react";
import TipTap from "../../../components/rickText";
import { appSvg } from "../../../../../data/svg";
import { useDispatch, useSelector } from "react-redux";
import {
  createProfileThunk,
  getProfilesThunk,
} from "../../../../../store/slices/profileSlice";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const { profiles } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getProfilesThunk());
  }, []);

  const [dataCreate, setDataCreate] = useState({
    user: "",
    content: [],
  });

  const [edit, setEdit] = useState(false);
  const [indexSave, setIndexSave] = useState();

  useEffect(() => {
    const idLocal = localStorage.getItem("_CM_id");
    if (!idLocal) {
      return;
    }
    setDataCreate((prev) => {
      return {
        ...prev,
        user: idLocal,
      };
    });
  }, []);

  const init = {
    titleHead: "",
    content: "",
  };

  const [dataContent, setDataContent] = useState(init);

  const handleChangeContent = (e) => {
    setDataContent((prev) => {
      return {
        ...prev,
        titleHead: e.target.value,
      };
    });
  };

  const handleChangeTiptap = (data) => {
    setDataContent((prev) => {
      return {
        ...prev,
        content: data,
      };
    });
  };

  const handleAddingContent = () => {
    setDataCreate((prev) => {
      return {
        ...prev,
        content: [...prev.content, dataContent],
      };
    });

    setDataContent(init);
  };

  const handleEdit = (indx) => {
    const data = dataCreate.content[indx];

    setDataContent(data);
    setIndexSave(indx);
    setEdit(true);
  };

  const handleSave = () => {
    dataCreate.content[indexSave] = dataContent;
    setEdit(false);
  };

  const handleContentDelete = (indx) => {
    const newContent = dataCreate.content.filter((_, index) => index !== indx);
    setDataCreate((prev) => {
      return {
        ...prev,
        content: newContent,
      };
    });
  };

  const handleSubmit = () => {
    dispatch(createProfileThunk(dataCreate));
  };

  // open add content

  const toggleContent = (e) => {
    const boxContent = e.target
      .closest(".profile_g")
      .querySelector(".profile_g_content");
    boxContent.classList.toggle("active");
  };

  const handleCreate = (e) => {
    const boxCreate = e.target
      .closest(".profile")
      .querySelector(".profile_create");
    boxCreate.classList.toggle("active");
  };

  const detailProfile = (data) => {
    navigate(`/website/profile/${data._id}`, {
      state: {
        data,
      },
    });
  };

  return (
    <div className="profile">
      <div className="profile_head">
        <p onClick={handleCreate}>Create Profile</p>
      </div>
      <div className="profile_create">
        <div className="profile_create_left">
          <div className="profile_g">
            <div className="profile_g_head">
              <span>Content</span>
              <p onClick={toggleContent}>Create content</p>
            </div>

            <div className="profile_g_content">
              <span>Title</span>
              <input
                placeholder="Title"
                value={dataContent.titleHead}
                onChange={handleChangeContent}
              />
              <TipTap change={handleChangeTiptap} state={dataContent.content} />

              {edit ? (
                <p onClick={handleSave} className="adding_content">
                  Save Content
                </p>
              ) : (
                <p onClick={handleAddingContent} className="adding_content">
                  Adding Content
                </p>
              )}
            </div>

            <div className="profile_g_list">
              {dataCreate.content.map((content, indx) => (
                <span key={indx} onClick={() => handleEdit(indx)}>
                  <p onClick={() => handleContentDelete(indx)}>
                    {appSvg.close}
                  </p>
                  {content.titleHead}
                </span>
              ))}
            </div>
          </div>

          <p className="create" onClick={handleSubmit}>
            Create Profile
          </p>
        </div>
        <div className="profile_create_right">
          {dataCreate.content.map((item, index) => (
            <div key={index} className="content">
              <h3>{item.titleHead}</h3>
              <div
                className="tiptap"
                dangerouslySetInnerHTML={{ __html: item.content }}
              ></div>
            </div>
          ))}
        </div>
      </div>

      <div className="profile_list">
        {profiles.map((profile) => (
          <div
            className="profile_card"
            onClick={() => detailProfile(profile)}
            key={profile._id}
          >
            {profile.user.userName}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfilePage;
