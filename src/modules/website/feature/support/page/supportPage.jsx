import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createSupportThunk,
  getSupportsThunk,
} from "../../../../../store/slices/supportSlice";
import TipTap from "../../../components/rickText";
import { appSvg } from "../../../../../data/svg";
import { useNavigate } from "react-router-dom";

const SupportPage = () => {
  const { supports } = useSelector((state) => state.support);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [supportData, setSupportData] = useState({
    banner: "",
    content: [],
    feedback: [],
  });

  const [contentData, setContentData] = useState({
    titleContent: "",
    content: "",
  });

  const [indexSave, setIndexSave] = useState();

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

  const handleSubmit = () => {
    dispatch(createSupportThunk(supportData));
  };

  useEffect(() => {
    dispatch(getSupportsThunk());
  }, []);

  const toggleCreate = (e) => {
    const boxCreate = e.target
      .closest(".support")
      .querySelector(".support_create");
    boxCreate.classList.toggle("active");
  };

  const toggleCreateContent = (e) => {
    const boxCreate = e.target
      .closest(".create_g")
      .querySelector(".create_g_content");
    boxCreate.classList.toggle("active");
  };

  const detailSupport = (data) => {
    navigate(`/website/support/${data._id}`, {
      state: {
        data,
      },
    });
  };

  return (
    <div className="support">
      <div className="support_head">
        <p onClick={toggleCreate}>Create Support</p>
        <p>Edit Content Support</p>
      </div>

      <div className="support_create">
        <div className="support_create_left">
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

      {supports.map((support) => (
        <p className="support_item" onClick={() => detailSupport(support)}>
          Data Support
        </p>
      ))}
    </div>
  );
};

export default SupportPage;
