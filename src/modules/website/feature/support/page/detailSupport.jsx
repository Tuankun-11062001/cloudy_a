import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { appSvg } from "../../../../../data/svg";
import TipTap from "../../../components/rickText";
import { editSupportThunk } from "../../../../../store/slices/supportSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

const DetailSupport = () => {
  const { data } = useLocation().state;

  const [supportData, setSupportData] = useState(data);
  const dispatch = useDispatch();

  const [contentData, setContentData] = useState({
    titleContent: "",
    content: "",
  });

  const [indexSave, setIndexSave] = useState();

  const [message, setMessage] = useState("");

  const [edit, setEdit] = useState(false);

  const handleChange = (e) => {
    setSupportData((prev) => {
      return {
        ...prev,
        banner: e.target.value,
      };
    });
  };

  const handleChangeContent = (e) => {
    setContentData((prev) => {
      return {
        ...prev,
        titleContent: e.target.value,
      };
    });
  };

  const handleGetContentTiptap = (data) => {
    setContentData((prev) => {
      return {
        ...prev,
        content: data,
      };
    });
  };

  const handleAddingContent = () => {
    setSupportData((prev) => {
      return {
        ...prev,
        content: [...prev.content, contentData],
      };
    });
  };

  const handleEdit = (indx) => {
    const data = supportData.content[indx];

    setContentData(data);
    setIndexSave(indx);
    setEdit(true);
  };

  const handleSave = () => {
    supportData.content[indexSave] = contentData;
    setEdit(false);
  };

  const handleContentDelete = (indx) => {
    const newContent = supportData.content.filter((_, index) => index !== indx);
    setSupportData((prev) => {
      return {
        ...prev,
        content: newContent,
      };
    });
  };

  const handleSubmit = async () => {
    try {
      const resultAction = await dispatch(editSupportThunk(supportData));

      const result = unwrapResult(resultAction);
      if (result.data.status !== 201) {
        setMessage("Error Save");
      }
      setMessage("Save Success");
    } catch (error) {
      console.error("Submit failed:", error);
    }
  };

  const toggleCreate = (e) => {
    const boxCreate = e.target
      .closest(".detail_support")
      .querySelector(".support_create");
    boxCreate.classList.toggle("active");
  };

  const toggleCreateContent = (e) => {
    const boxCreate = e.target
      .closest(".create_g")
      .querySelector(".create_g_content");
    boxCreate.classList.toggle("active");
  };

  return (
    <div className="detail_support">
      <div className="detail_support_head">
        <p onClick={toggleCreate}>Edit</p>
      </div>

      <div className="support_create">
        <div className="support_create_left">
          <p>{message}</p>
          <div className="create_g">
            <span>Banner Support</span>
            <input
              placeholder="link banner Support"
              value={supportData.banner}
              onChange={handleChange}
            />
          </div>
          <div className="create_g">
            <div className="create_g_head">
              <span>Banner</span>
              <p onClick={toggleCreateContent}>Create Content</p>
            </div>
            <div className="create_g_content">
              <div className="create_g">
                <span>Title Content</span>
                <input
                  placeholder="Title Content"
                  value={contentData.titleContent}
                  onChange={handleChangeContent}
                />
              </div>
              <div className="create_g">
                <span>Content</span>
                <TipTap
                  state={contentData.content}
                  change={handleGetContentTiptap}
                />
              </div>
              {edit ? (
                <p onClick={handleSave}>Save</p>
              ) : (
                <p onClick={handleAddingContent}>Create</p>
              )}
            </div>

            <div className="create_g_list">
              {supportData.content.map((item, indx) => (
                <span key={indx} onClick={() => handleEdit(indx)}>
                  <p onClick={() => handleContentDelete(indx)}>
                    {appSvg.close}
                  </p>
                  {item.titleContent}
                </span>
              ))}
            </div>
          </div>

          <p onClick={handleSubmit}>Create Support</p>
        </div>
        <div className="support_create_right">
          {supportData.content.map((item, index) => (
            <div key={index} className="content">
              <h3>{item.titleContent}</h3>
              <div
                className="tiptap"
                dangerouslySetInnerHTML={{ __html: item.content }}
              ></div>
            </div>
          ))}
        </div>
      </div>

      <div className="detail_support_feedback">
        {supportData.feedback.map((item, index) => (
          <div className="item">
            <div className="item_head">
              <span>{index + 1}</span>
              <div className="item_head_g">
                <p>{item.user.userName}</p>
                <p>{item.user.userEmail}</p>
              </div>
            </div>
            <p>{item.content}</p>
            <div className="item_footer">
              <span>{item.check ? appSvg.check : appSvg.none}</span>
              <p>Check</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetailSupport;
