import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import TipTap from "../../../components/rickText";
import { appSvg } from "../../../../../data/svg";
import { editProfileThunk } from "../../../../../store/slices/profileSlice";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";

const DetailProfile = () => {
  const { data } = useLocation().state;
  const [dataCreate, setDataCreate] = useState(data);

  const [edit, setEdit] = useState(false);
  const [indexSave, setIndexSave] = useState();
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

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

  const handleSubmit = async () => {
    try {
      const resultAction = await dispatch(editProfileThunk(dataCreate));

      const result = unwrapResult(resultAction);
      if (result.data.status !== 201) {
        setMessage("Error Save");
      }
      setMessage("Save Success");
    } catch (error) {
      console.error("Submit failed:", error);
    }
  };

  const toggleContent = (e) => {
    const boxContent = e.target
      .closest(".profile_g")
      .querySelector(".profile_g_content");
    boxContent.classList.toggle("active");
  };

  return (
    <div className="detail_profile">
      <div className="detail_profile_create active">
        <div className="detail_profile_create_left">
          <div className="profile_g">
            <p>{message}</p>
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
            Save Profile
          </p>
        </div>
        <div className="detail_profile_create_right">
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
    </div>
  );
};

export default DetailProfile;
